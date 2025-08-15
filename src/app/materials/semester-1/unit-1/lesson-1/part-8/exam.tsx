
import { InlineMath } from 'react-katex';
import React from 'react';


export interface QuizQuestion {
    question: React.ReactNode;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

const GasLawsGraph = () => (
    <svg width="300" height="200" viewBox="0 0 450 350" xmlns="http://www.w3.org/2000/svg" className="mx-auto my-2 bg-background p-4 rounded-lg border">
        <line x1="50" y1="300" x2="400" y2="300" stroke="black" strokeWidth="2"/>
        <text x="410" y="300" dominantBaseline="middle">P(atm)</text>

        <line x1="50" y1="300" x2="50" y2="50" stroke="black" strokeWidth="2"/>
        <text x="50" y="40" textAnchor="middle">PV/nRT</text>

        <path d="M50,175 L400,175" stroke="gray" strokeWidth="1" strokeDasharray="5,5"/>
        <text x="30" y="175" dominantBaseline="middle" fontSize="12">1</text>

        <path d="M60,160 C150,100 250,110 400,140" stroke="hsl(var(--primary))" strokeWidth="2" fill="none"/>
        <text x="380" y="130" fill="hsl(var(--primary))" fontSize="12">1000 K</text>

        <path d="M60,180 C150,150 250,160 400,170" stroke="hsl(var(--accent))" strokeWidth="2" fill="none"/>
        <text x="380" y="180" fill="hsl(var(--accent))" fontSize="12">500 K</text>

        <path d="M60,250 C150,220 250,230 400,220" stroke="hsl(var(--destructive))" strokeWidth="2" fill="none"/>
        <text x="380" y="230" fill="hsl(var(--destructive))" fontSize="12">200 K</text>
    </svg>
);

const GasSamplesGraph = () => (
     <svg width="300" height="200" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="mx-auto my-2 bg-background p-4 rounded-lg border">
        {/* Beakers */}
        <rect x="30" y="100" width="60" height="100" fill="hsl(var(--muted))" stroke="black" strokeWidth="1"/>
        <rect x="120" y="100" width="60" height="100" fill="hsl(var(--muted))" stroke="black" strokeWidth="1"/>
        <rect x="210" y="100" width="60" height="100" fill="hsl(var(--muted))" stroke="black" strokeWidth="1"/>
        <rect x="300" y="100" width="60" height="100" fill="hsl(var(--muted))" stroke="black" strokeWidth="1"/>
        {/* Labels */}
        <text x="60" y="220" textAnchor="middle">A</text>
        <text x="150" y="220" textAnchor="middle">B</text>
        <text x="240" y="220" textAnchor="middle">C</text>
        <text x="330" y="220" textAnchor="middle">D</text>
        {/* Moles info */}
        <text x="60" y="90" textAnchor="middle" fontSize="14">0.2mol</text>
        <text x="150" y="90" textAnchor="middle" fontSize="14">0.8mol</text>
        <text x="240" y="90" textAnchor="middle" fontSize="14">0.4mol</text>
        <text x="330" y="90" textAnchor="middle" fontSize="14">0.6mol</text>
    </svg>
);


export const staticQuizLvl1: QuizQuestion[] = [
    {
        "question": "في الظروف المعيارية، كثافة غاز الهيليوم بوحدة g/L تساوي:",
        "options": [
            "13.3",
            "0.18",
            "0.001",
            "3.9"
        ],
        "correctAnswerIndex": 1,
        "explanation": "الكثافة d = (P × Mr) / (R × T). في الظروف المعيارية، P=1atm, T=273K. الكتلة المولية للهيليوم (He) هي 4g/mol. إذن d = (1 × 4) / (0.082 × 273) ≈ 0.18 g/L."
    },
    {
        "question": <span>أربعة أوعية محكمة الإغلاق حجم كل منها 2L يحتوي كل منها على غازات بضغط 1.15atm عند حرارة 7°C. أي وعاء يحتوي على أكبر كتلة من الغاز؟ (الكتل المولية: H=1, O=16, F=19, Ar=40)</span>,
        "options": [
            "Ar",
            "H₂",
            "F₂",
            "O₂"
        ],
        "correctAnswerIndex": 0,
        "explanation": "بما أن جميع الغازات لها نفس الحجم والضغط ودرجة الحرارة، فإن لها نفس عدد المولات (n) وفقًا لقانون الغاز المثالي. الكتلة (m) = n × الكتلة المولية (Mr). لذلك، الغاز الذي له أكبر كتلة مولية سيكون له أكبر كتلة. الكتل المولية: H₂=2, O₂=32, F₂=38, Ar=40. إذن Ar هو صاحب الكتلة الأكبر."
    },
    {
        "question": <span>من السؤال السابق، إذا تم تسخين وعاء الغاز F₂ وتبريد وعاء الغاز H₂، فأي وعاء سيكون ضغط الغاز فيه هو الأعلى؟</span>,
        "options": [
            "F₂",
            "Ar",
            "H₂",
            "O₂"
        ],
        "correctAnswerIndex": 0,
        "explanation": "وفقًا لقانون جاي-لوساك، يتناسب الضغط طرديًا مع درجة الحرارة عند ثبات الحجم. بما أن وعاء F₂ تم تسخينه (زيادة الحرارة)، فسيكون ضغطه هو الأعلى. بينما وعاء H₂ تم تبريده، فسيكون ضغطه هو الأقل."
    },
    {
        "question": <div>ادرس الرسم البياني الذي يمثل أربع عينات من الغازات متساوية الحجم عند نفس درجة الحرارة ثم أجب:<br/><GasSamplesGraph /><strong className="text-accent">أي عينة غاز لها الضغط الأكبر؟</strong></div>,
        "options": [
            "D",
            "B",
            "C",
            "A"
        ],
        "correctAnswerIndex": 1,
        "explanation": "وفقًا لقانون الغاز المثالي (PV=nRT)، عند ثبات الحجم (V) والحرارة (T)، فإن الضغط (P) يتناسب طرديًا مع عدد المولات (n). العينة B تحتوي على أكبر عدد من المولات (0.8mol)، لذا فهي الأعلى ضغطًا."
    },
    {
        "question": <div>ادرس الرسم البياني للغازات من السؤال السابق، إذا كانت الكتل المولية للغازات (D:32, C:46, B:18, A:20)g/mol، فأي عينة هي الأكثر كثافة؟</div>,
        "options": [
            "C",
            "B",
            "A",
            "D"
        ],
        "correctAnswerIndex": 3,
        "explanation": "الكثافة d = m/V. وبما أن الحجم (V) ثابت لجميع العينات، فإن الأعلى كثافة هي صاحبة الكتلة (m) الأكبر. نحسب كتلة كل عينة: m=n×Mr. A=0.2×20=4g. B=0.8×18=14.4g. C=0.4×46=18.4g. D=0.6×32=19.2g. العينة D لها الكتلة الأكبر، وبالتالي هي الأعلى كثافة."
    }
];
export const staticQuizLvl2: QuizQuestion[] = [
    {
        "question": <div>ادرس الرسم البياني الذي يوضح سلوك غاز النيتروجين عند درجات حرارة مختلفة وأجب:<br/><GasLawsGraph /><strong className="text-accent">عند أي درجة حرارة يكون انحراف غاز النيتروجين عن السلوك المثالي هو الأقل؟</strong></div>,
        "options": [
            "200K",
            "273K",
            "500K",
            "1000K"
        ],
        "correctAnswerIndex": 3,
        "explanation": "الخط المتقطع عند القيمة 1 يمثل سلوك الغاز المثالي. المنحنى الأقرب لهذا الخط يمثل أقل انحراف. منحنى درجة الحرارة 1000K هو الأقرب للخط المثالي، مما يعني أن سلوك الغاز يكون أقرب للمثالي عند درجات الحرارة المرتفعة."
    },
     {
        "question": <div>ادرس الرسم البياني من السؤال السابق وأجب:<br/><strong className="text-accent">ما سبب انخفاض قيمة PV/nRT عن 1 عند درجة حرارة 200K وضغط 200atm؟</strong></div>,
        "options": [
            "زيادة قوى التجاذب بين جسيمات الغاز",
            "زيادة حجم الغاز ونقصان طاقة جسيماته الحركية",
            "تباعد جسيمات الغاز عن بعضها",
            "تحول الغاز إلى سائل"
        ],
        "correctAnswerIndex": 0,
        "explanation": "عند درجات الحرارة المنخفضة والضغوط المعتدلة، تصبح قوى التجاذب بين الجسيمات مؤثرة. هذه القوى تجذب الجسيمات لبعضها، مما يقلل من تصادمها مع جدار الوعاء، وبالتالي يقلل الضغط الفعلي للغاز عن الضغط المثالي، فتصبح قيمة PV/nRT أقل من 1."
    },
     {
        "question": <div>ادرس الرسم البياني من السؤال السابق وأجب:<br/><strong className="text-accent">ما سبب ارتفاع قيمة PV/nRT عن 1 عند قيم الضغط المرتفعة جدًا؟</strong></div>,
        "options": [
            "زيادة حجم الغاز وتباعد جسيمات الغاز",
            "زيادة حجم الغاز ونقصان طاقة جسيماته الحركية",
            "صغر حجم الوعاء وتأثير حجم الجسيمات",
            "نقصان حجم الغاز وتحول الغاز إلى سائل"
        ],
        "correctAnswerIndex": 2,
        "explanation": "عند الضغوط المرتفعة جدًا، تتقارب الجسيمات بشكل كبير بحيث يصبح حجم الجسيمات نفسها (الذي يهمله نموذج الغاز المثالي) مؤثرًا ولا يمكن إهماله مقارنة بالحجم الكلي، مما يؤدي إلى زيادة قيمة PV/nRT عن 1."
    }
];
export const staticQuizLvl3: QuizQuestion[] = [
    // Placeholder for level 3 questions
];
