
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
            <span>وعاء حجمه </span>
            <span dir="ltr" className="inline-block mx-1">1.64L</span>
            <span> يحتوي على </span>
            <span dir="ltr" className="inline-block mx-1">1.1g</span>
            <span> من </span>
            <span dir="ltr" className="inline-block mx-1"><InlineMath math="CO_2"/></span>
            <span> و </span>
            <span dir="ltr" className="inline-block mx-1">1.6g</span>
            <span> من </span>
            <span dir="ltr" className="inline-block mx-1"><InlineMath math="O_2"/></span>
            <span> وكتلة مجهولة من </span>
            <span dir="ltr" className="inline-block mx-1"><InlineMath math="N_2"/></span>
            <span> عند درجة حرارة </span>
            <span dir="ltr" className="inline-block mx-1">27^\circ C</span>
            <span> وضغط </span>
            <span dir="ltr" className="inline-block mx-1">1.5atm</span>
            <span> إذا علمت أن الكتل المولية </span>
            <span dir="ltr" className="inline-block mx-1">C=12 N=14 O=16</span>
            <span> فإن الضغوط الجزئية للغازات (</span>
            <span dir="ltr" className="inline-block mx-1">O_2 / CO_2</span>
            <span>) على الترتيب هي</span>
        </>
    ),
    options: [
        "0.025 / 0.050",
        "0.050 / 0.025",
        "0.750 / 0.375",
        "0.5 / 0.5"
    ],
    correctAnswerIndex: 2,
    explanation: (
        <>
            <span>نحسب عدد مولات الغازات المعلومة</span>
            <span dir="ltr" className="block text-left"><InlineMath math="n_{CO_2} = \frac{1.1g}{44g/mol} = 0.025mol"/></span>
            <span dir="ltr" className="block text-left"><InlineMath math="n_{O_2} = \frac{1.6g}{32g/mol} = 0.050mol"/></span>
            <span>نحسب عدد المولات الكلي من قانون الغاز المثالي</span>
            <span dir="ltr" className="block text-left"><InlineMath math="n_{total} = \frac{PV}{RT} = \frac{1.5 \times 1.64}{0.0821 \times 300} \approx 0.1mol"/></span>
            <span>نحسب عدد مولات النيتروجين</span>
            <span dir="ltr" className="block text-left"><InlineMath math="n_{N_2} = n_{total} - n_{CO_2} - n_{O_2} = 0.1 - 0.025 - 0.050 = 0.025mol"/></span>
            <span>نحسب الضغوط الجزئية باستخدام قانون دالتون</span>
            <span dir="ltr" className="block text-left"><InlineMath math="P_{CO_2} = \frac{0.025}{0.1} \times 1.5 = 0.375atm"/></span>
            <span dir="ltr" className="block text-left"><InlineMath math="P_{O_2} = \frac{0.050}{0.1} \times 1.5 = 0.750atm"/></span>
            <span>الترتيب المطلوب هو (O₂ / CO₂) أي (0750 / 0375)</span>
        </>
    ),
    level: 3,
    source: "مقترح - الوحدة 1 / قانون دالتون والغاز المثالي"
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
                            <span className="flex-1 whitespace-normal" dir="ltr">{option}</span>
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
