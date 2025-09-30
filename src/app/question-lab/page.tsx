
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Library, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils.tsx';
import { InlineMath, BlockMath } from 'react-katex';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


interface Question {
    questionText: React.ReactNode;
    options: (string | React.ReactNode)[];
    correctAnswerIndex: number;
    explanation: React.ReactNode;
    level: number;
    source: string;
}

const newQuestion: Question | null = {
    questionText: (
        <>
            <p>اعتمادا على الشكل المجاور فإن قيمة X تساوي</p>
            <div className="flex justify-center my-2">
                <Image 
                    src="https://i.ibb.co/9HYRwqWj/image.jpg"
                    alt="Boyle's Law Graph" 
                    width={200}
                    height={150}
                    className="rounded-lg border bg-white"
                    data-ai-hint="Boyle's law graph"
                />
            </div>
        </>
    ),
    options: [
        <span dir="ltr">0.08 atm</span>,
        <span dir="ltr">608 mmHg</span>,
        <span dir="ltr">0.6 atm</span>,
        <span dir="ltr">808 kPa</span>
    ],
    correctAnswerIndex: 1,
    explanation: (
         <div className="space-y-3 text-right" dir="rtl">
            <p>يمثل الشكل العلاقة العكسية بين الضغط والحجم وفقا لقانون بويل</p>
            <div className="text-center" dir="ltr"><BlockMath math="P_1V_1 = P_2V_2" /></div>
            <p>من الشكل نجد أن النقطة الأولى هي P₁=02atm و V₁=12L والنقطة الثانية هي P₂=X و V₂=03L</p>
            <p>بالتعويض في القانون</p>
            <div className="text-center" dir="ltr"><BlockMath math="(0.2)(1.2) = X(0.3)" /></div>
            <div className="text-center" dir="ltr"><BlockMath math="X = \frac{0.24}{0.3} = 0.8 \text{ atm}" /></div>
            <p>الإجابة ليست موجودة مباشرة في الخيارات لذا يجب تحويل الوحدات للتحقق</p>
            <p> 608mmHg نحوله إلى mmHg بالضرب في 760 يصبح الجواب</p>
            <div className="text-center" dir="ltr"><BlockMath math="{0.8}\times{760} = 608 \text{ atm}" /></div>
        </div>
    ),
    level: 2,
    source: "الوحدة 1 / الدرس 1 / قانون بويل"
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
