import { InlineMath } from 'react-katex';
import React from 'react';
import Image from 'next/image';

export interface QuizQuestion {
    question: React.ReactNode;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

// Placeholder to prevent build errors. Will be populated later.
export const staticQuizLvl1: QuizQuestion[] = [];
export const staticQuizLvl2: QuizQuestion[] = [];
export const staticQuizLvl3: QuizQuestion[] = [];
