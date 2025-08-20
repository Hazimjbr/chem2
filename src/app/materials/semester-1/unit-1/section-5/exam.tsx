
'use client';

import React from 'react';
import { cn } from '@/lib/utils.tsx';

export interface QuizQuestion {
    question: React.ReactNode;
    options: React.ReactNode[];
    correctAnswerIndex: number;
    explanation: string;
}

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
        question: <div><p>ادرس الشكل المجاور الذي يمثل تغيرات على غاز محصور، أي العبارات الآتية لا تصف التغير الحاصل من الحالة B إلى الحالة A بشكل صحيح؟</p><PistonDiagram /></div>,
        options: [
            "تقل الطاقة الحركية ويقل الضغط",
            "يزداد الحجم ويقل عدد الجسيمات",
            "يقل التركيز والضغط",
            "يزداد الحجم وعدد الجسيمات ثابت"
        ],
        correctAnswerIndex: 3,
        explanation: "العبارة الخاطئة هي (يزداد الحجم وعدد الجسيمات ثابت). عند الانتقال من B إلى A، نلاحظ أن الحجم يزداد (المكبس يرتفع) ولكن عدد الجسيمات يقل بشكل واضح. العبارات الأخرى صحيحة: يقل عدد الجسيمات فيزداد الحجم ويقل التركيز والضغط، ويفترض أن الطاقة الحركية تقل (اللون تغير من الأحمر للبارد) مما يساهم في انخفاض الضغط."
    }
];

// Add more level 2 questions here
export const staticQuizLvl2: QuizQuestion[] = [];

// Add more level 3 questions here
export const staticQuizLvl3: QuizQuestion[] = [];
