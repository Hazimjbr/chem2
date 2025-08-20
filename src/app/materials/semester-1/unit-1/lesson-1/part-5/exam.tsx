
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
        "question": "ما هي العلاقة التي يصفها قانون جاي-لوساك؟",
        "options": [
            "العلاقة بين الضغط والحجم",
            "العلاقة بين الحجم ودرجة الحرارة",
            "العلاقة بين الضغط ودرجة الحرارة",
            "العلاقة بين الحجم وعدد المولات"
        ],
        "correctAnswerIndex": 2,
        "explanation": "قانون جاي-لوساك يصف العلاقة الطردية بين ضغط الغاز ودرجة حرارته المطلقة عند ثبات الحجم وكمية الغاز."
    },
    {
        "question": "وفقًا لقانون جاي-لوساك، عند تسخين غاز في وعاء صلب مغلق، ماذا يحدث لضغطه؟",
        "options": [
            "يقل",
            "يبقى ثابتًا",
            "يزداد",
            "يصبح صفرًا"
        ],
        "correctAnswerIndex": 2,
        "explanation": "العلاقة طردية. زيادة درجة الحرارة تزيد من الطاقة الحركية للجسيمات، مما يزيد من قوة وعدد تصادماتها بجدار الوعاء، وبالتالي يزداد الضغط."
    },
    {
        "question": "أي من الصيغ الرياضية التالية تمثل قانون جاي-لوساك؟",
        "options": [
            "P₁V₁ = P₂V₂",
            "V₁/T₁ = V₂/T₂",
            "P₁T₁ = P₂T₂",
            "P₁/T₁ = P₂/T₂"
        ],
        "correctAnswerIndex": 3,
        "explanation": "الصيغة الصحيحة لقانون جاي-لوساك هي P₁/T₁ = P₂/T₂، حيث يجب أن تكون درجة الحرارة بوحدة الكلفن."
    },
    {
        "question": (
            <>
                غاز ضغطه <span dir="ltr"><InlineMath math="100\text{kPa}" /></span> عند <span dir="ltr"><InlineMath math="27^\circ\text{C}" /></span>. ما هو ضغطه إذا تم تسخينه إلى <span dir="ltr"><InlineMath math="127^\circ\text{C}" /></span> مع ثبات الحجم؟
            </>
        ),
        "options": [
            "133.3kPa",
            "75kPa",
            "470kPa",
            "100kPa"
        ],
        "correctAnswerIndex": 0,
        "explanation": "أولاً، نحول الحرارة إلى كلفن: T₁=27+273=300K, T₂=127+273=400K. ثم نستخدم P₂ = P₁T₂/T₁ = (100 * 400) / 300 ≈ 133.3kPa."
    },
    {
        "question": "في أي من الحالات التالية ينطبق قانون جاي-لوساك؟",
        "options": [
            "نفخ بالون",
            "إطار سيارة يبرد في الشتاء",
            "ضغط الهواء في حقنة",
            "غليان الماء في وعاء مفتوح"
        ],
        "correctAnswerIndex": 1,
        "explanation": "إطار السيارة له حجم ثابت تقريبًا. عندما يبرد في الشتاء (تنخفض درجة الحرارة)، يقل ضغط الهواء بداخله، وهذا تطبيق مباشر لقانون جاي-لوساك."
    }
];

export const staticQuizLvl2: QuizQuestion[] = [
    {
        "question": "أي من الرسوم البيانية التالية يمثل العلاقة بين ضغط الغاز (P) ودرجة حرارته المطلقة (T) عند ثبات الحجم؟",
        "options": [
            <GraphLineUp />,
            <GraphCurveDown />,
            <GraphLineDown />,
            <GraphCurveUp />
        ],
        "correctAnswerIndex": 0,
        "explanation": "وفقًا لقانون جاي-لوساك، العلاقة بين ضغط الغاز ودرجة حرارته المطلقة هي علاقة طردية خطية (P ∝ T)، والتي تُمثل بيانيًا على شكل خط مستقيم متزايد يمر بنقطة الأصل."
    },
    {
        "question": "إذا تضاعفت درجة الحرارة المطلقة لغاز في وعاء ثابت الحجم، فإن ضغطه:",
        "options": [
            "يقل إلى النصف",
            "يبقى ثابتًا",
            "يتضاعف",
            "يزداد أربع مرات"
        ],
        "correctAnswerIndex": 2,
        "explanation": "بما أن العلاقة بين الضغط ودرجة الحرارة المطلقة طردية (P ∝ T)، فإن مضاعفة درجة الحرارة المطلقة تؤدي إلى مضاعفة الضغط."
    },
    {
        "question": (
            <>
                وعاء يحتوي على غاز عند ضغط <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="3\text{atm}" /></span> ودرجة حرارة <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="200\text{K}" /></span>. إذا تم تبريد الوعاء إلى <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="100\text{K}" /></span>، فما هو الضغط الجديد؟
            </>
        ),
        "options": [
            "6atm",
            "1.5atm",
            "3atm",
            "0atm"
        ],
        "correctAnswerIndex": 1,
        "explanation": "باستخدام P₂ = P₁T₂/T₁، فإن P₂ = (3 * 100) / 200 = 1.5atm. انخفضت درجة الحرارة المطلقة إلى النصف، لذا انخفض الضغط إلى النصف."
    },
    {
        "question": "لماذا من الخطر إلقاء علبة رذاذ (سبراي) في النار؟",
        "options": [
            "لأن الحجم يزداد",
            "لأن الضغط يزداد بشكل كبير وقد يؤدي إلى انفجار",
            "لأن درجة الحرارة تقل",
            "لأن الغاز يتسرب"
        ],
        "correctAnswerIndex": 1,
        "explanation": "علبة الرذاذ لها حجم ثابت. تسخينها يزيد درجة حرارة الغاز بداخلها بشكل هائل، مما يؤدي إلى زيادة هائلة في الضغط (وفقًا لقانون جاي-لوساك) قد تتجاوز قدرة تحمل العلبة فتنفجر."
    },
    {
        "question": (
            <>
                عينة من غاز ضغطها <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="W" /></span> عند درجة حرارة <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="35^\circ\text{C}" /></span> فإن درجة حرارتها بوحدة <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="^\circ\text{C}" /></span> عندما يصبح ضغطها مثلي الضغط الأصلي تساوي:
            </>
        ),
        "options": [
            "308",
            "70",
            "616",
            "343"
        ],
        "correctAnswerIndex": 3,
        "explanation": "P₁=W, P₂=2W. T₁=35+273=308K. T₂=T₁P₂/P₁ = (308 * 2W) / W = 616K. نحول إلى سيليزيوس: T₂(°C) = 616 - 273 = 343°C."
    },
    {
        "question": (
            <>
                غاز ضغطه <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="700\text{mmHg}" /></span> عند درجة حرارة غير معروفة. تم تسخينه إلى <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="150^\circ\text{C}" /></span> فأصبح ضغطه <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="900\text{mmHg}" /></span>. ما كانت درجة الحرارة الابتدائية بالسيليزيوس؟
            </>
        ),
        "options": [
            "56.1°C",
            "329.1°C",
            "117°C",
            "423°C"
        ],
        "correctAnswerIndex": 0,
        "explanation": "P₁=700, P₂=900. T₂=150+273=423K. T₁=T₂P₁/P₂ = (423 * 700) / 900 ≈ 329.1K. نحول إلى سيليزيوس: T₁(°C) = 329.1 - 273 ≈ 56.1°C."
    }
];

export const staticQuizLvl3: QuizQuestion[] = [
    {
        "question": (
            <>
                إذا كان الرسم البياني للضغط (<InlineMath math="P" />) مقابل درجة الحرارة بالسيليزيوس (<InlineMath math="T^\circ C" />) لغاز مثالي هو خط مستقيم، فأين يتقاطع امتداد هذا الخط مع محور درجة الحرارة؟
            </>
        ),
        "options": [
            "0°C",
            "100°C",
            "-273.15°C",
            "لا يتقاطع"
        ],
        "correctAnswerIndex": 2,
        "explanation": "تمامًا مثل قانون شارل، إذا تم رسم الضغط مقابل درجة الحرارة بالسيليزيوس، فإن امتداد الخط المستقيم سيصل إلى ضغط صفر عند درجة حرارة -273.15 درجة مئوية، وهي قيمة الصفر المطلق."
    },
    {
        "question": "غازان A و B في وعاءين منفصلين متطابقين في الحجم. إذا كان ضغط الغاز A ضعف ضغط الغاز B عند نفس درجة الحرارة، فماذا يعني ذلك بالنسبة لكمية الغاز؟",
        "options": [
            "كمية A نصف كمية B",
            "كمية A ضعف كمية B",
            "الكميتان متساويتان",
            "لا يمكن تحديد العلاقة من هذه المعلومات"
        ],
        "correctAnswerIndex": 1,
        "explanation": "هذا السؤال يربط بين قانون جاي-لوساك ومبدأ أفوجادرو. عند ثبات الحجم ودرجة الحرارة، يتناسب الضغط طرديًا مع عدد المولات (كمية الغاز). بما أن ضغط A ضعف ضغط B، فإن عدد مولات A يجب أن يكون ضعف عدد مولات B."
    },
    {
        "question": "ماذا يحدث لمتوسط المسافة بين جسيمات الغاز عند تطبيق قانون جاي-لوساك؟",
        "options": [
            "تزداد",
            "تقل",
            "تبقى ثابتة",
            "تعتمد على الضغط"
        ],
        "correctAnswerIndex": 2,
        "explanation": "الشرط الأساسي لتطبيق قانون جاي-لوساك هو ثبات الحجم. بما أن الحجم الكلي للوعاء لا يتغير، فإن متوسط المسافة بين الجسيمات يبقى ثابتًا أيضًا."
    },
    {
        "question": (
            <>
                وعاء يحتوي على غاز النيتروجين عند <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="298\text{K}" /></span> وضغط <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="101.3\text{kPa}" /></span>. إذا تم نقل الغاز إلى وعاء آخر حجمه نصف حجم الوعاء الأول وتم تسخينه إلى <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="596\text{K}" /></span>، فما هو الضغط الجديد؟
            </>
        ),
        "options": [
            "101.3kPa",
            "202.6kPa",
            "50.65kPa",
            "405.2kPa"
        ],
        "correctAnswerIndex": 3,
        "explanation": "هذا السؤال يتطلب القانون الجامع للغازات (P₁V₁/T₁ = P₂V₂/T₂). P₁=101.3, V₁=V, T₁=298. V₂=V/2, T₂=596. P₂ = (P₁V₁T₂)/(T₁V₂) = (101.3 * V * 596) / (298 * V/2). يتم اختصار V. P₂ = (101.3 * 596) / 149 = 405.2kPa."
    },
    {
        "question": (
            <>
                في المحاكاة التفاعلية، عندما تزيد درجة الحرارة من <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="273\text{K}" /></span> إلى <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="546\text{K}" /></span>، ماذا تلاحظ على قيمة الضغط؟
            </>
        ),
        "options": [
            "تزداد بشكل طفيف",
            "تتضاعف تقريبًا",
            "تقل إلى النصف تقريبًا",
            "تبقى ثابتة"
        ],
        "correctAnswerIndex": 1,
        "explanation": "زيادة درجة الحرارة المطلقة من 273K إلى 546K تعني مضاعفة درجة الحرارة. وفقًا للعلاقة الطردية في قانون جاي-لوساك (P∝T)، فإن الضغط يجب أن يتضاعف أيضًا."
    },
    {
        "question": <span>عينة غاز نسبة ضغطها إلى درجة حرارتها المطلقة تساوي <span dir="ltr" className="inline-block">0.003atm/K</span>. ما هي درجة الحرارة بالسيليزيوس (°C) لهذه العينة عندما يكون ضغطها <span dir="ltr" className="inline-block">0.9atm</span>؟</span>,
        "options": [
            "300",
            "27",
            "-27",
            "0.0027"
        ],
        "correctAnswerIndex": 1,
        "explanation": "بما أن نسبة الضغط إلى الحرارة المطلقة (P/T) ثابتة، يمكن حساب الحرارة بالكلفن: T(K) = P / (P/T) = 0.9atm / 0.003atm/K = 300K. ثم نحول إلى سيليزيوس: T(°C) = 300 - 273 = 27°C."
    }
];
