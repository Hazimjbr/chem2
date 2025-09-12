
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
    },
    {
        question: "لا تنفجر أواني الضغط بسبب:",
        options: [
            "الماء في أواني الضغط لا يغلي",
            <>تصبح درجة غليان الماء <span dir="ltr">95°C</span></>,
            "وجود صمام يعمل على خروج بعض البخار",
            "سرعة التكاثف أسرع من التبخر"
        ],
        correctAnswerIndex: 2,
        explanation: "يحتوي وعاء الضغط على صمام أمان يسمح للبخار الزائد بالخروج عندما يصل الضغط الداخلي إلى حد معين مما يحافظ على ضغط ثابت وآمن ويمنع الإناء من الانفجار"
    },
    {
        question: "العبارة الخاطئة المتعلقة بالدعامات القلبية الحديثة هي:",
        options: [
            "تستخدم في فتح الشرايين",
            "تُصنع بإضافة التنتاليوم والنيوبيوم إلى التيتانيوم",
            "تمتاز بالقوة والمرونة",
            "نسبة التنتاليوم في السبيكة 77%"
        ],
        correctAnswerIndex: 3,
        explanation: "العبارة الخاطئة هي أن نسبة التنتاليوم 77% وفقًا للنص نسبة التيتانيوم (Ti) هي 77% بينما نسبة التنتاليوم (Ta) هي 6% والنيوبيوم (Nb) هي 17%"
    },
    {
        question: <><span>غاز ضغطه </span><span dir="ltr"><InlineMath math="100kPa" /></span><span> عند </span><span dir="ltr"><InlineMath math="27^\circ\text{C}" /></span><span> ما هو ضغطه إذا تم تسخينه إلى </span><span dir="ltr"><InlineMath math="127^\circ\text{C}" /></span><span> مع ثبات الحجم</span></>,
        options: [
            "133.3kPa",
            "75kPa",
            "470kPa",
            "100kPa"
        ],
        correctAnswerIndex: 0,
        explanation: "أولاً نحول الحرارة إلى كلفن T₁=27+273=300K و T₂=127+273=400K ثم نستخدم P₂ = P₁T₂/T₁ = (100 * 400) / 300 ≈ 133.3kPa"
    },
    {
        question: <><span>يحتوي وعاء على خليط من غاز النيتروجين والأكسجين والهيدروجين إذا كان الضغط الجزئي لغاز النيتروجين يساوي </span><span dir="ltr"><InlineMath math="0.2atm" /></span><span> والضغط الكلي للخليط يساوي </span><span dir="ltr"><InlineMath math="0.9atm" /></span><span> والكسر المولي لغاز الأكسجين يساوي </span><span dir="ltr"><InlineMath math="0.4" /></span><span> فإن الكسر المولي لغاز الهيدروجين يساوي:</span></>,
        options: [
            "0.38",
            "0.22",
            "0.4",
            "0.6"
        ],
        correctAnswerIndex: 0,
        explanation: <><span>أولاً، نجد الكسر المولي للنيتروجين: X_N₂ = P_N₂ / P_Total = 0.2atm / 0.9atm ≈ 0.22. بما أن مجموع الكسور المولية يساوي 1، فإن X_H₂ = 1 - X_N₂ - X_O₂ = 1 - 0.22 - 0.4 = 0.38.</span></>
    }
];

export const staticQuizLvl2: QuizQuestion[] = [];
export const staticQuizLvl3: QuizQuestion[] = [];
