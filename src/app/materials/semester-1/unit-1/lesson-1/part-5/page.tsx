
'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BookCopy, Box, Lightbulb, GitCompare, Cpu, LineChart } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';

const Diagram = dynamic(() => import('./diagram'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="h-[300px] w-full rounded-lg" />
      <Skeleton className="h-12 w-full" />
    </div>
  ),
});

const lessonInfo = {
    lessonTitle: "الدرس الأول: الحالة الغازية",
    lessonSubtitle: "قانون جاي-لوساك",
    mainIdea: "عند ثبات الحجم وكمية الغاز، يتناسب ضغط الغاز تناسبًا طرديًا مع درجة حرارته المطلقة.",
    learningOutcomes: [
        "أصف العلاقة بين الضغط ودرجة الحرارة لغاز محصور عند ثبات حجمه.",
        "أحل مسائل حسابية على قانون جاي-لوساك."
    ],
    lessonContent: `<p>نستمر في رحلتنا مع قوانين الغازات، وهذه المرة مع العالم الفرنسي جوزيف جاي-لوساك، الذي درس العلاقة بين ضغط الغاز ودرجة حرارته عندما يكون الحجم ثابتًا، وهو سيناريو شائع جدًا في أوعية الضغط المغلقة.</p>`,
    lessonId: "/materials/semester-1/unit-1/lesson-1/part-5",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-1/part-4",
    nextLesson: "/materials/semester-1/unit-1/lesson-1/part-6",
    previousLessonTitle: "الجزء السابق: قانون شارل",
    nextLessonTitle: "الجزء التالي: القانون الجامع"
};

export default function LessonPartPage() {

  return (
    <LessonLayout {...lessonInfo}>
        <div className="space-y-8">
             <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BookCopy className="h-6 w-6 text-primary" /> الخلفية العلمية</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                            بنى العالم جاي-لوساك على أعمال شارل، لكنه ركز على ما يحدث للضغط عندما لا يُسمح للحجم بالتغير. لاحظ أن تسخين غاز في وعاء مغلق (صلب) يزيد من ضغطه بشكل ملحوظ، وهذا ما نراه في إطارات السيارات التي يزداد ضغطها في الأيام الحارة.
                            </p>
                        </CardContent>
                    </Card>

                     <FlippableCard
                        cardTitle="نص قانون جاي-لوساك"
                        cardIcon={<GitCompare className="h-6 w-6" />}
                    >
                        <div className="space-y-3">
                            <blockquote className="border-r-4 border-primary pr-4">
                                "يتناسب ضغط الغاز المحصور تناسبًا طرديًا مع درجة حرارته المطلقة عند ثبات الحجم."
                            </blockquote>
                        </div>
                    </FlippableCard>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Cpu className="h-6 w-6 text-primary" /> التفسير العلمي</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                            عند زيادة درجة حرارة جسيمات الغاز المحصور في وعاء ثابت الحجم، يزداد متوسط الطاقة الحركية للجزيئات، فتزداد سرعتها وقوة تصادماتها مع جدران الوعاء، مما يؤدي إلى زيادة الضغط.
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Box className="h-6 w-6 text-primary" /> محاكاة التجربة</CardTitle>
                        <CardDescription>تحكم في درجة الحرارة ولاحظ تأثيرها على الضغط داخل الوعاء.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Diagram />
                    </CardContent>
                </Card>
            </div>
             <FlippableCard
                cardTitle="العلاقة الرياضية"
                cardIcon={<Cpu className="h-6 w-6" />}
            >
               <div className="space-y-4">
                  <p>يمكن التعبير عن العلاقة الطردية بين الضغط (P) ودرجة الحرارة المطلقة (T) رياضيًا كالتالي:</p>
                  <div className="text-center" dir="ltr"><BlockMath math="P \propto T" /></div>
                  <p>لتحويل التناسب إلى مساواة، نستخدم ثابتًا (k) لتصبح المعادلة:</p>
                  <div className="text-center" dir="ltr"><BlockMath math="\frac{P}{T} = k" /></div>
                  <p>وهذا يعني أن حاصل قسمة الضغط على درجة الحرارة المطلقة لكمية معينة من الغاز عند حجم ثابت هو قيمة ثابتة. ويمكن استخدام هذه العلاقة لمقارنة حالتين مختلفتين للغاز:</p>
                  <div className="text-center" dir="ltr"><BlockMath math="\frac{P_1}{T_1} = \frac{P_2}{T_2}" /></div>
                   <p className="text-sm text-muted-foreground">
                      حيث <span dir="ltr">(<InlineMath math="P_1, T_1" />)</span> هما الضغط والحرارة الابتدائيان، و <span dir="ltr">(<InlineMath math="P_2, T_2" />)</span> هما الضغط والحرارة النهائيان. **يجب دائمًا استخدام درجة حرارة الكلفن <span dir="ltr">(K)</span>.**
                  </p>
              </div>
            </FlippableCard>
            
            <Card>
                <CardHeader>
                    <CardTitle>مثال محلول</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">
                        <span>علبة من بخاخ الشعر ضغطها </span><span style={{display: 'inline-block'}} dir="ltr"><InlineMath math="1.5\text{ atm}" /></span><span> عند درجة حرارة </span><span style={{display: 'inline-block'}} dir="ltr"><InlineMath math="25^\circ\text{C}" /></span>.<span> إذا ألقيت العلبة في النار وارتفعت درجة حرارتها إلى </span><span style={{display: 'inline-block'}} dir="ltr"><InlineMath math="400^\circ\text{C}" /></span><span>، فما هو الضغط الجديد داخل العلبة؟ (تحذير: لا تجرب هذا فعليًا).</span>
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                        <p><strong className="text-accent">المعطيات:</strong></p>
                        <div className='grid grid-cols-2 gap-x-4 text-sm' dir="ltr">
                            <p className="text-left"><InlineMath math="P_1 = 1.5\text{ atm}" /></p>
                            <p className="text-left"><InlineMath math="P_2 = ?" /></p>
                            <p className="text-left"><InlineMath math="T_1 = 25^\circ\text{C}" /></p>
                            <p className="text-left"><InlineMath math="T_2 = 400^\circ\text{C}" /></p>
                        </div>
                        <p><strong className="text-accent">الحل:</strong></p>
                        <ol className="list-decimal mr-6 text-sm space-y-2">
                            <li>
                                <span>نحول درجات الحرارة إلى كلفن.</span>
                                <div className="text-left" dir="ltr"><BlockMath math="T_1(K) = 25 + 273 = 298\text{ K}" /></div>
                                <div className="text-left" dir="ltr"><BlockMath math="T_2(K) = 400 + 273 = 673\text{ K}" /></div>
                            </li>
                            <li>
                                <span>نكتب قانون جاي-لوساك.</span>
                                <div className="text-left" dir="ltr"><BlockMath math="\frac{P_1}{T_1} = \frac{P_2}{T_2}" /></div>
                            </li>
                            <li>
                                <span>نعيد ترتيب المعادلة لحل <InlineMath math="P_2" />.</span>
                                <div className="text-left" dir="ltr"><BlockMath math="P_2 = \frac{P_1 T_2}{T_1}" /></div>
                            </li>
                            <li>
                                <span>نعوض القيم.</span>
                                <div className="text-left" dir="ltr"><BlockMath math="P_2 = \frac{(1.5\text{ atm}) \cdot (673\text{ K})}{(298\text{ K})}" /></div>
                                </li>
                            <li>
                                <span>نحسب الناتج.</span>
                                <div className="text-left" dir="ltr"><BlockMath math="P_2 \approx 3.39\text{ atm}" /></div>
                            </li>
                        </ol>
                        <div className="border-t pt-3">
                            <p className="text-sm font-semibold">
                            <span>الجواب: الضغط الجديد داخل العلبة هو</span><span style={{display: 'inline-block'}} dir="ltr"> ~<InlineMath math="3.39\text{ atm}" /></span>.<span> الزيادة الكبيرة في الضغط توضح لماذا من الخطر تسخين الأوعية المضغوطة.</span>
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2 text-base font-semibold"><LineChart className="h-5 w-5 text-primary" /> العلاقة البيانية (P مقابل T)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs text-muted-foreground text-center mb-2">
                            يمثل الخط المستقيم العلاقة الطردية بين الضغط ودرجة الحرارة المطلقة.
                        </p>
                        <div className="flex justify-center items-center p-4">
                           <svg width="250" height="200" viewBox="0 0 150 125" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs h-auto">
                                <defs>
                                    <marker id="arrowhead-gay-lussac" markerWidth="5" markerHeight="3.5" refX="0" refY="1.75" orient="auto">
                                        <polygon points="0 0, 5 1.75, 0 3.5" fill="hsl(var(--muted-foreground))" />
                                    </marker>
                                </defs>
                                
                                <line x1="20" y1="110" x2="20" y2="10" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrowhead-gay-lussac)" />
                                <text x="10" y="15" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">P</text>
                                
                                <line x1="20" y1="110" x2="140" y2="110" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrowhead-gay-lussac)" />
                                <text x="140" y="120" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">T</text>
                                
                                <line x1="20" y1="110" x2="120" y2="20" stroke="hsl(var(--primary))" strokeWidth="2.5" />
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
                  onCorrect={() => {}}
                  question={(
                    <>
                     عينة من غاز محصور في وعاء حجمه ثابت <span dir="ltr">(<InlineMath math="4\text{L}"/>)</span> وضغطها <span dir="ltr">(<InlineMath math="2\text{atm}"/>)</span> عند درجة حرارة <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="200^\circ\text{C}"/></span>، فإذا ارتفعت درجة حرارتها بمقدار <span dir="ltr">(<InlineMath math="100"/>)</span> درجة، فإن ضغطها بوحدة <span dir="ltr">(<InlineMath math="\text{atm}"/>)</span> يساوي:
                    </>
                  )}
                  options={[
                      "1.3",
                      "1.6",
                      "3",
                      "2.4"
                  ]}
                  correctAnswerIndex={3}
                  explanation="T₁=200+273=473K, T₂= (200+100)+273=573K, P₁=2atm. باستخدام قانون جاي-لوساك، P₂ = P₁T₂/T₁ = (2*573)/473 ≈ 2.4atm."
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={() => {}}
                  question={(
                    <>
                     عينة من غاز محصور ضغطها <span dir="ltr">(<InlineMath math="900\text{mmHg}"/>)</span> عند درجة حرارة <span dir="ltr">(<InlineMath math="273\text{K}"/>)</span>، فإذا أصبح ضغطها <span dir="ltr">(<InlineMath math="200\text{kPa}"/>)</span>، فإن درجة حرارتها بوحدة <span dir="ltr" style={{ display: 'inline-block' }}><InlineMath math="^\circ\text{C}"/></span> تساوي:
                    </>
                  )}
                  options={[
                      "60.6",
                      "182",
                      "-212.3",
                      "455"
                  ]}
                  correctAnswerIndex={1}
                  explanation="أولاً نوحد الضغط: P₁(atm) = 900/760 ≈ 1.184atm, P₂(atm) = 200/101.3 ≈ 1.974atm. T₁=273K. T₂ = T₁P₂/P₁ = (273*1.974)/1.184 ≈ 455K. نحول إلى سيليزيوس: 455-273 = 182°C."
              />
          </div>
        </div>
    </LessonLayout>
  );
}
