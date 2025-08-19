
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InlineMath, BlockMath } from 'react-katex';
import { cn } from '@/lib/utils.tsx';

/**
 * منطقة الاختبار المؤقتة - معمل الأسئلة
 * ------------------------------------
 * الغرض: هذه الصفحة هي بيئة معزولة لتصميم ومراجعة الأسئلة بسرعة.
 * آلية العمل:
 * 1.  عندما تطلب سؤالاً جديداً، سأقوم بوضعه هنا في الكائن `sampleQuestion`.
 * 2.  يمكنك مراجعة السؤال بصريًا في هذه الصفحة.
 * 3.  اطلب أي تعديلات (نص، خيارات، شرح). سأقوم بتحديثها هنا فورًا.
 * 4.  عندما توافق على السؤال، سأنقله من هنا إلى ملف `exam.tsx` النهائي الخاص بالدرس.
 */

// --- هذا هو السؤال الذي نعمل عليه حاليًا ---
const sampleQuestion = {
    question: <><span>في الظروف المعيارية، كثافة غاز الهيليوم بوحدة g/L تساوي:</span></>,
    options: [
        "13.3",
        "0.18",
        "0.001",
        "3.9"
    ],
    correctAnswerIndex: 1,
    explanation: "الكثافة d = (P × Mr) / (R × T). في الظروف المعيارية، P=1atm, T=273K. الكتلة المولية للهيليوم (He) هي 4g/mol. إذن d = (1 × 4) / (0.082 × 273) ≈ 0.18 g/L."
};
// ---------------------------------------------


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

            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-lg">
                        معاينة السؤال
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-lg font-semibold pt-2">{sampleQuestion.question}</div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {sampleQuestion.options.map((option, index) => {
                            const isCorrect = index === sampleQuestion.correctAnswerIndex;
                            return (
                                <Button
                                    key={index}
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-start text-right h-auto py-2 px-3 text-sm flex items-start",
                                        isCorrect && "border-green-500 bg-green-500/10 text-green-700 hover:bg-green-500/20"
                                    )}
                                >
                                    <span className="ml-3 font-bold">{["أ", "ب", "ج", "د"][index]}</span>
                                    <span className="flex-1 whitespace-normal">{option}</span>
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
    );
}
