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
     <svg width="300" height="200" viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" className="mx-auto my-2 bg-background p-4 rounded-lg border">
        {/* Beakers */}
        <rect x="30" y="100" width="60" height="100" fill="hsl(var(--muted))" stroke="black" strokeWidth="1"/>
        <rect x="120" y="100" width="60" height="100" fill="hsl(var(--muted))" stroke="black" strokeWidth="1"/>
        <rect x="210" y="100" width="60" height="100" fill="hsl(var(--muted))" stroke="black" strokeWidth="1"/>
        <rect x="300" y="100" width="60" height="100" fill="hsl(var(--muted))" stroke="black" strokeWidth="1"/>
        
        {/* Labels */}
        <text x="60" y="220" textAnchor="middle">A</text>
        <text x="150" y="220" textAnchor="middle">B</text>
        <text x="240" y="220" textAnchor="middle">C</text>
        <text x="330" y="220" textAnchor="middle">D</text>

        {/* Particles A (2 circles) */}
        <g fill="hsl(var(--primary))">
            <circle cx="50" cy="130" r="5" />
            <circle cx="70" cy="160" r="5" />
        </g>
        
        {/* Particles B (5 squares) */}
        <g fill="hsl(var(--destructive))">
            <rect x="135" y="120" width="10" height="10" />
            <rect x="155" y="140" width="10" height="10" />
            <rect x="130" y="160" width="10" height="10" />
            <rect x="160" y="110" width="10" height="10" />
            <rect x="145" y="175" width="10" height="10" />
        </g>
        
        {/* Particles C (3 triangles) */}
        <g fill="hsl(var(--accent))">
            <polygon points="230,120 225,130 235,130" />
            <polygon points="250,150 245,160 255,160" />
            <polygon points="225,170 220,180 230,180" />
        </g>
        
        {/* Particles D (4 stars) */}
        <g fill="#facc15">
            <polygon points="320,110 322,115 327,115 323,118 325,123 320,120 315,123 317,118 313,115 318,115" />
            <polygon points="340,130 342,135 347,135 343,138 345,143 340,140 335,143 337,138 333,135 338,135" />
            <polygon points="325,155 327,160 332,160 328,163 330,168 325,165 320,168 322,163 318,160 323,160" />
            <polygon points="345,175 347,180 352,180 348,183 350,188 345,185 340,188 342,183 338,180 343,180" />
        </g>
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
