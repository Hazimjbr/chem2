
'use client';

import React from 'react';
import { cn } from '@/lib/utils.tsx';
import { InlineMath } from 'react-katex';
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
        explanation: "وفقًا لقانون الغاز المثالي (V = nRT/P) يكون حجم الغاز أقل ما يمكن عندما تكون درجة الحرارة (T) أقل ما يمكن والضغط (P) أعلى ما يمكن. الخيار الذي يحقق هذه الشروط هو أقل درجة حرارة وأعلى ضغط."
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
    }
];

export const staticQuizLvl2: QuizQuestion[] = [
    {
        question: (
            <div>
                <p>ادرس الرسم المجاور الذي يمثل تغيرات على غاز محصور أي العبارات الآتية لا تصف التغير الحاصل من الحالة B إلى الحالة A بشكل صحيح</p>
                <Image src="https://i.ibb.co/Xxd9x9gK/3.png" alt="Piston states" width={300} height={150} className="mx-auto my-2 rounded-lg" data-ai-hint="gas piston" />
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
                        src="https://i.ibb.co/CBrq0Yd/3.png"
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
                        src="https://i.ibb.co/CBrq0Yd/3.png"
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
                        src="https://i.ibb.co/CBrq0Yd/3.png"
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
                        src="https://i.ibb.co/hF9Fm0h/22.png"
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
                        src="https://i.ibb.co/PggW2Lh/3.png"
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
    }
]

    

    
