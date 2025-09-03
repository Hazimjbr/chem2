
import { InlineMath } from 'react-katex';
import React from 'react';

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
    }
];
export const staticQuizLvl3: QuizQuestion[] = [];
