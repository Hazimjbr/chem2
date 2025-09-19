
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
        <span>إذا علمت أن ذائبية الغاز A في الماء عند درجة حرارة </span>
        <span dir="ltr" className="inline-block mx-1">20°C</span>
        <span> وضغط </span>
        <span dir="ltr" className="inline-block mx-1">0.5 atm</span>
        <span> هي </span>
        <span dir="ltr" className="inline-block mx-1">0.65 g/L</span>
        <span>، فإن ثابت الذائبية عند ضغط </span>
        <span dir="ltr" className="inline-block mx-1">1.5 atm</span>
        <span> ودرجة حرارة </span>
        <span dir="ltr" className="inline-block mx-1">10°C</span>
        <span> يساوي:</span>
      </>
    ),
    options: [
        "1.50",
        "0.77",
        "1.30",
        "0.07"
    ],
    correctAnswerIndex: 0,
    explanation: (
        <div className="space-y-2 text-right" dir="rtl">
            <p>1 <strong>حساب ثابت هنري (KH) عند 20°C:</strong> من قانون هنري S = KH * P فإن KH = S / P. إذن KH = 0.65 / 0.5 = 1.30 g/L.atm.</p>
            <p>2 <strong>فهم تأثير الحرارة:</strong> ثابت هنري (KH) يعتمد على درجة الحرارة. ذائبية الغازات تزداد بانخفاض درجة الحرارة.</p>
            <p>3 <strong>الاستنتاج:</strong> بما أن الحرارة انخفضت من 20°C إلى 10°C، فإن الذائبية ستزداد، وبالتالي قيمة ثابت هنري (KH) يجب أن تزداد أيضًا وتكون أعلى من 1.30.</p>
            <p>4 <strong>اختيار الإجابة:</strong> الخيار الوحيد المتاح الذي هو أكبر من 1.30 هو 1.50.</p>
        </div>
    ),
    level: 3,
    source: "الوحدة 2 / الدرس 1 / الجزء 3"
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
