
'use client';

import React from 'react';

export interface QuizQuestion {
    question: React.ReactNode;
    options: string[];
    correctAnswerIndex: number;
    explanation: React.ReactNode;
}

export const staticQuizLvl1: QuizQuestion[] = [
    {
        question: "ما هي الخاصية الأساسية للبلازما التي تجعلها فعالة في تكسير روابط النفايات",
        options: [
            "لونها المميز",
            "قدرتها على توصيل الكهرباء",
            "الطاقة الهائلة التي تختزنها",
            "شكلها وحجمها المتغيران"
        ],
        correctAnswerIndex: 2,
        explanation: "الطاقة الهائلة المختزنة في البلازما هي التي تسمح بتكسير الروابط الكيميائية القوية في جميع أنواع النفايات وتحويلها إلى عناصرها الأولية"
    },
    {
        question: "ما هي السلبية الرئيسية المذكورة لتقنية محول النفايات البلازمي",
        options: [
            "تنتج غازات دفيئة أكثر من الحرق",
            "تحتاج إلى مساحات واسعة جدًا",
            "لا يمكنها معالجة النفايات العضوية",
            "ارتفاع تكلفة الإنشاء الأولية"
        ],
        correctAnswerIndex: 3,
        explanation: "ذكر النص أن من أهم سلبيات تقنية محول النفايات البلازمي هو ارتفاع التكلفة الأولية لإنشاء المحولات"
    }
];

export const staticQuizLvl2: QuizQuestion[] = [];
export const staticQuizLvl3: QuizQuestion[] = [];
