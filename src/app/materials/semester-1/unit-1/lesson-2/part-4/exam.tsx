
import React from 'react';
import Image from 'next/image';
import { InlineMath } from 'react-katex';

export interface QuizQuestion {
    question: React.ReactNode;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

export const staticQuizLvl1: QuizQuestion[] = [
    {
        question: "في حالة الاتزان الديناميكي بين السائل وبخاره في وعاء مغلق، أي العبارات التالية صحيحة؟",
        options: [
            "تتوقف عملية التبخر تمامًا",
            "تتوقف عملية التكاثف تمامًا",
            "تتساوى سرعة التبخر مع سرعة التكاثف",
            "يكون ضغط البخار صفرًا"
        ],
        correctAnswerIndex: 2,
        explanation: "الاتزان الديناميكي يعني أن عمليتي التبخر والتكاثف تحدثان بنفس السرعة، مما يؤدي إلى ثبات الضغط البخاري."
    },
    {
        question: "أحد العوامل الآتية لا يؤثر في الضغط البخاري للسائل:",
        options: [
            "قطبية الجسيمات",
            "درجة حرارة",
            "نوع الترابط بين الجسيمات",
            "حجم الوعاء"
        ],
        correctAnswerIndex: 3,
        explanation: "الضغط البخاري خاصية فيزيائية مميزة للمادة تعتمد فقط على درجة الحرارة وقوة الترابط بين جزيئاتها. حجم الوعاء لا يؤثر على قيمة الضغط البخاري عند الاتزان."
    },
    {
        question: "العبارة الخاطئة فيما يلي:",
        options: [
            "يقل الضغط البخاري بانخفاض درجة الحرارة",
            "يقل الضغط البخاري بازدياد قوة الترابط",
            "يزداد الضغط البخاري بنقصان حجم الوعاء",
            "لا يعتمد الضغط البخاري على شكل الوعاء"
        ],
        correctAnswerIndex: 2,
        explanation: "الضغط البخاري خاصية فيزيائية مميزة للمادة تعتمد فقط على درجة الحرارة وقوة الترابط بين جزيئاتها حجم الوعاء أو شكله لا يؤثران على قيمة الضغط البخاري عند حالة الاتزان"
    },
    {
        question: "في أي الظروف التالية يتم قياس الضغط البخاري لسائل؟",
        options: [
            "في وعاء مفتوح",
            "في وعاء مغلق عند حالة الاتزان",
            "أثناء عملية الغليان",
            "عند درجة التجمد"
        ],
        correctAnswerIndex: 1,
        explanation: "الضغط البخاري هو خاصية مميزة للسائل في حالة الاتزان الديناميكي داخل وعاء مغلق، حيث تتساوى سرعة التبخر مع سرعة التكاثف."
    }
];

export const staticQuizLvl2: QuizQuestion[] = [
    {
        question: "عند مقارنة الماء (H₂O) والإيثانول (CH₃CH₂OH) عند نفس درجة الحرارة، لماذا يكون الضغط البخاري للماء أقل؟",
        options: [
            "لأن الكتلة المولية للماء أقل",
            "لأن الماء يكون روابط هيدروجينية أقوى وأكثر عددًا",
            "لأن الإيثانول غير قطبي",
            "لأن الماء يتبخر أسرع"
        ],
        correctAnswerIndex: 1,
        explanation: "جزيء الماء صغير الحجم ويمكنه تكوين شبكة معقدة من الروابط الهيدروجينية القوية، وهي أقوى من الروابط الهيدروجينية في الإيثانول. هذه القوى القوية تجعل تبخر الماء أصعب، وبالتالي ضغطه البخاري أقل."
    },
    {
        question: (
            <>
                <p>اعتمادا على الرسم المجاور والذي يمثل العلاقة بين درجة الحرارة والضغط البخاري لأربعة سوائل، ما قيمة الضغط البخاري للإيثانول (<span dir="ltr" className="inline-block font-mono">C₂H₅OH</span>) عند درجة حرارة <span dir="ltr">50°C</span>؟</p>
                <div className="flex justify-center my-4">
                    <Image
                        src="https://i.ibb.co/84T52SSm/3.png"
                        alt="منحنيات الضغط البخاري"
                        width={500}
                        height={300}
                        className="rounded-lg border bg-white"
                        data-ai-hint="vapor pressure curves"
                    />
                </div>
            </>
        ),
        options: [
            "78",
            "400",
            "220",
            "760"
        ],
        correctAnswerIndex: 2,
        explanation: "بتتبع الخط العمودي من درجة حرارة 50°C على المحور السيني حتى يتقاطع مع منحنى الإيثانول، ثم تتبع الخط الأفقي من نقطة التقاطع إلى المحور الصادي، نجد أن القيمة تقابل 220mmHg تقريبًا."
    },
    {
        question: (
            <>
                <p>اعتمادا على الرسم المجاور والذي يمثل العلاقة بين درجة الحرارة °C والضغط البخاري mmHg لأربعة سوائل فإن الضغط البخاري لثنائي إيثيل إيثر C₂H₅OC₂H₅ عند درجة حرارة 30°C يساوي:</p>
                <div className="flex justify-center my-4">
                    <Image
                        src="https://i.ibb.co/84T52SSm/3.png"
                        alt="منحنيات الضغط البخاري"
                        width={500}
                        height={300}
                        className="rounded-lg border bg-white"
                        data-ai-hint="vapor pressure curves"
                    />
                </div>
            </>
        ),
        options: ["760", "100", "30", "650"],
        correctAnswerIndex: 3,
        explanation: "بتتبع الخط العمودي من درجة حرارة 30°C على المحور السيني حتى يتقاطع مع منحنى ثنائي إيثيل إيثر ثم تتبع الخط الأفقي من نقطة التقاطع إلى المحور الصادي نجد أن القيمة تقابل 650mmHg تقريبًا"
    }
];
export const staticQuizLvl3: QuizQuestion[] = [
    {
        question: (
            <div className="space-y-4">
                <p>اعتمادًا على منحنى الضغط البخاري، أي سائل لديه أضعف قوى ترابط بين جزيئاته؟</p>
                <div className="flex justify-center">
                    <Image
                        src="https://i.ibb.co/TB6RcQkw/22.png"
                        alt="Vapor Pressure vs Temperature"
                        width={400}
                        height={250}
                        className="rounded-lg border bg-white"
                        data-ai-hint="vapor pressure curves"
                    />
                </div>
            </div>
        ),
        options: [
            "H₂O",
            "CH₃OH",
            "CHCl₃",
            "C₅H₁₂"
        ],
        correctAnswerIndex: 3,
        explanation: "أضعف قوى ترابط تعني أن السائل يتبخر بسهولة أكبر، وبالتالي يمتلك أعلى ضغط بخاري عند أي درجة حرارة معينة. المنحنى الخاص بـ C₅H₁₂ (البنتان) هو الأعلى على الرسم البياني، مما يدل على أنه الأسرع تبخرًا والأضعف في قوى الترابط (قوى لندن فقط)."
    },
     {
        question: (
            <>
                <p>اعتمادا على الرسم المجاور والذي يمثل العلاقة بين درجة الحرارة °C والضغط البخاري mmHg لأربعة سوائل فإن المادة التي لها أقل طاقة تكاثف مولية:</p>
                <div className="flex justify-center my-4">
                    <Image
                        src="https://i.ibb.co/84T52SSm/3.png"
                        alt="منحنيات الضغط البخاري"
                        width={500}
                        height={300}
                        className="rounded-lg border bg-white"
                        data-ai-hint="vapor pressure curves"
                    />
                </div>
            </>
        ),
        options: [
            "الماء",
            "الإيثانول",
            "الثنائي إيثيل إيثر",
            "الأسيتون"
        ],
        correctAnswerIndex: 2,
        explanation: "أقل طاقة تكاثف مولية تعني أضعف قوى ترابط بين الجزيئات وهذا يؤدي إلى أعلى ضغط بخاري من الرسم البياني نجد أن ثنائي إيثيل إيثر يمتلك أعلى ضغط بخاري عند أي درجة حرارة مما يدل على أنه الأضعف في قوى الترابط والأقل في طاقة التكاثف"
    }
];
