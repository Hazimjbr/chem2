

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
            <p>اعتمادا على الرسم المجاور يمكن أن يغلي حمض الإيثانويك على درجة حرارة <span dir="ltr" className="inline-block">80°C</span> عند ضغط مقداره يساوي:</p>
            <div className="flex justify-center">
                <Image
                    src="https://i.ibb.co/dwTN2WHw/3.png"
                    alt="منحنيات الضغط البخاري"
                    width={400}
                    height={250}
                    className="rounded-lg border bg-white"
                    data-ai-hint="vapor pressure curves"
                />
            </div>
        </div>
    ),
    options: ["26.7 KPa", "101.3 KPa", "760 mmHg", "0.62 atm"],
    correctAnswerIndex: 0,
    explanation: (
        <span>
            لكي يغلي السائل، يجب أن يتساوى ضغطه البخاري مع الضغط الخارجي. من الرسم البياني، نجد أن الضغط البخاري لحمض الإيثانويك (المنحنى A) عند درجة حرارة <span dir="ltr">80°C</span> هو 200mmHg. لتحويل هذه القيمة إلى KPa، نستخدم العلاقة: <InlineMath math="P(\text{kPa}) = 200 \text{mmHg} \times \frac{101.3 \text{kPa}}{760 \text{mmHg}} \approx 26.7 \text{kPa}" />.
        </span>
    ),
    level: 3,
    source: "الوحدة الأولى / الدرس 2 / الجزء 5"
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
