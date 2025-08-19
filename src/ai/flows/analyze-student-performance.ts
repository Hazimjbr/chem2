
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
  difficulty: z.number().min(1).describe("The difficulty level of the quiz taken."),
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
    prompt: `أنت مستشار تعليمي متخصص في تحليل أداء طلاب التوجيهي في مادة الكيمياء.
مهمتك هي تحليل بيانات الطالب التالية وتقديم تقرير مفصل وشخصي.

اسم الطالب: {{studentName}}

نتائج الاختبارات:
{{#if quizResults.length}}
    {{#each quizResults}}
*   **الدرس:** {{this.lessonTitle}}
    *   النتيجة: {{this.scorePercentage}}%
    *   مستوى الصعوبة: {{this.difficulty}}
    {{/each}}
{{else}}
    لم يقم الطالب بإجراء أي اختبارات بعد.
{{/if}}

**مهمتك:**
1.  **ابدأ بمقدمة ودية** وموجهة للطالب (مثلاً: "مرحباً يا {{studentName}}، هذا هو تحليل لأدائك...").
2.  **حدد نقاط القوة:** ابحث عن الدروس التي حصل فيها الطالب على أعلى الدرجات (أعلى من 85%). أثنِ على جهوده في هذه المواضيع.
3.  **حدد نقاط الضعف الرئيسية:** ابحث عن الدروس التي حصل فيها الطالب على أقل الدرجات (أقل من 70%). هذه هي المواضيع التي تحتاج إلى أكبر قدر من الاهتمام.
4.  **قدم توصيات محددة وقابلة للتنفيذ:**
    *   لكل نقطة ضعف، قدم نصيحة ملموسة. لا تقل فقط "راجع الدرس"، بل اقترح شيئًا محددًا مثل: "في درس 'قانون بويل'، لاحظت أن نتيجتك كانت منخفضة. أقترح عليك التركيز على حل مسائل إضافية تتضمن تغير الضغط والحجم معًا. يمكنك استخدام المحاكاة التفاعلية في الدرس لفهم العلاقة العكسية بشكل أفضل."
    *   اقترح خطة دراسية بسيطة (مثلاً: "في الأسبوع القادم، خصص يومين لمراجعة نقاط الضعف المذكورة أعلاه.").
5.  **اختتم بعبارة تشجيعية** وملهمة لتحفيز الطالب.

**أسلوب الكتابة:**
*   استخدم اللغة العربية الفصحى.
*   كن إيجابيًا ومشجعًا، حتى عند الحديث عن نقاط الضعف.
*   اجعل التقرير منظمًا وسهل القراءة باستخدام العناوين والنقاط.`,
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
      { lessonId: 'unit-1-lesson-1-part-1', score: 0.95, difficulty: 1, lessonTitle: getLessonTitle('unit-1-lesson-1-part-1'), scorePercentage: '95' },
      { lessonId: 'unit-1-lesson-1-part-3', score: 0.55, difficulty: 2, lessonTitle: getLessonTitle('unit-1-lesson-1-part-3'), scorePercentage: '55' },
      { lessonId: 'unit-1-lesson-1-part-4', score: 0.88, difficulty: 2, lessonTitle: getLessonTitle('unit-1-lesson-1-part-4'), scorePercentage: '88' },
      { lessonId: 'unit-2-lesson-1-part-2', score: 0.65, difficulty: 1, lessonTitle: getLessonTitle('unit-2-lesson-1-part-2'), scorePercentage: '65' },
  ];
  
  const studentData = {
    studentName: 'أحمد', // Example name
    quizResults: finalResults,
  }

  const { output } = await analysisPrompt(studentData);

  return output || 'عذرًا، لم أتمكن من إنشاء التحليل. يرجى المحاولة مرة أخرى.';
}
