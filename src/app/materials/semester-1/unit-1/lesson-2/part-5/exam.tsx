
import { InlineMath } from 'react-katex';
import React from 'react';
import Image from 'next/image';

export interface QuizQuestion {
    question: React.ReactNode;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

export const staticQuizLvl1: QuizQuestion[] = [];
export const staticQuizLvl2: QuizQuestion[] = [
    {
        "question": "أي المركبات التالية له أعلى درجة غليان؟",
        "options": [
            "CH₃CH₂CH₃ (بروبان)",
            "CH₃OCH₃ (ثنائي ميثيل إيثر)",
            "CH₃CH₂OH (إيثانول)",
            "CH₃CHO (إيثانال)"
        ],
        "correctAnswerIndex": 2,
        "explanation": "الإيثانول (CH₃CH₂OH) هو الوحيد القادر على تكوين روابط هيدروجينية قوية بين جزيئاته، وهي أقوى أنواع قوى الترابط بين الجزيئات المذكورة، مما يتطلب طاقة أعلى لكسرها وبالتالي درجة غليان أعلى."
    },
    {
        question: (
            <div className="space-y-4">
                <p>اعتمادا على الرسم المجاور والمتعلق بالمواد <span dir="ltr" className="font-mono inline-block">CH₃CH₂OH</span>, <span dir="ltr" className="font-mono inline-block">CH₄</span>, <span dir="ltr" className="font-mono inline-block">CH₃CH₃</span>, <span dir="ltr" className="font-mono inline-block">CH₃Cl</span> فإن الرمز الذي يمثل السائل الذي يرتبط بروابط هيدروجينية هو:</p>
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
        options: [
            "A",
            "B",
            "C",
            "D"
        ],
        correctAnswerIndex: 1,
        explanation: "الروابط الهيدروجينية هي أقوى أنواع قوى الترابط بين الجزيئات. السائل الذي يمتلكها (الإيثانول CH₃CH₂OH) يكون له أقل ضغط بخاري لأنه يحتاج إلى أعلى طاقة للتبخر. المنحنى B يمثل أقل ضغط بخاري عند أي درجة حرارة، لذا فهو يمثل الإيثانول."
    },
    {
        question: (
            <div className="space-y-4">
                <p>اعتمادا على الرسم المجاور والمتعلق بالمواد <span dir="ltr" className="font-mono inline-block">CH₃CH₂OH</span>, <span dir="ltr" className="font-mono inline-block">CH₄</span>, <span dir="ltr" className="font-mono inline-block">CH₃CH₃</span>, <span dir="ltr" className="font-mono inline-block">CH₃Cl</span> فإن الرمز الذي يمثل السائل <span dir="ltr" className="font-mono inline-block">CH₃CH₃</span>  هو:</p>
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
        options: [ "A", "B", "C", "D" ],
        correctAnswerIndex: 0,
        explanation: "الإيثان (CH₃CH₃) يمتلك قوى لندن وهي أقوى من قوى الميثان (C) بسبب كتلته المولية الأعلى، ولكنه أضعف من قوى كلوروميثان (D) والإيثانول (B). لذلك، ضغطه البخاري سيكون أقل من الميثان وأعلى من المركبين الآخرين، مما يجعله يمثل المنحنى A."
    },
    {
        question: (
            <>
                <p>اعتمادا على الرسم المجاور والذي يمثل العلاقة بين درجة الحرارة °C والضغط البخاري mmHg لأربعة سوائل درجة الغليان المعيارية للإيثانول تساوي</p>
                <div className="flex justify-center my-4">
                    <Image
                        src="https://i.ibb.co/84T52SSm/3.png"
                        alt="منحنيات الضغط البخاري"
                        width={500}
                        height={300}
                        className="rounded-lg border bg-white"
                        data-ai-hint="vapor pressure curves ethanol"
                    />
                </div>
            </>
        ),
        options: ["78", "35", "55", "760"],
        correctAnswerIndex: 0,
        explanation: "درجة الغليان المعيارية هي درجة الحرارة التي يتساوى عندها الضغط البخاري للسائل مع الضغط الجوي المعياري (760mmHg) من خلال تتبع الخط الأفقي من 760mmHg حتى يتقاطع مع منحنى الإيثانول ثم النزول عموديًا إلى محور درجة الحرارة نجد أن القيمة تساوي 78°C"
    }
];
export const staticQuizLvl3: QuizQuestion[] = [];
