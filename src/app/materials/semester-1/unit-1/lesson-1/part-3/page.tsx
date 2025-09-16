'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BookCopy, GitCompare, Box, Lightbulb, Cpu, LineChart } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';

const lessonInfo = {
    lessonTitle: "الدرس الأول: الحالة الغازية",
    lessonSubtitle: "قانون بويل",
    mainIdea: "عند ثبات درجة الحرارة وكمية الغاز، يتناسب حجم الغاز تناسبًا عكسيًا مع الضغط الواقع عليه.",
    learningOutcomes: [
        "أصف العلاقة بين الضغط والحجم لغاز محصور عند ثبات درجة حرارته.",
        "أحل مسائل حسابية على قانون بويل."
    ],
    lessonId: "/materials/semester-1/unit-1/lesson-1/part-3",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-1/part-2",
    nextLesson: "/materials/semester-1/unit-1/lesson-1/part-4",
    previousLessonTitle: "الجزء السابق: مقدمة قوانين الغازات",
    nextLessonTitle: "الجزء التالي: قانون شارل"
};

const LessonContent = ({ onCorrect }: { onCorrect: (id: string) => void }) => {
    const Diagram = dynamic(() => import('./diagram'), {
      ssr: false,
      loading: () => (
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-[350px] w-full rounded-lg" />
          <Skeleton className="h-12 w-full" />
        </div>
      ),
    });

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookCopy className="h-6 w-6 text-primary" /> الخلفية العلمية</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                    يُعَدُّ العالم بويل من أوائل العلماء الذين بحثوا في خصائص الغازات؛ إذ درس العلاقة بين حجم كمية محددة من الغاز المحصور والضغط المؤثر فيه عند ثبات درجة حرارته. توصَّل من ذلك إلى العلاقة التي سُمِّيت قانون بويل.
                    </p>
                </CardContent>
            </Card>


            <FlippableCard
                cardTitle="نص قانون بويل"
                cardIcon={<GitCompare className="h-6 w-6" />}
                >
                <div className="space-y-3">
                    <blockquote className="border-r-4 border-primary pr-4 text-base">
                    "يتناسب حجم الغاز المحصور عكسيًا مع الضغط الواقع عليه عند ثبات درجة الحرارة."
                    </blockquote>
                    <p className="text-xs text-muted-foreground pt-2 border-t">اعتمد بويل في تجاربه على ملاحظة انكماش حجم الهواء المحصور في أنبوب على شكل حرف J عند إضافة الزئبق إليه، مما يزيد الضغط.</p>
                </div>
            </FlippableCard>

            <FlippableCard
              cardTitle="العلاقة الرياضية"
              cardIcon={<Cpu className="h-6 w-6" />}
            >
              <div className="space-y-4">
                  <p>يمكن التعبير عن العلاقة العكسية بين الحجم (V) والضغط (P) رياضيًا كالتالي:</p>
                  <div dir="ltr" className="text-center"><BlockMath math="V \propto \frac{1}{P}" /></div>
                  <p>لتحويل التناسب إلى مساواة، نستخدم ثابتًا (k) لتصبح المعادلة:</p>
                  <div dir="ltr" className="text-center"><BlockMath math="P \cdot V = k" /></div>
                  <p>وهذا يعني أن حاصل ضرب الضغط في الحجم لكمية معينة من الغاز عند درجة حرارة ثابتة هو قيمة ثابتة. ويمكن استخدام هذه العلاقة لمقارنة حالتين مختلفتين للغاز:</p>
                  <div dir="ltr" className="text-center"><BlockMath math="P_1V_1 = P_2V_2" /></div>
                   <p className="text-sm text-muted-foreground">
                      <span>حيث </span>
                      <span dir="ltr" style={{display: 'inline-block'}}><InlineMath math="P_1, V_1" /></span>
                      <span> هما الضغط والحجم الابتدائيان، و </span>
                      <span dir="ltr" style={{display: 'inline-block'}}><InlineMath math="P_2, V_2" /></span>
                      <span> هما الضغط والحجم النهائيان.</span>
                  </p>
              </div>
            </FlippableCard>


            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Box className="h-6 w-6 text-primary" /> محاكاة وتوضيح</CardTitle>
                    <CardDescription>حرّك المنزلق لتغيير الضغط، ولاحظ ما يحدث لحجم الغاز.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Diagram />
                </CardContent>
            </Card>

             <div className="grid md:grid-cols-2 gap-6 items-start">
                 <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2 text-base font-semibold"><LineChart className="h-5 w-5 text-primary" /> V مقابل P</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground text-center mb-2">
                            يمثل المنحنى العلاقة العكسية بين الحجم والضغط.
                        </p>
                        <div className="flex justify-center items-center p-4">
                            <svg width="250" height="200" viewBox="0 0 150 125" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs h-auto">
                                <defs>
                                    <marker id="arrowhead" markerWidth="5" markerHeight="3.5" refX="0" refY="1.75" orient="auto">
                                        <polygon points="0 0, 5 1.75, 0 3.5" fill="hsl(var(--muted-foreground))" />
                                    </marker>
                                </defs>
                                
                                <line x1="20" y1="110" x2="20" y2="10" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                                <text x="10" y="15" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">V</text>
                                
                                <line x1="20" y1="110" x2="140" y2="110" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                                <text x="140" y="120" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">P</text>
                                
                                <path d="M 30 20 C 40 80, 80 100, 120 105" stroke="hsl(var(--primary))" strokeWidth="2.5" fill="none" />
                            </svg>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-center gap-2 text-base font-semibold">
                                <LineChart className="h-5 w-5 text-primary" />
                                <span>V مقابل</span>
                                <InlineMath math="\frac{1}{P}" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground text-center mb-2">
                                يمثل المنحنى العلاقة الطردية بين الحجم ومقلوب الضغط.
                            </p>
                            <div className="flex justify-center items-center p-4">
                                <svg width="250" height="200" viewBox="0 0 150 120" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs h-auto">
                                    <g transform="translate(0 -11)">
                                        <defs>
                                            <marker id="arrowhead2" markerWidth="5" markerHeight="3.5" refX="0" refY="1.75" orient="auto">
                                                <polygon points="0 0, 5 1.75, 0 3.5" fill="hsl(var(--muted-foreground))" />
                                            </marker>
                                        </defs>
                                        
                                        <g transform="translate(0, 5)">
                                            <line x1="20" y1="110" x2="20" y2="10" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrowhead2)" />
                                            <text x="10" y="15" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">V</text>

                                            <line x1="20" y1="110" x2="130" y2="110" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrowhead2)" />
                                            
                                            <g transform="translate(138, 110)">
                                                <text x="0" y="-2" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">1</text>
                                                <line x1="-5" y1="5" x2="5" y2="5" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                                                <text x="0" y="12" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">P</text>
                                            </g>
                                            
                                            <line x1="20" y1="110" x2="120" y2="10" stroke="hsl(var(--primary))" strokeWidth="2.5" />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>مثال محلول</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">
                            عينة من غاز النيتروجين حجمها <InlineMath math="150\text{mL}" /> عند ضغط مقداره <InlineMath math="98.8\text{kPa}" />. ما الحجم الجديد للعينة إذا انخفض الضغط إلى <InlineMath math="96.1\text{kPa}" /> مع بقاء درجة الحرارة ثابتة؟
                        </p>
                        <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                            <p className="font-bold text-accent">المعطيات:</p>
                            <div className="space-y-1" dir="ltr">
                                <p className="text-left"><InlineMath math="V_1 = 150\text{mL}" /></p>
                                <p className="text-left"><InlineMath math="P_1 = 98.8\text{kPa}" /></p>
                                <p className="text-left"><InlineMath math="P_2 = 96.1\text{kPa}" /></p>
                            </div>
                            <p><span className="font-bold text-accent">المطلوب:</span> الحجم الجديد <InlineMath math="V_2" /></p>
                            
                            <div>
                                <p><strong className="text-accent">الحل:</strong></p>
                                <ol className="list-decimal mr-6 text-sm space-y-2">
                                    <li>نكتب قانون بويل:
                                        <div className="text-left" dir="ltr"><BlockMath math="P_1V_1 = P_2V_2" /></div>
                                    </li>
                                    <li>نعيد ترتيب المعادلة لحل <InlineMath math="V_2" />:
                                        <div className="text-left" dir="ltr"><BlockMath math="V_2 = \frac{P_1V_1}{P_2}" /></div>
                                    </li>
                                    <li>نعوض القيم:
                                        <div className="text-left" dir="ltr"><BlockMath math="V_2 = \frac{(98.8\text{kPa}) \cdot (150\text{mL})}{96.1\text{kPa}}" /></div>
                                    </li>
                                    <li>نحسب الناتج:
                                        <div className="text-left" dir="ltr"><BlockMath math="V_2 \approx 154.2\text{mL}" /></div>
                                    </li>
                                </ol>
                            </div>
                            <div className="border-t pt-3">
                                <p className="text-sm font-semibold">
                                الجواب: الحجم الجديد للغاز هو <InlineMath math="154.2\text{mL}" />. وهذا منطقي لأن الضغط انخفض، فمن المتوقع أن يزداد الحجم.
                                </p>
                            </div>
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
                      question="أي من المتغيرات التالية يجب أن تبقى ثابتة عند تطبيق قانون بويل؟"
                      options={[
                          "الضغط والحجم",
                          "الحجم وكمية الغاز",
                          "درجة الحرارة والضغط",
                          "درجة الحرارة وكمية الغاز"
                      ]}
                      correctAnswerIndex={3}
                      explanation="ينص قانون بويل على دراسة العلاقة بين الضغط والحجم عند ثبات كل من درجة الحرارة وكمية الغاز."
                  />
                   <InteractiveQuestionCard 
                      questionId="q2"
                      lessonId={lessonInfo.lessonId}
                      onCorrect={onCorrect}
                      question="إذا ضغطنا مكبسًا يحتوي على غاز إلى نصف حجمه الأصلي (مع ثبات الحرارة)، ماذا يحدث للضغط؟"
                      options={[
                          "يقل إلى النصف",
                          "يبقى ثابتًا",
                          "يتضاعف",
                          "يزداد أربع مرات"
                      ]}
                      correctAnswerIndex={2}
                      explanation="العلاقة بين الضغط والحجم عكسية. إذا قل الحجم إلى النصف (V/2)، يجب أن يتضاعف الضغط (2P) للحفاظ على حاصل الضرب P·V ثابتًا."
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

    