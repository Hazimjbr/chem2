
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils.tsx';
import Image from 'next/image';
import { InlineMath } from 'react-katex';

/**
 * منطقة الاختبار المؤقتة - معمل الأسئلة
 * ------------------------------------
 * الغرض هذه الصفحة هي بيئة معزولة لتصميم ومراجعة الأسئلة بسرعة
 * آلية العمل
 * 1  عندما تطلب سؤالاً جديداً سأقوم بوضعه هنا في الكائن `sampleQuestion`
 * 2  يمكنك مراجعة السؤال بصريًا في هذه الصفحة
 * 3  اطلب أي تعديلات (نص خيارات شرح) سأقوم بتحديثها هنا فورًا
 * 4  عندما توافق على السؤال سأقوم بنقله من هنا إلى ملف `exam.tsx` النهائي الخاص بالدرس
 */

// ====================================================================================
// ===================              مكان وضع السؤال للمعاينة              ===================
// ====================================================================================
const sampleQuestion = {
    question: <><span>عينة من غاز الميثان في الظروف المعيارية حجمها </span><InlineMath math="3L" /><span> إذا علمت أن الكتلة المولية للميثان </span><InlineMath math="16\text{g/mol}" /><span> فإن كثافتها بوحدة </span><InlineMath math="\text{g/L}" /><span> تساوي:</span></>,
    options: [
        "2.1",
        "0.7",
        "1.4",
        "0.2"
    ],
    correctAnswerIndex: 1,
    explanation: "أولاً، نحسب عدد مولات الميثان: n = 3L / 22.4 L/mol ≈ 0.134mol. ثانياً، نحسب كتلة الميثان: m = n × Mr = 0.134mol × 16g/mol ≈ 2.14g. أخيراً، نحسب الكثافة: d = m / V = 2.14g / 3L ≈ 0.71g/L، الإجابة الأقرب هي 0.7."
};
// ====================================================================================
// ====================================================================================


// مكون بسيط لعرض السؤال للمراجعة
export default function QuestionLabPage() {

    return (
        <div className="container mx-auto p-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-primary mb-2">معمل الأسئلة</h1>
                <p className="text-lg text-muted-foreground">
                    هذه منطقة اختبار لمراجعة الأسئلة قبل إضافتها إلى بنك الأسئلة الدائم
                </p>
            </header>
            
            <div className="max-w-4xl mx-auto">
                 <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-lg">
                            معاينة السؤال
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-lg font-semibold pt-2">{typeof sampleQuestion.question === 'string' ? sampleQuestion.question : <>{sampleQuestion.question}</>}</div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {sampleQuestion.options.map((option, index) => {
                                const isCorrect = index === sampleQuestion.correctAnswerIndex;
                                return (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-right h-auto py-2 px-3 text-sm flex items-center",
                                            isCorrect && "border-green-500 bg-green-500/10 text-green-700 hover:bg-green-500/20"
                                        )}
                                    >
                                        <span className="ml-3 font-bold">{["أ", "ب", "ج", "د"][index]}</span>
                                        <div className="flex-1 whitespace-normal flex justify-center">{option}</div>
                                    </Button>
                                );
                            })}
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col items-stretch gap-4 pt-4">
                        <Alert variant="default" className="border-blue-500 bg-blue-100/30">
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                            <AlertTitle className="font-bold text-blue-700">
                                الشرح (للتحقق من الدقة)
                            </AlertTitle>
                            <AlertDescription>
                                {sampleQuestion.explanation}
                            </AlertDescription>
                        </Alert>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
