
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Library } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils.tsx';
import type { QuizQuestion as BaseQuizQuestion } from '@/components/quiz';

// Import all exam files
import * as part1Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-1/exam';
import * as part2Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-2/exam';
import * as part3Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-3/exam';
import * as part4Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-4/exam';
import * as part5Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-5/exam';
import * as part6Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-6/exam';
import * as part7Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-7/exam';
import * as part8Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-8/exam';
import * as part9Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-9/exam';
import * as part10Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-10/exam';
import * as unit1ReviewExam from '@/app/materials/semester-1/unit-1/section-5/exam';

interface SourcedQuizQuestion extends BaseQuizQuestion {
    source: string;
    level: number;
}

const allQuestions: SourcedQuizQuestion[] = [];

const sources = [
    { module: part1Exam, name: 'حالات المادة / غازية / نظرية الحركة الجزيئية' },
    { module: part2Exam, name: 'حالات المادة / غازية / مقدمة قوانين الغازات' },
    { module: part3Exam, name: 'حالات المادة / غازية / قانون بويل' },
    { module: part4Exam, name: 'حالات المادة / غازية / قانون شارل' },
    { module: part5Exam, name: 'حالات المادة / غازية / قانون جاي لوساك' },
    { module: part6Exam, name: 'حالات المادة / غازية / القانون الجامع' },
    { module: part7Exam, name: 'حالات المادة / غازية / قانون أفوجادرو' },
    { module: part8Exam, name: 'حالات المادة / غازية / قانون الغاز المثالي' },
    { module: part9Exam, name: 'حالات المادة / غازية / قانون دالتون' },
    { module: part10Exam, name: 'حالات المادة / غازية / قانون جراهام' },
    { module: unit1ReviewExam, name: 'مراجعة الوحدة الأولى' },
];

sources.forEach(source => {
    if (source.module.staticQuizLvl1) {
        allQuestions.push(...source.module.staticQuizLvl1.map(q => ({ ...q, source: source.name, level: 1 })));
    }
    if (source.module.staticQuizLvl2) {
        allQuestions.push(...source.module.staticQuizLvl2.map(q => ({ ...q, source: source.name, level: 2 })));
    }
    if (source.module.staticQuizLvl3) {
        allQuestions.push(...source.module.staticQuizLvl3.map(q => ({ ...q, source: source.name, level: 3 })));
    }
});


const QuestionCard = ({ question }: { question: SourcedQuizQuestion }) => (
    <Card className="w-full">
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="text-lg">
                    {question.question}
                </CardTitle>
                <Badge variant={question.level === 3 ? "destructive" : question.level === 2 ? "secondary" : "default"}>
                    المستوى: {question.level}
                </Badge>
            </div>
            <CardDescription className="text-xs pt-2">
                المصدر: {question.source}
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            {question.options.map((option, index) => {
                const isCorrect = index === question.correctAnswerIndex;
                return (
                    <Button
                        key={index}
                        variant="outline"
                        className={cn(
                            "w-full justify-between text-right h-auto py-2 px-3 text-sm flex items-center",
                            isCorrect && "border-green-500 bg-green-500/10 text-green-700 hover:bg-green-500/20"
                        )}
                        disabled
                    >
                        <div className="flex-1 whitespace-normal">{option}</div>
                        {isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </Button>
                );
            })}
        </CardContent>
        <CardFooter>
             <Alert variant="default" className="border-blue-500 bg-blue-100/30 w-full">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <AlertTitle className="font-bold text-blue-700">الشرح</AlertTitle>
                <AlertDescription>{question.explanation}</AlertDescription>
            </Alert>
        </CardFooter>
    </Card>
);

export default function QuestionBankPage() {
    return (
        <div className="container mx-auto p-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-primary mb-2">
                    <Library className="inline-block h-10 w-10 mb-2" /> بنك الأسئلة
                </h1>
                <p className="text-lg text-muted-foreground">
                    مراجعة شاملة لجميع أسئلة الاختبارات في المشروع.
                </p>
            </header>
            
            <div className="space-y-6">
                {allQuestions.map((q, index) => (
                    <QuestionCard key={index} question={q} />
                ))}
            </div>
        </div>
    );
}
