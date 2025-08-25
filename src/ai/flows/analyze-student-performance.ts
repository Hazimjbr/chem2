
'use server';
/**
 * @fileOverview An AI flow to analyze student performance based on quiz results.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { units } from '@/data/materials';

// Helper function to map lessonId (which is a URL path) to a human-readable title
const getLessonTitle = (lessonId: string): string => {
    // Example lessonId: "/materials/semester-1/unit-1/lesson-2/part-3" or "/materials/semester-1/unit-1/section-5"
    const pathParts = lessonId.split('/').filter(p => p); // remove empty parts

    const unitIdentifier = pathParts.find(p => p.startsWith('unit-'));
    if (!unitIdentifier) return lessonId; // Return raw path if no unit found

    const unit = units.find(u => u.id === unitIdentifier);
    if (!unit) return lessonId;

    const lessonIdentifier = pathParts.find(p => p.startsWith('lesson-'));
    const sectionIdentifier = pathParts.find(p => p.startsWith('section-'));

    if (lessonIdentifier) {
        const lessonNum = parseInt(lessonIdentifier.replace('lesson-', ''), 10);
        const lesson = unit.lessons.find(l => l.lessonNum === lessonNum);
        if (!lesson) return unit.title;

        const partIdentifier = pathParts.find(p => p.startsWith('part-'));
        if (partIdentifier) {
            const partNum = parseInt(partIdentifier.replace('part-', ''), 10);
            const part = lesson.parts.find(p => p.partNum === partNum);
            return part ? `${lesson.title} / ${part.title}` : lesson.title;
        }
        return lesson.title;
    }

    if (sectionIdentifier) {
        const sectionNum = parseInt(sectionIdentifier.replace('section-', ''), 10);
        const section = unit.lessons.find(l => l.sectionNum === sectionNum);
         if (section) {
            return `${unit.title} / ${section.title}`;
        }
    }

    return unit.title; // Fallback to unit title
}


const QuizResultSchema = z.object({
  lessonId: z.string().describe("The unique identifier for the lesson, which is the URL path."),
  score: z.number().min(0).max(1).describe("The student's score, from 0.0 to 1.0."),
  difficulty: z.number().min(0.5).describe("The difficulty level of the quiz taken. Level 0.5 is for quick checks."),
});

const StudentPerformanceInputSchema = z.object({
  studentName: z.string().describe("The name of the student."),
  quizResults: z.array(z.object({
    lessonId: z.string(),
    score: z.number(),
    difficulty: z.number(),
    lessonTitle: z.string(),
    scorePercentage: z.string(),
  })).describe("An array of the student's processed quiz results."),
});


const analysisPrompt = ai.definePrompt({
    name: 'studentPerformanceAnalysisPrompt',
    model: 'googleai/gemini-1.5-flash',
    input: { schema: StudentPerformanceInputSchema },
    output: { format: 'text' },
    prompt: `أنت مستشار تعليمي خبير ومحلل بيانات متخصص في مساعدة طلاب التوجيهي في مادة الكيمياء.
مهمتك هي تحليل بيانات أداء الطالب التالية بدقة وتقديم تقرير مفصل وشخصي للغاية.

اسم الطالب: {{studentName}}

نتائج الاختبارات والتحققات:
{{#if quizResults.length}}
    {{#each quizResults}}
*   **الدرس:** {{this.lessonTitle}}
    *   النتيجة: {{this.scorePercentage}}%
    *   مستوى الصعوبة: {{this.difficulty}}
    {{/each}}
{{else}}
    لم يقم الطالب بإجراء أي اختبارات بعد.
{{/if}}

**مهمتك التحليلية الدقيقة:**
1.  **ابدأ بمقدمة ودية وشخصية** وموجهة للطالب (مثلاً: "مرحباً يا {{studentName}}، قمت بتحليل أدائك في الفترة الأخيرة، وهذا هو تقريرك الشخصي...").
2.  **حدد نقاط القوة (المواضيع المتقنة):** ابحث عن الدروس التي حصل فيها الطالب على أعلى الدرجات (أعلى من 85%). أثنِ على جهوده بشكل محدد في هذه المواضيع. مثال: "أداءك كان ممتازًا في درس 'قانون بويل'، مما يدل على فهمك العميق للعلاقة بين الضغط والحجم."
3.  **حدد نقاط الضعف الرئيسية (المواضيع التي تحتاج لتركيز):** هذه هي أهم نقطة. ابحث عن الدروس التي حصل فيها الطالب على أقل الدرجات (أقل من 70%). لا تكتفِ بذكر اسم الدرس، بل حلل الخطأ المحتمل.
4.  **قدم توصيات محددة، ملموسة، وقابلة للتنفيذ (الأهم):**
    *   **لكل نقطة ضعف،** قدم نصيحة عملية ودقيقة. لا تقل فقط "راجع الدرس"، بل كن محددًا جدًا.
    *   **مثال على توصية سيئة (عامة):** "راجع درس قانون الغاز المثالي."
    *   **مثال على توصية جيدة (محددة):** "في درس 'قانون الغاز المثالي'، لاحظت أن نتيجتك كانت منخفضة. أقترح عليك التركيز على المسائل التي تتطلب حساب عدد المولات (n) أو الكتلة المولية (Mr) باستخدام الصيغة PV = (m/Mr)RT. حاول حل المثال المحلول في الدرس مرة أخرى بنفسك ثم تحقق من إجابتك."
    *   **مثال آخر:** "في 'قانون دالتون'، يبدو أن هناك صعوبة في حساب الضغط الجزئي. ركز على فهم مفهوم 'الكسر المولي' وكيفية استخدامه لحساب ضغط كل غاز على حدة."
    *   اقترح خطة دراسية بسيطة وموجهة (مثلاً: "خلال اليومين القادمين، خصص ساعة لمراجعة نقطتي الضعف المذكورتين أعلاه، وابدأ بحل سؤالين على كل منها.").
5.  **اختتم التقرير بفقرة ختامية تشجيعية** وملهمة، تؤكد على قدرة الطالب على التحسن والنجاح.

**أسلوب الكتابة:**
*   استخدم اللغة العربية الفصحى.
*   كن إيجابيًا ومشجعًا، حتى عند الحديث عن نقاط الضعف. يجب أن يشعر الطالب بالتمكين لا بالإحباط.
*   اجعل التقرير منظمًا وسهل القراءة باستخدام العناوين والنقاط.
*   تأكد من أن كل تقرير فريد ويعكس بيانات الطالب الفعلية، وتجنب العموميات قدر الإمكان.`,
});

export async function analyzeStudentPerformance(input: z.infer<typeof QuizResultSchema>[]): Promise<string> {
  const processedResults = input.map(r => ({
    ...r,
    lessonTitle: getLessonTitle(r.lessonId),
    scorePercentage: (r.score * 100).toFixed(0),
  }));

  // For demonstration, if no real data is passed, use mock data.
  // In a real application, you would remove this mock data logic.
  const finalResults = processedResults.length > 0 ? processedResults : [
      { lessonId: '/materials/semester-1/unit-1/lesson-1/part-3', score: 0.95, difficulty: 1, lessonTitle: getLessonTitle('/materials/semester-1/unit-1/lesson-1/part-3'), scorePercentage: '95' },
      { lessonId: '/materials/semester-1/unit-1/lesson-1/part-8', score: 0.55, difficulty: 2, lessonTitle: getLessonTitle('/materials/semester-1/unit-1/lesson-1/part-8'), scorePercentage: '55' },
      { lessonId: '/materials/semester-1/unit-1/lesson-1/part-4', score: 0.88, difficulty: 2, lessonTitle: getLessonTitle('/materials/semester-1/unit-1/lesson-1/part-4'), scorePercentage: '88' },
      { lessonId: '/materials/semester-1/unit-1/lesson-1/part-9', score: 0.65, difficulty: 1, lessonTitle: getLessonTitle('/materials/semester-1/unit-1/lesson-1/part-9'), scorePercentage: '65' },
  ];
  
  const studentData = {
    studentName: 'أحمد', // Example name
    quizResults: finalResults,
  }

  const { output } = await analysisPrompt(studentData);

  return output || 'عذرًا، لم أتمكن من إنشاء التحليل. يرجى المحاولة مرة أخرى.';
}
