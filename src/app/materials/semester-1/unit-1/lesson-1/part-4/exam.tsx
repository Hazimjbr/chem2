import { InlineMath } from 'react-katex';
import { GraphCurveDown, GraphCurveUp, GraphLineDown, GraphLineUp } from '@/components/illustrations/graphs';
import React from 'react';

export interface QuizQuestion {
    question: React.ReactNode;
    options: React.ReactNode[] | string[];
    correctAnswerIndex: number;
    explanation: string;
}

export const staticQuizLvl1: QuizQuestion[] = [
    {
        "question": "ما هي العلاقة التي يصفها قانون شارل؟",
        "options": [
            "العلاقة بين الضغط والحجم",
            "العلاقة بين الحجم ودرجة الحرارة",
            "العلاقة بين الضغط ودرجة الحرارة",
            "العلاقة بين الحجم وعدد المولات"
        ],
        "correctAnswerIndex": 1,
        "explanation": "قانون شارل يصف العلاقة الطردية بين حجم الغاز ودرجة حرارته المطلقة عند ثبات الضغط وكمية الغاز"
    },
    {
        "question": "وفقًا لقانون شارل، إذا زادت درجة حرارة غاز محصور مع ثبات ضغطه، فماذا يحدث لحجمه؟",
        "options": [
            "يقل",
            "يبقى ثابتًا",
            "يزداد",
            "لا يمكن التنبؤ"
        ],
        "correctAnswerIndex": 2,
        "explanation": "العلاقة بين الحجم ودرجة الحرارة المطلقة هي علاقة طردية. عندما تزداد درجة الحرارة، تزداد الطاقة الحركية للجسيمات مما يؤدي إلى زيادة الحجم"
    },
    {
        "question": "أي من الصيغ الرياضية التالية تمثل قانون شارل؟",
        "options": [
            "P₁V₁ = P₂V₂",
            "V₁T₁ = V₂T₂",
            "V₁/T₁ = V₂/T₂",
            "P₁/T₁ = P₂/T₂"
        ],
        "correctAnswerIndex": 2,
        "explanation": "الصيغة الصحيحة لقانون شارل هي V₁/T₁ = V₂/T₂، حيث يجب أن تكون درجة الحرارة بوحدة الكلفن"
    },
    {
        "question": <>بالون حجمه <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="1L" /></span> عند <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="27^\circ\text{C}" /></span>، ما هو حجمه إذا تم تبريده إلى <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="0^\circ\text{C}" /></span> مع ثبات الضغط؟</>,
        "options": [
            "0.91L",
            "1.09L",
            "0L",
            "يبقى 1L"
        ],
        "correctAnswerIndex": 0,
        "explanation": "أولاً، نحول الحرارة إلى كلفن: T₁=27+273=300K, T₂=0+273=273K. ثم نستخدم V₂ = V₁T₂/T₁ = (1L * 273K) / 300K = 0.91L"
    },
    {
        "question": "لماذا يجب استخدام مقياس كلفن في حسابات قانون شارل؟",
        "options": [
            "لأنه المقياس الدولي",
            "لأنه لا يحتوي على قيم سالبة",
            "لأن العلاقة الطردية تصبح غير صحيحة مع الصفر والقيم السالبة في مقياس سيليزيوس",
            "كل ما سبق"
        ],
        "correctAnswerIndex": 3,
        "explanation": "مقياس كلفن هو مقياس مطلق يبدأ من الصفر المطلق ولا يحتوي على قيم سالبة، مما يجعل علاقة التناسب الطردي في قانون شارل صحيحة رياضيًا وفيزيائيًا. الخيارات الأخرى صحيحة أيضًا وتدعم هذا السبب الرئيسي"
    }
];

export const staticQuizLvl2: QuizQuestion[] = [
    {
        "question": <>عينة من غاز النيون تشغل حجمًا قدره <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="752mL" /></span> عند <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="25^\circ\text{C}" /></span>، ما درجة الحرارة بالسيليزيوس التي يجب أن تصل إليها العينة لتشغل حجم <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="940mL" /></span>؟</>,
        "options": [
            "31.25°C",
            "99.3°C",
            "372.3°C",
            "54.7°C"
        ],
        "correctAnswerIndex": 1,
        "explanation": "T₁=25+273=298K. V₁=752mL. V₂=940mL. نجد T₂ بالكلفن أولاً: T₂ = V₂T₁/V₁ = (940mL * 298K)/752mL ≈ 372.3K. ثم نحول إلى سيليزيوس: 372.3K - 273 = 99.3°C"
    },
    {
        "question": "أي من الرسوم البيانية التالية يمثل العلاقة بين حجم الغاز (V) ودرجة حرارته المطلقة (T)؟",
        "options": [
            <GraphCurveDown />,
            <GraphLineUp />,
            <GraphLineDown />,
            <GraphCurveUp />
        ],
        "correctAnswerIndex": 1,
        "explanation": "وفقًا لقانون شارل، العلاقة بين حجم الغاز ودرجة حرارته المطلقة هي علاقة طردية خطية (V ∝ T)، والتي تُمثل بيانيًا على شكل خط مستقيم متزايد يمر بنقطة الأصل"
    },
    {
        "question": <>إذا تم تسخين غاز في وعاء مرن (مثل بالون) من <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="100K" /></span> إلى <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="200K" /></span>، ماذا يحدث لحجمه؟</>,
        "options": [
            "يقل إلى النصف",
            "يزداد بمقدار 100L",
            "يتضاعف",
            "لا يتغير"
        ],
        "correctAnswerIndex": 2,
        "explanation": "بما أن درجة الحرارة المطلقة تضاعفت (من 100K إلى 200K)، فإن الحجم سيتضاعف أيضًا للحفاظ على النسبة V/T ثابتة"
    },
    {
        "question": <>ماذا يمثل الصفر المطلق (<span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="-273.15^\circ\text{C}" /></span>) نظريًا بالنسبة للغاز المثالي؟</>,
        "options": [
            "درجة حرارة تجمد الغاز",
            "درجة الحرارة التي يتوقف عندها الغاز عن الحركة",
            "درجة الحرارة التي يصبح عندها حجم الغاز صفرًا",
            "جميع ما سبق"
        ],
        "correctAnswerIndex": 2,
        "explanation": "نظريًا، إذا قمنا بتمديد الخط البياني لقانون شارل إلى درجة حرارة منخفضة جدًا، فإنه سيصل إلى حجم صفر عند -273.15°C (0K). في الواقع، تتكاثف الغازات إلى سوائل قبل الوصول لهذه النقطة"
    },
    {
        "question": <>غاز حجمه <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="5.0L" /></span> عند ضغط ودرجة حرارة معينين. إذا تم الحفاظ على الضغط ثابتًا وتم خفض درجة الحرارة المطلقة إلى النصف، فما هو الحجم الجديد؟</>,
        "options": [
            "2.5L",
            "5.0L",
            "10.0L",
            "لا يمكن تحديده"
        ],
        "correctAnswerIndex": 0,
        "explanation": "العلاقة طردية. إذا انخفضت درجة الحرارة المطلقة إلى النصف، فإن الحجم يجب أن ينخفض أيضًا إلى النصف للحفاظ على النسبة V/T ثابتة. الحجم الجديد هو 5.0L / 2 = 2.5L"
    },
    {
        "question": "عينة من غاز محصور في وعاء حرارته 25°C وحجمه 1500ml، إذا تقلص حجم الوعاء إلى 1L فإن درجة حرارة الغاز بفرض ثبات الضغط تساوي:",
        "options": [
            "-74°C",
            "0.2K",
            "198K",
            "16.6°C"
        ],
        "correctAnswerIndex": 2,
        "explanation": "أولاً نوحد الوحدات ونحول الحرارة لكلفن: V₁=1.5L, T₁=25+273=298K, V₂=1L. نطبق قانون شارل: T₂ = (V₂ * T₁) / V₁ = (1L * 298K) / 1.5L ≈ 198.7K. وهو المطلوب"
    }
];

export const staticQuizLvl3: QuizQuestion[] = [
    {
        "question": <>وعاء مرن يحتوي على غاز حجمه <InlineMath math="V" />. إذا زادت درجة الحرارة من <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="27^\circ\text{C}" /></span> إلى <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="127^\circ\text{C}" /></span>، فما هو معامل الزيادة في الحجم؟</>,
        "options": [
            "يزداد الحجم بمقدار 4/3 (حوالي 1.33 مرة)",
            "يزداد الحجم بمقدار 127/27 (حوالي 4.7 مرات)",
            "يتضاعف الحجم",
            "يبقى الحجم كما هو"
        ],
        "correctAnswerIndex": 0,
        "explanation": "يجب التحويل إلى كلفن أولاً. T₁=27+273=300K, T₂=127+273=400K. نسبة الحجم الجديد إلى القديم هي V₂/V₁ = T₂/T₁ = 400K/300K = 4/3. إذن، يزداد الحجم بمعامل 4/3"
    },
    {
        "question": "ماذا يحدث لكثافة غاز محصور عند تسخينه مع ثبات الضغط؟ (الكثافة = الكتلة / الحجم)",
        "options": [
            "تزداد",
            "تقل",
            "تبقى ثابتة",
            "تعتمد على نوع الغاز"
        ],
        "correctAnswerIndex": 1,
        "explanation": "عند تسخين الغاز، يزداد حجمه (قانون شارل). بما أن كتلة الغاز ثابتة، وزاد الحجم، فإن الكثافة (الكتلة/الحجم) ستقل"
    },
    {
        "question": "لماذا لا يصل حجم الغاز الحقيقي أبدًا إلى الصفر عند الصفر المطلق؟",
        "options": [
            "لأن الصفر المطلق لا يمكن الوصول إليه عمليًا",
            "لأن الغازات تتحول إلى سوائل ثم مواد صلبة قبل الوصول إلى الصفر المطلق",
            "لأن جسيمات الغاز نفسها لها حجم لا يمكن إهماله",
            "كل ما سبق"
        ],
        "correctAnswerIndex": 3,
        "explanation": "قانون شارل هو نموذج مثالي. في الواقع، كل الخيارات صحيحة. قبل الوصول إلى 0K، ستكون قوى التجاذب بين الجسيمات قوية بما يكفي لتحويل الغاز إلى سائل ثم صلب. بالإضافة إلى ذلك، فإن الجسيمات نفسها لها حجم مادي، لذلك لا يمكن أن يكون الحجم الكلي صفرًا"
    },
    {
        "question": <>تم قياس حجم عينة من الهواء فكان <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="280mL" /></span> عند <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="30^\circ\text{C}" /></span>. ثم تم تبريد العينة عند ضغط ثابت حتى أصبح حجمها <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="250mL" /></span>. ما هي درجة الحرارة النهائية بالسيليزيوس؟</>,
        "options": [
            "-2.5°C",
            "26.7°C",
            "270.6°C",
            "2.3°C"
        ],
        "correctAnswerIndex": 0,
        "explanation": "T₁=30+273=303K. V₁=280mL. V₂=250mL. نجد T₂ بالكلفن: T₂ = V₂T₁/V₁ = (250mL * 303K)/280mL ≈ 270.5K. ثم نحول إلى سيليزيوس: 270.5K - 273 ≈ -2.5°C"
    },
    {
        "question": <>إذا كان الرسم البياني للحجم (<InlineMath math="V" />) مقابل درجة الحرارة بالسيليزيوس (<InlineMath math="T^\circ C" />) لغاز مثالي هو خط مستقيم، فأين يتقاطع امتداد هذا الخط مع محور درجة الحرارة؟</>,
        "options": [
            "0°C",
            "100°C",
            "-273.15°C",
            "لا يتقاطع معه"
        ],
        "correctAnswerIndex": 2,
        "explanation": "إذا تم رسم الحجم مقابل درجة الحرارة بالسيليزيوس، فإن امتداد الخط المستقيم سيصل إلى حجم صفر عند درجة حرارة -273.15°C، وهي قيمة الصفر المطلق على مقياس كلفن"
    },
    {
        "question": <span>عينة غاز نسبة حجمها إلى درجة حرارتها المطلقة تساوي 0.01 فإن درجة الحرارة °C لهذه العينة عندما يكون حجمها <span dir="ltr" className="inline-block">5L</span> يساوي:</span>,
        "options": [
            "500",
            "773",
            "227",
            "273"
        ],
        "correctAnswerIndex": 2,
        "explanation": "نسبة الحجم إلى الحرارة المطلقة (V/T) هي ثابت قانون شارل. T(K) = V / (V/T) = 5L / 0.01 = 500K. بالسيليزيوس: T(°C) = 500 - 273 = 227°C"
    }
];

    
