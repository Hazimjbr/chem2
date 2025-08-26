
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils.tsx';
import Image from 'next/image';
import { InlineMath } from 'react-katex';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


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
    question: (
        <div className="space-y-4">
            <p className="font-bold">ادرس المعلومات الواردة في الجدول ثم احسب عدد مولات الهواء اللازم إضافتها إلى الإطار في الوضع (B) حتى يعود حجم الهواء إلى 20.5L.</p>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-right">المعلومات داخل الإطار</TableHead>
                        <TableHead className="text-center">الوضع A</TableHead>
                        <TableHead className="text-center">الوضع B</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>درجة حرارة الهواء</TableCell>
                        <TableCell className="text-center">27°C</TableCell>
                        <TableCell className="text-center">10°C</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>ضغط الهواء</TableCell>
                        <TableCell className="text-center">30 atm</TableCell>
                        <TableCell className="text-center">29 atm</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>حجم الهواء</TableCell>
                        <TableCell className="text-center">20.5 L</TableCell>
                        <TableCell className="text-center">20 L</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>عدد مولات الهواء</TableCell>
                        <TableCell className="text-center">25 mol</TableCell>
                        <TableCell className="text-center">25 mol</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    ),
    options: [
        "0.65 mol",
        "0.5 mol",
        "1.29 mol",
        "25.65 mol"
    ],
    correctAnswerIndex: 0,
    explanation: "أولاً، نحسب عدد المولات اللازم للوصول للحجم المطلوب في الظروف الجديدة (الحالة C) باستخدام قانون الغاز المثالي n = PV/RT. الظروف هي: P=29atm, V=20.5L, T=10°C=283K. إذن n_C = (29 * 20.5) / (0.082 * 283) ≈ 25.65 mol. عدد المولات في الوضع B هو 25 mol. عدد المولات اللازم إضافتها = n_C - n_B = 25.65 - 25 = 0.65 mol."
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
