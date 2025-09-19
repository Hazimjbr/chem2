
'use client';

import { InlineMath } from 'react-katex';
import React from 'react';

export interface QuizQuestion {
    question: React.ReactNode;
    options: string[] | React.ReactNode[];
    correctAnswerIndex: number;
    explanation: string | React.ReactNode;
}

export const staticQuizLvl1: QuizQuestion[] = [
    {
        question: "أي من المحاليل التالية يعتبر محلولاً سائلاً يتكون من غاز مذاب في سائل؟",
        options: [
            "ماء البحر (ملح في ماء)",
            "المشروبات الغازية (CO₂ في ماء)",
            "الخل (حمض الأسيتيك في ماء)",
            "سبيكة النحاس الأصفر (زنك في نحاس)"
        ],
        correctAnswerIndex: 1,
        explanation: "المشروبات الغازية هي مثال شهير على محلول يتكون من إذابة غاز (ثاني أكسيد الكربون) في سائل (الماء)."
    },
    {
        question: "في محلول مائي من الكحول، يعتبر الماء هو:",
        options: [
            "المذاب",
            "المذيب",
            "المحلول",
            "الراسب"
        ],
        correctAnswerIndex: 1,
        explanation: "في المحاليل السائلة، المكون الذي يوجد بكمية أكبر هو المذيب. في معظم محاليل الكحول المائية، يكون الماء هو المكون الأكبر وبالتالي هو المذيب."
    },
    {
        question: "أي من أزواج السوائل التالية من المتوقع أن يكون تام الامتزاج؟",
        options: [
            "الماء والزيت",
            "الماء والبنزين",
            "الإيثانول والماء",
            "الزيت والخل"
        ],
        correctAnswerIndex: 2,
        explanation: "الإيثانول والماء كلاهما مركبات قطبية وقادرة على تكوين روابط هيدروجينية، لذا يمتزجان تمامًا مع بعضهما البعض وفقًا لمبدأ 'الشبيه يذيب شبيهه'."
    },
    {
        question: "ماذا تسمى المحاليل التي يكون فيها الماء هو المذيب؟",
        options: [
            "محاليل غير قطبية",
            "محاليل عضوية",
            "محاليل مائية",
            "محاليل غازية"
        ],
        correctAnswerIndex: 2,
        explanation: "يطلق مصطلح 'المحاليل المائية' على أي محلول يكون فيه الماء هو المذيب."
    },
    {
        question: "عند خلط كميات متساوية من الهكسان (غير قطبي) والماء (قطبي)، ماذا تتوقع أن يحدث؟",
        options: [
            "يمتزجان تمامًا",
            "يتفاعلان كيميائيًا",
            "يتكون محلول غروي",
            "تتكون طبقتان منفصلتان"
        ],
        correctAnswerIndex: 3,
        explanation: "بسبب الاختلاف الكبير في القطبية، لا يذوب الهكسان في الماء. وبما أنهما سائلان، فإنهما سيشكلان طبقتين منفصلتين، ويكون الأقل كثافة (الهكسان) في الأعلى."
    }
];

export const staticQuizLvl2: QuizQuestion[] = [
    {
        question: "تسمى المحاليل التي يكون فيها الماء هو المذيب بالمحاليل:",
        options: [
            "القطبية",
            "المائية",
            "الهيدروجينية",
            "غير القطبية"
        ],
        correctAnswerIndex: 1,
        explanation: "يطلق مصطلح 'المحاليل المائية' على أي محلول يكون فيه الماء هو المذيب.",
    },
    {
        question: "المادة التي لا تذوب في الماء من المواد الآتية:",
        options: [
            <span dir="ltr" key="1"><InlineMath math="Na_2S" /></span>,
            <span dir="ltr" key="2"><InlineMath math="Ca(NO_3)_2" /></span>,
            <span dir="ltr" key="3"><InlineMath math="MgBr_2" /></span>,
            <span dir="ltr" key="4"><InlineMath math="CaCO_3" /></span>
        ],
        correctAnswerIndex: 3,
        explanation: (
            <>
                <span>وفقًا لقواعد الذائبية، معظم الكربونات (</span>
                <span dir="ltr" className="inline-block"><InlineMath math="CO_3^{2-}" /></span>
                <span>) غير ذائبة في الماء باستثناء كربونات الفلزات القلوية والأمونيوم، بينما أملاح النترات (</span>
                <span dir="ltr" className="inline-block"><InlineMath math="NO_3^{-}" /></span>
                <span>)، والفلزات القلوية (</span>
                <span dir="ltr" className="inline-block"><InlineMath math="Na^{+}" /></span>
                <span>)، والهاليدات (</span>
                <span dir="ltr" className="inline-block"><InlineMath math="Br^{-}" /></span>
                <span>) تكون ذائبة بشكل عام.</span>
            </>
        ),
    },
    {
        question: "المادة التي تذوب في الماء من المواد الآتية:",
        options: [
            <span dir="ltr" key="1"><InlineMath math="PbS"/></span>,
            <span dir="ltr" key="2"><InlineMath math="Sr(OH)_2"/></span>,
            <span dir="ltr" key="3"><InlineMath math="AgBr"/></span>,
            <span dir="ltr" key="4"><InlineMath math="CaCO_3"/></span>
        ],
        correctAnswerIndex: 1,
        explanation: (
            <>
                <span>وفقًا لقواعد الذائبية، معظم أملاح الكبريتيد (</span>
                <span dir="ltr" className="inline-block"><InlineMath math="S^{2-}"/></span>
                <span>) والكربونات (</span>
                <span dir="ltr" className="inline-block"><InlineMath math="CO_3^{2-}" /></span>
                <span>) غير ذائبة. هاليدات الفضة (AgBr) هي أيضًا من الرواسب الشائعة. هيدروكسيد السترونشيوم Sr(OH)₂ يعتبر من القواعد القوية وهو قابل للذوبان في الماء.</span>
            </>
        )
    },
    {
        question: "أحد المخاليط الآتية متساوية التركيز يعتبر الأكثر توصيلا للتيار الكهربائي:",
        options: [
            <span dir="ltr" key="1"><InlineMath math="Al(NO_3)_3"/></span>,
            <span dir="ltr" key="2"><InlineMath math="CH_3COONa"/></span>,
            <span dir="ltr" key="3"><InlineMath math="AgCl"/></span>,
            <span dir="ltr" key="4"><InlineMath math="CH_3CH_2OH"/></span>,
        ],
        correctAnswerIndex: 0,
        explanation: (
            <>
                تعتمد قدرة المحلول على توصيل الكهرباء على تركيز الأيونات الحرة فيه. محلول <span dir="ltr" className="inline-block"><InlineMath math="Al(NO_3)_3"/></span> يتفكك ليعطي 4 أيونات (<span dir="ltr" className="inline-block"><InlineMath math="Al^{3+}"/></span> وثلاثة أيونات <span dir="ltr" className="inline-block"><InlineMath math="NO_3^{-}" /></span>)، وهو العدد الأكبر من الأيونات مقارنة بالخيارات الأخرى، لذا فهو الأكثر توصيلًا للكهرباء.
            </>
        ),
    },
    {
    question: "أحد المخاليط الآتية مع الماء يمكن فصلها بالترشيح:",
    options: [
        <span dir="ltr" key="1"><InlineMath math="BaSO_4" /></span>,
        <span dir="ltr" key="2"><InlineMath math="CH_3OH" /></span>,
        <span dir="ltr" key="3"><InlineMath math="O_2" /></span>,
        <span dir="ltr" key="4"><InlineMath math="CH_3COOH" /></span>
    ],
    correctAnswerIndex: 0,
    explanation: "الترشيح هو عملية فصل مادة صلبة غير ذائبة عن سائل. كبريتات الباريوم (BaSO₄) هي ملح شحيح الذوبان في الماء، لذا تكوّن مخلوطًا معلقًا يمكن فصل جسيماته الصلبة بالترشيح. أما باقي المواد (الميثانول، الأكسجين، وحمض الخل) فتذوب في الماء مكونة محاليل متجانسة لا يمكن فصل مكوناتها بالترشيح.",
    }
];
export const staticQuizLvl3: QuizQuestion[] = [
    {
        question: <span>إذا أضيف <span dir="ltr" className="inline-block">30g</span> من ملح كلوريد الصوديوم NaCl إلى <span dir="ltr" className="inline-block">50g</span> ماء عند درجة حرارة <span dir="ltr" className="inline-block"><InlineMath math="50°C" /></span> وبعد تحريك المحلول جيدا ترسبت كمية من الملح في قاع الوعاء تم ترشيح المحلول وتجفيف الملح المترسب فكانت كتلته <span dir="ltr" className="inline-block">10g</span> فإن ذائبية الملح عند هذه الدرجة تساوي:</span>,
        options: [
            "10",
            "20",
            "40",
            "50"
        ],
        correctAnswerIndex: 2,
        explanation: <div className="space-y-2 text-right" dir="rtl"><p>حساب كمية الملح الذائبة الكمية المضافة (<span dir='ltr'>30g</span>) - الكمية المترسبة (<span dir='ltr'>10g</span>) = <span dir='ltr'>20g</span></p><p>فهم الذائبية الذائبية هي الكتلة التي تذوب في <span dir='ltr'>100g</span> من الماء</p><p>حساب النسبة والتناسب إذا كانت <span dir='ltr'>20g</span> تذوب في <span dir='ltr'>50g</span> من الماء فكم يذوب في <span dir='ltr'>100g</span></p><p className="text-center" dir="ltr"><InlineMath math="(20g \ NaCl / 50g \ H₂O) \times 100g \ H₂O = 40g \ NaCl" /></p><p>إذًا الذائبية هي 40</p></div>
    },
    {
        question: <><span>إذا علمت أن ذائبية الغاز A في الماء عند درجة حرارة </span><span dir="ltr" className="inline-block"><InlineMath math="20^\circ C"/></span><span> وضغط </span><span dir="ltr" className="inline-block"><InlineMath math="0.5 \text{ atm}"/></span><span> هي </span><span dir="ltr" className="inline-block"><InlineMath math="0.65 \text{ g/L}"/></span><span> فإن ذائبيته عند ضغط </span><span dir="ltr" className="inline-block"><InlineMath math="1.5 \text{ atm}"/></span><span> ونفس درجة الحرارة تساوي</span></>,
        options: [
            "1.95",
            "0.22",
            "4.33",
            "2.65"
        ],
        correctAnswerIndex: 0,
        explanation: <><span>وفقًا لقانون هنري فإن الذائبية (S) تتناسب طرديًا مع الضغط (P) وباستخدام العلاقة </span><span dir="ltr" className="inline-block"><InlineMath math="S_1/P_1 = S_2/P_2"/></span><span> فإن </span><span dir="ltr" className="inline-block"><InlineMath math="S_2 = (S_1 \times P_2) / P_1 = (0.65 \times 1.5) / 0.5 = 1.95 \text{ g/L}"/></span></>
    }
];


    