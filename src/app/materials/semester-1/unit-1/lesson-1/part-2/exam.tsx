
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
        "question": "أي من التالي ليس من المتغيرات الأربعة الأساسية لوصف سلوك الغاز؟",
        "options": [
            "الضغط (P)",
            "الحجم (V)",
            "الكثافة (D)",
            "درجة الحرارة (T)"
        ],
        "correctAnswerIndex": 2,
        "explanation": "المتغيرات الأربعة الأساسية هي الضغط (P) والحجم (V) ودرجة الحرارة (T) وكمية الغاز (n) الكثافة خاصية مشتقة وليست من المتغيرات الأساسية"
    },
    {
        "question": "في قوانين الغازات ما هي وحدة درجة الحرارة المعتمدة التي يجب استخدامها دائمًا؟",
        "options": [
            "سيليزية (°C)",
            "فهرنهايت (°F)",
            "كلفن (K)",
            "جميع ما سبق"
        ],
        "correctAnswerIndex": 2,
        "explanation": "يجب استخدام مقياس درجة الحرارة المطلقة (كلفن) في جميع حسابات قوانين الغازات لأنها تبدأ من الصفر المطلق حيث تتوقف حركة الجزيئات نظريًا"
    },
    {
        "question": "الظروف المعيارية (STP) تشير إلى:",
        "options": [
            <><span dir="ltr">1atm</span> و <span dir="ltr">25°C</span></>,
            <><span dir="ltr">1atm</span> و<span dir="ltr">0K</span></>,
            <><span dir="ltr">760mmHg</span> و <span dir="ltr">273K</span></>,
            <><span dir="ltr">101.3kPa</span> و <span dir="ltr">100°C</span></>
        ],
        "correctAnswerIndex": 2,
        explanation: <><span>الظروف المعيارية (STP) هي ضغط </span><span dir="ltr">1atm</span><span> (والذي يكافئ </span><span dir="ltr">760mmHg</span><span> أو </span><span dir="ltr">101.3kPa</span><span>) ودرجة حرارة </span><span dir="ltr" className="inline-block"><InlineMath math="0^\circ\text{C}"/></span><span> (والتي تكافئ </span><span dir="ltr">273K</span><span>)</span></>
    },
    {
        "question": "خزان سعته 2L فإن حجمه يساوي:",
        "options": [
            "2000mL",
            "0.002mL",
            "200mL",
            "0.2mL"
        ],
        "correctAnswerIndex": 0,
        "explanation": "للتحويل من لتر (L) إلى مليلتر (mL) نستخدم علاقة التحويل 1L = 1000mL لذلك نضرب قيمة الحجم في 1000 إذن 2 * 1000 = 2000mL"
    },
    {
        "question": "أي من الوحدات التالية لا تستخدم لقياس الضغط؟",
        "options": [
            "باسكال (Pa)",
            "ضغط جوي (atm)",
            "مول (mol)",
            "مليمتر زئبق (mmHg)"
        ],
        "correctAnswerIndex": 2,
        "explanation": "المول (mol) هو وحدة قياس كمية المادة (n) بينما باسكال وضغط جوي ومليمتر زئبق هي وحدات لقياس الضغط"
    }
];

export const staticQuizLvl2: QuizQuestion[] = [
    {
        "question": "أسطوانة تحتوي على غاز الهيليوم ضغطه 1.2atm فإن قيمة ضغطه بوحدة mmHg تساوي:",
        "options": [
            "912",
            "633",
            "1.58",
            "0.0015"
        ],
        "correctAnswerIndex": 0,
        "explanation": "للتحويل من atm إلى mmHg نستخدم علاقة التحويل 1atm=760mmHg لذلك نضرب قيمة الضغط في 760 إذن 1.2*760=912mmHg"
    },
    {
        "question": "ضغط غاز يساوي 190kPa ما هي قيمته بوحدة الضغط الجوي (atm)؟ (علماً أن 1atm=101.3kPa)",
        "options": [
            "1.88atm",
            "0.53atm",
            "19257atm",
            "19.2atm"
        ],
        "correctAnswerIndex": 0,
        "explanation": "للتحويل من kPa إلى atm نقسم القيمة على 101.3 إذن 190kPa/101.3kPa/atm≈1.88atm"
    },
    {
        "question": "إذا كانت درجة حرارة غاز هي 300K فما هي درجة حرارته بالسيليزي (°C)؟",
        "options": [
            <span dir="ltr">573°C</span>,
            <span dir="ltr">27°C</span>,
            <span dir="ltr">-27°C</span>,
            <span dir="ltr">300°C</span>
        ],
        "correctAnswerIndex": 1,
        explanation: <><span>للتحويل من كلفن إلى سيليزي نطرح 273 من قيمة الكلفن إذن </span><span dir="ltr" className="inline-block"><InlineMath math="T(^\circ C) = T(K) - 273 = 300 - 273 = 27^\circ C" /></span></>
    },
    {
        question: <span>بالون درجة حرارته المطلقة 526K فإن حرارته بوحدة درجة مئوية تساوي:</span>,
        options: [
            <span dir="ltr">253°C</span>,
            <span dir="ltr">13.75°C</span>,
            <span dir="ltr">293°C</span>,
            <span dir="ltr">0.073°C</span>
        ],
        correctAnswerIndex: 0,
        explanation: <span>للتحويل من كلفن (K) إلى درجة مئوية (°C) نستخدم العلاقة <InlineMath math="T(^\circ C)=T(K)-273" /> بالتطبيق على السؤال <span dir="ltr" className="inline-block"><InlineMath math="526 - 273 = 253^\circ\text{C}" /></span></span>
    },
    {
        "question": "حاوية حجمها 5000cm³ ما هو حجمها بوحدة (L)؟",
        "options": [
            "500L",
            "50L",
            "5L",
            "0.5L"
        ],
        "correctAnswerIndex": 2,
        "explanation": "العلاقة بين الوحدات هي 1L=1000cm³ (لأن 1mL=1cm³) للتحويل من cm³ إلى L نقسم على 1000 إذن 5000/1000=5L"
    },
    {
        "question": "ماذا يحدث لمتوسط الطاقة الحركية لجسيمات الغاز عند خفض درجة حرارته من 400K إلى 200K؟",
        "options": [
            "يتضاعف",
            "يقل إلى النصف",
            "يبقى ثابتًا",
            "يقل إلى الربع"
        ],
        "correctAnswerIndex": 1,
        "explanation": "متوسط الطاقة الحركية لجسيمات الغاز يتناسب طرديًا مع درجة الحرارة المطلقة (بالكلفن) عندما تنخفض درجة الحرارة إلى النصف فإن متوسط الطاقة الحركية يقل أيضًا إلى النصف"
    },
    {
        question: <span>أسطوانة تحتوي على غاز الهيليوم ضغطه <span dir="ltr" className="inline-block"><InlineMath math="1.2 \times 10^5 \text{Pa}"/></span> فإن قيمة ضغطه بوحدة mmHg تساوي:</span>,
        "options": [
            "900",
            "1.18",
            "1660",
            "0.84"
        ],
        "correctAnswerIndex": 0,
        "explanation": "للتحويل من باسكال (Pa) إلى mmHg نحول أولاً إلى atm ثم إلى mmHg العلاقة هي 1atm=101325Pa=760mmHg إذن الضغط بـ atm = (1.2 × 10⁵)/101325≈1.184atm ثم الضغط بـ mmHg = 1.184×760≈900mmHg"
    }
];

export const staticQuizLvl3: QuizQuestion[] = [
    {
        "question": "لماذا يعتبر استخدام مقياس كلفن ضروريًا في قوانين الغازات بدلاً من سيليزيوس؟",
        "options": [
            "لأن كلفن أدق من سيليزيوس",
            "لأنه المقياس الدولي المعتمد فقط",
            "لأن علاقات التناسب في قوانين الغازات (مثل V ∝ T) لا تصح إلا مع مقياس مطلق يبدأ من الصفر",
            "لأنه أسهل في الحسابات"
        ],
        "correctAnswerIndex": 2,
        "explanation": "قوانين مثل قانون شارل (V/T=k) تعتمد على علاقة تناسب طردي مباشر هذه العلاقة لا تعمل إذا كانت درجة الحرارة يمكن أن تكون صفرًا (0°C) أو سالبة مما قد يؤدي إلى حجم صفر أو سالب وهو أمر مستحيل فيزيائيًا مقياس كلفن هو مقياس مطلق يبدأ من الصفر الحقيقي مما يجعل علاقات التناسب صحيحة رياضيًا وفيزيائيًا"
    },
    {
        question: <>الصفر المطلق (<span dir="ltr">0K</span> أو <span dir="ltr">-273.15°C</span>) هو أدنى درجة حرارة ممكنة نظريًا حيث تصل الطاقة الحركية للجسيمات إلى أدنى قيمة لها (تقترب من الصفر)</>,
        "options": [
            "درجة تجمد الماء",
            "أقل درجة حرارة يمكن الوصول إليها نظريًا",
            "درجة غليان النيتروجين السائل",
            "نقطة لا معنى لها فيزيائيًا"
        ],
        "correctAnswerIndex": 1,
        "explanation": <>الصفر المطلق (<span dir="ltr">0K</span> أو <span dir="ltr">-273.15°C</span>) هو أدنى درجة حرارة ممكنة نظريًا حيث تصل الطاقة الحركية للجسيمات إلى أدنى قيمة لها (تقترب من الصفر)</>
    },
    {
        question: <span>بالون درجة حرارته المطلقة 523K إذا تغيرت لتصبح <span dir="ltr">125°C</span> فإن العبارة الصحيحة التي تصف هذا التغير هي:</span>,
        options: ["زادت إلى الضعف", "قلت إلى النصف", "لا شيء مما ذكر", "قلت إلى الخمس"],
        correctAnswerIndex: 2,
        explanation: "يجب توحيد الوحدات أولاً للمقارنة الصحيحة الحرارة النهائية T₂ = 125 + 273 = 398K الحرارة الابتدائية T₁ = 523K عند المقارنة نجد أن 398K ليست نصف 523K (النصف هو 261.5K) وليست خمسها لذلك لا يوجد وصف دقيق من الخيارات المعطاة"
    },
    {
        question: <span>بالون درجة حرارته المطلقة 900K إذا قلت إلى الثلث فإن قيمتها الصحيحة هي:</span>,
        "options": [
            "600K", 
            "27K", 
            "300°C", 
            <span dir="ltr">27°C</span>
        ],
        "correctAnswerIndex": 3,
        explanation: <><span>أولاً نحسب القيمة الجديدة بالكلفن 900K / 3 = 300K بعد ذلك نحول هذه القيمة إلى الدرجة المئوية </span><span dir="ltr" className="inline-block"><InlineMath math="T(^\circ C) = T(K) - 273 = 300 - 273 = 27^\circ C" /></span><span> لذا الخيار الصحيح هو </span><span dir="ltr">27°C</span></>
    },
    {
        question: <span>بالون قراءة ضغطه الأولى كانت 760mmHg وقراءة ضغطه الثانية كانت 760kPa فإن العبارة الصحيحة التي تصف هذا التغير هي:</span>,
        "options": [
            "النسبة بين القراءة الثانية إلى الأولى هي 7.5 : 1 تقريبًا",
            "قراءة الضغط الأولى أكبر",
            "النسبة بين القراءة الأولى إلى الثانية على الترتيب 5 : 1 تقريبًا",
            "لا يوجد تغير بين القراءتين"
        ],
        "correctAnswerIndex": 0,
        "explanation": "للتحويل نستخدم العلاقات 1atm = 760mmHg و 1atm = 101.3kPa القراءة الأولى = 760mmHg = 101.3kPa القراءة الثانية = 760kPa النسبة بين القراءة الثانية والأولى هي 760kPa / 101.3kPa ≈ 7.5 إذن الخيار (أ) هو الصحيح"
    }
];
