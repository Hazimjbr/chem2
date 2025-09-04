
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Eye, RefreshCw, XCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils.tsx';
import React from 'react';
import Image from 'next/image';
import { InlineMath } from 'react-katex';

const QuestionCard = () => {
    const question = {
        question: (
            <div className="space-y-4">
                <p>اعتمادا على الرسم المجاور والمتعلق بالمواد <span dir="ltr" className="font-mono inline-block">CH₃CH₂OH</span>, <span dir="ltr" className="font-mono inline-block">CH₄</span>, <span dir="ltr" className="font-mono inline-block">CH₃CH₃</span>, <span dir="ltr" className="font-mono inline-block">CH₃Cl</span> فإن الرمز الذي يمثل الطاقة اللازمة لتبخر السائل <span dir="ltr" className="font-mono inline-block">CH₃Cl</span> هو:</p>
                <div className="flex justify-center">
                    <Image
                        src="https://i.ibb.co/hF9Fm0hw/22.png"
                        alt="Vapor Pressure vs Temperature for four liquids"
                        width={400}
                        height={250}
                        className="rounded-lg border bg-white"
                        data-ai-hint="vapor pressure curves"
                    />
                </div>
            </div>
        ),
        options: ["W", "M", "R", "Q"],
        correctAnswerIndex: 2,
        explanation: "قوة الترابط تحدد طاقة التبخر. الترتيب من الأقوى للأضعف: الإيثانول (روابط هيدروجينية) > كلوروميثان (ثنائي قطب) > إيثان > ميثان (قوى لندن). طاقة التنشيط تتبع نفس الترتيب. إذن: Q=إيثانول, R=كلوروميثان, M=إيثان, W=ميثان. الإجابة الصحيحة هي R."
    };

    const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
    const [isRevealed, setIsRevealed] = React.useState(false);

    const handleSelect = (index: number) => {
        if (isRevealed) return;
        setSelectedAnswer(index);
    }
    
    const handleReveal = () => setIsRevealed(true);
    const handleReset = () => {
        setSelectedAnswer(null);
        setIsRevealed(false);
    }

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-lg">
                    {question.question}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {question.options.map((option, index) => {
                    const isCorrect = index === question.correctAnswerIndex;
                    const isSelected = selectedAnswer === index;
                    let buttonClass = 'border-input hover:bg-accent/50';

                    if (isRevealed) {
                        if (isCorrect) {
                            buttonClass = 'border-green-500 bg-green-500/10 text-green-700';
                        } else if (isSelected) {
                            buttonClass = 'border-red-500 bg-red-500/10 text-red-700';
                        }
                    } else if (isSelected) {
                        buttonClass = 'border-primary bg-primary/10';
                    }
                    
                    return (
                        <Button
                            key={index}
                            variant="outline"
                            className={cn("w-full justify-start text-right h-auto py-2 px-3 text-sm flex items-start", buttonClass)}
                            onClick={() => handleSelect(index)}
                        >
                            <span className="ml-3 font-bold">{["أ", "ب", "ج", "د"][index]}</span>
                            <div className="flex-1 whitespace-normal">{option}</div>
                        </Button>
                    );
                })}
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-4">
                 {isRevealed && (
                    <Alert variant="default" className="border-blue-500 bg-blue-100/30">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        <AlertTitle className="font-bold text-blue-700">الشرح</AlertTitle>
                        <AlertDescription>{question.explanation}</AlertDescription>
                    </Alert>
                )}
                <div className="flex gap-2">
                    <Button onClick={handleReveal} disabled={selectedAnswer === null || isRevealed} className="flex-1">
                        <Eye className="ml-2 h-4 w-4" />
                        كشف الإجابة
                    </Button>
                    <Button onClick={handleReset} variant="outline">
                        <RefreshCw className="ml-2 h-4 w-4" />
                        إعادة
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};


export default function QuestionLabPage() {
    return (
        <div className="p-4 md:p-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-primary mb-2">معمل الأسئلة</h1>
                <p className="text-lg text-muted-foreground">
                    هنا نقوم بصياغة ومناقشة الأسئلة قبل إضافتها بشكل نهائي
                </p>
            </header>
            <QuestionCard />
        </div>
    )
}
