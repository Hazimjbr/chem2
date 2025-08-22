import React from 'react';
import { GraphCurveDown, GraphLineDown, GraphLineUp, GraphCurveUp, GraphLineHorizontal, GraphLineVertical } from '@/components/illustrations/graphs';

export interface QuizQuestion {
    question: React.ReactNode;
    options: React.ReactNode[];
    correctAnswerIndex: number;
    explanation: string;
}

const PistonDiagram = () => (
    <div className="flex justify-center items-center gap-8 my-4">
        {/* Container A */}
        <div className="text-center">
            <svg width="100" height="150" viewBox="0 0 100 150">
                <rect x="10" y="30" width="80" height="110" fill="hsl(var(--card))" stroke="black" strokeWidth="1"/>
                <rect x="5" y="40" width="90" height="10" fill="hsl(var(--muted))" stroke="black"/>
                <rect x="45" y="30" width="10" height="10" fill="hsl(var(--muted))" stroke="black"/>
                 {/* Particles */}
                <circle cx="30" cy="60" r="3" fill="hsl(var(--primary))" />
                <circle cx="50" cy="90" r="3" fill="hsl(var(--primary))" />
                <circle cx="70" cy="75" r="3" fill="hsl(var(--primary))" />
                <circle cx="40" cy="110" r="3" fill="hsl(var(--primary))" />
                <circle cx="60" cy="130" r="3" fill="hsl(var(--primary))" />
            </svg>
             <p className="font-bold">الحالة A</p>
        </div>
        {/* Arrow */}
        <svg width="40" height="40" viewBox="0 0 40 40">
            <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
            </defs>
            {/* Arrow pointing right (A -> B) */}
            <line x1="5" y1="20" x2="35" y2="20" stroke="black" strokeWidth="2" markerEnd="url(#arrow)"/>
        </svg>
        {/* Container B */}
        <div className="text-center">
            <svg width="100" height="150" viewBox="0 0 100 150">
                <rect x="10" y="30" width="80" height="110" fill="hsl(var(--card))" stroke="black" strokeWidth="1"/>
                <rect x="5" y="80" width="90" height="10" fill="hsl(var(--muted))" stroke="black"/>
                <rect x="45" y="70" width="10" height="10" fill="hsl(var(--muted))" stroke="black"/>
                {/* Particles */}
                <circle cx="30" cy="100" r="3" fill="hsl(var(--primary))" />
                <circle cx="50" cy="120" r="3" fill="hsl(var(--primary))" />
                <circle cx="70" cy="95" r="3" fill="hsl(var(--primary))" />
                <circle cx="40" cy="130" r="3" fill="hsl(var(--primary))" />
                <circle cx="60" cy="110" r="3" fill="hsl(var(--primary))" />
            </svg>
            <p className="font-bold">الحالة B</p>
        </div>
    </div>
);

export const staticQuizLvl1: QuizQuestion[] = [
    {
        "question": "أي من العلاقات الرياضية التالية تمثل قانون بويل بشكل صحيح؟ (حيث k ثابت)",
        "options": [
            "V = k * P",
            "P / V = k",
            "P * V = k",
            "P + V = k"
        ],
        "correctAnswerIndex": 2,
        "explanation": "قانون بويل ينص على أن حاصل ضرب الضغط (P) في الحجم (V) لكمية ثابتة من الغاز عند درجة حرارة ثابتة يساوي قيمة ثابتة (k). لذلك، المعادلة الصحيحة هي P₁V₁ = P₂V₂."
    },
    {
        "question": "وفقًا لقانون بويل، إذا تضاعف الضغط على كمية معينة من الغاز عند درجة حرارة ثابتة، فماذا يحدث لحجمه؟",
        "options": [
            "يتضاعف",
            "يبقى ثابتًا",
            "يقل إلى النصف",
            "يقل إلى الربع"
        ],
        "correctAnswerIndex": 2,
        "explanation": "قانون بويل ينص على وجود علاقة عكسية بين الضغط والحجم. إذا تضاعف الضغط (P -> 2P)، فإن الحجم يجب أن يقل إلى النصف (V -> V/2) للحفاظ على حاصل الضرب ثابتًا (P₁V₁ = P₂V₂)."
    },
    {
        "question": "وحدة قياس الحجم (V) المناسبة للاستخدام في قانون بويل يمكن أن تكون:",
        "options": [
            "فقط L",
            "فقط mL",
            "L أو mL",
            "kg"
        ],
        "correctAnswerIndex": 2,
        "explanation": "يمكن استخدام أي وحدة حجم (مثل L أو mL أو m³) في قانون بويل، طالما أن V₁ و V₂ لهما نفس الوحدة."
    },
    {
        "question": "في تجربة بويل، ما الذي يمثله ارتفاع عمود الزئبق الإضافي (h) في الذراع المفتوح للأنبوب؟",
        "options": [
            "الضغط الكلي على الغاز",
            "درجة حرارة الغاز",
            "الضغط الإضافي على الغاز",
            "كمية الغاز"
        ],
        "correctAnswerIndex": 2,
        "explanation": "ارتفاع الزئبق الإضافي يمثل الضغط الذي يضيفه وزن الزئبق على الضغط الجوي الأصلي، وبالتالي يمثل الزيادة في الضغط على الغاز المحصور. الضغط الكلي هو مجموع الضغط الجوي والضغط الإضافي."
    },
    {
        "question": "منطاد يحتوي على 30L من غاز الهيليوم عند ضغط 103kPa. إذا ارتفع المنطاد إلى ارتفاع حيث يصبح الضغط 25kPa (مع ثبات الحرارة)، فما هو الحجم الجديد للهيليوم؟",
        "options": [
            "7.28L",
            "123.6L",
            "30L",
            "25L"
        ],
        "correctAnswerIndex": 1,
        "explanation": "باستخدام قانون بويل P₁V₁ = P₂V₂، فإن V₂ = (P₁V₁) / P₂ = (103 * 30) / 25 = 123.6L."
    }
];

export const staticQuizLvl2: QuizQuestion[] = [
    {
        "question": "أي من الرسوم البيانية التالية يمثل العلاقة بين الحجم (V) والضغط (P) لغاز مثالي عند درجة حرارة ثابتة؟",
        "options": [
            <GraphLineUp />,
            <GraphCurveDown />,
            <GraphCurveUp />,
            <GraphLineDown />
        ],
        "correctAnswerIndex": 1,
        "explanation": "العلاقة بين الضغط والحجم هي علاقة عكسية غير خطية (V ∝ 1/P)، والتي تُمثل بيانيًا على شكل منحنى يتناقص كلما زاد الضغط."
    },
    {
        "question": <div><p>ادرس الشكل المجاور الذي يمثل تغيرات على غاز محصور، أي العبارات الآتية تصف التغير الحاصل من الحالة B إلى الحالة A بشكل صحيح؟</p><PistonDiagram /></div>,
        "options": [
            "يقل الضغط ويزداد الحجم",
            "يزداد الضغط ويزداد الحجم",
            "يبقى الضغط ثابتًا ويزداد الحجم",
            "يقل الضغط ويبقى الحجم ثابتًا"
        ],
        "correctAnswerIndex": 0,
        "explanation": "عند الانتقال من الحالة B إلى A، نلاحظ أن عدد الجسيمات (المولات) ثابت، ولكن المكبس ارتفع، مما يعني أن الحجم قد زاد. وفقًا لقانون بويل، عند ثبات كمية الغاز ودرجة الحرارة، فإن زيادة الحجم تؤدي إلى انخفاض الضغط."
    },
    {
        "question": "إذا كان حاصل ضرب الضغط في الحجم (P·V) لغاز يساوي 50atm·L، فما قيمة الحجم (V) عندما يكون الضغط (P) يساوي 2.5atm؟",
        "options": [
            "125L",
            "20L",
            "50L",
            "2.5L"
        ],
        "correctAnswerIndex": 1,
        "explanation": "بما أن P·V = k (ثابت)، فإن V = k / P. إذا كان k = 50atm·L و P = 2.5atm، فإن V = 50 / 2.5 = 20L."
    },
    {
        "question": "عينة من غاز الأكسجين حجمها 4.5L عند ضغط 760mmHg. إذا تم تغيير الحجم إلى 9L عند درجة حرارة ثابتة، فما هو الضغط الجديد بوحدة mmHg؟",
        "options": [
            "1520mmHg",
            "760mmHg",
            "380mmHg",
            "190mmHg"
        ],
        "correctAnswerIndex": 2,
        "explanation": "باستخدام قانون بويل P₁V₁ = P₂V₂، فإن P₂ = (P₁V₁) / V₂ = (760 * 4.5) / 9 = 380mmHg. تضاعف الحجم، لذا قل الضغط إلى النصف."
    },
    {
        "question": "إذا تم ضغط 10L من غاز النيون من 1atm إلى 4atm، فإن نسبة الحجم النهائي إلى الحجم الابتدائي هي:",
        "options": [
            "1:4",
            "4:1",
            "1:1",
            "2:1"
        ],
        "correctAnswerIndex": 0,
        "explanation": "عندما يزداد الضغط 4 مرات، يقل الحجم 4 مرات. الحجم النهائي سيكون 10/4 = 2.5L. نسبة النهائي إلى الابتدائي هي 2.5:10، والتي تساوي 1:4."
    },
    {
        "question": "غواص يطلق فقاعة هواء حجمها 2cm³ عند عمق حيث الضغط 3atm. ما حجم الفقاعة (بافتراض عدم تغير الحرارة) عندما تصل إلى السطح حيث الضغط 1atm؟",
        "options": [
            "6cm³",
            "2/3cm³",
            "3cm³",
            "2cm³"
        ],
        "correctAnswerIndex": 0,
        "explanation": "باستخدام قانون بويل P₁V₁ = P₂V₂، فإن V₂ = (P₁V₁) / P₂ = (3 * 2) / 1 = 6cm³."
    }
];

export const staticQuizLvl3: QuizQuestion[] = [
    {
        "question": "أي رسم بياني يمثل العلاقة بين حجم الغاز (V) ومقلوب الضغط (1/P) عند درجة حرارة ثابتة؟",
        "options": [
            <GraphCurveUp />,
            <GraphLineDown />,
            <GraphLineUp />,
            <GraphCurveDown />
        ],
        "correctAnswerIndex": 2,
        "explanation": "قانون بويل هو P·V=k. يمكن إعادة ترتيبه إلى V = k * (1/P). هذه هي معادلة خط مستقيم (y = mx) بين V (المحور الصادي) و 1/P (المحور السيني). بما أن الميل (k) موجب، فإن العلاقة طردية خطية تمر بنقطة الأصل."
    },
    {
        "question": "وعاءان متصلان بصمام. الوعاء الأول حجمه 2L ويحتوي على غاز عند ضغط 3atm. الوعاء الثاني حجمه 3L وهو مفرغ. إذا تم فتح الصمام، فما هو الضغط النهائي في الوعاءين (بافتراض ثبات الحرارة)؟",
        "options": [
            "1.5atm",
            "1.2atm",
            "2.5atm",
            "5atm"
        ],
        "correctAnswerIndex": 1,
        "explanation": "الحالة الابتدائية: V₁=2L, P₁=3atm. الحالة النهائية: V₂ هو الحجم الكلي (2+3=5L)، و P₂ هو المطلوب. باستخدام P₁V₁ = P₂V₂، فإن P₂ = (3 * 2) / 5 = 1.2atm."
    },
    {
        "question": "إذا كان لديك غاز حجمه V عند ضغط P. أي من التغييرات التالية ستؤدي إلى مضاعفة حاصل ضرب P·V؟",
        "options": [
            "مضاعفة الضغط مع الحفاظ على الحجم ثابتًا.",
            "مضاعفة الحجم مع الحفاظ على الضغط ثابتًا.",
            "مضاعفة كل من الضغط والحجم.",
            "قانون بويل ينص على أن P·V ثابت ولا يمكن تغييره."
        ],
        "correctAnswerIndex": 3,
        "explanation": "هذا سؤال خادع. قانون بويل (P₁V₁=P₂V₂) يصف سلوك كمية *ثابتة* من الغاز عند درجة حرارة *ثابتة*. في هذه الظروف، حاصل ضرب P·V هو ثابت (k) ولا يمكن تغييره. لتغيير قيمة k، يجب تغيير كمية الغاز أو درجة حرارته."
    },
    {
        "question": "كمية من غاز تشغل حجمًا قدره 500mL عند ضغط 1520mmHg. تم نقل الغاز إلى وعاء حجمه 2L. ما هو الضغط الجديد بوحدة atm؟",
        "options": [
            "0.5atm",
            "1.0atm",
            "2.0atm",
            "4.0atm"
        ],
        "correctAnswerIndex": 0,
        "explanation": "أولاً، نوحد الوحدات. V₁=0.5L, P₁=1520/760=2atm. V₂=2L. باستخدام P₁V₁ = P₂V₂، فإن P₂ = (2 * 0.5) / 2 = 0.5atm."
    },
    {
        "question": "في المحاكاة التفاعلية، إذا قمت بزيادة الضغط من 1atm إلى 2atm، فإن حجم الغاز (V) يتغير من 75 وحدة إلى حوالي 37.5 وحدة. ماذا يمكنك أن تستنتج عن العلاقة بين V و P؟",
        "options": [
            "طردية خطية",
            "عكسية خطية",
            "طردية تربيعية",
            "عكسية بسيطة (غير خطية)"
        ],
        "correctAnswerIndex": 3,
        "explanation": "عندما تضاعف الضغط، قل الحجم إلى النصف. هذا يوضح علاقة عكسية بسيطة (غير خطية)، حيث إذا زاد أحد المتغيرات بمعامل معين، يقل الآخر بنفس المعامل، وهذا هو جوهر قانون بويل."
    }
];
