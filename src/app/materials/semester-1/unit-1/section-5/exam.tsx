
'use client';

import React from 'react';
import { cn } from '@/lib/utils.tsx';
import { InlineMath, BlockMath } from 'react-katex';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';


export interface QuizQuestion {
    question: React.ReactNode;
    options: React.ReactNode[];
    correctAnswerIndex: number;
    explanation: string | React.ReactNode;
}

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
                            <TableCell className="text-center"><span dir="ltr">27°C</span></TableCell>
                            <TableCell className="text-center"><span dir="ltr">10°C</span></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>ضغط الهواء</TableCell>
                            <TableCell className="text-center">30atm</TableCell>
                            <TableCell className="text-center">29atm</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>حجم الهواء</TableCell>
                            <TableCell className="text-center">20.5L</TableCell>
                            <TableCell className="text-center">??</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>عدد مولات الهواء</TableCell>
                            <TableCell className="text-center">25mol</TableCell>
                            <TableCell className="text-center">25mol</TableCell>
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
        explanation: "بما أن عدد المولات ثابت والمتغيرات الثلاثة (PVT) تتغير فإننا نستخدم القانون الجامع للغازات (P₁V₁)/T₁ = (P₂V₂)/T₂ أولاً نحول الحرارة إلى كلفن T₁=27+273=300K و T₂=10+273=283K ثم نعوض V₂ = (P₁V₁T₂)/(P₂T₁) = (30*20.5*283)/(29*300) ≈ 20L"
    },
    {
        question: <><span>دورق محكم الإغلاق حجمه </span><span dir="ltr"><InlineMath math="2L" /></span><span> يحوي غاز النيون Ne وآخر حجمه </span><span dir="ltr"><InlineMath math="3L" /></span><span> يحوي غاز الزينون Xe وكلاهما له درجة الحرارة والضغط نفسه فإن العلاقة بين عدد مولات الغاز (n) في كل منهما هي</span></>,
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
        question: <div><p>ادرس الرسم المجاور الذي يمثل أربع عينات من الغازات المختلفة في أوعية متساوية الحجم عند نفس درجة الحرارة فإن الوعاء الذي له الضغط الأعلى هو</p><Image src="https://i.ibb.co/Cpn3JgfY/3.png" alt="3" width={300} height={200} className="rounded-lg border bg-white" data-ai-hint="gas samples experiment"/></div>,
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
        question: <div><p>إذا كانت الكتل المولية للغازات (D : 32 C : 46 B : 20 A : 18) فإن الغاز الأبطأ تدفقا هو</p><Image src="https://i.ibb.co/Cpn3JgfY/3.png" alt="3" width={300} height={200} className="rounded-lg border bg-white" data-ai-hint="gas samples experiment"/></div>,
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
        question: "إذا كان لديك مول واحد من غاز الهيليوم (He) ومول واحد من غاز النيتروجين (N2) في وعاءين منفصلين بنفس الحجم ودرجة الحرارة أي العبارات التالية صحيحة؟",
        options: [
            "ضغط He أكبر من ضغط N2",
            "ضغط N2 أكبر من ضغط He",
            "الضغطان متساويان",
            "لا يمكن تحديد ذلك بدون معرفة الكتلة المولية"
        ],
        correctAnswerIndex: 2,
        explanation: "وفقًا لفرضية أفوجادرو فإن كميات متساوية من الغازات المختلفة (1mol لكل منهما) عند نفس درجة الحرارة والحجم تحتوي على نفس العدد من الجسيمات وبالتالي تمارس نفس الضغط"
    },
    {
        question: <span>عينة غاز نسبة حجمها إلى درجة حرارتها المطلقة تساوي 0.01 فإن درجة الحرارة °C لهذه العينة عندما يكون حجمها 5L تساوي</span>,
        options: [
            "500",
            "227",
            "273",
            "773"
        ],
        correctAnswerIndex: 1,
        explanation: "نسبة الحجم إلى الحرارة المطلقة (V/T) هي ثابت قانون شارل T(K) = V / (V/T) = 5L / 0.01 = 500K بالسيليزيوس T(°C) = 500 - 273 = 227°C"
    },
    {
        question: <span>ينفخ غواص وهو على عمق 10m تحت الماء فقاعة هواء حجمها 0.75L وعندما ارتفعت فقاعة الهواء إلى السطح تغير ضغطها من 2.25atm إلى 1.03atm فإن حجم فقاعة الهواء على السطح يساوي</span>,
        options: [
            "0.34",
            "0.77",
            "1.68",
            "1.64"
        ],
        correctAnswerIndex: 3,
        explanation: "هذا تطبيق مباشر لقانون بويل (P₁V₁ = P₂V₂) بالتعويض V₂ = (P₁V₁)/P₂ = (2.25atm × 0.75L)/1.03atm ≈ 1.64L"
    },
    {
        question: <span>يكون حجم مول واحد من غاز ثاني أكسيد الكبريت <span dir="ltr">(SO₂)</span> أقل ما يمكن عند</span>,
        options: [
            <span><span dir="ltr">2atm</span> و <span dir="ltr">273K</span></span>,
            <span><span dir="ltr">1atm</span> و <span dir="ltr">273K</span></span>,
            <span><span dir="ltr">1atm</span> و <span dir="ltr">546K</span></span>,
            <span><span dir="ltr">2atm</span> و <span dir="ltr">546K</span></span>
        ],
        correctAnswerIndex: 0,
        explanation: "وفقًا لقانون الغاز المثالي (V = nRT/P) يكون حجم الغاز أقل ما يمكن عندما تكون درجة الحرارة (T) أقل ما يمكن والضغط (P) أعلى ما يمكن الخيار الذي يحقق هذه الشروط هو أقل درجة حرارة وأعلى ضغط"
    },
    {
        question: <span>أسطوانة تحتوي عينة من غاز محصور حجمه (V) سخن من درجة حرارة <span dir="ltr">25°C</span> إلى <span dir="ltr">150°C</span> فإن أحد خصائص الغاز الآتية تبقى ثابتة</span>,
        options: [
            "متوسط سرعة جزيئات الغاز",
            "ضغط الغاز",
            "متوسط الطاقة الحركية والجزيئات",
            "حجم الغاز"
        ],
        correctAnswerIndex: 3,
        explanation: "الأسطوانة هي وعاء صلب حجمه ثابت لذلك يبقى حجم الغاز ثابتًا بينما يؤدي التسخين إلى زيادة درجة الحرارة مما يزيد من متوسط الطاقة الحركية ومتوسط سرعة الجزيئات وبالتالي يزداد ضغط الغاز وفقًا لقانون جاي لوساك"
    },
    {
        question: "يستغرق نضج الطعام في المناطق المرتفعة زمنا أطول منه في المناطق المنخفضة وذلك لأن",
        options: [
            "نسبة الأكسجين في المناطق المرتفعة أقل فيحتاج زمنا أطول",
            "الضغط الجوي في المناطق المرتفعة أكبر فتزيد درجة الغليان فيحتاج زمنا أطول",
            "الضغط الجوي في المناطق المرتفعة أقل فتقل درجة الغليان فيحتاج زمنا أطول",
            "الضغط الجوي في المناطق المنخفضة أكبر فتزيد درجة الغليان فيحتاج زمنا أطول"
        ],
        correctAnswerIndex: 2,
        explanation: "في المناطق المرتفعة يكون الضغط الجوي أقل مما يجعل الماء يغلي عند درجة حرارة أقل من 100 درجة مئوية والطهي عند درجة حرارة منخفضة يستغرق وقتا أطول لنضج الطعام",
    }
];

export const staticQuizLvl2: QuizQuestion[] = [
    {
        question: (
            <div>
                <p>ادرس الرسم المجاور الذي يمثل تغيرات على غاز محصور أي العبارات الآتية لا تصف التغير الحاصل من الحالة B إلى الحالة A بشكل صحيح</p>
                <Image src="https://i.ibb.co/Xxd9x9K/3.png" alt="Piston states" width={300} height={150} className="mx-auto my-2 rounded-lg" data-ai-hint="gas piston" />
            </div>
        ),
        options: [
            "تقل الطاقة الحركية ويقل الضغط",
            "يزداد الحجم ويقل عدد الجسيمات",
            "يقل التركيز والضغط",
            "يزداد الحجم وعدد الجسيمات ثابت"
        ],
        correctAnswerIndex: 3,
        explanation: "العبارة الخاطئة هي (يزداد الحجم وعدد الجسيمات ثابت) لأن الرسم يوضح أن عدد الجسيمات يقل (من 5 إلى 4) عند الانتقال من B إلى A"
    },
    {
        question: "العبارة الخاطئة فيما يتعلق بالغازين A , B إذا علمت أن سرعة تبخر A أكبر من سرعة تبخر B :",
        options: [
            "درجة تكاثف الغاز A أكبر",
            "الضغط البخاري للغاز A أكبر عند نفس درجة الحرارة",
            "درجة غليان الغاز A المعيارية أقل",
            "قوى الترابط بين جزيئات الغاز A أضعف"
        ],
        correctAnswerIndex: 0,
        explanation: "بما أن سرعة تبخر A أكبر فهذا يعني أن قوى الترابط بين جزيئاته أضعف وضغطه البخاري أعلى ودرجة غليانه أقل ودرجة تكاثفه أقل وليس أكبر",
    },
    {
        question: <><span>لديك عينتان من غازين مختلفين، A و B، في وعاءين متماثلين عند نفس درجة الحرارة والضغط إذا كانت الكتلة المولية للغاز A ضعف الكتلة المولية للغاز B، فأي العبارات التالية صحيحة؟</span></>,
        options: [
            "كثافة الغاز A تساوي كثافة الغاز B",
            "كثافة الغاز A ضعف كثافة الغاز B",
            "سرعة انتشار الغاز A أكبر من سرعة انتشار B",
            "يحتوي الوعاءان على نفس كتلة الغاز"
        ],
        correctAnswerIndex: 1,
        explanation: "بما أن الظروف (P V T) متساوية فإن عدد مولات الغازين متساوٍ (قانون أفوجادرو) الكثافة d = m/V = (n×Mr)/V بما أن n و V متساويان فإن الكثافة تتناسب طرديًا مع الكتلة المولية (Mr) لذا كثافة الغاز A هي ضعف كثافة الغاز B"
    },
    {
        question: "أي سائل مما يلي هو الأسرع تبخرًا والأقل في درجة الغليان؟",
        options: [
            "الماء (H₂O) - روابط هيدروجينية",
            "الأسيتون (CH₃COCH₃) - ثنائي القطب",
            "البنتان (C₅H₁₂) - قوى لندن",
            "الإيثانول (CH₃CH₂OH) - روابط هيدروجينية"
        ],
        correctAnswerIndex: 2,
        explanation: "سرعة التبخر ودرجة الغليان تعتمدان عكسيًا على قوة الترابط البنتان جزيء غير قطبي يمتلك أضعف قوى ترابط (قوى لندن فقط) بينما الماء والإيثانول يمتلكان أقوى الروابط (هيدروجينية) والأسيتون يمتلك قوى متوسطة (ثنائي القطب) لذا البنتان هو الأسرع تبخرًا والأقل في درجة الغليان"
    },
    {
        question: <><span>وعاء حجمه 2L يحتوي على خليط من 04mol من غاز N₂ و 06mol من غاز O₂ عند درجة حرارة <span dir="ltr">27°C</span> ما هو الضغط الجزئي لغاز الأكسجين (O₂؟)</span></>,
        options: [
            "7.38atm",
            "12.3atm",
            "4.92atm",
            "0.6atm"
        ],
        correctAnswerIndex: 0,
        explanation: "أولاً نحسب الضغط الكلي للخليط باستخدام قانون الغاز المثالي n_total = 0.4 + 0.6 = 1.0mol T = 27 + 273 = 300K P_total = (nRT)/V = (1.0 * 0.082 * 300) / 2 = 12.3atm ثانيًا نحسب الضغط الجزئي للأكسجين: P_O₂ = X_O₂ * P_total = (0.6 / 1.0) * 12.3 = 7.38atm"
    },
    {
        question: "ماذا يحدث لكثافة غاز مثالي إذا انخفض ضغطه إلى النصف وزادت درجة حرارته المطلقة إلى الضعف؟",
        options: [
            "تقل إلى الربع",
            "تزداد 4 مرات",
            "تبقى ثابتة",
            "تقل إلى النصف"
        ],
        correctAnswerIndex: 0,
        explanation: "من قانون الغاز المثالي يمكن اشتقاق علاقة الكثافة: d = (P × Mr) / (R × T) الكثافة (d) تتناسب طرديًا مع الضغط وعكسيًا مع الحرارة إذا أصبح الضغط P/2 والحرارة 2T فإن الكثافة الجديدة ستتناسب مع (P/2)/(2T) = P/(4T) أي أنها ستقل إلى الربع"
    },
    {
        question: (
            <>
                <span>عينة من غاز محصور عند درجة حرارة</span>
                <span dir="ltr" className="inline-block mx-1">35°C</span>
                <span>فإن درجة الحرارة بوحدة</span>
                <span dir="ltr" className="inline-block mx-1">°C</span>
                <span>التي يصبح عندها حجمها مثلي حجمه الأصلي عند ثبات الضغط:</span>
            </>
        ),
        options: ["343", "70", "308", "17.5"],
        correctAnswerIndex: 0,
        explanation: (
            <>
                <span>أولاً، نحول درجة الحرارة الابتدائية إلى كلفن:</span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="T_1 = 35 + 273 = 308\text{K}"/></span>
                <span>. حسب قانون شارل، العلاقة بين الحجم والحرارة طردية:</span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="V_1/T_1 = V_2/T_2"/></span>
                <span>. بما أن الحجم النهائي مثلي الحجم الأصلي</span>
                <span dir="ltr" className="inline-block mx-1">(<InlineMath math="V_2 = 2V_1"/>)</span>
                <span>، فإن درجة الحرارة المطلقة يجب أن تتضاعف أيضًا:</span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="T_2 = 2 \times T_1 = 2 \times 308 = 616\text{K}"/></span>
                <span>. أخيرًا، نحول درجة الحرارة النهائية مرة أخرى إلى سيليزيوس:</span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="T_2(^\circ\text{C}) = 616 - 273 = 343^\circ\text{C}"/></span>
            </>
        ),
    },
    {
        question: (
            <>
                <span>عينة من غاز محصور حجمها</span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="1L"/></span>
                <span>، إذا أصبحت قيمة كل من درجة حرارتها المطلقة وضغطها 3 أمثال قيمها الأصلية، فإن حجمها بوحدة L يصبح:</span>
            </>
        ),
        options: ["9", "3", "1", "0.33"],
        correctAnswerIndex: 2,
        explanation: (
            <>
                <span>وفقًا للقانون الجامع للغازات </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="\frac{P_1V_1}{T_1} = \frac{P_2V_2}{T_2}"/></span>
                <span> لدينا </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="P_2 = 3P_1"/></span>
                <span> و </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="T_2 = 3T_1"/></span>
                <span> بالتعويض </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="\frac{P_1 \times 1}{T_1} = \frac{(3P_1) \times V_2}{3T_1}"/></span>
                <span> بعد الاختصار نجد أن </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="V_2 = 1L"/></span>
                <span> أي أن الحجم يبقى ثابتًا</span>
            </>
        )
    },
    {
        question: (
            <>
                <span>إذا خلط </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{mol}"/></span><span> من الغاز A ضغطه </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{atm}"/></span><span> وحجمه </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{L}"/></span><span> مع </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{mol}"/></span><span> من الغاز B ضغطه </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{atm}"/></span><span> وحجمه </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{L}"/></span><span> في وعاء حجمه </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{L}"/></span><span> فحدث التفاعل </span><span dir="ltr" className="inline-block"><InlineMath math="A(g) + B(g) \rightarrow 3C(g)"/></span><span> فإن الضغط الكلي بعد انتهاء التفاعل:</span>
            </>
        ),
        options: ["2", "4", "3", "1"],
        correctAnswerIndex: 2,
        explanation: "يتفاعل 1mol من A مع 1mol من B لإنتاج 3mol من C. بما أن الضغط يتناسب طرديًا مع عدد المولات عند ثبات الحجم والحرارة والعدد الكلي للمولات أصبح 3 فإن الضغط الكلي سيصبح 3atm"
    },
    {
        question: (
            <>
                <span>إذا خلط </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{mol}" /></span><span> من الغاز A ضغطه </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{atm}" /></span><span> وحجمه </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{L}" /></span><span> مع </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{mol}" /></span><span> من الغاز B ضغطه </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{atm}" /></span><span> وحجمه </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{L}" /></span><span> في وعاء حجمه </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{L}" /></span><span> فحدث التفاعل </span><span dir="ltr" className="inline-block"><InlineMath math="A(g) + 2B(g) \rightarrow 3C(g)" /></span><span> فإن الضغط الكلي بعد انتهاء التفاعل</span>
            </>
        ),
        options: [
            "2atm",
            "4atm",
            "3atm",
            "1atm"
        ],
        correctAnswerIndex: 0,
        explanation: (
            <>
                <span>المادة المحددة للتفاعل هي B (نحتاج 2 مول ولدينا 1 مول فقط) سيتفاعل 05 مول من A مع 1 مول من B وينتج 15 مول من C سيتبقى 05 مول من A العدد الكلي للمولات النهائية = 15 (C) + 05 (A) = 2 مول إذن الضغط النهائي سيكون 2atm</span>
            </>
        ),
    },
     {
        question: "السائل الذي له أقل طاقة تبخر مولية هو",
        options: [
            "CH₃CH₂CH₂F",
            "CH₃CH₂CH₂CH₃",
            "CH₃COCH₃",
            "CH₃CH₂CH₂OH"
        ],
        correctAnswerIndex: 1,
        explanation: "أقل طاقة تبخر مولية تعني أضعف قوى ترابط بين الجزيئات مركب البوتان (ب) هو مركب غير قطبي يمتلك أضعف أنواع القوى (قوى لندن فقط) مقارنة بالمركبات الأخرى التي تمتلك قوى ثنائية القطب أو روابط هيدروجينية أقوى",
    },
    {
        question: "يوضح الجدول الضغط البخاري بوحدة mmHg لعدد من السوائل أعطيت الرموز الإفتراضية A B C D عند درجة حرارة معينة فإن العلاقة غير الصحيحة التي تربط سرعة تبخر هذه السوائل هي",
        options: [
            "B < D",
            "C < A",
            "B < C",
            "D < A"
        ],
        correctAnswerIndex: 0,
        explanation: "سرعة التبخر تتناسب طرديًا مع الضغط البخاري وترتيب سرعة التبخر من الأبطأ إلى الأسرع هو D < B < C < A والعلاقة (أ) B < D غير صحيحة لأن الضغط البخاري لـ B (55) أكبر من D (40) مما يعني أن سرعة تبخر B أكبر من D"
    },
    {
        question: (
            <>
                <p>اعتمادا على الشكل المجاور إذا علمت أن المسافة A تمثل الضغط الجوي في الظروف المعيارية فإن قيمة الضغط على سطح السائل المحصور عند A تساوي</p>
                <div className="flex justify-center my-2">
                    <Image 
                        src="https://i.ibb.co/zhsx01WH/image.jpg" 
                        alt="image" 
                        width={400}
                        height={250}
                        className="rounded-lg border bg-white"
                        data-ai-hint="manometer gas pressure"
                    />
                </div>
            </>
        ),
        options: [
            <span dir="ltr">101 kPa</span>,
            <span dir="ltr">1.5 atm</span>,
            <span dir="ltr">570 mmHg</span>,
            <span dir="ltr">0.75 atm</span>
        ],
        correctAnswerIndex: 0,
        explanation: (
             <div className="space-y-3 text-right" dir="rtl">
                <p>الضغط على سطح السائل المحصور عند النقطة A  ويساوي 1atm أو 760mmHg أو 101kPaهو الضغط الجوي بمقدار ارتفاع عمود الزئبق</p>
            </div>
        ),
    }
];

export const staticQuizLvl3: QuizQuestion[] = [
    {
        question: <div><p>اعتمادا على الرسم البياني فإن درجة حرارة التي يكون عندها انحراف غاز النيتروجين عن السلوك المثالي أقل ما يمكن</p><Image src="https://i.ibb.co/rRgwmZcY/5.png" alt="Gas Laws Graph" width={400} height={250} className="rounded-lg border bg-white mx-auto" data-ai-hint="gas laws graph"/></div>,
        options: ["200K", "273K", "500K", "1000K"],
        correctAnswerIndex: 3,
        explanation: "الخط المتقطع عند القيمة 1 يمثل سلوك الغاز المثالي المنحنى الأقرب لهذا الخط يمثل أقل انحراف منحنى درجة الحرارة 1000K هو الأقرب للخط المثالي مما يعني أن سلوك الغاز يكون أقرب للمثالي عند درجات الحرارة المرتفعة"
    },
     {
        question: <div><p>اعتمادا على الرسم البياني فإن ما سبب انخفاض قيمة PV/nRT عن 1 عند درجة حرارة 200K وضغط 200atm؟</p><Image src="https://i.ibb.co/rRgwmZcY/5.png" alt="Gas Laws Graph" width={400} height={250} className="rounded-lg border bg-white mx-auto" data-ai-hint="gas laws graph"/></div>,
        options: [
            "زيادة قوى التجاذب بين جسيمات الغاز",
            "زيادة حجم الغاز ونقصان طاقة جسيماته الحركية",
            "تباعد جسيمات الغاز عن بعضها",
            "تحول الغاز إلى سائل"
        ],
        correctAnswerIndex: 0,
        explanation: "عند درجات الحرارة المنخفضة والضغوط المعتدلة تصبح قوى التجاذب بين الجسيمات مؤثرة هذه القوى تجذب الجسيمات لبعضها مما يقلل من تصادمها مع جدار الوعاء وبالتالي يقلل الضغط الفعلي للغاز عن الضغط المثالي فتصبح قيمة PV/nRT أقل من 1"
    },
     {
        question: <div><p>اعتمادا على الرسم البياني فإن سبب ارتفاع قيمة PV/nRT عن 1 عند قيم الضغط المرتفعة جدًا هو</p><Image src="https://i.ibb.co/rRgwmZcY/5.png" alt="Gas Laws Graph" width={400} height={250} className="rounded-lg border bg-white mx-auto" data-ai-hint="gas laws graph"/></div>,
        options: [
            "زيادة حجم الغاز وتباعد جسيمات الغاز",
            "زيادة حجم الغاز ونقصان طاقة جسيماته الحركية",
            "صغر حجم الوعاء وتأثير حجم الجسيمات",
            "نقصان حجم الغاز وتحول الغاز إلى سائل"
        ],
        correctAnswerIndex: 2,
        explanation: "عند الضغوط المرتفعة جدًا تتقارب الجسيمات بشكل كبير بحيث يصبح حجم الجسيمات نفسها (الذي يهمله نموذج الغاز المثالي) مؤثرًا ولا يمكن إهماله مقارنة بالحجم الكلي مما يؤدي إلى زيادة قيمة PV/nRT عن 1"
    },
    {
        question: (
            <div className="space-y-4">
                <p>اعتمادا على الرسم المجاور والذي يمثل العلاقة بين درجة الحرارة (°C) والضغط البخاري (mmHg) لأربعة سوائل فإن درجة الغليان الطبيعية للأسيتون تساوي</p>
                <div className="flex justify-center my-4">
                     <Image
                        src="https://i.ibb.co/FbjSx8p6/3.png"
                        alt="منحنيات الضغط البخاري"
                        width={500}
                        height={300}
                        className="rounded-lg border bg-white"
                        data-ai-hint="vapor pressure curves"
                    />
                </div>
            </div>
        ),
        options: ["56°C", "760°C", "220°C", "650°C"],
        correctAnswerIndex: 0,
        explanation: <span>درجة الغليان الطبيعية هي درجة الحرارة التي يتساوى عندها الضغط البخاري للسائل مع الضغط الجوي الطبيعي (760mmHg) من الرسم البياني نجد أن ضغط بخار الأسيتون يصل إلى 760mmHg عند درجة حرارة <span dir="ltr">56°C</span></span>
    },
    {
        question: (
            <div className="space-y-4">
                <p>اعتمادا على الرسم المجاور والذي يمثل العلاقة بين درجة الحرارة والضغط البخاري لأربعة سوائل فإن المادة التي لها أعلى طاقة تكاثف مولية هي</p>
                <div className="flex justify-center">
                    <Image
                        src="https://i.ibb.co/FbjSx8p6/3.png"
                        alt="منحنيات الضغط البخاري"
                        width={500}
                        height={300}
                        className="rounded-lg border bg-white"
                        data-ai-hint="vapor pressure curves"
                    />
                </div>
            </div>
        ),
        options: ["الماء", "الإيثانول", "ثنائي إيثيل إيثر", "الأسيتون"],
        correctAnswerIndex: 0,
        explanation: "أعلى طاقة تكاثف مولية (وهي تساوي طاقة التبخر بالقيمة) تعني أقوى قوى ترابط بين الجزيئات وهذا يؤدي إلى أقل ضغط بخاري عند أي درجة حرارة معينة بالنظر إلى الرسم البياني نجد أن الماء له أقل ضغط بخاري مما يدل على أن قوى الترابط بين جزيئاته هي الأقوى"
    },
     {
        question: (
            <div className="space-y-4">
                <p>اعتمادا على الرسم المجاور والذي يمثل العلاقة بين درجة الحرارة والضغط البخاري لأربعة سوائل فإن الضغط البخاري للأسيتون عند درجة غليانه الطبيعية يساوي</p>
                <div className="flex justify-center">
                    <Image
                        src="https://i.ibb.co/FbjSx8p6/3.png"
                        alt="منحنيات الضغط البخاري"
                        width={500}
                        height={300}
                        className="rounded-lg border bg-white"
                        data-ai-hint="vapor pressure curves"
                    />
                </div>
            </div>
        ),
        options: ["56mmHg", "760mmHg", "220mmHg", "650mmHg"],
        correctAnswerIndex: 1,
        explanation: <span>درجة الغليان الطبيعية هي درجة الحرارة التي يتساوى عندها الضغط البخاري للسائل مع الضغط الجوي الطبيعي (1atm أو 760mmHg)</span>
    },
    {
        question: <div><p>أي من المركبات التالية له أقل طاقة تكاثف مولية؟</p><p className="text-xs text-muted-foreground">(تلميح: طاقة التكاثف الأقل تعني قوى الترابط الأضعف)</p></div>,
        options: [
            "CH₃(CH₂)₃CH₃ (بنتان)",
            "CH₃C(CH₃)₂CH₃ (نيوبنتان)",
            "CH₃CH₂OH (إيثانول)",
            "CH₃Cl (كلوروميثان)"
        ],
        correctAnswerIndex: 1,
        explanation: "الإيثانول (روابط هيدروجينية) والكلوروميثان (ثنائي القطب) لهما قوى ترابط قوية البنتان والنيوبنتان كلاهما غير قطبي ولهما نفس الكتلة المولية لكن النيوبنتان أكثر تفرعًا وشكله أقرب للكرة مما يقلل من مساحة السطح المتاحة للتجاذب ويضعف قوى لندن بشكل كبير وبالتالي يمتلك أقل طاقة تكاثف"
    },
    {
        question: <div><p>أي من المركبات التالية له أعلى درجة غليان؟</p></div>,
        "options": [
            "CH₃COOH",
            "CH₃CH₂Cl",
            "CH₃COCH₃",
            "CH₃CH₃"
        ],
        "correctAnswerIndex": 0,
        "explanation": "حمض الأسيتيك (CH₃COOH) هو الوحيد القادر على تكوين روابط هيدروجينية قوية جدًا على شكل دايمر (جزيئين معًا) مما يرفع درجة غليانه بشكل كبير مقارنة ببقية المركبات التي تمتلك قوى ثنائي القطب أو قوى لندن فقط"
    },
    {
        question: (
            <>
                <span>الضغط البخاري لنونان (</span>
                <span dir="ltr" className="font-mono"><InlineMath math="CH₃(CH₂)₇CH₃"/></span>
                <span>) أقل من 3،3-ثنائي إيثيل بنتان (</span>
                <span dir="ltr" className="font-mono"><InlineMath math="C(CH₂CH₃)₄"/></span>
                <span>) لأن نونان:</span>
            </>
        ),
        options: [
            "أقل تفرعات",
            "أقل كتلة مولية",
            "ترابطه ثنائي قطب",
            "ترابطه هيدروجيني"
        ],
        correctAnswerIndex: 0,
        explanation: "كلا المركبين لهما نفس الكتلة المولية وهما غير قطبيين (قوى لندن فقط) النونان (سلسلة مستقيمة) أقل تفرعًا مما يعطيه مساحة سطح أكبر للتجاذب فتزداد قوة قوى لندن ويقل ضغطه البخاري"
    },
        {
        question: (
            <div className="space-y-4">
                <p>اعتمادا على الرسم المجاور والمتعلق بالمواد <span dir="ltr" className="font-mono inline-block"><InlineMath math="CH_3CH_2OH"/></span>, <span dir="ltr" className="font-mono inline-block"><InlineMath math="CH_4"/></span>, <span dir="ltr" className="font-mono inline-block"><InlineMath math="CH_3CH_3"/></span>, <span dir="ltr" className="font-mono inline-block"><InlineMath math="CH_3Cl"/></span> فإن الرمز الذي يمثل الطاقة اللازمة لتبخر السائل <span dir="ltr" className="font-mono inline-block"><InlineMath math="CH_3Cl"/></span> هو:</p>
                <div className="flex justify-center">
                    <Image
                        src="https://i.ibb.co/hF9Fm0hw/22.png"
                        alt="Vapor Pressure vs Temperature for four liquids"
                        width={400}
                        height={250}
                        className="rounded-lg border bg-white"
                        data-ai-hint="vapor pressure curves"
                    />
                </div>
            </div>
        ),
        options: ["M", "W", "R", "Q"],
        correctAnswerIndex: 1,
        explanation: "بناءً على الترتيب الصحيح لقوى الترابط (روابط هيدروجينية > ثنائي القطب > قوى لندن)، يكون للمركب CH3Cl (ثنائي القطب) طاقة تبخر متوسطة ويمثله الرمز (W) الذي يتطلب طاقة أقل من الإيثانول (Q) وأكبر من الميثان والإيثان (M, E)."
    },
    {
        question: (
            <div className="space-y-4">
                <p>اعتمادا على الرسم البياني، المادة التي لها أعلى درجة غليان معيارية هي:</p>
                <div className="flex justify-center">
                    <Image
                        src="https://i.ibb.co/dwTN2WHw/3.png"
                        alt="منحنيات الضغط البخاري"
                        width={400}
                        height={250}
                        className="rounded-lg border bg-white"
                        data-ai-hint="vapor pressure curves"
                    />
                </div>
            </div>
        ),
        options: ["CH₃COOH", "H₂O", "C₆H₁₄", "CCl₄"],
        correctAnswerIndex: 0,
        explanation: <span>أعلى درجة غليان معيارية تعني أقوى قوى ترابط بين الجزيئات، وبالتالي أقل ضغط بخاري عند درجة حرارة معينة. من الرسم البياني، نجد أن CH₃COOH (حمض الخل) يمتلك أقل ضغط بخاري ويتطلب أعلى درجة حرارة ليصل ضغطه البخاري إلى 760mmHg، مما يدل على أن قوى الترابط (الروابط الهيدروجينية على شكل دايمر) هي الأقوى.</span>
    },
    {
        question: "لماذا لا يمكن اعتبار الفوليرين (C₆₀) مادة صلبة شبكية تساهمية على الرغم من أن ذرات الكربون فيه ترتبط تساهميًا",
        options: [
            "لأنه موصل للكهرباء",
            "لأن درجة انصهاره منخفضة",
            "لأنه يتكون من جزيئات C₆₀ منفصلة ترتبط بقوى لندن",
            "لأنه لا يتكون من الكربون"
        ],
        correctAnswerIndex: 2,
        explanation: "المادة الشبكية التساهمية هي شبكة واحدة عملاقة من الذرات المترابطة أما الفوليرين فيتكون من وحدات منفصلة هي جزيئات C₆₀ وهذه الجزيئات ترتبط ببعضها في الحالة الصلبة بقوى بين جزيئية ضعيفة (قوى لندن) لذا يصنف كمادة جزيئية"
    },
    {
        question: "أي خاصية من الخصائص التالية تعتبر فرقًا رئيسيًا بين معظم المواد الفلزية والمواد الأيونية؟",
        options: [
            "المواد الفلزية صلبة، بينما الأيونية سائلة",
            "المواد الفلزية توصل الكهرباء في الحالة الصلبة، بينما الأيونية لا توصل",
            "المواد الفلزية هشة، بينما الأيونية قابلة للطرق",
            "المواد الفلزية لها درجات انصهار منخفضة، بينما الأيونية لها درجات انصهار مرتفعة"
        ],
        correctAnswerIndex: 1,
        explanation: "الفرق الرئيسي هو التوصيل الكهربائي في الحالة الصلبة. الفلزات توصل الكهرباء بسبب بحر الإلكترونات الحرة. المواد الأيونية لا توصل في الحالة الصلبة لأن أيوناتها مقيدة الحركة، ولكنها توصل في حالة المصهور أو المحلول."
    },
    {
        question: "مادة صلبة درجة انصهارها مرتفعة توصل الكهرباء في الحالتين الصلبة والسائلة هي:",
        options: [
            "ملح الطعام",
            "الحديد",
            "أكسيد السيليكون (IV)",
            "بكمنسترفولرين"
        ],
        correctAnswerIndex: 1,
        explanation: "الحديد فلز، والفلزات تتميز بارتفاع درجات انصهارها وقدرتها على توصيل الكهرباء في الحالتين الصلبة والسائلة لوجود إلكترونات حرة. ملح الطعام (أيوني) لا يوصل وهو صلب. أكسيد السيليكون (شبكي تساهمي) و بكمنسترفولرين (جزيئي) مواد عازلة."
    },
    {
        question: (
            <>
                <span>وعاء يحتوي على </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="5L"/></span>
                <span> من غاز الأكسجين عند درجة حرارة </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="20^\circ C"/></span>
                <span> وضغط </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="1.5atm"/></span>
                <span> إذا علمت أن الكتلة المولية للأكسجين تساوي </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="16g/mol"/></span>
                <span> فإن كتلة الأكسجين في الوعاء تساوي</span>
            </>
        ),
        options: [
            "5g",
            "10g",
            "10.7g",
            "5.4g"
        ],
        correctAnswerIndex: 1,
        explanation: (
            <>
                <span>أولاً نحسب عدد مولات الأكسجين باستخدام قانون الغاز المثالي </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="PV=nRT"/></span>
                <span> يجب تحويل الحرارة إلى كلفن </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="T = 20 + 273 = 293K"/></span>
                <span> إذن </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="n = \frac{PV}{RT} = \frac{1.5 \times 5}{0.0821 \times 293} \approx 0.312 \text{ mol}"/></span>
                <span> ثانياً نحسب الكتلة انتبه إلى أن غاز الأكسجين هو </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="O_2"/></span>
                <span> لذا كتلته المولية </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="Mr = 2 \times 16 = 32 g/mol"/></span>
                <span> الكتلة = </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="n \times Mr = 0.312 \times 32 \approx 9.98g"/></span>
                <span> وهي الأقرب إلى 10g</span>
            </>
        )
    },
    {
    question: (
        <>
            <p>اعتمادا على الشكل المجاور فإن قيمة X تساوي</p>
            <div className="flex justify-center my-2">
                <Image 
                    src="https://i.ibb.co/9HYRwqWj/image.jpg"
                    alt="Boyle's Law Graph" 
                    width={200}
                    height={150}
                    className="rounded-lg border bg-white"
                    data-ai-hint="Boyle's law graph"
                />
            </div>
        </>
    ),
    options: [
        <span dir="ltr">0.08 atm</span>,
        <span dir="ltr">608 mmHg</span>,
        <span dir="ltr">0.6 atm</span>,
        <span dir="ltr">808 kPa</span>
    ],
    correctAnswerIndex: 1,
    explanation: (
         <div className="space-y-3 text-right" dir="rtl">
            <p>يمثل الشكل العلاقة العكسية بين الضغط والحجم وفقا لقانون بويل</p>
            <div className="text-center" dir="ltr"><BlockMath math="P_1V_1 = P_2V_2" /></div>
            <p>من الشكل نجد أن النقطة الأولى هي P₁=02atm و V₁=12L والنقطة الثانية هي P₂=X و V₂=03L</p>
            <p>بالتعويض في القانون</p>
            <div className="text-center" dir="ltr"><BlockMath math="(0.2)(1.2) = X(0.3)" /></div>
            <div className="text-center" dir="ltr"><BlockMath math="X = \frac{0.24}{0.3} = 0.8 \text{ atm}" /></div>
            <p>الإجابة ليست موجودة مباشرة في الخيارات لذا يجب تحويل الوحدات للتحقق</p>
            <p> 608mmHg نحوله إلى mmHg بالضرب في 760 يصبح الجواب</p>
            <div className="text-center" dir="ltr"><BlockMath math="{0.8}\times{760} = 608 \text{ atm}" /></div>
        </div>
    )
    },
    {
        question: (
            <>
                <span>وعاء حجمه 1.64L يحتوي على 1.1g CO₂ و 1.6g O₂ وكتلة مجهولة من N₂ عند درجة حرارة <span dir="ltr">27°C</span> وضغط 1.5atm إذا علمت أن الكتل المولية N=14 C=12 O=16 فإن الضغوط الجزئية للغازات (O₂ / CO₂) على الترتيب</span>
            </>
        ),
        options: [
            "0.050/0.025",
            "0.025/0.050",
            "0.750/0.375",
            "0.5/0.5"
        ],
        correctAnswerIndex: 2,
        explanation: (
            <>
                <span>نحسب عدد مولات كل غاز n=m/Mr</span>
                <br />
                <span>n(CO₂) = 1.1g/44g/mol = 0.025mol</span>
                <br />
                <span>n(O₂) = 1.6g/32g/mol = 0.05mol</span>
                <br />
                <span>نحسب العدد الكلي للمولات من قانون الغاز المثالي n_total = PV/RT = (1.5atm × 1.64L) / (0.082 × 300K) = 0.1mol</span>
                <br />
                <span>نحسب عدد مولات النيتروجين n(N₂) = n_total - (n(CO₂) + n(O₂)) = 0.1 - (0.025 + 0.05) = 0.025mol</span>
                <br />
                <span>نحسب الضغط الجزئي لكل غاز P_gas = X_gas × P_total</span>
                <br />
                <span>P(CO₂) = (0.025/0.1) × 1.5atm = 0.375atm</span>
                <br />
                <span>P(O₂) = (0.05/0.1) × 1.5atm = 0.750atm</span>
                <br />
                <span>الترتيب المطلوب هو O₂ ثم CO₂ لذا الجواب هو 0.750 / 0.375</span>
            </>
        )
    },
    {
        question: (
            <>
                <span>وعاء حجمه 1.64L يحتوي على 1.1g CO₂ و 1.6g O₂ وكتلة مجهولة من N₂ عند درجة حرارة <span dir="ltr">27°C</span> وضغط 1.5atm إذا علمت أن الكتل المولية N=14 C=12 O=16 فإن كتلة غاز N₂ تساوي</span>
            </>
        ),
        options: [
            "0.7g",
            "1.4g",
            "0.35g",
            "2.8g"
        ],
        correctAnswerIndex: 0,
        explanation: (
            <>
                <span>أولا نحسب عدد المولات الكلي للخليط باستخدام قانون الغاز المثالي n_total = PV/RT = (1.5atm × 1.64L) / (0.082 × 300K) = 0.1mol</span>
                <br />
                <span>ثانيا نحسب عدد مولات الغازات المعلومة n=m/Mr</span>
                <br />
                <span>n(CO₂) = 1.1g/44g/mol = 0.025mol</span>
                <br />
                <span>n(O₂) = 1.6g/32g/mol = 0.05mol</span>
                <br />
                <span>ثالثا نحسب عدد مولات النيتروجين n(N₂) = n_total - (n(CO₂) + n(O₂)) = 0.1 - (0.025 + 0.05) = 0.025mol</span>
                <br />
                <span>أخيرا نحسب كتلة النيتروجين m(N₂) = n × Mr = 0.025mol × 28g/mol = 0.7g</span>
            </>
        )
    },
    {
        question: (
            <>
                <span>إذا علمت أن كثافة الماس</span>
                <span dir="ltr" className="inline-block mx-1">3.5g/ml</span>
                <span>وكثافة الغرافيت</span>
                <span dir="ltr" className="inline-block mx-1">2.3g/ml</span>
                <span>فإن كثافة بكمنسترفولرين</span>
            </>
        ),
        options: [
            "أكبر لأنه يحتوي عدد ذرات C أكبر في جزئياته",
            "أقل لأنه يحتوي عدد ذرات C أقل في جزئياته",
            "أكبر لأنه يحتوي عدد ذرات C أكبر في بنائه الشبكي",
            "أقل لأنه يحتوي فراغات أكبر بين جزيئاته الكروية"
        ],
        correctAnswerIndex: 3,
        explanation: "كثافة البكمنسترفولرين أقل من الماس والغرافيت لأن جزيئاته الكروية (C60) ترتبط بقوى لندن الضعيفة مما يؤدي إلى وجود فراغات أكبر بينها في البناء البلوري على عكس الألماس والغرافيت اللذين يمتلكان بنى شبكية تساهمية أكثر تراصا وقوة"
    },
    {
        question: (
            <>
                <p>يمثل الشكل المجاور لحظة توصيل الوعاءين معا يحتوي الأول عينة من الغاز A في وعاء حجمه 1L وضغطها 350KPa والثاني عينة من الغاز W في وعاء حجمه 2L وضغطها 350mmHg فإن الضغط الكلي لمزيج الغازين بوحدة atm يساوي:</p>
                <div className="flex justify-center my-2">
                    <Image src="https://i.ibb.co/Hpf0bLw3/3.jpg" alt="Connected Vessels" width={250} height={100} />
                </div>
            </>
        ),
        options: ["1.5", "0.5", "2", "3"],
        correctAnswerIndex: 0,
        explanation: (
            <>
                <span>أولاً نوحد وحدات الضغط إلى atm P(A) = 350kPa / 101.3kPa/atm ≈ 3.455atm P(W) = 350mmHg / 760mmHg/atm ≈ 0.46atm الحجم الكلي بعد الخلط V(total) = 1L + 2L = 3L ثانياً نستخدم قانون بويل لحساب الضغط الجزئي لكل غاز في الحجم الجديد P_final = (P_initial * V_initial) / V_total P_A_final = (3.455 * 1) / 3 ≈ 1.15atm P_W_final = (0.46 * 2) / 3 ≈ 0.31atm أخيراً نستخدم قانون دالتون P(total) = P_A_final + P_W_final = 1.15 + 0.31 ≈ 1.46atm أقرب إجابة هي 1.5</span>
            </>
        )
    },
    {
        question: <>
            <p>ادرس الرسم المجاور الذي يمثل التفاعل HCl(g) + NH₃(g) → NH₄Cl(s) علما بأن الكتل الذرية التقريبية H=1 N=14 Cl=35 إذا تم تسخين وعاء التفاعل قبل إجراء التجربة فإن موقع الغاز الأبيض الجديد سوف يكون</p>
            <div className="flex justify-center my-2">
                <Image src="https://i.ibb.co/1GcP6Svh/3.jpg" alt="Ammonia and HCl diffusion" width={400} height={100} className="rounded-lg border bg-white" data-ai-hint="ammonia HCl diffusion tube" />
            </div>
        </>,
        options: [
            "بين C و D",
            "على يسار A",
            "لا يتغير",
            "على يمين D"
        ],
        correctAnswerIndex: 2,
        explanation: <>
            <span>وفقًا لقانون جراهام تعتمد نسبة سرعة انتشار غازين على الجذر التربيعي لكتلتيهما المولية (</span>
            <span dir="ltr" className="inline-block"><InlineMath math="r_1/r_2 = \sqrt{Mr_2/Mr_1}"/></span>
            <span>) هذه النسبة لا تعتمد على درجة الحرارة تسخين الوعاء يزيد من سرعة كلا الغازين بنفس النسبة لذا سيقطعان نفس المسافات النسبية ويلتقيان في نفس الموضع</span>
        </>
    },
    {
        question: <><span>إذا علمت أن عنصر البورون شديد الصلابة ودرجة انصهاره </span><span dir="ltr">2300°C</span><span> ورديء التوصيل للكهرباء على درجة الحرارة العادية فإنه يصنف مادة صلبة بلورية</span></>,
        options: [
            "جزيئية",
            "أيونية",
            "شبكية تساهمية",
            "فلزية"
        ],
        correctAnswerIndex: 2,
        explanation: "الخصائص المذكورة (الصلابة الشديدة، درجة الانصهار المرتفعة جدًا، رداءة التوصيل الكهربائي) هي الخصائص المميزة للمواد الصلبة الشبكية التساهمية التي ترتبط ذراتها بروابط تساهمية قوية في شبكة ثلاثية الأبعاد",
    },
    {
        question: (
            <>
                <p>يُكوّن البورون مع النيتروجين نيتريد البورون BN الذي يتواجد على شكلين متآصلين (1 ، 2) ويشبه هذان المتأصلان ما يُكوّنه الكربون من متأصلات أيُّ العبارات الآتية غير صحيحة</p>
                <div className="flex justify-center items-center gap-4 my-2">
                     <Image src="https://i.ibb.co/7xMGNH2c/3.jpg" alt="متآصلات نيتريد البورون" width={250} height={120} className="rounded border bg-white" data-ai-hint="boron nitride allotropes" />
                </div>
            </>
        ),
        options: [
            "يشبه المتآصل (1) في تركيبه البنائي الغرافيت ويشبه المتآصل (2) الماس",
            "يوصل المتآصل (1) التيار الكهربائي",
            "المتآصل (2) عالي القساوة",
            "يُصنَّف كُلٌّ من المتأصلين على أنه صلب جزيئي"
        ],
        correctAnswerIndex: 3,
        explanation: "العبارة غير الصحيحة هي (د) كلا الشكلين هما مواد صلبة شبكية تساهمية وليست جزيئية لأن الذرات ترتبط في شبكة ضخمة وممتدة (ملاحظة: العبارة ب أيضًا غير صحيحة لأن نيتريد البورون الشبيه بالغرافيت عازل)",
    },
    {
        question: "المادة الصلبة التي لها أعلى درجة انصهار",
        options: [
            "AlF₃",
            "SiF₄",
            "NH₃",
            "P₄"
        ],
        correctAnswerIndex: 0,
        explanation: "المركب AlF₃ هو مركب أيوني يمتلك روابط أيونية قوية جدًا في شبكته البلورية بينما المركبات الأخرى هي مواد جزيئية ترتبط بقوى بين جزيئية أضعف بكثير (روابط هيدروجينية وقوى لندن) لذلك يتطلب AlF₃ أعلى طاقة لصهره",
    },
    {
        question: (
            <>
                <span>وعاء يحتوي على </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="5L"/></span>
                <span> من غاز الأكسجين عند درجة حرارة </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="20^\circ C"/></span>
                <span> وضغط </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="1.5atm"/></span>
                <span> إذا علمت أن الكتلة المولية للأكسجين تساوي </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="16g/mol"/></span>
                <span> فإن كتلة الأكسجين في الوعاء تساوي</span>
            </>
        ),
        options: [
            "5g",
            "10g",
            "10.7g",
            "5.4g"
        ],
        correctAnswerIndex: 1,
        explanation: (
            <>
                <span>أولاً نحسب عدد مولات الأكسجين باستخدام قانون الغاز المثالي </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="PV=nRT"/></span>
                <span> يجب تحويل الحرارة إلى كلفن </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="T = 20 + 273 = 293K"/></span>
                <span> إذن </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="n = \frac{PV}{RT} = \frac{1.5 \times 5}{0.0821 \times 293} \approx 0.312 \text{ mol}"/></span>
                <span> ثانياً نحسب الكتلة انتبه إلى أن غاز الأكسجين هو </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="O_2"/></span>
                <span> لذا كتلته المولية </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="Mr = 2 \times 16 = 32 g/mol"/></span>
                <span> الكتلة = </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="n \times Mr = 0.312 \times 32 \approx 9.98g"/></span>
                <span> وهي الأقرب إلى 10g</span>
            </>
        )
    },
    {
    question: (
        <>
            <span>غاز حجمه </span>
            <span dir="ltr" className="inline-block mx-1"><InlineMath math="5L"/></span>
            <span> عند درجة حرارة </span>
            <span dir="ltr" className="inline-block mx-1"><InlineMath math="27^\circ C"/></span>
            <span> وضغط ثابت إذا تم خفض درجة حرارته المئوية بنسبة 90% فإن حجمه الجديد بوحدة L يساوي:</span>
        </>
    ),
    options: ["4.6", "5.0", "0.5", "50"],
    correctAnswerIndex: 0,
    explanation: (
         <div className="space-y-3 text-right" dir="rtl">
            <p>1. <strong>تحويل الحرارة الابتدائية إلى كلفن:</strong></p>
            <div className="text-center" dir="ltr"><BlockMath math="T_1(K) = 27 + 273 = 300K" /></div>
            <p>2. <strong>حساب الحرارة النهائية بالسيليزيوس:</strong> تم خفضها بنسبة 90% أي بقي منها 10%</p>
            <div className="text-center" dir="ltr"><BlockMath math="T_2(^\circ C) = 27 \times (1 - 0.90) = 2.7^\circ C" /></div>
            <p>3. <strong>تحويل الحرارة النهائية إلى كلفن:</strong></p>
            <div className="text-center" dir="ltr"><BlockMath math="T_2(K) = 2.7 + 273 = 275.7K" /></div>
            <p>4. <strong>تطبيق قانون شارل (V₁/T₁ = V₂/T₂):</strong></p>
            <div className="text-center" dir="ltr"><BlockMath math="V_2 = \frac{V_1 \times T_2}{T_1} = \frac{5L \times 275.7K}{300K} \approx 4.6L" /></div>
            <p>الإجابة الصحيحة هي 4.6L</p>
        </div>
    )
    },
    {
        question: (
            <>
                <span>وعاء حجمه 1.64L يحتوي على 1.1g CO₂ و 1.6g O₂ وكتلة مجهولة من N₂ عند درجة حرارة <span dir="ltr">27°C</span> وضغط 1.5atm إذا علمت أن الكتل المولية N=14 C=12 O=16 فإن الضغوط الجزئية للغازات (O₂ / CO₂) على الترتيب</span>
            </>
        ),
        options: [
            "0.050/0.025",
            "0.025/0.050",
            "0.750/0.375",
            "0.5/0.5"
        ],
        correctAnswerIndex: 2,
        explanation: (
            <>
                <span>نحسب عدد مولات كل غاز n=m/Mr</span>
                <br />
                <span>n(CO₂) = 1.1g/44g/mol = 0.025mol</span>
                <br />
                <span>n(O₂) = 1.6g/32g/mol = 0.05mol</span>
                <br />
                <span>نحسب العدد الكلي للمولات من قانون الغاز المثالي n_total = PV/RT = (1.5atm × 1.64L) / (0.082 × 300K) = 0.1mol</span>
                <br />
                <span>نحسب عدد مولات النيتروجين n(N₂) = n_total - (n(CO₂) + n(O₂)) = 0.1 - (0.025 + 0.05) = 0.025mol</span>
                <br />
                <span>نحسب الضغط الجزئي لكل غاز P_gas = X_gas × P_total</span>
                <br />
                <span>P(CO₂) = (0.025/0.1) × 1.5atm = 0.375atm</span>
                <br />
                <span>P(O₂) = (0.05/0.1) × 1.5atm = 0.750atm</span>
                <br />
                <span>الترتيب المطلوب هو O₂ ثم CO₂ لذا الجواب هو 0.750 / 0.375</span>
            </>
        )
    },
    {
        question: (
            <>
                <span>وعاء حجمه 1.64L يحتوي على 1.1g CO₂ و 1.6g O₂ وكتلة مجهولة من N₂ عند درجة حرارة <span dir="ltr">27°C</span> وضغط 1.5atm إذا علمت أن الكتل المولية N=14 C=12 O=16 فإن كتلة غاز N₂ تساوي</span>
            </>
        ),
        options: [
            "0.7g",
            "1.4g",
            "0.35g",
            "2.8g"
        ],
        correctAnswerIndex: 0,
        explanation: (
            <>
                <span>أولا نحسب عدد المولات الكلي للخليط باستخدام قانون الغاز المثالي n_total = PV/RT = (1.5atm × 1.64L) / (0.082 × 300K) = 0.1mol</span>
                <br />
                <span>ثانيا نحسب عدد مولات الغازات المعلومة n=m/Mr</span>
                <br />
                <span>n(CO₂) = 1.1g/44g/mol = 0.025mol</span>
                <br />
                <span>n(O₂) = 1.6g/32g/mol = 0.05mol</span>
                <br />
                <span>ثالثا نحسب عدد مولات النيتروجين n(N₂) = n_total - (n(CO₂) + n(O₂)) = 0.1 - (0.025 + 0.05) = 0.025mol</span>
                <br />
                <span>أخيرا نحسب كتلة النيتروجين m(N₂) = n × Mr = 0.025mol × 28g/mol = 0.7g</span>
            </>
        )
    },
    {
        question: (
            <>
                <span>إذا علمت أن كثافة الماس</span>
                <span dir="ltr" className="inline-block mx-1">3.5g/ml</span>
                <span>وكثافة الغرافيت</span>
                <span dir="ltr" className="inline-block mx-1">2.3g/ml</span>
                <span>فإن كثافة بكمنسترفولرين</span>
            </>
        ),
        options: [
            "أكبر لأنه يحتوي عدد ذرات C أكبر في جزئياته",
            "أقل لأنه يحتوي عدد ذرات C أقل في جزئياته",
            "أكبر لأنه يحتوي عدد ذرات C أكبر في بنائه الشبكي",
            "أقل لأنه يحتوي فراغات أكبر بين جزيئاته الكروية"
        ],
        correctAnswerIndex: 3,
        explanation: "كثافة البكمنسترفولرين أقل من الماس والغرافيت لأن جزيئاته الكروية (C60) ترتبط بقوى لندن الضعيفة مما يؤدي إلى وجود فراغات أكبر بينها في البناء البلوري على عكس الألماس والغرافيت اللذين يمتلكان بنى شبكية تساهمية أكثر تراصا وقوة"
    },
    {
        question: (
            <>
                <p>يمثل الشكل المجاور لحظة توصيل الوعاءين معا يحتوي الأول عينة من الغاز A في وعاء حجمه 1L وضغطها 350KPa والثاني عينة من الغاز W في وعاء حجمه 2L وضغطها 350mmHg فإن الضغط الكلي لمزيج الغازين بوحدة atm يساوي:</p>
                <div className="flex justify-center my-2">
                    <Image src="https://i.ibb.co/Hpf0bLw3/3.jpg" alt="Connected Vessels" width={250} height={100} />
                </div>
            </>
        ),
        options: ["1.5", "0.5", "2", "3"],
        correctAnswerIndex: 0,
        explanation: (
            <>
                <span>أولاً نوحد وحدات الضغط إلى atm P(A) = 350kPa / 101.3kPa/atm ≈ 3.455atm P(W) = 350mmHg / 760mmHg/atm ≈ 0.46atm الحجم الكلي بعد الخلط V(total) = 1L + 2L = 3L ثانياً نستخدم قانون بويل لحساب الضغط الجزئي لكل غاز في الحجم الجديد P_final = (P_initial * V_initial) / V_total P_A_final = (3.455 * 1) / 3 ≈ 1.15atm P_W_final = (0.46 * 2) / 3 ≈ 0.31atm أخيراً نستخدم قانون دالتون P(total) = P_A_final + P_W_final = 1.15 + 0.31 ≈ 1.46atm أقرب إجابة هي 1.5</span>
            </>
        )
    },
    {
        question: <>
            <p>ادرس الرسم المجاور الذي يمثل التفاعل HCl(g) + NH₃(g) → NH₄Cl(s) علما بأن الكتل الذرية التقريبية H=1 N=14 Cl=35 إذا تم تسخين وعاء التفاعل قبل إجراء التجربة فإن موقع الغاز الأبيض الجديد سوف يكون</p>
            <div className="flex justify-center my-2">
                <Image src="https://i.ibb.co/1GcP6Svh/3.jpg" alt="Ammonia and HCl diffusion" width={400} height={100} className="rounded-lg border bg-white" data-ai-hint="ammonia HCl diffusion tube" />
            </div>
        </>,
        options: [
            "بين C و D",
            "على يسار A",
            "لا يتغير",
            "على يمين D"
        ],
        correctAnswerIndex: 2,
        explanation: <>
            <span>وفقًا لقانون جراهام تعتمد نسبة سرعة انتشار غازين على الجذر التربيعي لكتلتيهما المولية (</span>
            <span dir="ltr" className="inline-block"><InlineMath math="r_1/r_2 = \sqrt{Mr_2/Mr_1}"/></span>
            <span>) هذه النسبة لا تعتمد على درجة الحرارة تسخين الوعاء يزيد من سرعة كلا الغازين بنفس النسبة لذا سيقطعان نفس المسافات النسبية ويلتقيان في نفس الموضع</span>
        </>
    },
    {
        question: <><span>إذا علمت أن عنصر البورون شديد الصلابة ودرجة انصهاره </span><span dir="ltr">2300°C</span><span> ورديء التوصيل للكهرباء على درجة الحرارة العادية فإنه يصنف مادة صلبة بلورية</span></>,
        options: [
            "جزيئية",
            "أيونية",
            "شبكية تساهمية",
            "فلزية"
        ],
        correctAnswerIndex: 2,
        explanation: "الخصائص المذكورة (الصلابة الشديدة، درجة الانصهار المرتفعة جدًا، رداءة التوصيل الكهربائي) هي الخصائص المميزة للمواد الصلبة الشبكية التساهمية التي ترتبط ذراتها بروابط تساهمية قوية في شبكة ثلاثية الأبعاد",
    },
    {
        question: (
            <>
                <p>يُكوّن البورون مع النيتروجين نيتريد البورون BN الذي يتواجد على شكلين متآصلين (1 ، 2) ويشبه هذان المتأصلان ما يُكوّنه الكربون من متأصلات أيُّ العبارات الآتية غير صحيحة</p>
                <div className="flex justify-center items-center gap-4 my-2">
                     <Image src="https://i.ibb.co/7xMGNH2c/3.jpg" alt="متآصلات نيتريد البورون" width={250} height={120} className="rounded border bg-white" data-ai-hint="boron nitride allotropes" />
                </div>
            </>
        ),
        options: [
            "يشبه المتآصل (1) في تركيبه البنائي الغرافيت ويشبه المتآصل (2) الماس",
            "يوصل المتآصل (1) التيار الكهربائي",
            "المتآصل (2) عالي القساوة",
            "يُصنَّف كُلٌّ من المتأصلين على أنه صلب جزيئي"
        ],
        correctAnswerIndex: 3,
        explanation: "العبارة غير الصحيحة هي (د) كلا الشكلين هما مواد صلبة شبكية تساهمية وليست جزيئية لأن الذرات ترتبط في شبكة ضخمة وممتدة (ملاحظة: العبارة ب أيضًا غير صحيحة لأن نيتريد البورون الشبيه بالغرافيت عازل)",
    },
    {
        question: "المادة الصلبة التي لها أعلى درجة انصهار",
        options: [
            "AlF₃",
            "SiF₄",
            "NH₃",
            "P₄"
        ],
        correctAnswerIndex: 0,
        explanation: "المركب AlF₃ هو مركب أيوني يمتلك روابط أيونية قوية جدًا في شبكته البلورية بينما المركبات الأخرى هي مواد جزيئية ترتبط بقوى بين جزيئية أضعف بكثير (روابط هيدروجينية وقوى لندن) لذلك يتطلب AlF₃ أعلى طاقة لصهره",
    },
    {
        question: (
            <>
                <span>وعاء يحتوي على </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="5L"/></span>
                <span> من غاز الأكسجين عند درجة حرارة </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="20^\circ C"/></span>
                <span> وضغط </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="1.5atm"/></span>
                <span> إذا علمت أن الكتلة المولية للأكسجين تساوي </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="16g/mol"/></span>
                <span> فإن كتلة الأكسجين في الوعاء تساوي</span>
            </>
        ),
        options: [
            "5g",
            "10g",
            "10.7g",
            "5.4g"
        ],
        correctAnswerIndex: 1,
        explanation: (
            <>
                <span>أولاً نحسب عدد مولات الأكسجين باستخدام قانون الغاز المثالي </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="PV=nRT"/></span>
                <span> يجب تحويل الحرارة إلى كلفن </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="T = 20 + 273 = 293K"/></span>
                <span> إذن </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="n = \frac{PV}{RT} = \frac{1.5 \times 5}{0.0821 \times 293} \approx 0.312 \text{ mol}"/></span>
                <span> ثانياً نحسب الكتلة انتبه إلى أن غاز الأكسجين هو </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="O_2"/></span>
                <span> لذا كتلته المولية </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="Mr = 2 \times 16 = 32 g/mol"/></span>
                <span> الكتلة = </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="n \times Mr = 0.312 \times 32 \approx 9.98g"/></span>
                <span> وهي الأقرب إلى 10g</span>
            </>
        )
    },
    {
        question: "جميع الخصائص الآتية هي خصائص يتشابه بها الألماس وثاني أكسيد السيليكون ويختلفان فيها عن الجرافيت ما عدا:",
        options: [
            "الشكل",
            "القساوة",
            "التآصل",
            "التوصيل الكهربائي",
        ],
        correctAnswerIndex: 2,
        explanation: "الإجابة الصحيحة هي التآصل: لأن هذه الخاصية لا تنطبق بنفس الطريقة الألماس والجرافيت هما شكلان متآصلان لنفس العنصر (الكربون) بينما ثاني أكسيد السيليكون هو مركب كيميائي وليس عنصرًا أما الخصائص الأخرى فهي بالفعل نقاط تشابه بين الألماس و SiO₂ مقارنة بالجرافيت"
    },
    {
        question: (
            <>
                <span>وعاء حجمه 1.64L يحتوي على 1.1g CO₂ و 1.6g O₂ وكتلة مجهولة من N₂ عند درجة حرارة <span dir="ltr">27°C</span> وضغط 1.5atm إذا علمت أن الكتل المولية N=14 C=12 O=16 فإن الضغوط الجزئية للغازات (O₂ / CO₂) على الترتيب</span>
            </>
        ),
        options: [
            "0.050/0.025",
            "0.025/0.050",
            "0.750/0.375",
            "0.5/0.5"
        ],
        correctAnswerIndex: 2,
        explanation: (
            <>
                <span>نحسب عدد مولات كل غاز n=m/Mr</span>
                <br />
                <span>n(CO₂) = 1.1g/44g/mol = 0.025mol</span>
                <br />
                <span>n(O₂) = 1.6g/32g/mol = 0.05mol</span>
                <br />
                <span>نحسب العدد الكلي للمولات من قانون الغاز المثالي n_total = PV/RT = (1.5atm × 1.64L) / (0.082 × 300K) = 0.1mol</span>
                <br />
                <span>نحسب عدد مولات النيتروجين n(N₂) = n_total - (n(CO₂) + n(O₂)) = 0.1 - (0.025 + 0.05) = 0.025mol</span>
                <br />
                <span>نحسب الضغط الجزئي لكل غاز P_gas = X_gas × P_total</span>
                <br />
                <span>P(CO₂) = (0.025/0.1) × 1.5atm = 0.375atm</span>
                <br />
                <span>P(O₂) = (0.05/0.1) × 1.5atm = 0.750atm</span>
                <br />
                <span>الترتيب المطلوب هو O₂ ثم CO₂ لذا الجواب هو 0.750 / 0.375</span>
            </>
        )
    },
    {
        question: (
            <>
                <span>وعاء حجمه 1.64L يحتوي على 1.1g CO₂ و 1.6g O₂ وكتلة مجهولة من N₂ عند درجة حرارة <span dir="ltr">27°C</span> وضغط 1.5atm إذا علمت أن الكتل المولية N=14 C=12 O=16 فإن كتلة غاز N₂ تساوي</span>
            </>
        ),
        options: [
            "0.7g",
            "1.4g",
            "0.35g",
            "2.8g"
        ],
        correctAnswerIndex: 0,
        explanation: (
            <>
                <span>أولا نحسب عدد المولات الكلي للخليط باستخدام قانون الغاز المثالي n_total = PV/RT = (1.5atm × 1.64L) / (0.082 × 300K) = 0.1mol</span>
                <br />
                <span>ثانيا نحسب عدد مولات الغازات المعلومة n=m/Mr</span>
                <br />
                <span>n(CO₂) = 1.1g/44g/mol = 0.025mol</span>
                <br />
                <span>n(O₂) = 1.6g/32g/mol = 0.05mol</span>
                <br />
                <span>ثالثا نحسب عدد مولات النيتروجين n(N₂) = n_total - (n(CO₂) + n(O₂)) = 0.1 - (0.025 + 0.05) = 0.025mol</span>
                <br />
                <span>أخيرا نحسب كتلة النيتروجين m(N₂) = n × Mr = 0.025mol × 28g/mol = 0.7g</span>
            </>
        )
    },
    {
        question: (
            <>
                <span>إذا علمت أن كثافة الماس</span>
                <span dir="ltr" className="inline-block mx-1">3.5g/ml</span>
                <span>وكثافة الغرافيت</span>
                <span dir="ltr" className="inline-block mx-1">2.3g/ml</span>
                <span>فإن كثافة بكمنسترفولرين</span>
            </>
        ),
        options: [
            "أكبر لأنه يحتوي عدد ذرات C أكبر في جزئياته",
            "أقل لأنه يحتوي عدد ذرات C أقل في جزئياته",
            "أكبر لأنه يحتوي عدد ذرات C أكبر في بنائه الشبكي",
            "أقل لأنه يحتوي فراغات أكبر بين جزيئاته الكروية"
        ],
        correctAnswerIndex: 3,
        explanation: "كثافة البكمنسترفولرين أقل من الماس والغرافيت لأن جزيئاته الكروية (C60) ترتبط بقوى لندن الضعيفة مما يؤدي إلى وجود فراغات أكبر بينها في البناء البلوري على عكس الألماس والغرافيت اللذين يمتلكان بنى شبكية تساهمية أكثر تراصا وقوة"
    },
    {
        question: (
            <>
                <p>يمثل الشكل المجاور لحظة توصيل الوعاءين معا يحتوي الأول عينة من الغاز A في وعاء حجمه 1L وضغطها 350KPa والثاني عينة من الغاز W في وعاء حجمه 2L وضغطها 350mmHg فإن الضغط الكلي لمزيج الغازين بوحدة atm يساوي:</p>
                <div className="flex justify-center my-2">
                    <Image src="https://i.ibb.co/Hpf0bLw3/3.jpg" alt="Connected Vessels" width={250} height={100} />
                </div>
            </>
        ),
        options: ["1.5", "0.5", "2", "3"],
        correctAnswerIndex: 0,
        explanation: (
            <>
                <span>أولاً نوحد وحدات الضغط إلى atm P(A) = 350kPa / 101.3kPa/atm ≈ 3.455atm P(W) = 350mmHg / 760mmHg/atm ≈ 0.46atm الحجم الكلي بعد الخلط V(total) = 1L + 2L = 3L ثانياً نستخدم قانون بويل لحساب الضغط الجزئي لكل غاز في الحجم الجديد P_final = (P_initial * V_initial) / V_total P_A_final = (3.455 * 1) / 3 ≈ 1.15atm P_W_final = (0.46 * 2) / 3 ≈ 0.31atm أخيراً نستخدم قانون دالتون P(total) = P_A_final + P_W_final = 1.15 + 0.31 ≈ 1.46atm أقرب إجابة هي 1.5</span>
            </>
        )
    },
    {
        question: <>
            <p>ادرس الرسم المجاور الذي يمثل التفاعل HCl(g) + NH₃(g) → NH₄Cl(s) علما بأن الكتل الذرية التقريبية H=1 N=14 Cl=35 إذا تم تسخين وعاء التفاعل قبل إجراء التجربة فإن موقع الغاز الأبيض الجديد سوف يكون</p>
            <div className="flex justify-center my-2">
                <Image src="https://i.ibb.co/1GcP6Svh/3.jpg" alt="Ammonia and HCl diffusion" width={400} height={100} className="rounded-lg border bg-white" data-ai-hint="ammonia HCl diffusion tube" />
            </div>
        </>,
        options: [
            "بين C و D",
            "على يسار A",
            "لا يتغير",
            "على يمين D"
        ],
        correctAnswerIndex: 2,
        explanation: <>
            <span>وفقًا لقانون جراهام تعتمد نسبة سرعة انتشار غازين على الجذر التربيعي لكتلتيهما المولية (</span>
            <span dir="ltr" className="inline-block"><InlineMath math="r_1/r_2 = \sqrt{Mr_2/Mr_1}"/></span>
            <span>) هذه النسبة لا تعتمد على درجة الحرارة تسخين الوعاء يزيد من سرعة كلا الغازين بنفس النسبة لذا سيقطعان نفس المسافات النسبية ويلتقيان في نفس الموضع</span>
        </>
    },
    {
        question: <><span>إذا علمت أن عنصر البورون شديد الصلابة ودرجة انصهاره </span><span dir="ltr">2300°C</span><span> ورديء التوصيل للكهرباء على درجة الحرارة العادية فإنه يصنف مادة صلبة بلورية</span></>,
        options: [
            "جزيئية",
            "أيونية",
            "شبكية تساهمية",
            "فلزية"
        ],
        correctAnswerIndex: 2,
        explanation: "الخصائص المذكورة (الصلابة الشديدة، درجة الانصهار المرتفعة جدًا، رداءة التوصيل الكهربائي) هي الخصائص المميزة للمواد الصلبة الشبكية التساهمية التي ترتبط ذراتها بروابط تساهمية قوية في شبكة ثلاثية الأبعاد",
    },
    {
        question: (
            <>
                <p>يُكوّن البورون مع النيتروجين نيتريد البورون BN الذي يتواجد على شكلين متآصلين (1 ، 2) ويشبه هذان المتأصلان ما يُكوّنه الكربون من متأصلات أيُّ العبارات الآتية غير صحيحة</p>
                <div className="flex justify-center items-center gap-4 my-2">
                     <Image src="https://i.ibb.co/7xMGNH2c/3.jpg" alt="متآصلات نيتريد البورون" width={250} height={120} className="rounded border bg-white" data-ai-hint="boron nitride allotropes" />
                </div>
            </>
        ),
        options: [
            "يشبه المتآصل (1) في تركيبه البنائي الغرافيت ويشبه المتآصل (2) الماس",
            "يوصل المتآصل (1) التيار الكهربائي",
            "المتآصل (2) عالي القساوة",
            "يُصنَّف كُلٌّ من المتأصلين على أنه صلب جزيئي"
        ],
        correctAnswerIndex: 3,
        explanation: "العبارة غير الصحيحة هي (د) كلا الشكلين هما مواد صلبة شبكية تساهمية وليست جزيئية لأن الذرات ترتبط في شبكة ضخمة وممتدة (ملاحظة: العبارة ب أيضًا غير صحيحة لأن نيتريد البورون الشبيه بالغرافيت عازل)",
    },
    {
        question: "المادة الصلبة التي لها أعلى درجة انصهار",
        options: [
            "AlF₃",
            "SiF₄",
            "NH₃",
            "P₄"
        ],
        correctAnswerIndex: 0,
        explanation: "المركب AlF₃ هو مركب أيوني يمتلك روابط أيونية قوية جدًا في شبكته البلورية بينما المركبات الأخرى هي مواد جزيئية ترتبط بقوى بين جزيئية أضعف بكثير (روابط هيدروجينية وقوى لندن) لذلك يتطلب AlF₃ أعلى طاقة لصهره",
    },
    {
            question: (
              <>
                <span>بالون حجمه </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="1000\text{mL}" /></span>
                <span> مملوء بغاز الهيليوم He (</span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="Mr = 4\text{g/mol}" /></span>
                <span>) عند درجة حرارة </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="27^\circ\text{C}" /></span>
                <span> وضغط </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="2\text{atm}" /></span>
                <span> وعند صعود البالون للأعلى انخفضت درجة الحرارة إلى </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="-3^\circ\text{C}" /></span>
                <span> وأصبح الضغط </span>
                <span dir="ltr" className="inline-block mx-1"><InlineMath math="0.5\text{atm}" /></span>
                <span> فإن كتلة غاز He التي يجب التخلص منها للإبقاء على حجم الغاز ثابتًا تساوي (g)</span>
              </>
            ),
            options: ["1.76", "0.82", "0.41", "0.24"],
            correctAnswerIndex: 3,
            explanation: (
                <div className="space-y-3 text-right" dir="rtl">
                    <p>1. <strong>حساب عدد المولات الابتدائي (n₁)</strong></p>
                    <p className="text-xs">
                        <span>نحول الوحدات </span>
                        <span dir="ltr" className="inline-block"><InlineMath math="V_1 = 1000\text{mL} = 1.0\text{L}" /></span>
                        <span>، </span>
                        <span dir="ltr" className="inline-block"><InlineMath math="T_1 = 27 + 273 = 300\text{K}" /></span>
                    </p>
                    <div className="text-center" dir="ltr"><BlockMath math="n_1 = \frac{P_1V_1}{RT_1} = \frac{2 \times 1.0}{0.082 \times 300} \approx 0.0813 \text{ mol}" /></div>
        
                    <p>2. <strong>حساب عدد المولات النهائي (n₂) للحفاظ على نفس الحجم</strong></p>
                     <p className="text-xs">
                        <span>الظروف النهائية </span>
                        <span dir="ltr" className="inline-block"><InlineMath math="V_2 = 1.0\text{L}" /></span>
                        <span> (ثابت)، </span>
                        <span dir="ltr" className="inline-block"><InlineMath math="P_2 = 0.5\text{atm}" /></span>
                        <span>، </span>
                        <span dir="ltr" className="inline-block"><InlineMath math="T_2 = -3 + 273 = 270\text{K}" /></span>
                    </p>
                    <div className="text-center" dir="ltr"><BlockMath math="n_2 = \frac{P_2V_2}{RT_2} = \frac{0.5 \times 1.0}{0.082 \times 270} \approx 0.0226 \text{ mol}" /></div>
        
                    <p>3. <strong>حساب عدد المولات التي يجب التخلص منها (Δn)</strong></p>
                    <div className="text-center" dir="ltr"><BlockMath math="\Delta n = n_1 - n_2 = 0.0813 - 0.0226 = 0.0587 \text{ mol}" /></div>
        
                    <p>4. <strong>حساب كتلة الغاز المتسرب (m)</strong></p>
                    <div className="text-center" dir="ltr"><BlockMath math="m = \Delta n \times Mr = 0.0587 \text{ mol} \times 4 \text{ g/mol} \approx 0.235 \text{ g}" /></div>
                     <p>الإجابة الأقرب هي 0.24</p>
                </div>
            )
    },
    {
            question: (
                <>
                    <p>اعتمادا على الشكل المجاور إذا علمت أن المسافة A تمثل الضغط الجوي في الظروف المعيارية فإن جميع العبارات الآتية صحيحة ما عدا</p>
                    <div className="flex justify-center my-2">
                        <Image 
                            src="https://i.ibb.co/zhsx01WH/image.jpg" 
                            alt="image" 
                            width={400}
                            height={250}
                            className="rounded-lg border bg-white"
                            data-ai-hint="manometer gas pressure"
                        />
                    </div>
                </>
            ),
            options: [
                <span>الضغط عند B يساوي 1140 mmHg</span>,
                <span>B = 0.4 A</span>,
                <span>حجم A يكافئ 1 atm</span>,
                <span>الضغط عند B يكافئ 2.5 atm</span>
            ],
            correctAnswerIndex: 3,
            explanation: (
                 <div className="space-y-3 text-right" dir="rtl">
                    <p>العبارة الخاطئة هي أن حجم B يكافئ 2.5 atm لوجود خطأ مفاهيمي أساسي فيها حيث أنها تعطي قيمة للحجم بوحدة الضغط الجوي (atm) وهذا غير صحيح فالضغط والحجم كميتان فيزيائيتان مختلفتان ولكل منهما وحداته الخاصة</p>
                </div>
            ),
    },
];


    