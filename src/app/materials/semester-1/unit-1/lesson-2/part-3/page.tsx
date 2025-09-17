
'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Lightbulb, X, BookCopy, Cpu, Thermometer, Zap, BarChart3, Droplets, AlertTriangle, GitCompare, Scale } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '../../../../../../components/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import Quiz from '@/components/quiz';
import LessonLayout from '@/components/lesson-layout';

const lessonInfo = {
    lessonTitle: "الدرس الثاني: الحالة السائلة",
    lessonSubtitle: "التكاثف",
    mainIdea: "التكاثف هو عملية تحول المادة من الحالة الغازية إلى السائلة، وهي عملية طاردة للطاقة وتعتمد على خفض درجة الحرارة وزيادة الضغط.",
    learningOutcomes: [
        "أصف عملية تكاثف الغاز باستخدام نظرية الحركة الجزيئية.",
        "أفسر طاقة التكاثف المولية وأقارنها بطاقة التبخر.",
        "أحلل منحنى التبريد لمادة نقية."
    ],
    lessonId: "/materials/semester-1/unit-1/lesson-2/part-3",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-2/part-2",
    nextLesson: "/materials/semester-1/unit-1/lesson-2/part-4",
    previousLessonTitle: "الجزء السابق: التبخر",
    nextLessonTitle: "الجزء التالي: الضغط البخاري",
    lessonContent: "التكاثف هو تحول الغاز إلى سائل، وهو عملية طاردة للطاقة. طاقة التكاثف المولية تساوي طاقة التبخر بالقيمة وتعاكسها بالإشارة. منحنى التبريد يوضح ثبات درجة الحرارة أثناء التكاثف."
};

const LessonContent = ({ onCorrect }: { onCorrect: (id: string) => void }) => {
    const CoolingCurveDiagram = dynamic(() => import('./diagram'), {
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
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookCopy className="h-6 w-6 text-primary" /> الخلفية العلمية</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        التكاثف هو العملية المعاكسة للتبخر، حيث تفقد جزيئات الغاز طاقتها الحركية وتتقارب من بعضها البعض بفعل قوى التجاذب، متحولةً إلى الحالة السائلة. هذه العملية أساسية في دورة الماء في الطبيعة وفي العديد من التطبيقات الصناعية مثل التقطير.
                    </p>
                </CardContent>
            </Card>
            <div className="grid md:grid-cols-2 gap-6">
                <FlippableCard cardTitle="تعريف وشروط التكاثف" cardIcon={<Droplets className="h-6 w-6" />}>
                    <div className="space-y-3 p-4">
                        <p className="font-semibold text-sm">التكاثف: هو تحول المادة من الحالة الغازية إلى السائلة، وهو طارد للطاقة.</p>
                        <p className="text-sm font-bold text-accent">يحدث عن طريق خفض درجة الحرارة (التبريد) لتقليل طاقة الجزيئات وسرعتها، وتقارب الجزيئات من بعضها، وزيادة الضغط لزيادة تأثير قوى التجاذب بينها.</p>
                    </div>
                </FlippableCard>

                <FlippableCard cardTitle="آلية التكاثف" cardIcon={<Cpu className="h-6 w-6" />}>
                     <p className="text-sm p-4">
                        عند انخفاض درجة حرارة الغاز، تقل طاقة جزيئاته الحركية وتقل سرعتها. وهذا يسمح لقوى التجاذب بأن تصبح أكثر تأثيرًا، فتتقارب الجزيئات من بعضها وتتشابك لتشكل الحالة السائلة عند درجة حرارة معينة تعرف بدرجة التكاثف (أو درجة الغليان).
                    </p>
                </FlippableCard>

                 <FlippableCard cardTitle="طاقة التكاثف المولية" cardIcon={<Zap className="h-6 w-6" />}>
                    <p className="text-sm mb-2 p-4">هي كمية الطاقة المنطلقة (الطاردة) عند تحول مول واحد من المادة من الحالة الغازية إلى السائلة عند درجة حرارة ثابتة.</p>
                    <div className="my-2 text-center p-2 bg-muted rounded-lg" dir="ltr">
                        <BlockMath math="H_2O_{(g)} \rightleftharpoons H_2O_{(l)} + 40.7kJ/mol" />
                    </div>
                    <p className="text-sm p-4">تتساوى طاقة التكاثف المولية مع طاقة التبخر المولية في القيمة وتختلفان في الإشارة (التكاثف طارد للطاقة، والتبخر ماص للطاقة).</p>
                </FlippableCard>

                <FlippableCard cardTitle="تفسير علمي" cardIcon={<Lightbulb className="h-6 w-6" />}>
                     <p className="text-sm font-semibold mb-2 p-4">لماذا تكون الحروق الناتجة عن بخار الماء أشد من الحروق الناتجة عن الماء الساخن عند نفس درجة الحرارة (<span dir="ltr" className="inline-block">100°C</span>)؟</p>
                    <p className="text-sm text-muted-foreground p-4 pt-0">
                        السبب هو أن بخار الماء يختزن كمية طاقة أكبر (طاقة التبخر الكامنة). عندما يلامس البخار الجلد، فإنه يفقد هذه الطاقة الكبيرة (طاقة التكاثف) ليتحول أولاً إلى ماء سائل عند <span dir="ltr" className="inline-block">100°C</span>، ثم يبدأ هذا الماء الساخن بنقل حرارته إلى الجلد، مما يسبب حرقًا أشد.
                    </p>
                </FlippableCard>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart3 className="h-6 w-6 text-primary" /> منحنى التبريد للماء النقي</CardTitle>
                    <CardDescription>لاحظ كيف تتغير درجة الحرارة مع مرور الزمن أثناء تبريد الماء وتحوله من الحالة الغازية إلى الصلبة.</CardDescription>
                </CardHeader>
                <CardContent>
                    <CoolingCurveDiagram />
                </CardContent>
            </Card>

            <FlippableCard cardTitle="تحليل أعمق لمنحنى التبريد" cardIcon={<BarChart3 className="h-6 w-6" />}>
                <div className="space-y-4 p-4">
                    <div>
                        <h4 className="font-semibold text-accent">لماذا هضبة التكاثف أطول من هضبة التجمد؟</h4>
                        <p className="text-sm mt-1">
                            طول الهضبة الأفقية يعتمد على كمية الطاقة الكامنة المنطلقة.
                            <strong className="text-primary"> طاقة التكاثف</strong> (تحول الغاز لسائل) أكبر بكثير من <strong className="text-secondary-foreground">طاقة التجمد</strong> (تحول السائل لصلب).
                            لذلك، يستغرق التكاثف وقتًا أطول لفقدان كل هذه الطاقة، مما يجعل هضبته أطول.
                        </p>
                    </div>
                    <div className="border-t pt-4">
                        <h4 className="font-semibold text-accent">لماذا يختلف ميل الأجزاء المنحنية؟</h4>
                        <p className="text-sm mt-1">
                            الميل يعتمد على <strong className="text-primary">الحرارة النوعية</strong> للمادة في كل حالة (مقاومتها لفقدان الحرارة).
                            كلما كانت الحرارة النوعية أكبر، كان التبريد أبطأ والميل أقل حدة (أكثر تسطحًا).
                            ترتيب الحرارة النوعية للماء هو <strong className="text-secondary-foreground">سائل &gt; صلب &gt; غاز</strong>.
                            لذلك يكون منحنى تبريد <strong className="text-secondary-foreground">السائل هو الأكثر تسطحًا</strong>، يليه الصلب، ثم الغاز هو الأكثر انحدارًا.
                        </p>
                    </div>
                </div>
            </FlippableCard>
        
            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-7 w-7 text-yellow-400" />
                <div>
                  <h3 className="text-xl font-bold">تحقق من فهمك</h3>
                  <p className="text-muted-foreground">أجب عن الأسئلة السريعة التالية لترسيخ المفاهيم.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                  <InteractiveQuestionCard 
                      questionId="q1"
                      lessonId={lessonInfo.lessonId}
                      onCorrect={onCorrect}
                      question="ما هي العملية المعاكسة لعملية التكاثف؟"
                      options={[
                          "التجمد",
                          "الانصهار",
                          "التبخر",
                          "التسامي"
                      ]}
                      correctAnswerIndex={2}
                      explanation="التكاثف هو تحول المادة من غاز إلى سائل. العملية المعاكسة تمامًا هي التبخر، وهي تحول المادة من سائل إلى غاز."
                  />
                   <InteractiveQuestionCard 
                      questionId="q2"
                      lessonId={lessonInfo.lessonId}
                      onCorrect={onCorrect}
                      question={<><span>عندما يتكاثف 1 مول من بخار الماء، فإن النظام...</span></>}
                      options={[
                          "يمتص طاقة مقدارها 40.7kJ",
                          "يطلق طاقة مقدارها 40.7kJ",
                          "لا يمتص ولا يطلق طاقة",
                          "يمتص طاقة ثم يطلقها"
                      ]}
                      correctAnswerIndex={1}
                      explanation="عملية التكاثف هي عملية طاردة للطاقة، حيث تفقد جزيئات الغاز طاقتها لتتقارب وتتحول إلى سائل. طاقة التكاثف المولية للماء تساوي 40.7kJ/mol، وهي الطاقة المنطلقة."
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
