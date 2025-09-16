'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, X, ArrowRight } from 'lucide-react';
import React, { useEffect } from 'react';
import type { QuizQuestion } from '@/components/quiz';
import Quiz from '@/components/quiz';

interface LessonLayoutProps {
    lessonTitle: string;
    lessonSubtitle: string;
    mainIdea: string;
    learningOutcomes: string[];
    staticQuizzes: {
        lvl1: QuizQuestion[];
        lvl2: QuizQuestion[];
        lvl3: QuizQuestion[];
    };
    lessonId: string;
    previousLesson: string | null;
    nextLesson: string | null;
    previousLessonTitle?: string;
    nextLessonTitle?: string;
    children?: React.ReactNode;
    lessonContent?: string;
    completedInteractiveCount?: number;
}

export default function LessonLayout({
    lessonTitle,
    lessonSubtitle,
    mainIdea,
    learningOutcomes,
    staticQuizzes,
    lessonId,
    previousLesson,
    nextLesson,
    previousLessonTitle = 'الجزء السابق',
    nextLessonTitle = 'الجزء التالي',
    children,
    lessonContent = '',
}: LessonLayoutProps) {
    useEffect(() => {
        localStorage.setItem('lastVisitedLesson', lessonId);
    }, [lessonId]);

    return (
        <div className="p-4 md:p-8 relative">
            <Link href="/materials/semester-1" passHref>
                <Button variant="ghost" size="icon" className="absolute top-4 left-4">
                    <X className="h-6 w-6" />
                    <span className="sr-only">إغلاق</span>
                </Button>
            </Link>
            <header className="mb-10 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">{lessonTitle}</h1>
                <p className="text-base md:text-lg text-muted-foreground">{lessonSubtitle}</p>
            </header>

            <main className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>الفكرة الرئيسة</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg">{mainIdea}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>نتاجات التعلم</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {learningOutcomes.map((outcome, index) => (
                                <li key={index} className="flex items-start">
                                    <Check className="h-6 w-6 text-green-500 ml-2 flex-shrink-0" />
                                    <span>{outcome}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {children}
                
                <Card>
                    <CardHeader>
                        <CardTitle>اختبر فهمك</CardTitle>
                        <CardDescription>
                           اختر مستوى الصعوبة المناسب لك. تزداد الصعوبة تلقائيًا عند تحقيق نتيجة 80% أو أعلى.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Quiz 
                            lessonContent={lessonContent} 
                            staticQuizzes={staticQuizzes} 
                            lessonId={lessonId}
                        />
                    </CardContent>
                </Card>

            </main>

            <footer className="mt-12 border-t pt-6">
                <div className="flex flex-col-reverse md:flex-row md:justify-between gap-4">
                    {previousLesson ? (
                        <Link href={previousLesson} passHref>
                            <Button size="lg" variant="outline" className="w-full md:w-auto">
                                <ArrowRight className="ml-2 h-5 w-5" />
                                {previousLessonTitle}
                            </Button>
                        </Link>
                    ) : <div />}
                    {nextLesson && (
                         <Link href={nextLesson} passHref>
                            <Button size="lg" className="w-full md:w-auto">
                                {nextLessonTitle}
                                <ArrowLeft className="mr-2 h-5 w-5" />
                            </Button>
                        </Link>
                    )}
                </div>
            </footer>
        </div>
    );
}
