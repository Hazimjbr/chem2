'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Library, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils.tsx';
import { InlineMath } from 'react-katex';

interface Question {
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
    level: number;
    source: string;
}

const newQuestion: Question = {
    questionText: "السائل الذي له أقل طاقة تكاثف مولية من السوائل الآتية:",
    options: [
        "CH₃COCH₃",
        "CH₃CH₂Cl",
        "CH₃CH₂OH",
        "CH₃CH₃"
    ],
    correctAnswerIndex: 3,
    explanation: "طاقة التكاثف الأقل تعني أضعف قوى ترابط بين الجزيئات. الإيثان (CH₃CH₃) هو جزيء غير قطبي يمتلك أضعف قوى ترابط (قوى لندن فقط)، بينما المركبات الأخرى تمتلك قوى ثنائي القطب أو روابط هيدروجينية وهي أقوى.",
    level: 2,
    source: "الوحدة الأولى / الدرس الثاني / التكاثف"
};

const QuestionCard = ({ question }: { question: Question }) => (
    <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="text-lg">
                    {question.questionText}
                </CardTitle>
                <Badge variant={question.level === 3 ? "destructive" : question.level === 2 ? "secondary" : "default"}>
                    المستوى المقترح: {question.level}
                </Badge>
            </div>
            <CardDescription className="text-xs pt-2">
                المصدر المقترح: {question.source}
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
                            "w-full justify-between text-left h-auto py-2 px-3 text-sm flex items-center font-mono",
                            isCorrect && "border-green-500 bg-green-500/10 text-green-700 hover:bg-green-500/20"
                        )}
                        disabled
                    >
                        <span><span className="font-sans font-bold ml-2">{["أ", "ب", "ج", "د"][index]})</span> <InlineMath math={option.replace(/CH(\d)/g, 'CH_$1')} /></span>
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
);

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
