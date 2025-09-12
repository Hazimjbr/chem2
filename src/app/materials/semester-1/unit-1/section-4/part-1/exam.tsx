
'use client';

import React from 'react';
import { InlineMath } from 'react-katex';

export interface QuizQuestion {
    question: React.ReactNode;
    options: (string | React.ReactNode)[];
    correctAnswerIndex: number;
    explanation: React.ReactNode;
}

export const staticQuizLvl1: QuizQuestion[] = [
    {
        question: "لماذا يطهى الطعام بشكل أسرع في طنجرة الضغط",
        options: [
            "لأن الضغط المنخفض يقلل من درجة الغليان",
            <>لأن الضغط المرتفع يرفع درجة غليان الماء فوق <span dir="ltr">100°C</span></>,
            "لأن البخار يتركز في الأعلى فقط",
            "لأن الصمام يمنع خروج الحرارة"
        ],
        correctAnswerIndex: 1,
        explanation: <>العلاقة بين الضغط ودرجة الغليان طردية في طنجرة الضغط يزداد الضغط مما يرفع درجة غليان الماء والطهي عند درجة حرارة أعلى يسرّع من نضج الطعام</>
    },
    {
        question: "أي قانون من قوانين الغازات يفسر بشكل أساسي سبب انفجار بالون الطقس عند وصوله لارتفاعات عالية",
        options: [
            "قانون شارل (العلاقة بين الحجم والحرارة)",
            "قانون بويل (العلاقة بين الحجم والضغط)",
            "قانون جاي لوساك (العلاقة بين الضغط والحرارة)",
            "قانون أفوجادرو (العلاقة بين الحجم والمولات)"
        ],
        correctAnswerIndex: 1,
        explanation: "عند الارتفاعات العالية يقل الضغط الجوي الخارجي بشكل كبير ووفقًا لقانون بويل يتناسب حجم الغاز عكسيًا مع الضغط لذا يتمدد الغاز داخل البالون بشكل هائل حتى ينفجر"
    }
];

export const staticQuizLvl2: QuizQuestion[] = [];
export const staticQuizLvl3: QuizQuestion[] = [];
