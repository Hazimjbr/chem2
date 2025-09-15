
import { InlineMath } from 'react-katex';
import React from 'react';

export interface QuizQuestion {
    question: React.ReactNode;
    options: string[] | React.ReactNode[];
    correctAnswerIndex: number;
    explanation: string;
}

export const staticQuizLvl1: QuizQuestion[] = [];
export const staticQuizLvl2: QuizQuestion[] = [];
export const staticQuizLvl3: QuizQuestion[] = [];
