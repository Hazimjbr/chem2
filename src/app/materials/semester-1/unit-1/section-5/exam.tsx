
'use client';

import React from 'react';
import { cn } from '@/lib/utils.tsx';

export interface QuizQuestion {
    question: React.ReactNode;
    options: React.ReactNode[];
    correctAnswerIndex: number;
    explanation: string;
}

const GasSamplesGraph = () => (
     <svg width="300" height="200" viewBox="0 0 450 250" xmlns="http://www.w3.org/2000/svg" className="mx-auto my-2 bg-white p-4 rounded-lg">
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
        question: <div><p>ادرس الرسم المجاور الذي يمثل تغيرات على غاز محصور، أي العبارات الآتية لا تصف التغير الحاصل من الحالة B إلى الحالة A بشكل صحيح؟</p><PistonDiagram /></div>,
        options: [
            "تقل الطاقة الحركية ويقل الضغط",
            "يزداد الحجم ويقل عدد الجسيمات",
            "يقل التركيز والضغط",
            "يزداد الحجم وعدد الجسيمات ثابت"
        ],
        correctAnswerIndex: 3,
        explanation: "العبارة الخاطئة هي (يزداد الحجم وعدد الجسيمات ثابت). عند الانتقال من B إلى A، نلاحظ أن الحجم يزداد (المكبس يرتفع) ولكن عدد الجسيمات يقل بشكل واضح. العبارات الأخرى صحيحة: يقل عدد الجسيمات فيزداد الحجم ويقل التركيز والضغط، ويفترض أن الطاقة الحركية تقل (اللون تغير من الأحمر للبارد) مما يساهم في انخفاض الضغط."
    },
    {
        question: <div><p>ادرس الرسم المجاور الذي يمثل أربع عينات من الغازات المختلفة في أوعية متساوية الحجم عند نفس درجة الحرارة، ثم أجب:</p><GasSamplesGraph /><strong className="text-accent mt-2 block">أي وعاء يحتوي على غاز له الضغط الأعلى؟</strong></div>,
        options: [
            "A",
            "B",
            "C",
            "D"
        ],
        correctAnswerIndex: 1,
        explanation: "وفقًا لقانون أفوجادرو، عند ثبات الحجم ودرجة الحرارة، يتناسب ضغط الغاز طرديًا مع عدد جسيماته (أو مولاته). الوعاء B يحتوي على أكبر عدد من الجسيمات (5 جسيمات)، لذا فإن ضغط الغاز فيه هو الأعلى."
    }
];

// Add more level 2 questions here
export const staticQuizLvl2: QuizQuestion[] = [];

// Add more level 3 questions here
export const staticQuizLvl3: QuizQuestion[] = [];
