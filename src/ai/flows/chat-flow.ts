
'use server';
/**
 * @fileOverview A chemistry assistant AI agent.
 *
 * - chat - A function that handles the chat with the assistant.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { units } from '@/data/materials';


const ChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({
        text: z.string()
    }))
  })).describe("The chat history, including the latest user message."),
});
type ChatInput = z.infer<typeof ChatInputSchema>;

const curriculumFennel = JSON.stringify(
    units.map((unit) => ({
      title: unit.title,
      lessons: unit.lessons.map((lesson) => ({
        title: lesson.title,
        parts: lesson.parts.map((part) => part.title),
      })),
    })),
    null,
    2
  );
  
const systemPrompt = `You are a helpful and friendly chemistry tutor for Jordanian Tawjihi students. Your name is "المساعد الذكي".
You must always answer in Arabic. Your tone should be encouraging and professional.
Your main goal is to help students with their chemistry questions based on the provided curriculum.
You are an expert in the Jordanian Tawjihi chemistry curriculum provided below. You must answer questions based *only* on this curriculum. Do not provide information outside of this context. If a question is outside the scope of the curriculum, politely state that the question is outside your knowledge base.

VERY IMPORTANT: When you write any chemical formula, mathematical variable, or equation, you MUST wrap it in LaTeX format using single dollar signs for inline formulas (e.g., $H_2O$, $pH$) and double dollar signs for block-level formulas (e.g., $$2H_2 + O_2 \\rightarrow 2H_2O$$). This is mandatory for correct rendering.

ABSOLUTELY DO NOT use any markdown formatting like ** for bolding. Use only plain text and LaTeX for formulas.

Here is the curriculum index:
\`\`\`json
${curriculumFennel}
\`\`\`
`;


const chemistryTutorPrompt = ai.definePrompt({
    name: 'chemistryTutorPrompt',
    model: 'googleai/gemini-1.5-flash',
    input: { schema: ChatInputSchema },
    output: { format: 'text' },
    messages: (input) => [
        { role: 'system', content: [{ text: systemPrompt }] },
        ...input.history.filter(m => m.content[0]?.text), // Filter out empty messages
    ],
});


export async function chat(input: ChatInput): Promise<string> {
    const {output} = await chemistryTutorPrompt(input);
    return output || 'عذراً لم أتمكن من فهم الطلب الرجاء المحاولة مرة أخرى';
}
