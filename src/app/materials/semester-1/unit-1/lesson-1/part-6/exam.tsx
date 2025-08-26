
import { InlineMath } from 'react-katex';
import React from 'react';

export interface QuizQuestion {
    question: React.ReactNode;
    options: string[] | React.ReactNode[];
    correctAnswerIndex: number;
    explanation: string;
}

export const staticQuizLvl1: QuizQuestion[] = [
    {
        "question": "ما هي العلاقة التي يصفها القانون الجامع للغازات",
        "options": [
            "العلاقة بين الضغط والحجم فقط",
            "العلاقة بين الحجم ودرجة الحرارة فقط",
            "العلاقة بين الضغط والحجم ودرجة الحرارة",
            "العلاقة بين الضغط وعدد المولات"
        ],
        "correctAnswerIndex": 2,
        "explanation": "القانون الجامع للغازات يدمج قوانين بويل وشارل وجاي-لوساك لوصف العلاقة بين الضغط والحجم ودرجة الحرارة لكمية ثابتة من الغاز"
    },
    {
        "question": "أي من الصيغ التالية تمثل القانون الجامع للغازات بشكل صحيح",
        "options": [
            "P₁V₁T₁ = P₂V₂T₂",
            "(P₁V₁)/T₁ = (P₂V₂)/T₂",
            "P₁T₁/V₁ = P₂T₂/V₂",
            "T₁V₁/P₁ = T₂V₂/P₂"
        ],
        "correctAnswerIndex": 1,
        "explanation": "الصيغة الصحيحة هي (P₁V₁)/T₁ = (P₂V₂)/T₂ وتعني أن حاصل ضرب الضغط في الحجم مقسوما على درجة الحرارة المطلقة يساوي قيمة ثابتة"
    },
    {
        "question": "عينة من غاز النيون حجمها 1L عند الظروف المعيارية (STP) ما هو حجمها عند ضغط 2atm ودرجة حرارة 273 كلفن",
        "options": [
            "0.5L",
            "1L",
            "2L",
            "4L"
        ],
        "correctAnswerIndex": 0,
        "explanation": "الظروف المعيارية هي T₁=273K و P₁=1atm و V₁=1L والظروف الجديدة T₂=273K و P₂=2atm و V₂ = (P₁V₁T₂)/(P₂T₁) = (1*1*273)/(2*273) = 0.5L وهذا تطبيق لقانون بويل حيث الحرارة ثابتة"
    },
    {
        "question": "غاز حجمه 2L عند ضغط 1atm ودرجة حرارة 300K إذا أصبح حجمه 1L وضغطه 4atm فما هي درجة حرارته الجديدة بالكلفن",
        "options": [
            "150K",
            "300K",
            "600K",
            "1200K"
        ],
        "correctAnswerIndex": 2,
        "explanation": "باستخدام T₂ = (P₂V₂T₁)/(P₁V₁) فإن T₂ = (4*1*300)/(1*2) = 600K"
    },
    {
        "question": "متى يمكن تبسيط القانون الجامع للغازات إلى قانون بويل?",
        "options": [
            "عندما يكون الضغط ثابتًا",
            "عندما يكون الحجم ثابتًا",
            "عندما تكون درجة الحرارة ثابتة",
            "لا يمكن تبسيطه أبدًا"
        ],
        "correctAnswerIndex": 2,
        "explanation": "إذا كانت درجة الحرارة ثابتة (T₁=T₂) يمكن حذفها من طرفي المعادلة (P₁V₁)/T₁ = (P₂V₂)/T₂ لتصبح P₁V₁ = P₂V₂ وهو قانون بويل"
    }
];

export const staticQuizLvl2: QuizQuestion[] = [
     {
        "question": "عينة من غاز محصور تضاعفت درجة حرارتها 3 أضعاف الحرارة الأصلية وزاد حجمها إلى الضعف فإن ضغطها يصبح مقارنة بالضغط الأصلي",
        "options": [
            <span><InlineMath math="1.5P_1"/></span>,
            <span><InlineMath math="0.67P_1"/></span>,
            <span><InlineMath math="6P_1"/></span>,
            <span><InlineMath math="0.17P_1"/></span>
        ],
        "correctAnswerIndex": 0,
        "explanation": "لنفرض أن T₂ = 3T₁ و V₂ = 2V₁ باستخدام القانون الجامع P₂ = (P₁V₁T₂)/(T₁V₂) = (P₁ * V₁ * 3T₁) / (T₁ * 2V₁) = P₁ * (3/2) = 1.5P₁"
    },
    {
        "question": "عينة من غاز محصور ضغطها 1.5atm إذا تضاعفت درجة حرارتها وحجمها إلى الضعف فإن ضغطها يساوي",
        "options": [
            "3atm",
            "6atm",
            "2atm",
            "1.5atm"
        ],
        "correctAnswerIndex": 3,
        "explanation": "لنفترض أن T₂ = 2T₁ و V₂ = 2V₁ باستخدام القانون الجامع P₂ = (P₁V₁T₂)/(T₁V₂) = (1.5 * V₁ * 2T₁) / (T₁ * 2V₁) = 1.5atm زيادة الحجم والحرارة بنفس النسبة تلغي تأثير بعضها البعض على الضغط"
    },
     {
        question: <>عينة من الهواء حجمها 4L وضغطها 202.6kPa عند درجة حرارة <span dir="ltr" style={{'display': 'inline-block'}}><InlineMath math="20^\circ\text{C}" /></span> فإذا أصبحت حرارتها 278K وحجمها 2500ml فإن ضغطها بوحدة atm يساوي</>,
        "options": [
            "200",
            "1",
            "3",
            "4"
        ],
        "correctAnswerIndex": 2,
        "explanation": "نوحد الوحدات V₁=4L و P₁=202.6/101.3=2atm و T₁=20+273=293K و V₂=2.5L و T₂=278K نطبق القانون الجامع P₂=(P₁V₁T₂)/(T₁V₂) = (2*4*278)/(293*2.5) ≈ 3.03atm أقرب إجابة هي 3atm"
    },
    {
        question: <>عينة من غاز حجمها 5L وضغطها 1.8atm عند درجة حرارة <span dir="ltr" style={{'display': 'inline-block'}}><InlineMath math="25^\circ\text{C}" /></span> فإذا انخفضت درجة حرارتها بمقدار 10 درجات وأصبح ضغطها 0.8atm فإن حجمها بوحدة L يساوي</>,
        "options": [
            "10.9",
            "10.7",
            "6.8",
            "4.5"
        ],
        "correctAnswerIndex": 0,
        "explanation": "T₁=25+273=298K و T₂=(25-10)+273=288K و P₁=1.8atm و V₁=5L و P₂=0.8atm نطبق القانون الجامع V₂ = (P₁V₁T₂)/(P₂T₁) = (1.8 * 5 * 288) / (0.8 * 298) ≈ 10.9L"
    },
    {
        question: <>إذا كان ضغط عينة من الغاز يساوي <InlineMath math="0.3\text{atm}" /> عند درجة حرارة <span dir="ltr" style={{"display": "inline-block"}}><InlineMath math="0^\circ\text{C}" /></span> وأردنا رفع الضغط إلى <InlineMath math="0.6\text{atm}" /> فيجب أن نغير درجة حرارتها بمقدار يساوي</>,
        "options": [
             <><span dir="ltr" style={{'display': 'inline-block'}}><InlineMath math="+273^\circ\text{C}" /></span></>,
             <><span dir="ltr" style={{'display': 'inline-block'}}><InlineMath math="+546^\circ\text{C}" /></span></>,
             <><span dir="ltr" style={{'display': 'inline-block'}}><InlineMath math="-273^\circ\text{C}" /></span></>,
             <><span dir="ltr" style={{'display': 'inline-block'}}><InlineMath math="-546^\circ\text{C}" /></span></>
        ],
        "correctAnswerIndex": 0,
        "explanation": "بما أن الحجم ثابت يمكن استخدام قانون جاي-لوساك T₁ = 0+273=273K و P₁=0.3atm و P₂=0.6atm و T₂ = T₁P₂/P₁ = 273 * (0.6/0.3) = 546K مقدار التغير = T₂ - T₁ = 546K - 273K = 273K التغير بالكلفن يساوي التغير بالسيليزيوس لذا الجواب +273°C"
    }
];

export const staticQuizLvl3: QuizQuestion[] = [
    {
        "question": <>منطاد طقس حجمه 300L عند سطح الأرض (1atm, <span dir="ltr" style={{'display': 'inline-block'}}><InlineMath math="27^\circ\text{C}" /></span>) ما هو حجمه على ارتفاع حيث الضغط 0.5atm ودرجة الحرارة <span dir="ltr" style={{'display': 'inline-block'}}><InlineMath math="-23^\circ\text{C}" /></span></>,
        "options": [
            "500L",
            "600L",
            "300L",
            "450L"
        ],
        "correctAnswerIndex": 0,
        "explanation": "T₁=27+273=300K و T₂=-23+273=250K و P₁=1atm و V₁=300L و P₂=0.5atm و V₂ = (P₁V₁T₂)/(P₂T₁) = (1 * 300 * 250) / (0.5 * 300) = 500L"
    },
    {
        question: <>عند أي درجة حرارة بالسيليزيوس سيشغل 1.0mol من غاز حجم 22.4L عند ضغط 2.0atm (علما بأنه عند STP يشغل 1mol 22.4L عند 1atm و <span dir="ltr" style={{'display': 'inline-block'}}><InlineMath math="0^\circ\text{C}" /></span>)</>,
        "options": [
            <><span dir="ltr" style={{'display': 'inline-block'}}><InlineMath math="0^\circ\text{C}" /></span></>,
            <><span dir="ltr" style={{'display': 'inline-block'}}><InlineMath math="273^\circ\text{C}" /></span></>,
            <><span dir="ltr" style={{'display': 'inline-block'}}><InlineMath math="546^\circ\text{C}" /></span></>,
            <><span dir="ltr" style={{'display': 'inline-block'}}><InlineMath math="100^\circ\text{C}" /></span></>
        ],
        "correctAnswerIndex": 1,
        "explanation": "الحالة 1 (STP): P₁=1atm, V₁=22.4L, T₁=273K الحالة 2: P₂=2atm, V₂=22.4L نجد T₂ و T₂ = (P₂V₂T₁)/(P₁V₁) = (2 * 22.4 * 273) / (1 * 22.4) = 546K بالسيليزيوس 546 - 273 = 273°C"
    },
    {
        "question": "عينة غاز نسبة حجمها إلى درجة حرارتها المطلقة تساوي 0.01 فإن درجة الحرارة °C لهذه العينة عندما يكون حجمها 5L وضغطها 1atm تساوي",
        "options": [
            "500",
            "773",
            "227",
            "لا يمكن تحديده"
        ],
        "correctAnswerIndex": 2,
        "explanation": "نسبة الحجم إلى الحرارة المطلقة (V/T) هي ثابت شارل T = V/k = 5L / 0.01 = 500K بالسيليزيوس T(°C) = 500 - 273 = 227°C الضغط المعطى لا يؤثر على الحل لأنه جزء من ظروف تعريف النسبة"
    },
    {
        "question": "ماذا يحدث لكثافة غاز مثالي إذا انخفض ضغطه إلى النصف وزادت درجة حرارته المطلقة إلى الضعف",
        "options": [
            "تقل إلى الربع",
            "تزداد 4 مرات",
            "تبقى ثابتة",
            "تقل إلى النصف"
        ],
        "correctAnswerIndex": 0,
        "explanation": "الكثافة (d) تتناسب طرديًا مع الضغط وعكسيًا مع الحرارة (d ∝ P/T) إذا أصبح الضغط P/2 والحرارة 2T فإن الكثافة الجديدة ستتناسب مع (P/2)/(2T) = P/(4T) أي أنها ستقل إلى الربع"
    },
    {
        "question": "غاز محصور في مكبس متحرك إذا تم تقليل حجمه إلى الثلث وزيادة ضغطه ست مرات فماذا يجب أن يحدث لدرجة حرارته المطلقة",
        "options": [
            "تتضاعف",
            "تقل إلى النصف",
            "تبقى ثابتة",
            "تزداد 3 مرات"
        ],
        "correctAnswerIndex": 0,
        "explanation": "P₁V₁/T₁ = P₂V₂/T₂ لنفرض P₂=6P₁ و V₂=V₁/3 نعوض في المعادلة T₂/T₁ = (P₂V₂)/(P₁V₁) = (6P₁ * V₁/3) / (P₁V₁) = 2 إذن T₂=2T₁ يجب أن تتضاعف درجة الحرارة المطلقة"
    }
];
