
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
            <span>غاز حجمه </span>
            <span dir="ltr" className="inline-block mx-1"><InlineMath math="5L"/></span>
            <span> عند درجة حرارة </span>
            <span dir="ltr" className="inline-block mx-1"><InlineMath math="27^\circ C"/></span>
            <span> وضغط ثابت. إذا تم خفض درجة حرارته المئوية بنسبة 90%، فإن حجمه الجديد بوحدة L يساوي:</span>
        </>
    ),
    options: ["4.8", "5.0", "0.5", "50"],
    correctAnswerIndex: 0,
    explanation: (
         <div className="space-y-3 text-right" dir="rtl">
            <p>1. <strong>تحويل الحرارة الابتدائية إلى كلفن:</strong></p>
            <div className="text-center" dir="ltr"><BlockMath math="T_1(K) = 27 + 273 = 300K" /></div>
            <p>2. <strong>حساب الحرارة النهائية بالسيليزيوس:</strong> تم خفضها بنسبة 90%، أي بقي منها 10%.</p>
            <div className="text-center" dir="ltr"><BlockMath math="T_2(^\circ C) = 27 \times (1 - 0.90) = 2.7^\circ C" /></div>
            <p>3. <strong>تحويل الحرارة النهائية إلى كلفن:</strong></p>
            <div className="text-center" dir="ltr"><BlockMath math="T_2(K) = 2.7 + 273 = 275.7K" /></div>
            <p>4. <strong>تطبيق قانون شارل (V₁/T₁ = V₂/T₂):</strong></p>
            <div className="text-center" dir="ltr"><BlockMath math="V_2 = \frac{V_1 \times T_2}{T_1} = \frac{5L \times 275.7K}{300K} \approx 4.6L" /></div>
            <p>الإجابة الأقرب من الخيارات المتاحة هي 4.8L.</p>
        </div>
    ),
    level: 3,
    source: "الوحدة 1 / الدرس 1 / قانون شارل (تطبيقي)"
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
