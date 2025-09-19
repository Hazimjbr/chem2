
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
            <span dir="ltr"><InlineMath math="Na_2S" /></span>,
            <span dir="ltr"><InlineMath math="Ca(NO_3)_2" /></span>,
            <span dir="ltr"><InlineMath math="MgBr_2" /></span>,
            <span dir="ltr"><InlineMath math="CaCO_3" /></span>
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
            'PbS',
            'Sr(OH)₂',
            'AgBr',
            'CaCO₃'
        ],
        correctAnswerIndex: 1,
        explanation: (
            <>
                وفقًا لقواعد الذائبية، معظم أملاح الكبريتيد (<span dir="ltr" className="inline-block"><InlineMath math="S^{2-}" /></span>) والكربونات (<span dir="ltr" className="inline-block"><InlineMath math="CO_3^{2-}" /></span>) غير ذائبة. هاليدات الفضة (AgBr) هي أيضًا من الرواسب الشائعة. هيدروكسيد السترونشيوم Sr(OH)₂ يعتبر من القواعد القوية وهو قابل للذوبان في الماء.
            </>
        ),
    },
    {
            question: "المادة الأكثر ذائبية في البنزين C₆H₆:",
        options: [
        'CH₃OH',
        'HCOOH',
        'C₆H₁₄',
        'CH₂OHCH₂OH'
    ],
    correctAnswerIndex: 2,
    explanation: ("البنزين (C₆H₆) مذيب غير قطبي. ومبدأ الذائبية هو 'الشبيه يذيب شبيهه'. الهكسان (C₆H₁₄) هو المركب الوحيد غير القطبي بين الخيارات، حيث أن باقي المركبات قطبية وقادرة على تكوين روابط هيدروجينية، لذا فإن الهكسان هو الأكثر ذائبية في البنزين."
),
},
{
    question: "أحد المخاليط الآتية متساوية التركيز يعتبر الأكثر توصيلا للتيار الكهربائي:",
    options: [
        <InlineMath key="1" math="Al(NO_3)_3" />,
        <InlineMath key="2" math="CH_3COONa" />,
        <InlineMath key="3" math="AgCl" />,
        <InlineMath key="4" math="CH_3CH_2OH" />
    ],
    correctAnswerIndex: 0,
    explanation: ("تعتمد قدرة المحلول على توصيل الكهرباء على تركيز الأيونات الحرة فيه. محلول Al(NO₃)₃ يتفكك ليعطي 4 أيونات (Al³⁺ وثلاثة أيونات NO₃⁻)، وهو العدد الأكبر من الأيونات مقارنة بالخيارات الأخرى، لذا فهو الأكثر توصيلًا للكهرباء."
),
},
];
export const staticQuizLvl3: QuizQuestion[] = [];
