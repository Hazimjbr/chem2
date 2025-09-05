
'use client';

import React from 'react';
import { cn } from '@/lib/utils.tsx';
import { InlineMath } from 'react-katex';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


export interface QuizQuestion {
    question: React.ReactNode;
    options: React.ReactNode[];
    correctAnswerIndex: number;
    explanation: string;
}

export const GasSamplesGraph = () => (
     <svg width="300" height="200" viewBox="0 0 450 250" xmlns="http://www.w3.org/2000/svg" className="mx-auto my-2 bg-white p-4 rounded-lg border">
        {/* Container A */}
        <rect x="10" y="50" width="80" height="120" fill="white" stroke="black" strokeWidth="1"/>
        <g>
            {/* Adjusted positions for A */}
            <g transform="translate(35, 80) scale(1.5)">
                 <rect x="-5" y="-5" width="10" height="10" fill="hsl(var(--primary))"/>
                <circle cx="-10" cy="0" r="4" fill="hsl(var(--accent))"/>
                <circle cx="10" cy="0" r="4" fill="hsl(var(--accent))"/>
            </g>
            <g transform="translate(65, 140) scale(1.5)">
                 <rect x="-5" y="-5" width="10" height="10" fill="hsl(var(--primary))"/>
                <circle cx="-10" cy="0" r="4" fill="hsl(var(--accent))"/>
                <circle cx="10" cy="0" r="4" fill="hsl(var(--accent))"/>
            </g>
             <g transform="translate(50, 110) scale(1.5)">
                 <rect x="-5" y="-5" width="10" height="10" fill="hsl(var(--primary))"/>
                <circle cx="-10" cy="0" r="4" fill="hsl(var(--accent))"/>
                <circle cx="10" cy="0" r="4" fill="hsl(var(--accent))"/>
            </g>
        </g>
        <text x="50" y="190" textAnchor="middle" fontSize="16">A</text>
        
        {/* Container B */}
        <rect x="120" y="50" width="80" height="120" fill="white" stroke="black" strokeWidth="1"/>
        <g fill="hsl(var(--destructive))">
            {/* Adjusted positions for B */}
            <rect x="130" y="70" width="10" height="10" />
            <rect x="170" y="140" width="10" height="10" />
            <rect x="160" y="95" width="10" height="10" />
            <rect x="140" y="125" width="10" height="10" />
            <rect x="150" y="60" width="10" height="10" />
        </g>
        <text x="160" y="190" textAnchor="middle" fontSize="16">B</text>

        {/* Container C */}
        <rect x="230" y="50" width="80" height="120" fill="white" stroke="black" strokeWidth="1"/>
        <g>
             {/* Adjusted positions for C */}
             <g transform="translate(260, 85) scale(1.5)">
                <rect x="-5" y="-5" width="10" height="10" fill="hsl(var(--accent))"/>
                <polygon points="0,-12 -5,-7 5,-7" fill="hsl(var(--destructive))"/>
                <polygon points="-12,5 -7,0 -7,10" fill="hsl(var(--destructive))"/>
                <polygon points="12,5 7,0 7,10" fill="hsl(var(--destructive))"/>
            </g>
            <g transform="translate(280, 130) scale(1.5)">
                <rect x="-5" y="-5" width="10" height="10" fill="hsl(var(--accent))"/>
                <polygon points="0,-12 -5,-7 5,-7" fill="hsl(var(--destructive))"/>
                <polygon points="-12,5 -7,0 -7,10" fill="hsl(var(--destructive))"/>
                <polygon points="12,5 7,0 7,10" fill="hsl(var(--destructive))"/>
            </g>
        </g>
        <text x="270" y="190" textAnchor="middle" fontSize="16">C</text>
        
        {/* Container D */}
        <rect x="340" y="50" width="80" height="120" fill="white" stroke="black" strokeWidth="1"/>
        <g fill="#facc15">
            {/* Adjusted positions for D */}
            <g transform="translate(365, 75) scale(1.5)"><circle cx="-4" cy="0" r="4" /><circle cx="4" cy="0" r="4" /></g>
            <g transform="translate(395, 145) scale(1.5)"><circle cx="-4" cy="0" r="4" /><circle cx="4" cy="0" r="4" /></g>
            <g transform="translate(360, 120) scale(1.5)"><circle cx="-4" cy="0" r="4" /><circle cx="4" cy="0" r="4" /></g>
            <g transform="translate(390, 95) scale(1.5)"><circle cx="-4" cy="0" r="4" /><circle cx="4" cy="0" r="4" /></g>
        </g>
        <text x="380" y="190" textAnchor="middle" fontSize="16">D</text>
    </svg>
);


const PistonDiagram = () => (
    <div className="flex justify-center items-center gap-8 my-4">
        {/* Container B (Start) */}
        <div className="text-center">
            <svg width="100" height="150" viewBox="0 0 100 150">
                <rect x="10" y="30" width="80" height="110" fill="hsl(var(--card))" stroke="black" strokeWidth="1"/>
                <rect x="5" y="80" width="90" height="10" fill="hsl(var(--muted))" stroke="black"/>
                <rect x="45" y="70" width="10" height="10" fill="hsl(var(--muted))" stroke="black"/>
                {/* More red particles */}
                <circle cx="30" cy="100" r="3" fill="hsl(var(--destructive))" />
                <circle cx="50" cy="120" r="3" fill="hsl(var(--destructive))" />
                <circle cx="70" cy="95" r="3" fill="hsl(var(--destructive))" />
                <circle cx="40" cy="130" r="3" fill="hsl(var(--destructive))" />
                <circle cx="60" cy="110" r="3" fill="hsl(var(--destructive))" />
                <circle cx="25" cy="115" r="3" fill="hsl(var(--destructive))" />
                <circle cx="80" cy="125" r="3" fill="hsl(var(--destructive))" />
                <circle cx="55" cy="105" r="3" fill="hsl(var(--destructive))" />
            </svg>
            <p className="font-bold">الحالة B</p>
        </div>
        {/* Arrow */}
        <svg width="40" height="40" viewBox="0 0 40 40">
            <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
            </defs>
            <line x2="5" y2="20" x1="35" y1="20" stroke="black" strokeWidth="2" markerEnd="url(#arrow)"/>
        </svg>
        {/* Container A (End) */}
        <div className="text-center">
            <svg width="100" height="150" viewBox="0 0 100 150">
                <rect x="10" y="30" width="80" height="110" fill="hsl(var(--card))" stroke="black" strokeWidth="1"/>
                <rect x="5" y="40" width="90" height="10" fill="hsl(var(--muted))" stroke="black"/>
                <rect x="45" y="30" width="10" height="10" fill="hsl(var(--muted))" stroke="black"/>
                 {/* Fewer blue particles */}
                <circle cx="30" cy="60" r="3" fill="hsl(var(--primary))" />
                <circle cx="50" cy="90" r="3" fill="hsl(var(--primary))" />
                <circle cx="70" cy="75" r="3" fill="hsl(var(--primary))" />
                <circle cx="40" cy="110" r="3" fill="hsl(var(--primary))" />
            </svg>
             <p className="font-bold">الحالة A</p>
        </div>
    </div>
);

export const staticQuizLvl1: QuizQuestion[] = [
     {
        question: (
            <div className="space-y-4">
                <p className="font-bold">ادرس المعلومات الواردة في الجدول عن إطار سيارة في وضعين مختلفين (A B) واحسب حجم الهواء داخل الإطار في الوضع B بوحدة L</p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-right">المعلومات داخل الإطار</TableHead>
                            <TableHead className="text-center">الوضع A</TableHead>
                            <TableHead className="text-center">الوضع B</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>درجة حرارة الهواء</TableCell>
                            <TableCell className="text-center">27°C</TableCell>
                            <TableCell className="text-center">10°C</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>ضغط الهواء</TableCell>
                            <TableCell className="text-center">30 atm</TableCell>
                            <TableCell className="text-center">29 atm</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>حجم الهواء</TableCell>
                            <TableCell className="text-center">20.5 L</TableCell>
                            <TableCell className="text-center">??</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>عدد مولات الهواء</TableCell>
                            <TableCell className="text-center">25 mol</TableCell>
                            <TableCell className="text-center">25 mol</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        ),
        options: [
            "25",
            "20",
            "30",
            "50"
        ],
        correctAnswerIndex: 1,
        explanation: "بما أن عدد المولات ثابت والمتغيرات الثلاثة (P V T) تتغير فإننا نستخدم القانون الجامع للغازات (P₁V₁)/T₁ = (P₂V₂)/T₂ أولاً نحول الحرارة إلى كلفن T₁=27+273=300K و T₂=10+273=283K ثم نعوض V₂ = (P₁V₁T₂)/(P₂T₁) = (30 * 20.5 * 283)/(29 * 300) ≈ 20L"
    },
    {
        question: <><span>دورق محكم الإغلاق حجمه </span><span dir="ltr" className="inline-block"><InlineMath math="2L" /></span><span> يحوي غاز النيون Ne وآخر حجمه </span><span dir="ltr" className="inline-block"><InlineMath math="3L" /></span><span> يحوي غاز الزينون Xe وكلاهما له درجة الحرارة والضغط نفسه فإن العلاقة بين عدد مولات الغاز (n) في كل منهما هي</span></>,
        options: [
            <InlineMath math="n_{Ne} = n_{Xe}" />,
            <InlineMath math="n_{Xe} = 1.5 n_{Ne}" />,
            <InlineMath math="n_{Ne} = 1.5 n_{Xe}" />,
            <InlineMath math="n_{Xe} = 0.5 n_{Ne}" />
        ],
        correctAnswerIndex: 1,
        explanation: "وفقًا لقانون أفوجادرو يتناسب الحجم طرديًا مع عدد المولات (V/n = k) عند ثبات الضغط والحرارة V_Ne / n_Ne = V_Xe / n_Xe بالتعويض 2 / n_Ne = 3 / n_Xe بإعادة ترتيب المعادلة نحصل على n_Xe = (3/2) * n_Ne أي n_Xe = 1.5n_Ne"
    },
     {
        question: <span>وعاءان منفصلان لهما نفس الضغط ودرجة الحرارة الأول حجمه <span dir="ltr" className="inline-block">2L</span> ويحتوي على <span dir="ltr" className="inline-block"><InlineMath math="0.4\text{mol}"/></span> من غاز النيون <span dir="ltr" className="inline-block">(Ne)</span> فإذا كان حجم الوعاء الثاني <span dir="ltr" className="inline-block">3L</span> فما عدد مولات غاز الزينون <span dir="ltr" className="inline-block">(Xe)</span> الذي يحتويه</span>,
        options: [
            "0.4mol",
            "0.6mol",
            "0.27mol",
            "0.8mol"
        ],
        correctAnswerIndex: 1,
        explanation: "وفقًا لقانون أفوجادرو فإن النسبة بين الحجم وعدد المولات ثابتة للغازات عند نفس الضغط والحرارة (V₁/n₁ = V₂/n₂) يمكننا حساب عدد مولات الزينون n₂ = (V₂ × n₁) / V₁ = (3L × 0.4mol) / 2L = 0.6mol"
    },
    {
        question: <div><p>ادرس الرسم المجاور الذي يمثل تغيرات على غاز محصور أي العبارات الآتية لا تصف التغير الحاصل من الحالة B إلى الحالة A بشكل صحيح</p><PistonDiagram /></div>,
        options: [
            "تقل الطاقة الحركية ويقل الضغط",
            "يزداد الحجم ويقل عدد الجسيمات",
            "يقل التركيز والضغط",
            "يزداد الحجم وعدد الجسيمات ثابت"
        ],
        correctAnswerIndex: 3,
        explanation: "العبارة الخاطئة هي (يزداد الحجم وعدد الجسيمات ثابت) عند الانتقال من B إلى A نلاحظ أن الحجم يزداد (المكبس يرتفع) ولكن عدد الجسيمات يقل بشكل واضح العبارات الأخرى صحيحة يقل عدد الجسيمات فيزداد الحجم ويقل التركيز والضغط ويفترض أن الطاقة الحركية تقل (اللون تغير من الأحمر للبارد) مما يساهم في انخفاض الضغط"
    },
    {
        question: <div><p>ادرس الرسم المجاور الذي يمثل أربع عينات من الغازات المختلفة في أوعية متساوية الحجم عند نفس درجة الحرارة فإن الوعاء الذي له الضغط الأعلى هو</p><GasSamplesGraph /></div>,
        options: [
            "A",
            "B",
            "C",
            "D"
        ],
        correctAnswerIndex: 1,
        explanation: "وفقًا لقانون أفوجادرو عند ثبات الحجم ودرجة الحرارة يتناسب ضغط الغاز طرديًا مع عدد جسيماته (أو مولاته) الوعاء B يحتوي على أكبر عدد من الجسيمات (5 جسيمات) لذا فإن ضغط الغاز فيه هو الأعلى"
    },
    {
        question: <div><p>إذا كانت الكتل المولية للغازات (D : 32 C : 46 B : 20 A : 18) فإن عينة الغاز الأكثر كثافة هي</p><GasSamplesGraph /></div>,
        options: [
            "A",
            "B",
            "C",
            "D"
        ],
        correctAnswerIndex: 3,
        explanation: "الكثافة (d) تساوي الكتلة (m) مقسومة على الحجم (V) بما أن الحجم ثابت لجميع العينات فإن الأعلى كثافة هي صاحبة الكتلة الأكبر بافتراض أن عدد الجسيمات يمثل عدد المولات (أو نسبة منها) نحسب كتلة نسبية A=3×18=54 B=5×20=100 C=2×46=92 D=4×32=128 العينة D لها الكتلة النسبية الأكبر وبالتالي هي الأعلى كثافة"
    },
    {
        question: <div><p>إذا كانت الكتل المولية للغازات (D : 32 C : 46 B : 20 A : 18) فإن الغاز الأبطأ تدفقا هو</p><GasSamplesGraph /></div>,
        options: [
            "A",
            "B",
            "C",
            "D"
        ],
        correctAnswerIndex: 2,
        explanation: "وفقًا لقانون جراهام فإن الغاز الأبطأ تدفقًا هو الذي يمتلك الكتلة المولية الأعلى بالنظر للكتل المولية المعطاة نجد أن الغاز C له أعلى كتلة مولية (46g/mol) وبالتالي هو الأبطأ تدفقًا"
    },
    {
        "question": "إذا كان لديك مول واحد من غاز الهيليوم (He) ومول واحد من غاز النيتروجين (N2) في وعاءين منفصلين بنفس الحجم ودرجة الحرارة أي العبارات التالية صحيحة؟",
        "options": [
            "ضغط He أكبر من ضغط N2",
            "ضغط N2 أكبر من ضغط He",
            "الضغطان متساويان",
            "لا يمكن تحديد ذلك بدون معرفة الكتلة المولية"
        ],
        "correctAnswerIndex": 2,
        explanation: "وفقًا لفرضية أفوجادرو فإن كميات متساوية من الغازات المختلفة (1mol لكل منهما) عند نفس درجة الحرارة والحجم تحتوي على نفس العدد من الجسيمات وبالتالي تمارس نفس الضغط"
    },
    {
        question: <span>عينة غاز نسبة حجمها إلى درجة حرارتها المطلقة تساوي 0.01 فإن درجة الحرارة °C لهذه العينة عندما يكون حجمها 5L تساوي</span>,
        "options": [
            "500",
            "227",
            "273",
            "773"
        ],
        "correctAnswerIndex": 1,
        explanation: "نسبة الحجم إلى الحرارة المطلقة (V/T) هي ثابت قانون شارل T(K) = V / (V/T) = 5L / 0.01 = 500K بالسيليزيوس T(°C) = 500 - 273 = 227°C"
    },
    {
        question: <span>ينفخ غواص وهو على عمق 10m تحت الماء فقاعة هواء حجمها 0.75L وعندما ارتفعت فقاعة الهواء إلى السطح تغير ضغطها من 2.25atm إلى 1.03atm فإن حجم فقاعة الهواء على السطح يساوي</span>,
        "options": [
            "0.34",
            "0.77",
            "1.68",
            "1.64"
        ],
        "correctAnswerIndex": 3,
        explanation: "هذا تطبيق مباشر لقانون بويل (P₁V₁ = P₂V₂) بالتعويض V₂ = (P₁V₁) / P₂ = (2.25 atm × 0.75 L) / 1.03 atm ≈ 1.64 L"
    },
    {
        question: <span>يكون حجم مول واحد من غاز ثاني أكسيد الكبريت <span dir="ltr">(SO₂)</span> أقل ما يمكن عند</span>,
        "options": [
            <span><span dir="ltr">2 atm</span> و <span dir="ltr">273 K</span></span>,
            <span><span dir="ltr">1 atm</span> و <span dir="ltr">273 K</span></span>,
            <span><span dir="ltr">1 atm</span> و <span dir="ltr">546 K</span></span>,
            <span><span dir="ltr">2 atm</span> و <span dir="ltr">546 K</span></span>
        ],
        "correctAnswerIndex": 0,
        explanation: "وفقًا لقانون الغاز المثالي (V = nRT/P) يكون حجم الغاز أقل ما يمكن عندما تكون درجة الحرارة (T) أقل ما يمكن والضغط (P) أعلى ما يمكن الخيار (أ) يحقق هذه الشروط (أقل درجة حرارة وأعلى ضغط)"
    },
    {
        question: <span>أسطوانة تحتوي عينة من غاز محصور حجمه (V) سخن من درجة حرارة <span dir="ltr">25°C</span> إلى <span dir="ltr">150°C</span> فإن أحد خصائص الغاز الآتية تبقى ثابتة</span>,
        "options": [
            "متوسط سرعة جزيئات الغاز",
            "ضغط الغاز",
            "متوسط الطاقة الحركية والجزيئات",
            "حجم الغاز"
        ],
        "correctAnswerIndex": 3,
        explanation: "الأسطوانة هي وعاء صلب حجمه ثابت لذلك يبقى حجم الغاز ثابتًا بينما يؤدي التسخين إلى زيادة درجة الحرارة مما يزيد من متوسط الطاقة الحركية ومتوسط سرعة الجزيئات وبالتالي يزداد ضغط الغاز وفقًا لقانون جاي لوساك"
    }
];

export const staticQuizLvl2: QuizQuestion[] = [];

export const staticQuizLvl3: QuizQuestion[] = [];
