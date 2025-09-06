
import { InlineMath } from 'react-katex';
import React from 'react';
import Image from 'next/image';


export interface QuizQuestion {
    question: React.ReactNode;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

const GasSamplesGraph = () => (
    <div className="flex justify-center my-4">
        <Image 
            src="https://i.ibb.co/nXTGRLs/3.png" 
            alt="أربع عينات من الغازات"
            width={300}
            height={200}
            className="rounded-lg border bg-white"
            data-ai-hint="gas samples experiment"
        />
    </div>
);


export const staticQuizLvl1: QuizQuestion[] = [
    {
        "question": "في الظروف المعيارية كثافة غاز الهيليوم بوحدة g/L تساوي",
        "options": [
            "13.3",
            "0.18",
            "0.001",
            "3.9"
        ],
        "correctAnswerIndex": 1,
        "explanation": "الكثافة d = (P × Mr) / (R × T) في الظروف المعيارية P=1atm و T=273K الكتلة المولية للهيليوم (He) هي 4g/mol إذن d = (1 × 4) / (0.082 × 273) ≈ 0.18 g/L"
    },
    {
        question: <><span>أربعة أوعية محكمة الإغلاق حجم كل منها </span><span dir="ltr" className="inline-block"><InlineMath math="2\text{L}" /></span><span> يحتوي كل منها على غازات بضغط </span><span dir="ltr" className="inline-block"><InlineMath math="1.15\text{atm}" /></span><span> عند حرارة </span><span dir="ltr" className="inline-block"><InlineMath math="7^\circ\text{C}" /></span><span> أي وعاء يحتوي على أكبر كتلة من الغاز (الكتل المولية: H=1, O=16, F=19, Ar=40)</span></>,
        "options": [
            "Ar",
            "H₂",
            "F₂",
            "O₂"
        ],
        "correctAnswerIndex": 0,
        "explanation": "بما أن جميع الغازات لها نفس الحجم والضغط ودرجة الحرارة فإن لها نفس عدد المولات n وفقا لقانون الغاز المثالي الكتلة m = n × الكتلة المولية Mr لذلك الغاز الذي له أكبر كتلة مولية سيكون له أكبر كتلة الكتل المولية H₂=2 و O₂=32 و F₂=38 و Ar=40 إذن Ar هو صاحب الكتلة الأكبر"
    },
    {
        question: <div><span>أربعة أوعية محكمة الإغلاق حجم كل منها </span><span dir="ltr" className="inline-block"><InlineMath math="2\text{L}" /></span><span> يحتوي كل منها على غازات بضغط </span><span dir="ltr" className="inline-block"><InlineMath math="1.15\text{atm}" /></span><span> عند حرارة </span><span dir="ltr" className="inline-block"><InlineMath math="7^\circ\text{C}" /></span><span> إذا تم تسخين وعاء الغاز F₂ وتبريد وعاء الغاز H₂ فأي وعاء سيكون ضغط الغاز فيه هو الأعلى</span></div>,
        "options": [
            "F₂",
            "Ar",
            "H₂",
            "O₂"
        ],
        "correctAnswerIndex": 0,
        "explanation": "وفقًا لقانون جاي-لوساك يتناسب الضغط طرديًا مع درجة الحرارة عند ثبات الحجم بما أن وعاء F₂ تم تسخينه (زيادة الحرارة) فسيكون ضغطه هو الأعلى بينما وعاء H₂ تم تبريده فسيكون ضغطه هو الأقل"
    },
    {
        question: <div><p>اعتمادا على الرسم المجاور والذي يمثل أوعية متساوية الحجم لغازات كتلها المولية (D:32, C:46, B:18, A:20)g/mol فإن العينة التي لها أكبر ضغط هي:</p><Image src="https://i.ibb.co/nXTGRLs/3.png" alt="أربع عينات من الغازات" width={300} height={200} className="rounded-lg border bg-white" data-ai-hint="gas samples experiment" /><strong className="text-accent mt-2 block">أي عينة غاز لها الضغط الأكبر</strong></div>,
        "options": [
            "D",
            "B",
            "C",
            "A"
        ],
        "correctAnswerIndex": 1,
        "explanation": "وفقًا لقانون الغاز المثالي (PV=nRT) عند ثبات الحجم (V) والحرارة (T) فإن الضغط (P) يتناسب طرديًا مع عدد المولات (n) العينة B تحتوي على أكبر عدد من المولات (0.8mol) لذا فهي الأعلى ضغطًا"
    },
    {
        question: <div><p>اعتمادا على الرسم المجاور والذي يمثل أوعية متساوية الحجم لغازات كتلها المولية (D:32, C:46, B:18, A:20)g/mol فإن العينة التي لها أكبر كثافة هي:</p><Image src="https://i.ibb.co/nXTGRLs/3.png" alt="أربع عينات من الغازات" width={300} height={200} className="rounded-lg border bg-white" data-ai-hint="gas samples experiment" /></div>,
        "options": [
            "C",
            "B",
            "A",
            "D"
        ],
        "correctAnswerIndex": 3,
        "explanation": "الكثافة d = m/V وبما أن الحجم (V) ثابت لجميع العينات فإن الأعلى كثافة هي صاحبة الكتلة (m) الأكبر نحسب كتلة كل عينة m=n×Mr A=0.2×20=4g B=0.8×18=14.4g C=0.4×46=18.4g D=0.6×32=19.2g العينة D لها الكتلة الأكبر وبالتالي هي الأعلى كثافة"
    }
];
export const staticQuizLvl2: QuizQuestion[] = [
    {
        question: <div><p>اعتمادا على الرسم البياني فإن درجة حرارة التي يكون عندها انحراف غاز النيتروجين عن السلوك المثالي أقل ما يمكن</p><Image src="https://i.ibb.co/rRgwmZcY/5.png" alt="Gas Laws Graph" width={400} height={250} className="rounded-lg border bg-white mx-auto" data-ai-hint="gas laws graph"/></div>,
        options: ["200 K", "273 K", "500 K", "1000 K"],
        correctAnswerIndex: 3,
        "explanation": "الخط المتقطع عند القيمة 1 يمثل سلوك الغاز المثالي المنحنى الأقرب لهذا الخط يمثل أقل انحراف منحنى درجة الحرارة 1000K هو الأقرب للخط المثالي مما يعني أن سلوك الغاز يكون أقرب للمثالي عند درجات الحرارة المرتفعة"
    },
     {
        question: <div><p>اعتمادا على الرسم البياني فإن ما سبب انخفاض قيمة PV/nRT عن 1 عند درجة حرارة 200K وضغط 200atm؟</p><Image src="https://i.ibb.co/rRgwmZcY/5.png" alt="Gas Laws Graph" width={400} height={250} className="rounded-lg border bg-white mx-auto" data-ai-hint="gas laws graph"/></div>,
        "options": [
            "زيادة قوى التجاذب بين جسيمات الغاز",
            "زيادة حجم الغاز ونقصان طاقة جسيماته الحركية",
            "تباعد جسيمات الغاز عن بعضها",
            "تحول الغاز إلى سائل"
        ],
        "correctAnswerIndex": 0,
        "explanation": "عند درجات الحرارة المنخفضة والضغوط المعتدلة تصبح قوى التجاذب بين الجسيمات مؤثرة هذه القوى تجذب الجسيمات لبعضها مما يقلل من تصادمها مع جدار الوعاء وبالتالي يقلل الضغط الفعلي للغاز عن الضغط المثالي فتصبح قيمة PV/nRT أقل من 1"
    },
     {
        question: <div><p>اعتمادا على الرسم البياني فإن سبب ارتفاع قيمة PV/nRT عن 1 عند قيم الضغط المرتفعة جدًا هو</p><Image src="https://i.ibb.co/rRgwmZcY/5.png" alt="Gas Laws Graph" width={400} height={250} className="rounded-lg border bg-white mx-auto" data-ai-hint="gas laws graph"/></div>,
        "options": [
            "زيادة حجم الغاز وتباعد جسيمات الغاز",
            "زيادة حجم الغاز ونقصان طاقة جسيماته الحركية",
            "صغر حجم الوعاء وتأثير حجم الجسيمات",
            "نقصان حجم الغاز وتحول الغاز إلى سائل"
        ],
        "correctAnswerIndex": 2,
        "explanation": "عند الضغوط المرتفعة جدًا تتقارب الجسيمات بشكل كبير بحيث يصبح حجم الجسيمات نفسها (الذي يهمله نموذج الغاز المثالي) مؤثرًا ولا يمكن إهماله مقارنة بالحجم الكلي مما يؤدي إلى زيادة قيمة PV/nRT عن 1"
    },
    {
        "question": "ما هو حجم 11 جرام من غاز CO₂ في الظروف المعيارية (الكتل المولية: C=12, O=16)",
        "options": [
            "5.6L",
            "11.2L",
            "22.4L",
            "44.8L"
        ],
        "correctAnswerIndex": 0,
        "explanation": "أولاً نحسب الكتلة المولية لـ CO₂ = 12 + (2*16) = 44 g/mol ثم نحسب عدد المولات n = 11g / 44g/mol = 0.25 mol حجم الغاز في الظروف المعيارية = 0.25 mol * 22.4 L/mol = 5.6 L"
    },
    {
        question: <><span>عينة من غاز النيتروجين (N₂) حجمها 2L عند ضغط 3atm ودرجة حرارة </span><span dir="ltr" className="inline-block"><InlineMath math="27^\circ\text{C}" /></span><span> ما هو عدد مولات الغاز</span></>,
        options: [
            "0.24mol",
            "2.4mol",
            "4.1mol",
            "0.41mol"
        ],
        correctAnswerIndex: 0,
        "explanation": "نستخدم قانون الغاز المثالي PV=nRT نحول الحرارة إلى كلفن T = 27 + 273 = 300K نعيد ترتيب المعادلة n = PV/RT = (3 atm * 2 L) / (0.082 L·atm/mol·K * 300 K) ≈ 0.24 mol"
    },
    {
        question: <><span>غازان A و B في وعاءين منفصلين متطابقين في الحجم إذا كان ضغط الغاز A ضعف ضغط الغاز B عند نفس درجة الحرارة فماذا يعني ذلك بالنسبة لكمية الغاز</span></>,
        options: [
            "كمية A نصف كمية B",
            "كمية A ضعف كمية B",
            "الكميتان متساويتان",
            "لا يمكن تحديد العلاقة من هذه المعلومات"
        ],
        correctAnswerIndex: 1,
        explanation: "هذا السؤال يربط بين قانون جاي-لوساك ومبدأ أفوجادرو عند ثبات الحجم ودرجة الحرارة يتناسب الضغط طرديًا مع عدد المولات (كمية الغاز) بما أن ضغط A ضعف ضغط B فإن عدد مولات A يجب أن يكون ضعف عدد مولات B"
    }
];
export const staticQuizLvl3: QuizQuestion[] = [
    {
        "question": "ما هي كتلة غاز الأكسجين (O₂) الموجودة في وعاء حجمه 5L عند ضغط 2atm ودرجة حرارة 400K (الكتلة المولية لـ O=16)",
        "options": [
            "9.76g",
            "4.88g",
            "19.5g",
            "32g"
        ],
        "correctAnswerIndex": 0,
        "explanation": "أولاً نحسب عدد المولات n = PV/RT = (2 * 5) / (0.082 * 400) ≈ 0.305 mol الكتلة المولية لـ O₂ هي 32 g/mol الكتلة = n * Mr = 0.305 * 32 ≈ 9.76g"
    },
    {
        "question": "إذا تضاعف حجم وعاء يحتوي على غاز مثالي وانخفضت درجة حرارته المطلقة إلى النصف ماذا يحدث للضغط",
        "options": [
            "يبقى ثابتًا",
            "يقل إلى الربع",
            "يتضاعف",
            "يقل إلى النصف"
        ],
        "correctAnswerIndex": 1,
        "explanation": "باستخدام القانون الجامع (P₁V₁/T₁ = P₂V₂/T₂) فإن P₂ = P₁ * (V₁/V₂) * (T₂/T₁) لدينا V₂=2V₁ و T₂=T₁/2 إذن P₂ = P₁ * (V₁/2V₁) * ((T₁/2)/T₁) = P₁ * (1/2) * (1/2) = P₁/4 يقل الضغط إلى الربع"
    },
    {
        question: <><span>ما هي كثافة غاز النيون (Ne) عند ضغط 900mmHg ودرجة حرارة </span><span dir="ltr" className="inline-block"><InlineMath math="127^\circ\text{C}" /></span><span> (الكتلة المولية لـ Ne=20g/mol)</span></>,
        "options": [
            "0.72g/L",
            "7.2g/L",
            "1.44g/L",
            "0.36g/L"
        ],
        "correctAnswerIndex": 0,
        "explanation": "نحول الوحدات P = 900/760 ≈ 1.184 atm T = 127+273 = 400K الكثافة d = (P*Mr)/(R*T) = (1.184 * 20) / (0.082 * 400) ≈ 0.72 g/L"
    },
    {
        "question": "وعاءان متصلان بصمام الأول حجمه 3L ويحتوي غاز بضغط 4atm والثاني حجمه 5L ويحتوي غاز بضغط 2atm إذا تم فتح الصمام ما هو الضغط النهائي للخليط (افترض ثبات الحرارة)",
        "options": [
            "2.75atm",
            "3atm",
            "6atm",
            "2.25atm"
        ],
        "correctAnswerIndex": 0,
        "explanation": "نستخدم قانون دالتون مع قانون بويل n_total = n₁ + n₂ بما أن n ∝ PV يمكننا القول P_final * V_final = P₁V₁ + P₂V₂ الحجم النهائي V_final = 3+5=8L إذن P_final * 8 = (4*3) + (2*5) = 12 + 10 = 22 P_final = 22/8 = 2.75atm"
    },
    {
        question: <><span>غاز حجمه 20L في الظروف المعيارية إذا تم تسخينه إلى </span><span dir="ltr" className="inline-block"><InlineMath math="273^\circ\text{C}" /></span><span> مع الحفاظ على الضغط ثابتًا ما هو حجمه الجديد</span></>,
        "options": [
            "20L",
            "10L",
            "30L",
            "40L"
        ],
        "correctAnswerIndex": 3,
        "explanation": "الظروف المعيارية T₁=273K, V₁=20L, الحرارة الجديدة T₂=273+273=546K باستخدام قانون شارل V₂=V₁T₂/T₁ = 20 * (546/273) = 20 * 2 = 40L"
    }
];

    
    