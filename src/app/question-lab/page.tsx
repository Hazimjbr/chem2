
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils.tsx';
import { InlineMath } from 'react-katex';

/**
 * منطقة الاختبار المؤقتة - معمل الأسئلة
 * ------------------------------------
 * الغرض: هذه الصفحة هي بيئة معزولة لتصميم ومراجعة الأسئلة بسرعة.
 * آلية العمل:
 * 1.  عندما تطلب سؤالاً جديداً، سأقوم بوضعه هنا في الكائن `sampleQuestion`.
 * 2.  يمكنك مراجعة السؤال بصريًا في هذه الصفحة.
 * 3.  اطلب أي تعديلات (نص، خيارات، شرح). سأقوم بتحديثها هنا فورًا.
 * 4.  عندما توافق على السؤال، سأقوم بنقله من هنا إلى ملف `exam.tsx` النهائي الخاص بالدرس.
 */

const GraphVisual = ({ path, className }: { path: string, className?: string }) => (
    <svg viewBox="0 0 100 100" className={cn("w-28 h-28 inline-block mx-auto", className)}>
        <path d="M 20 80 L 20 10 L 15 15 M 20 10 L 25 15" stroke="black" strokeWidth="2" fill="none" />
        <path d="M 20 80 L 90 80 L 85 75 M 90 80 L 85 85" stroke="black" strokeWidth="2" fill="none" />
        <path d={path} stroke="hsl(var(--primary))" strokeWidth="2.5" fill="none" />
    </svg>
);
// ====================================================================================
// ===================              مكان وضع السؤال للمعاينة              ===================
// ====================================================================================
const sampleQuestion = {
    "question": "أي رسم بياني يمثل العلاقة بين حجم الغاز (V) ومقلوب الضغط (1/P) عند درجة حرارة ثابتة؟",
    "options": [
        <GraphVisual path="M 30 20 C 40 30, 50 50, 80 75" />,
        <GraphVisual path="M 30 70 L 80 20" />,
        <GraphVisual path="M 20 80 L 85 15" />,
        <GraphVisual path="M 30 70 C 40 40, 60 25, 80 20" />
    ],
    "correctAnswerIndex": 2,
    "explanation": "قانون بويل هو P·V=k. يمكن إعادة ترتيبه إلى V = k * (1/P). هذه هي معادلة خط مستقيم (y = mx) بين V (المحور الصادي) و 1/P (المحور السيني). بما أن الميل (k) موجب، فإن العلاقة طردية خطية تمر بنقطة الأصل."
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
                    هذه منطقة اختبار لمراجعة الأسئلة قبل إضافتها إلى بنك الأسئلة الدائم.
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
