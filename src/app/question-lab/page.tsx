
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils.tsx';
import { GraphCurveDown, GraphCurveUp, GraphLineDown, GraphLineUp, GraphLineHorizontal, GraphLineVertical } from '@/components/illustrations/graphs';
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

const GasSamplesGraph = () => (
     <svg width="400" height="300" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" className="mx-auto my-2 bg-white p-4 rounded-lg">
        {/* Container A */}
        <rect x="20" y="100" width="140" height="280" fill="white" stroke="black" strokeWidth="2"/>
        <g fill="hsl(var(--primary))">
            <g transform="translate(70, 180) scale(1.5)">
                <rect x="-5" y="-5" width="10" height="10" />
                <circle cx="-10" cy="0" r="4" />
                <circle cx="10" cy="0" r="4" />
            </g>
            <g transform="translate(100, 280) scale(1.5)">
                 <rect x="-5" y="-5" width="10" height="10" />
                <circle cx="-10" cy="0" r="4" />
                <circle cx="10" cy="0" r="4" />
            </g>
        </g>
        <text x="90" y="410" textAnchor="middle" fontSize="24">A</text>
        
        {/* Container B */}
        <rect x="220" y="100" width="140" height="280" fill="white" stroke="black" strokeWidth="2"/>
        <g fill="hsl(var(--destructive))">
            <rect x="250" y="140" width="15" height="15" />
            <rect x="290" y="190" width="15" height="15" />
            <rect x="240" y="240" width="15" height="15" />
            <rect x="300" y="280" width="15" height="15" />
            <rect x="270" y="320" width="15" height="15" />
        </g>
        <text x="290" y="410" textAnchor="middle" fontSize="24">B</text>

        {/* Container C */}
        <rect x="420" y="100" width="140" height="280" fill="white" stroke="black" strokeWidth="2"/>
        <g fill="hsl(var(--accent))">
             <g transform="translate(470, 190) scale(1.5)">
                <rect x="-5" y="-5" width="10" height="10" />
                <polygon points="0,-12 -5,-7 5,-7" />
                <polygon points="-12,5 -7,0 -7,10" />
                <polygon points="12,5 7,0 7,10" />
            </g>
            <g transform="translate(510, 290) scale(1.5)">
                <rect x="-5" y="-5" width="10" height="10" />
                <polygon points="0,-12 -5,-7 5,-7" />
                <polygon points="-12,5 -7,0 -7,10" />
                <polygon points="12,5 7,0 7,10" />
            </g>
        </g>
        <text x="490" y="410" textAnchor="middle" fontSize="24">C</text>
        
        {/* Container D */}
        <rect x="620" y="100" width="140" height="280" fill="white" stroke="black" strokeWidth="2"/>
        <g fill="#facc15">
            <g transform="translate(660, 170) scale(1.5)"><circle cx="-4" cy="0" r="4" /><circle cx="4" cy="0" r="4" /></g>
            <g transform="translate(700, 240) scale(1.5)"><circle cx="-4" cy="0" r="4" /><circle cx="4" cy="0" r="4" /></g>
            <g transform="translate(650, 300) scale(1.5)"><circle cx="-4" cy="0" r="4" /><circle cx="4" cy="0" r="4" /></g>
        </g>
        <text x="690" y="410" textAnchor="middle" fontSize="24">D</text>
    </svg>
);


// ====================================================================================
// ===================              مكان وضع السؤال للمعاينة              ===================
// ====================================================================================
const sampleQuestion = {
    question: <div><p>ادرس الرسم المجاور الذي يمثل أربع عينات من الغازات المختلفة في أوعية متساوية الحجم عند نفس درجة الحرارة، ثم أجب:</p><GasSamplesGraph /><strong className="text-accent mt-2 block">أي وعاء يحتوي على غاز له الضغط الأعلى؟</strong></div>,
    options: [
        "A",
        "B",
        "C",
        "D"
    ],
    correctAnswerIndex: 1,
    explanation: "وفقًا لقانون أفوجادرو، عند ثبات الحجم ودرجة الحرارة، يتناسب ضغط الغاز طرديًا مع عدد جسيماته (أو مولاته). الوعاء B يحتوي على أكبر عدد من الجسيمات (5 جسيمات)، لذا فإن ضغط الغاز فيه هو الأعلى."
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

