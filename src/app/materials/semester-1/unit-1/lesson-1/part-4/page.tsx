
'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BookCopy, Thermometer, Box, Cpu, Lightbulb, LineChart } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';

const lessonInfo = {
    lessonTitle: "الدرس الأول: الحالة الغازية",
    lessonSubtitle: "قانون شارل",
    mainIdea: "عند ثبات الضغط وكمية الغاز، يتناسب حجم الغاز تناسبًا طرديًا مع درجة حرارته المطلقة.",
    learningOutcomes: [
        "أصف العلاقة بين الحجم ودرجة الحرارة لغاز محصور عند ثبات ضغطه.",
        "أحل مسائل حسابية على قانون شارل."
    ],
    lessonId: "/materials/semester-1/unit-1/lesson-1/part-4",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-1/part-3",
    nextLesson: "/materials/semester-1/unit-1/lesson-1/part-5",
    previousLessonTitle: "الجزء السابق: قانون بويل",
    nextLessonTitle: "الجزء التالي: قانون جاي لوساك"
};

const LessonContent = ({ onCorrect }: { onCorrect: (id: string) => void }) => {
    const Diagram = dynamic(() => import('./diagram'), {
      ssr: false,
      loading: () => (
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-12 w-full" />
        </div>
      ),
    });

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BookCopy className="h-6 w-6 text-primary" /> الخلفية العلمية</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                            لاحظ العالم شارل أن حجم الهواء في البالونات يتغير بتغير درجة حرارته. عند تسخين الهواء، يتمدد ويزداد حجمه، وعند تبريده، يتقلص وينقص حجمه. قاده هذا الاكتشاف إلى دراسة العلاقة بشكل منهجي.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Cpu className="h-6 w-6 text-primary" /> التفسير العلمي</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                            عند زيادة درجة حرارة الغاز، يزداد متوسط الطاقة الحركية للجزيئات، وتزداد سرعتها وعدد تصادماتها مع جدار الوعاء، وبالتالي يزداد حجم الغاز.
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Box className="h-6 w-6 text-primary" /> محاكاة التجربة</CardTitle>
                        <CardDescription>اختر بين الحمام الثلجي والحمام الساخن ولاحظ تأثير درجة الحرارة على حجم البالون.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Diagram />
                    </CardContent>
                </Card>
            </div>
            
             <FlippableCard
                cardTitle="نص قانون شارل"
                cardIcon={<Thermometer className="h-6 w-6" />}
            >
                 <div className="space-y-3">
                    <blockquote className="border-r-4 border-primary pr-4">
                        "يتناسب حجم كمية محددة من الغاز المحصور تناسبًا طرديًا مع درجة حرارته المطلقة عند ثبات ضغطه."
                    </blockquote>
                    <p className="text-sm text-muted-foreground mt-2">بعبارة أخرى: كلما زادت درجة حرارة الغاز، زاد حجمه، والعكس صحيح.</p>
                </div>
            </FlippableCard>

             <FlippableCard
                cardTitle="العلاقة الرياضية"
                cardIcon={<Cpu className="h-6 w-6" />}
            >
                <div className="space-y-4">
                  <p>يمكن التعبير عن العلاقة الطردية بين الحجم (V) ودرجة الحرارة المطلقة (T) رياضيًا كالتالي:</p>
                  <div dir="ltr" className="text-left"><BlockMath math="V \propto T" /></div>
                  <p>لتحويل التناسب إلى مساواة، نستخدم ثابتًا (k) لتصبح المعادلة:</p>
                  <div dir="ltr" className="text-left"><BlockMath math="\frac{V}{T} = k" /></div>
                  <p>وهذا يعني أن حاصل قسمة الحجم على درجة الحرارة المطلقة لكمية معينة من الغاز عند ضغط ثابت هو قيمة ثابتة. ويمكن استخدام هذه العلاقة لمقارنة حالتين مختلفتين للغاز:</p>
                  <div dir="ltr" className="text-left"><BlockMath math="\frac{V_1}{T_1} = \frac{V_2}{T_2}" /></div>
                  <p className="text-sm text-muted-foreground" dir="rtl">
                      حيث <span dir="ltr">(<InlineMath math="V_1, T_1" />)</span> هما الحجم والحرارة الابتدائيان، و <span dir="ltr">(<InlineMath math="V_2, T_2" />)</span> هما الحجم والحرارة النهائيان. **يجب دائمًا استخدام درجة حرارة الكلفن <span dir="ltr">(K)</span>.**
                  </p>
                </div>
            </FlippableCard>


            <div className="grid md:grid-cols-2 gap-6 items-start">
                <Card>
                    <CardHeader>
                        <CardTitle>مثال محلول</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <p>
                                إذا كان حجم بالون <span dir="ltr" style={{display: 'inline-block'}}><InlineMath math="2.5\text{L}" /></span> عند درجة حرارة <span dir="ltr" style={{display: 'inline-block'}}><InlineMath math="25^\circ\text{C}" /></span>، فما هو حجمه الجديد إذا سخن إلى <span dir="ltr" style={{display: 'inline-block'}}><InlineMath math="55^\circ\text{C}" /></span> مع بقاء الضغط ثابتًا؟
                            </p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                            <p><strong className="text-accent">المعطيات:</strong></p>
                            <div className='grid grid-cols-2 gap-x-4' dir="ltr">
                                <p className="text-left"><InlineMath math="V_1 = 2.5\text{L}" /></p>
                                <p className="text-left"><InlineMath math="V_2 = ?" /></p>
                                <p className="text-left"><InlineMath math="T_1 = 25^\circ\text{C}" /></p>
                                <p className="text-left"><InlineMath math="T_2 = 55^\circ\text{C}" /></p>
                            </div>
                            <p><span className="font-bold text-accent">المطلوب:</span> حساب الحجم الجديد <span dir="ltr">(<InlineMath math="V_2" />)</span>.</p>
                            <p><strong className="text-accent">الحل:</strong></p>
                            <ol className="list-decimal mr-6 text-sm space-y-2">
                                <li>
                                    <span>**الخطوة الأولى والأهم:** نحول درجات الحرارة إلى كلفن.</span>
                                    <div className="text-left" dir="ltr"><BlockMath math="T_1(\text{K}) = 25 + 273 = 298\text{K}" /></div>
                                    <div className="text-left" dir="ltr"><BlockMath math="T_2(\text{K}) = 55 + 273 = 328\text{K}" /></div>
                                </li>
                                <li>
                                    <span>نكتب قانون شارل.</span>
                                    <div className="text-left" dir="ltr"><BlockMath math="\frac{V_1}{T_1} = \frac{V_2}{T_2}" /></div>
                                </li>
                                <li>
                                    <span>نعيد ترتيب المعادلة لحل <InlineMath math="V_2" />.</span>
                                    <div className="text-left" dir="ltr"><BlockMath math="V_2 = \frac{V_1 T_2}{T_1}" /></div>
                                </li>
                                <li>
                                    <span>نعوض القيم.</span>
                                    <div className="text-left" dir="ltr"><BlockMath math="V_2 = \frac{(2.5\text{L}) \cdot (328\text{K})}{298\text{K}}" /></div>
                                </li>
                                <li>
                                    <span>نحسب الناتج.</span>
                                    <div className="text-left" dir="ltr"><BlockMath math="V_2 \approx 2.75\text{L}" /></div>
                                </li>
                            </ol>
                            <div className="border-t pt-3">
                                <p className="text-sm font-semibold">
                                الجواب: الحجم الجديد للبالون هو <span dir="ltr" style={{display: 'inline-block'}}><InlineMath math="\approx 2.75\text{L}" /></span>. وهذا منطقي لأن درجة الحرارة زادت، فمن المتوقع أن يزداد الحجم.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2 text-base font-semibold">
                            <LineChart className="h-5 w-5 text-primary" /> العلاقة البيانية (V مقابل T)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-xs text-muted-foreground text-center mb-2">
                        يمثل الخط المستقيم العلاقة الطردية بين الحجم ودرجة الحرارة المطلقة.
                    </p>
                    <div className="flex justify-center items-center p-4">
                        <svg width="250" height="200" viewBox="0 0 150 120" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs h-auto">
                            <defs>
                                <marker id="arrowhead-charles" markerWidth="5" markerHeight="3.5" refX="0" refY="1.75" orient="auto">
                                    <polygon points="0 0, 5 1.75, 0 3.5" fill="hsl(var(--muted-foreground))" />
                                </marker>
                            </defs>
                            
                            <g transform="translate(0, -9)">
                                <line x1="20" y1="110" x2="20" y2="10" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrowhead-charles)" />
                                <text x="10" y="15" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">V</text>
                                
                                <line x1="20" y1="110" x2="140" y2="110" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrowhead-charles)" />
                                <text x="140" y="120" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">T</text>
                                
                                <line x1="20" y1="110" x2="120" y2="20" stroke="hsl(var(--primary))" strokeWidth="2.5" />
                            </g>
                        </svg>
                    </div>
                    </CardContent>
                </Card>
            </div>
        
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-7 w-7 text-yellow-400" />
                <div>
                  <h3 className="text-xl font-bold">تحقق من فهمك</h3>
                  <p className="text-muted-foreground">أجب عن الأسئلة السريعة التالية لترسيخ المفاهيم</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                  <InteractiveQuestionCard 
                      questionId="q1"
                      lessonId={lessonInfo.lessonId}
                      onCorrect={onCorrect}
                      question={<>عينة من غاز محصور حجمها <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="4\text{L}"/></span> وضغطها <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="2\text{atm}"/></span> عند درجة حرارة <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="200^\circ\text{C}"/></span>، فإن حجمها عندما تصبح درجة حرارتها <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="250^\circ\text{C}"/></span> وضغطها <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="2\text{atm}"/></span> يساوي:</>}
                      options={[
                          "5",
                          "3.6",
                          "4.4",
                          "3.2"
                      ]}
                      correctAnswerIndex={2}
                      explanation="أولاً، نحول الحرارة إلى كلفن: T₁=200+273=473K, T₂=250+273=523K. الضغط ثابت، لذا نستخدم قانون شارل: V₂ = V₁T₂/T₁ = (4L * 523K) / 473K ≈ 4.4L."
                  />
                   <InteractiveQuestionCard 
                      questionId="q2"
                      lessonId={lessonInfo.lessonId}
                      onCorrect={onCorrect}
                      question={<>عينة من غاز محصور حجمها <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="4\text{L}"/></span> درجة حرارتها <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="400\text{K}"/></span>. عند مضاعفة حرارتها وثبات ضغطها، فإن حجمها:</>}
                      options={[
                          "يصبح 5L",
                          "يزداد إلى الضعف",
                          "يقل إلى النصف",
                          "لا يتغير"
                      ]}
                      correctAnswerIndex={1}
                      explanation="قانون شارل ينص على علاقة طردية بين الحجم ودرجة الحرارة المطلقة. عند مضاعفة درجة الحرارة (من 400K إلى 800K)، يجب أن يتضاعف الحجم أيضًا للحفاظ على النسبة ثابتة، فيصبح 8L."
                  />
              </div>
            </div>
        </div>
    );
}

export default function LessonPartPage() {
    const [completedInteractive, setCompletedInteractive] = useState<Set<string>>(new Set());

    const handleCorrectAnswer = (questionId: string) => {
        setCompletedInteractive(prev => new Set(prev).add(questionId));
    };

  return (
    <LessonLayout {...lessonInfo} completedInteractiveCount={completedInteractive.size}>
        <LessonContent onCorrect={handleCorrectAnswer} />
    </LessonLayout>
  );
}
