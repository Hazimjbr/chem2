
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
        explanation: "الانتشار هو الاختلاط التدريجي للغازات بسبب حركتها العشوائية، والذي يؤدي إلى خليط متجانس. الشكل (أ) يوضح بشكل صحيح كيف أن الجسيمات التي بدأت منفصلة، اختلطت لتكوين خليط متجانس."
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
    }
];

export const staticQuizLvl2: QuizQuestion[] = [
    {
        question: "أي من الغازات التالية هو الأسرع انتشارًا؟ (الكتل المولية: H=1, C=12, O=16, S=32)",
        options: ["O₂", "H₂S", "CH₄", "SO₂"],
        correctAnswerIndex: 2,
        explanation: "الغاز الأسرع انتشارًا هو الذي له أقل كتلة مولية. نحسب الكتل المولية: O₂=32, H₂S=34, CH₄=16, SO₂=64. غاز الميثان CH₄ هو الأخف، وبالتالي هو الأسرع انتشارًا."
    },
    {
        question: "عند نفس درجة الحرارة، أي من العبارات التالية صحيحة؟",
        "options": [
            "جميع جسيمات الغاز لها نفس السرعة.",
            "جسيمات الغاز الأثقل لها طاقة حركية أعلى.",
            "جسيمات الغاز الأخف تتحرك بسرعة متوسطة أعلى.",
            "جسيمات الغاز الأثقل تتحرك بسرعة متوسطة أعلى."
        ],
        "correctAnswerIndex": 2,
        "explanation": "عند نفس درجة الحرارة، يكون لجميع الغازات نفس متوسط الطاقة الحركية. بما أن الطاقة الحركية KE = 0.5*m*v²، فإنه لكي تحافظ الجسيمات الأخف (كتلة m أقل) على نفس الطاقة الحركية، يجب أن تتحرك بسرعة متوسطة أعلى (v)."
    },
    {
        question: <div><p>في تجربة توضح انتشار غازي HCl و NH₃ في أنبوب زجاجي، أين تتكون حلقة كلوريد الأمونيوم البيضاء؟</p><AmmoniumChlorideDiagram /></div>,
        options: [
            "في منتصف الأنبوب تمامًا (النقطة B)",
            "أقرب إلى طرف NH₃ (النقطة C)",
            "أقرب إلى طرف HCl (النقطة A)",
            "لا تتكون حلقة"
        ],
        correctAnswerIndex: 2,
        explanation: "غاز الأمونيا (NH₃, Mr≈17) أخف من غاز كلوريد الهيدروجين (HCl, Mr≈36.5). لذلك، ينتشر غاز الأمونيا بسرعة أكبر ويقطع مسافة أطول في الأنبوب قبل أن يلتقي بغاز HCl الأبطأ. لذا، تتكون الحلقة أقرب إلى طرف HCl (النقطة A)."
    }
];
export const staticQuizLvl3: QuizQuestion[] = [
    // Placeholder for level 3 questions
];

    