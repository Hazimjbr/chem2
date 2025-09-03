
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Eye, RefreshCw, XCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils.tsx';
import React from 'react';

const question = {
    question: "السائل الذي له أقوى ترابط من السوائل الآتية:",
    options: [
        "CH₃COOH",
        "CH₃CH₂Cl",
        "CH₃COCH₃",
        "CH₃CH₃"
    ],
    correctAnswerIndex: 0,
    explanation: "حمض الأسيتيك (CH₃COOH) هو الأقوى لأنه يكون روابط هيدروجينية وهي أقوى أنواع قوى الترابط بين الجزيئات مقارنة بالخيارات الأخرى التي تمتلك قوى ثنائي القطب أو قوى لندن فقط."
}

export default function QuestionLabPage() {
    const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
    const [answerStatus, setAnswerStatus] = React.useState<'unanswered' | 'correct' | 'incorrect'>('unanswered');

    const handleSelect = (index: number) => {
        if (answerStatus !== 'unanswered') return;
        setSelectedAnswer(index);
        setAnswerStatus(index === question.correctAnswerIndex ? 'correct' : 'incorrect');
    }

    const handleReset = () => {
        setSelectedAnswer(null);
        setAnswerStatus('unanswered');
    }

    return (
        <div className="container mx-auto p-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-primary mb-2">معمل الأسئلة</h1>
                <p className="text-lg text-muted-foreground">
                    هنا نقوم بصياغة ومناقشة الأسئلة قبل إضافتها بشكل نهائي
                </p>
            </header>

            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-lg">
                        {question.question}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {question.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        let buttonClass = 'border-input hover:bg-accent/50';
                        if (answerStatus === 'correct' && isSelected) {
                        buttonClass = 'border-green-500 bg-green-500/10 text-green-700 hover:bg-green-500/20';
                        } else if (answerStatus === 'incorrect' && isSelected) {
                        buttonClass = 'border-red-500 bg-red-500/10 text-red-700 hover:bg-red-500/20';
                        } else if (answerStatus !== 'unanswered' && index === question.correctAnswerIndex) {
                        buttonClass = 'border-green-500 bg-green-500/10 text-green-700';
                        }
                        
                        return (
                            <Button
                                key={index}
                                variant="outline"
                                className={cn("w-full justify-start text-right h-auto py-2 px-3 text-sm flex items-start", buttonClass)}
                                onClick={() => handleSelect(index)}
                                disabled={answerStatus !== 'unanswered'}
                            >
                                <span className="ml-3 font-bold">{["أ", "ب", "ج", "د"][index]}</span>
                                <span className="flex-1 whitespace-normal">{option}</span>
                            </Button>
                        )
                    })}
                </CardContent>

                {answerStatus !== 'unanswered' && (
                    <CardFooter className="flex-col items-stretch gap-4 pt-4">
                        <Alert variant={answerStatus === 'correct' ? 'default' : 'destructive'} className={cn(
                        answerStatus === 'correct' 
                            ? 'border-green-500 bg-green-100/30' 
                            : 'border-red-500 bg-red-100/30'
                        )}>
                            {answerStatus === 'correct' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                            <AlertTitle className="font-bold">
                                {answerStatus === 'correct' ? 'إجابة صحيحة' : 'إجابة خاطئة'}
                            </AlertTitle>
                            <AlertDescription>
                                {question.explanation}
                            </AlertDescription>
                        </Alert>
                         <Button onClick={handleReset} variant="outline">
                            <RefreshCw className="ml-2 h-4 w-4" />
                            إعادة المحاولة
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}
