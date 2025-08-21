
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils.tsx';

const GasLawsGraph = () => (
    <svg width="300" height="200" viewBox="0 0 450 350" xmlns="http://www.w3.org/2000/svg" className="mx-auto my-2 bg-background p-4 rounded-lg border">
        <line x1="50" y1="300" x2="400" y2="300" stroke="black" strokeWidth="2"/>
        <text x="415" y="325" dominantBaseline="middle">P(atm)</text>

        <line x1="50" y1="300" x2="50" y2="50" stroke="black" strokeWidth="2"/>
        <text x="50" y="40" textAnchor="middle">PV/nRT</text>

        <path d="M50,175 L400,175" stroke="gray" strokeWidth="1" strokeDasharray="5,5"/>
        <text x="30" y="175" dominantBaseline="middle" fontSize="12">1</text>

        <path
      d="M50,175 C150,100 250,110 400,140"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      fill="none"
    />
        <text x="380" y="130" fill="hsl(var(--primary))" fontSize="12">
      1000 K
    </text>

        <path
      d="M50,175 C150,150 250,160 400,170"
      stroke="hsl(var(--accent))"
      strokeWidth="2"
      fill="none"
    />
        <text x="380" y="160" fill="hsl(var(--accent))" fontSize="12">
      500 K
    </text>

        <path
      d="M50,175 C150,220 250,230 400,220"
      stroke="hsl(var(--destructive))"
      strokeWidth="2"
      fill="none"
    />
        <text x="380" y="230" fill="hsl(var(--destructive))" fontSize="12">
      200 K
    </text>

        <text x="225" y="190" textAnchor="middle" fontSize="10" fill="gray">
          الغاز المثالي
        </text>
    </svg>
);


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

// ====================================================================================
// ===================              مكان وضع السؤال للمعاينة              ===================
// ====================================================================================
const sampleQuestion = {
    question: <div><p>ادرس الرسم المجاور والذي يمثل العلاقة بين الضغط المؤثر على غاز النيتروجين وقيمة PV/nRT التي قيمتها تساوي 1 للغاز المثالي ثم أجب عن السؤال التالي:</p><GasLawsGraph /><strong className="text-accent mt-2 block">درجة الحرارة التي يكون انحراف غاز النيتروجين عن الغاز المثالي أقل ما يمكن:</strong></div>,
    options: ["200 K", "273 K", "500 K", "1000 K"],
    correctAnswerIndex: 3,
    explanation: "الخط المتقطع عند القيمة 1 يمثل سلوك الغاز المثالي. المنحنى الأقرب لهذا الخط يمثل أقل انحراف. منحنى درجة الحرارة 1000K هو الأقرب للخط المثالي، مما يعني أن سلوك الغاز يكون أقرب للمثالي عند درجات الحرارة المرتفعة."
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
