
'use server';
/**
 * @fileOverview A flow for generating a quiz based on lesson content.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const QuizQuestionSchema = z.object({
  question: z.string().describe('The question text.'),
  options: z
    .array(z.string())
    .length(4)
    .describe('An array of exactly 4 possible answers.'),
  correctAnswerIndex: z
    .number()
    .min(0)
    .max(3)
    .describe('The index of the correct answer in the options array.'),
  explanation: z
    .string()
    .describe('A step-by-step explanation for why the correct answer is right.'),
});

const GenerateQuizOutputSchema = z.object({
  quiz: z
    .array(QuizQuestionSchema)
    .length(5)
    .describe('An array of 5 quiz questions.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

const GenerateQuizInputSchema = z.object({
    lessonContent: z.string(),
    difficultyLevel: z.number().min(1).describe("The difficulty level of the quiz. Higher numbers mean more difficult questions."),
});


const quizGenerationPrompt = ai.definePrompt({
  name: 'quizGenerationPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: GenerateQuizInputSchema },
  output: { schema: GenerateQuizOutputSchema },
  prompt: `أنت مساعد تعليمي خبير في الكيمياء مهمتك هي إنشاء اختبار قصير (كويز) من 5 أسئلة اختيار من متعدد بناءً على محتوى الدرس التالي ومستوى الصعوبة المحدد

**مستوى الصعوبة الحالي: {{difficultyLevel}}**
*   **المستوى 1:** أسئلة مباشرة تختبر حفظ وفهم المفاهيم الأساسية
*   **المستوى 2:** أسئلة تتطلب ربط مفهومين أو تطبيق مباشر لمعادلة
*   **المستوى 3:** أسئلة تحليلية تتطلب فهمًا أعمق للعلاقات بين المفاهيم
*   **المستوى 4 فما فوق:** أسئلة مركبة تتطلب استنتاجًا أو حل مسائل متعددة الخطوات أو تحليل سيناريوهات معقدة
يجب أن تعكس الأسئلة التي تنشئها مستوى الصعوبة المطلوب بدقة

**معايير الجودة (مهم جداً):**
1.  **الدقة العلمية:** يجب أن تكون الأسئلة والإجابات والشروحات دقيقة 100% بناءً على محتوى الدرس المقدم حصراً
2.  **التحقق الذاتي الإلزامي:** قبل تقديم الإجابة النهائية يجب عليك مراجعة كل سؤال للتأكد من أن **شرح الإجابة** يتطابق تمامًا مع **الإجابة الصحيحة** التي قمت بتحديدها إذا كان هناك أي تناقض يجب عليك تصحيح السؤال أو الإجابة أو الشرح لضمان التوافق التام يجب أن يكون الشرح دليلًا قاطعًا على صحة الإجابة المختارة
3.  **جودة الخيارات المضللة:** تأكد من أن الخيارات الخاطئة معقولة ولكنها غير صحيحة بشكل قاطع
4.  **آلية العمل الإلزامية:** لتضمن الدقة المطلقة يجب عليك اتباع الخطوات التالية لكل سؤال: أ **أولاً:** قم بصياغة السؤال ب **ثانياً:** قم بكتابة شرح تفصيلي وواضح للإجابة الصحيحة ج **ثالثاً:** بناءً على الشرح الذي كتبته قم بتحديد الإجابة الصحيحة وصياغة الخيارات المضللة الثلاثة الأخرى

**المتطلبات:**
*   يجب أن تكون الأسئلة ذات جودة عالية وتغطي المفاهيم الأساسية في النص
*   لكل سؤال قدم 4 خيارات وحدد الإجابة الصحيحة وقدم شرحًا واضحًا ومفصلاً لسبب صحة هذه الإجابة
*   يجب أن يكون كامل المحتوى الذي تنشئه باللغة العربية

محتوى الدرس:
---
{{{lessonContent}}}
---

قم بإنشاء الأسئلة بتنسيق JSON المطلوب`,
});

export async function generateQuiz(
  lessonContent: string,
  difficultyLevel: number
): Promise<GenerateQuizOutput> {
  const { output } = await quizGenerationPrompt({ lessonContent, difficultyLevel });
  if (!output) {
    throw new Error('Failed to generate quiz. The AI model returned no output.');
  }
  return output;
}
