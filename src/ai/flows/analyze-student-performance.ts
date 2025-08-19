
'use server';
/**
 * @fileOverview An AI flow to analyze student performance based on quiz results.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { units } from '@/data/materials';

// Helper function to map lessonId to a human-readable title
const getLessonTitle = (lessonId: string): string => {
  // Example lessonId: "unit-1-lesson-2-part-3"
  const parts = lessonId.split('-');
  const unitNum = parts[1];
  const lessonNum = parts[3];

  const unit = units.find(u => u.id === `unit-${unitNum}`);
  if (!unit) return lessonId;

  const lesson = unit.lessons.find(l => l.lessonNum === parseInt(lessonNum, 10));
  return lesson ? `${unit.title} / ${lesson.title}` : unit.title;
}

const QuizResultSchema = z.object({
  lessonId: z.string().describe("The unique identifier for the lesson, e.g., 'unit-1-lesson-2-part-3'."),
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
      { lessonId: 'unit-1-lesson-1-part-3', score: 0.95, difficulty: 1, lessonTitle: getLessonTitle('unit-1-lesson-1-part-3'), scorePercentage: '95' },
      { lessonId: 'unit-1-lesson-1-part-8', score: 0.55, difficulty: 2, lessonTitle: getLessonTitle('unit-1-lesson-1-part-8'), scorePercentage: '55' },
      { lessonId: 'unit-1-lesson-1-part-4', score: 0.88, difficulty: 2, lessonTitle: getLessonTitle('unit-1-lesson-1-part-4'), scorePercentage: '88' },
      { lessonId: 'unit-1-lesson-1-part-9', score: 0.65, difficulty: 1, lessonTitle: getLessonTitle('unit-1-lesson-1-part-9'), scorePercentage: '65' },
  ];
  
  const studentData = {
    studentName: 'أحمد', // Example name
    quizResults: finalResults,
  }

  const { output } = await analysisPrompt(studentData);

  return output || 'عذرًا، لم أتمكن من إنشاء التحليل. يرجى المحاولة مرة أخرى.';
}
