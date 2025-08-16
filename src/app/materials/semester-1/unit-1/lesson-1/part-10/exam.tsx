
import { InlineMath } from 'react-katex';
import React from 'react';
import { GasSamplesDiagram, DiffusionProcessDiagram, BromineDiffusionDiagram, AmmoniumChlorideDiagram } from './diagram';

export interface QuizQuestion {
    question: React.ReactNode;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

const gasSamplesQuestionText = "ادرس الرسم المجاور والذي يمثل أربع عينات من الغازات متساوية الحجم عند نفس درجة الحرارة ثم أجب عن الأسئلة الثلاثة الآتية:";
const ammoniumChlorideQuestionText = <span>ادرس الرسم المجاور والذي يمثل التفاعل <span dir="ltr" className='inline-block'>(<InlineMath math="HCl(g) + NH_3(g) \rightarrow NH_4Cl(s)" />)</span> علما بأن الكتل الذرية <span dir="ltr" className='inline-block'>(<InlineMath math="H=1, N=14, Cl=35" />)</span> ثم أجب عن السؤالين الآتيين:</span>;


export const staticQuizLvl1: QuizQuestion[] = [
    {
        question: <div><p>{gasSamplesQuestionText}</p><GasSamplesDiagram /><strong className="mt-2 block text-accent">1) عينة الغاز الأكبر ضغطًا:</strong></div>,
        options: ["A", "B", "C", "D"],
        correctAnswerIndex: 3,
        explanation: "الضغط يتناسب طرديًا مع عدد الجسيمات (المولات) عند ثبات الحجم والحرارة. العينة D تحتوي على أكبر عدد من الجسيمات (5 جسيمات)، لذا ضغطها هو الأكبر."
    },
    {
        question: <div><p>{gasSamplesQuestionText}</p><GasSamplesDiagram /><strong className="mt-2 block text-accent">2) عينة الغاز الأسرع تدفقًا:</strong></div>,
        options: ["A", "B", "C", "D"],
        correctAnswerIndex: 3,
        explanation: "سرعة التدفق تتناسب عكسيًا مع الكتلة المولية. الغاز الأسرع هو الذي له أقل كتلة مولية. بالنظر إلى الأشكال، الجسيمات في D هي الأصغر (ذرات منفردة)، مما يوحي بأنها الأخف والأسرع تدفقًا."
    },
    {
        question: <div><p>{gasSamplesQuestionText}</p><GasSamplesDiagram /><strong className="mt-2 block text-accent">3) إذا كانت الكتل المولية للغازات (A:20, B:18, C:46, D:32)g/mol، فإن عينة الغاز الأكثر كثافة هي:</strong></div>,
        options: ["A", "B", "C", "D"],
        correctAnswerIndex: 3,
        explanation: "الكثافة = الكتلة/الحجم. بما أن الحجم ثابت، فالأعلى كثافة هو صاحب الكتلة الأكبر. الكتلة تتناسب مع عدد الجسيمات والكتلة المولية. بحساب كتلة نسبية (عدد الجسيمات × الكتلة المولية): A=4×20=80, B=3×18=54, C=2×46=92, D=5×32=160. العينة D لها الكتلة الأعلى وبالتالي هي الأعلى كثافة."
    },
    {
        question: <div><p>أي من الأشكال التالية يوضح عملية الانتشار بشكل صحيح؟</p><DiffusionProcessDiagram /></div>,
        options: ["أ", "ب", "ج", "د"],
        correctAnswerIndex: 0,
        explanation: "الانتشار هو الاختلاط التدريجي للغازات بسبب حركتها العشوائية. الشكل (أ) يوضح بشكل صحيح كيف أن الجسيمات التي بدأت مختلطة تبقى مختلطة وتتحرك بعشوائية، وهو جوهر عملية الانتشار في حالة التوازن."
    },
    {
        question: <div><p>ادرس الرسم المجاور والذي يمثل وعاءين مفصولين بشريحة زجاجية في الشكل A ثم اختر العبارة الصحيحة التي تفسر ما حدث بعد إزالة الشريحة الزجاجية في الشكل B:</p><BromineDiffusionDiagram /></div>,
        options: [
            "جسيمات البروم والهواء تحركت بعشوائية",
            "جسيمات البروم تحركت للأعلى والهواء للأسفل",
            "لغاز البروم كثافة أكبر من الهواء",
            "للهواء كثافة أقل من غاز البروم"
        ],
        correctAnswerIndex: 0,
        explanation: "التفسير الأساسي لظاهرة الانتشار هو الحركة العشوائية المستمرة لجسيمات الغازات، والتي تؤدي إلى اختلاطها بمرور الوقت بغض النظر عن كثافتها."
    },
    {
        question: <div><p>{ammoniumChlorideQuestionText}</p><AmmoniumChlorideDiagram /><strong className="mt-2 block text-accent">1) حدد موقع تكون الغاز الأبيض من كلوريد الأمونيوم:</strong></div>,
        options: ["A", "B", "C"],
        correctAnswerIndex: 2,
        explanation: "الكتلة المولية لـ NH₃ ≈ 17g/mol. الكتلة المولية لـ HCl ≈ 36.5g/mol. غاز NH₃ أخف، لذا ينتشر أسرع ويقطع مسافة أطول. غاز HCl أثقل، لذا ينتشر أبطأ ويقطع مسافة أقصر. سيلتقيان عند النقطة C الأقرب إلى مصدر HCl."
    },
    {
        question: <div><p>{ammoniumChlorideQuestionText}</p><AmmoniumChlorideDiagram /><strong className="mt-2 block text-accent">2) إذا تم استبدال الحمض HCl بالحمض HBr فإن العبارة الصحيحة فإن موقع الغاز الأبيض:</strong></div>,
        options: [
            "لا يتغير",
            "على يسار C",
            "على يمين C",
            "عند النقطة A"
        ],
        correctAnswerIndex: 2,
        explanation: "الكتلة المولية لـ HBr (81g/mol) أكبر بكثير من HCl (36.5g/mol). هذا يعني أن HBr سيكون أبطأ بكثير من HCl. وبما أن سرعة NH₃ لم تتغير، فإنه سيقطع مسافة أكبر بكثير قبل أن يلتقي بـ HBr البطيء. لذا، سيتكون الغاز الأبيض في منطقة أقرب إلى مصدر HBr، أي على يمين النقطة C."
    },
];

export const staticQuizLvl2: QuizQuestion[] = [];
export const staticQuizLvl3: QuizQuestion[] = [];
