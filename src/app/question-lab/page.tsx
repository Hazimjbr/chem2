

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
        <div className="space-y-4">
            <p>• العبارة الخاطئة فيما يتعلق بالرسم المجاور والذي يمثل الحد الأدنى من الطاقة اللازمة للتغلب على قوى تجاذب جزيئات المواد السائلة D , C , B , A عند درجة حرارة ثابتة T هي:</p>
            <div className="flex justify-center">
                <Image
                    src="https://i.ibb.co/BVCwCvTn/3.png"
                    alt="رسم بياني للطاقة"
                    width={400}
                    height={250}
                    className="rounded-lg border bg-white"
                />
            </div>
        </div>
    ),
    options: [
        "المادة C لها أعلى ضغط بخاري",
        "المادة B لها أعلى طاقة تكاثف مولية",
        "ترابط جزيئات المادة A أضعف من المادة D",
        "معظم جزيئات المادة C في الحالة الغازية",
    ],
    correctAnswerIndex: 2,
    explanation: "العبارة الخاطئة هي ترابط جزيئات المادة A أضعف من المادة D لأن طاقة التنشيط للمادة A أقل من D مما يعني أن ترابطها أضعف وليس العكس الخيار C لها أعلى ضغط بخاري صحيح لأن C لها أقل طاقة تنشيط مما يعني أضعف قوى ترابط وأعلى ضغط بخاري الخيار B لها أعلى طاقة تكاثف مولية صحيح لأن B لها أعلى طاقة تنشيط مما يعني أقوى قوى ترابط وأعلى طاقة تكاثف الخيار معظم جزيئات المادة C في الحالة الغازية صحيح لأنها تمتلك أضعف قوى ترابط وبالتالي معظم جزيئاتها تكون في الحالة الغازية",
    level: 3,
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
                                "w-full justify-between text-right h-auto py-2 px-3 text-sm flex items-center",
                                isCorrect && "border-green-500 bg-green-500/10 text-green-700 hover:bg-green-500/20"
                            )}
                            disabled
                        >
                            <span className="font-sans font-bold ml-2">{["أ", "ب", "ج", "د"][index]}</span>
                            <span className="flex-1 whitespace-normal">{option}</span>
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
