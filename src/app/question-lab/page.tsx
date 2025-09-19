
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
    questionText: <><span>إذا أضيف 30g من ملح كلوريد الصوديوم NaCl إلى 50g ماء عند درجة حرارة <span dir="ltr">50°C</span> وبعد تحريك المحلول جيدا ترسبت كمية من الملح في قاع الوعاء تم ترشيح المحلول وتجفيف الملح المترسب فكانت كتلته 10g فإن ذائبية الملح عند درجة حرارة <span dir="ltr">60°C</span> تساوي:</span></>,
    options: [
        "40",
        "50",
        "10",
        "20"
    ],
    correctAnswerIndex: 0,
    explanation: (
        <div className="space-y-2 text-right" dir="rtl">
            <p><strong>ملاحظة:</strong> السؤال يطلب الذائبية عند <span dir="ltr">60°C</span> لكنه يعطي بيانات عند <span dir="ltr">50°C</span> فقط. الحل يفترض أن المطلوب هو الذائبية عند <span dir="ltr">50°C</span>.</p>
            <p>1. <strong>حساب كمية الملح الذائبة:</strong> الكمية المضافة (30g) - الكمية المترسبة (10g) = 20g</p>
            <p>2. <strong>فهم الذائبية:</strong> الذائبية هي الكتلة التي تذوب في 100g من الماء.</p>
            <p>3. <strong>حساب النسبة والتناسب:</strong> إذا كانت 20g تذوب في 50g من الماء، فكم يذوب في 100g؟</p>
            <p className="text-center" dir="ltr"><InlineMath math="(20g \ NaCl / 50g \ H₂O) \times 100g \ H₂O = 40g \ NaCl" /></p>
            <p><strong>النتيجة:</strong> إذًا الذائبية هي 40.</p>
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
