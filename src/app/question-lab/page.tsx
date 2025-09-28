
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
        <span>بالون حجمه </span>
        <span dir="ltr" className="inline-block mx-1"><InlineMath math="1500\text{mL}" /></span>
        <span> مملوء بغاز Ne (</span>
        <span dir="ltr" className="inline-block mx-1"><InlineMath math="Mr = 20\text{g/mol}" /></span>
        <span>) عند درجة حرارة </span>
        <span dir="ltr" className="inline-block mx-1"><InlineMath math="27^\circ\text{C}" /></span>
        <span> وضغط </span>
        <span dir="ltr" className="inline-block mx-1"><InlineMath math="2\text{atm}" /></span>
        <span>. وعند صعود البالون للأعلى، انخفضت درجة الحرارة إلى </span>
        <span dir="ltr" className="inline-block mx-1"><InlineMath math="-3^\circ\text{C}" /></span>
        <span> وأصبح الضغط </span>
        <span dir="ltr" className="inline-block mx-1"><InlineMath math="0.5\text{atm}" /></span>
        <span>. فإن كتلة غاز Ne التي يجب التخلص منها للإبقاء على حجم الغاز ثابتًا، تساوي (g):</span>
      </>
    ),
    options: ["2.44", "3.9", "1.76", "5.4"],
    correctAnswerIndex: 3,
    explanation: (
        <div className="space-y-3 text-right" dir="rtl">
            <p>1. <strong>نحسب عدد المولات الابتدائي (n₁):</strong></p>
            <p className="text-xs">
                <span>نحول الوحدات: </span>
                <span dir="ltr" className="inline-block"><InlineMath math="V_1 = 1500\text{mL} = 1.5\text{L}" /></span>
                <span>، </span>
                <span dir="ltr" className="inline-block"><InlineMath math="T_1 = 27 + 273 = 300\text{K}" /></span>
                <span>.</span>
            </p>
            <div className="text-center" dir="ltr"><BlockMath math="n_1 = \frac{P_1V_1}{RT_1} = \frac{2 \times 1.5}{0.082 \times 300} \approx 0.122 \text{ mol}" /></div>

            <p>2. <strong>نحسب عدد المولات النهائي (n₂) للحفاظ على نفس الحجم:</strong></p>
             <p className="text-xs">
                <span>الظروف النهائية: </span>
                <span dir="ltr" className="inline-block"><InlineMath math="V_2 = 1.5\text{L}" /></span>
                <span> (ثابت)، </span>
                <span dir="ltr" className="inline-block"><InlineMath math="P_2 = 0.5\text{atm}" /></span>
                <span>، </span>
                <span dir="ltr" className="inline-block"><InlineMath math="T_2 = -3 + 273 = 270\text{K}" /></span>
                <span>.</span>
            </p>
            <div className="text-center" dir="ltr"><BlockMath math="n_2 = \frac{P_2V_2}{RT_2} = \frac{0.5 \times 1.5}{0.082 \times 270} \approx 0.034 \text{ mol}" /></div>

            <p>3. <strong>نحسب عدد المولات التي يجب التخلص منها (Δn):</strong></p>
            <div className="text-center" dir="ltr"><BlockMath math="\Delta n = n_1 - n_2 = 0.122 - 0.034 = 0.088 \text{ mol}" /></div>

            <p>4. <strong>نحسب كتلة الغاز المتسرب (m):</strong></p>
            <div className="text-center" dir="ltr"><BlockMath math="m = \Delta n \times Mr = 0.088 \text{ mol} \times 20 \text{ g/mol} \approx 1.76 \text{ g}" /></div>
        </div>
    ),
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
