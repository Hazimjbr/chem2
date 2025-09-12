
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Library, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils.tsx';
import { InlineMath } from 'react-katex';
import Image from 'next/image';

interface Question {
    questionText: React.ReactNode;
    options: string[];
    correctAnswerIndex: number;
    explanation: React.ReactNode;
    level: number;
    source: string;
}

const newQuestion: Question | null = {
    questionText: (
        <>
            <span>إذا خلط </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{mol}" /></span><span> من الغاز A ضغطه </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{atm}" /></span><span> وحجمه </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{L}" /></span><span> مع </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{mol}" /></span><span> من الغاز B ضغطه </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{atm}" /></span><span> وحجمه </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{L}" /></span><span> في وعاء حجمه </span><span dir="ltr" className="inline-block"><InlineMath math="1\text{L}" /></span><span> فحدث التفاعل </span><span dir="ltr" className="inline-block"><InlineMath math="A(g) + 2B(g) \rightarrow 3C(g)" /></span><span> فإن الضغط الكلي بعد انتهاء التفاعل</span>
        </>
    ),
    options: [
        "2atm",
        "4atm",
        "3atm",
        "1atm"
    ],
    correctAnswerIndex: 0,
    explanation: (
        <>
            <span>المادة المحددة للتفاعل هي B (نحتاج 2 مول ولدينا 1 مول فقط) سيتفاعل 0.5 مول من A مع 1 مول من B وينتج 1.5 مول من C سيتبقى 0.5 مول من A العدد الكلي للمولات النهائية = 1.5 (C) + 0.5 (A) = 2 مول إذن الضغط النهائي سيكون 2atm</span>
        </>
    ),
    level: 2,
    source: "مراجعة الوحدة الأولى"
};


const QuestionCard = ({ question }: { question?: Question | null }) => {
    if (!question) {
        return (
             <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle>لا توجد أسئلة جديدة في المعمل حاليًا</CardTitle>
                    <CardDescription>
                        هذه المساحة مخصصة لمراجعة الأسئلة المقترحة قبل إضافتها بشكل نهائي
                    </CardDescription>
                </CardHeader>
             </Card>
        )
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="text-lg font-bold">
                        {question.questionText}
                    </div>
                    <Badge variant={question.level === 3 ? "destructive" : question.level === 2 ? "secondary" : "default"}>
                        المستوى المقترح {question.level}
                    </Badge>
                </div>
                <CardDescription className="text-xs pt-2">
                    المصدر المقترح {question.source}
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
                                "w-full justify-between text-left h-auto py-2 px-3 text-sm flex items-center",
                                isCorrect && "border-green-500 bg-green-500/10 text-green-700 hover:bg-green-500/20"
                            )}
                            disabled
                        >
                            <span className="font-sans font-bold ml-2">{["أ", "ب", "ج", "د"][index]}</span>
                            <span className="flex-1 whitespace-normal" dir="rtl">{option}</span>
                            {isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                        </Button>
                    );
                })}
            </CardContent>
            <CardFooter>
                <Alert variant="default" className="border-blue-500 bg-blue-100/30 w-full">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <AlertTitle className="font-bold text-blue-700">الشرح المقترح</AlertTitle>
                    <AlertDescription>{question.explanation}</AlertDescription>
                </Alert>
            </CardFooter>
        </Card>
    )
};

export default function QuestionLabPage() {
    return (
        <div className="p-4 md:p-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-primary mb-2">
                    <Library className="inline-block h-10 w-10 mb-2" /> معمل الأسئلة
                </h1>
                <p className="text-lg text-muted-foreground">
                    هنا نقوم بصياغة ومناقشة الأسئلة قبل إضافتها بشكل نهائي
                </p>
            </header>
            
            <div className="space-y-6">
                 <QuestionCard question={newQuestion} />
            </div>
        </div>
    );
}
