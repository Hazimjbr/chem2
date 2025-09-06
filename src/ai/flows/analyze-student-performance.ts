
'use server';
/**
 * @fileOverview An AI flow to analyze student performance based on quiz results.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getLessonTitle } from '@/lib/utils';


const StudentPerformanceInputSchema = z.object({
  studentName: z.string().describe("The name of the student."),
  quizResults: z.array(z.object({
    lessonId: z.string().describe("The unique identifier for the lesson, which is the URL path."),
    score: z.number().min(0).max(1).describe("The student's score, from 0.0 to 1.0."),
    difficulty: z.number().min(0.5).describe("The difficulty level of the quiz taken. Level 0.5 is for quick checks."),
  })).describe("An array of the student's raw quiz results."),
  averageTimePerQuestion: z.number().optional().describe("The student's average time in seconds to answer a single quiz question."),
});

type StudentPerformanceInput = z.infer<typeof StudentPerformanceInputSchema>;


const analysisPrompt = ai.definePrompt({
    name: 'studentPerformanceAnalysisPrompt',
    model: 'googleai/gemini-1.5-flash',
    input: { schema: z.object({
        studentName: z.string(),
        processedResults: z.array(z.object({
             lessonTitle: z.string(),
             scorePercentage: z.string(),
             difficulty: z.number(),
        })),
        averageTimePerQuestion: z.number().optional(),
    })},
    output: { format: 'text' },
    prompt: `أنت مستشار تعليمي خبير ومحلل بيانات متخصص في مساعدة طلاب التوجيهي في مادة الكيمياء
مهمتك هي تحليل بيانات أداء الطالب التالية بدقة وتقديم تقرير مفصل وشخصي للغاية

اسم الطالب: {{studentName}}

نتائج الاختبارات والتحققات:
{{#if processedResults.length}}
    {{#each processedResults}}
*   **الدرس:** {{this.lessonTitle}}
    *   النتيجة: {{this.scorePercentage}}%
    *   مستوى الصعوبة: {{this.difficulty}}
    {{/each}}
{{else}}
    لم يقم الطالب بإجراء أي اختبارات بعد
{{/if}}

{{#if averageTimePerQuestion}}
**تحليل السرعة:**
*   متوسط وقت الإجابة لكل سؤال: {{averageTimePerQuestion}} ثانية
{{/if}}

**مهمتك التحليلية الدقيقة:**
1.  **ابدأ بمقدمة ودية وشخصية** وموجهة للطالب (مثلاً: "مرحباً يا {{studentName}}، قمت بتحليل أدائك في الفترة الأخيرة وهذا هو تقريرك الشخصي...")
2.  **حدد نقاط القوة (المواضيع المتقنة):** ابحث عن الدروس التي حصل فيها الطالب على أعلى الدرجات (أعلى من 85%). أثنِ على جهوده بشكل محدد في هذه المواضيع. مثال: "أداءك كان ممتازًا في درس 'قانون بويل' مما يدل على فهمك العميق للعلاقة بين الضغط والحجم."
3.  **حدد نقاط الضعف الرئيسية (المواضيع التي تحتاج لتركيز):** هذه هي أهم نقطة. ابحث عن الدروس التي حصل فيها الطالب على أقل الدرجات (أقل من 70%). لا تكتفِ بذكر اسم الدرس، بل حلل الخطأ المحتمل.
4.  **قدم توصيات محددة، ملموسة، وقابلة للتنفيذ (الأهم):**
    *   **لكل نقطة ضعف،** قدم نصيحة عملية ودقيقة. لا تقل فقط "راجع الدرس"، بل كن محددًا جدًا.
    *   **مثال على توصية سيئة (عامة):** "راجع درس قانون الغاز المثالي."
    *   **مثال على توصية جيدة (محددة):** "في درس 'قانون الغاز المثالي'، لاحظت أن نتيجتك كانت منخفضة. أقترح عليك التركيز على المسائل التي تتطلب حساب عدد المولات (n) أو الكتلة المولية (Mr) باستخدام الصيغة PV = (m/Mr)RT. حاول حل المثال المحلول في الدرس مرة أخرى بنفسك ثم تحقق من إجابتك."
    *   **مثال آخر:** "في 'قانون دالتون'، يبدو أن هناك صعوبة في حساب الضغط الجزئي. ركز على فهم مفهوم 'الكسر المولي' وكيفية استخدامه لحساب ضغط كل غاز على حدة."
    *   اقترح خطة دراسية بسيطة وموجهة (مثلاً: "خلال اليومين القادمين، خصص ساعة لمراجعة نقطتي الضعف المذكورتين أعلاه، وابدأ بحل سؤالين على كل منها").
5.  **أضف فقرة اختيارية عن سرعة الأداء (إذا كانت البيانات متوفرة):**
    *   إذا كان 'averageTimePerQuestion' موجودًا، قم بتحليله. مثال: "متوسط وقت إجابتك للسؤال الواحد هو حوالي {{averageTimePerQuestion}} ثانية. هذه سرعة ممتازة وتدل على ثقتك بالمادة! استمر على هذا النحو." أو "لاحظت أن متوسط وقت إجابتك مرتفع قليلاً. لا تقلق، هذا طبيعي في البداية. مع كثرة التدريب، ستجد نفسك تحل الأسئلة بشكل أسرع."
6.  **اختتم التقرير بفقرة ختامية تشجيعية** وملهمة تؤكد على قدرة الطالب على التحسن والنجاح.

**أسلوب الكتابة:**
*   استخدم اللغة العربية الفصحى.
*   كن إيجابيًا ومشجعًا حتى عند الحديث عن نقاط الضعف. يجب أن يشعر الطالب بالتمكين لا بالإحباط.
*   اجعل التقرير منظمًا وسهل القراءة باستخدام العناوين والنقاط.
*   تأكد من أن كل تقرير فريد ويعكس بيانات الطالب الفعلية وتجنب العموميات قدر الإمكان.`,
});

export async function analyzeStudentPerformance(input: StudentPerformanceInput): Promise<string> {
  const { studentName, quizResults, averageTimePerQuestion } = input;
  
  // Use real data if available, otherwise use mock data for demonstration
  const finalResults = quizResults.length > 0 ? quizResults : [
      { lessonId: '/materials/semester-1/unit-1/lesson-1/part-3', score: 0.95, difficulty: 1 },
      { lessonId: '/materials/semester-1/unit-1/lesson-1/part-8', score: 0.55, difficulty: 2 },
      { lessonId: '/materials/semester-1/unit-1/lesson-1/part-4', score: 0.88, difficulty: 2 },
      { lessonId: '/materials/semester-1/unit-1/lesson-1/part-9', score: 0.65, difficulty: 1 },
  ];

  const processedResults = finalResults.map(r => ({
    ...r,
    lessonTitle: getLessonTitle(r.lessonId),
    scorePercentage: (r.score * 100).toFixed(0),
  }));

  const analysisInput = {
    studentName,
    processedResults,
    averageTimePerQuestion: averageTimePerQuestion ? parseFloat(averageTimePerQuestion.toFixed(1)) : undefined,
  }

  const { output } = await analysisPrompt(analysisInput);

  return output || 'عذرًا، لم أتمكن من إنشاء التحليل. يرجى المحاولة مرة أخرى.';
}
