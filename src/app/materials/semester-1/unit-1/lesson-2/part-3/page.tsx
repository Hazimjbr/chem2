
'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Cpu, Thermometer, Wind, Zap, BarChart3, Droplets, AlertTriangle } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CoolingCurveDiagram = dynamic(() => import('./diagram'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="h-[300px] w-full rounded-lg" />
      <Skeleton className="h-12 w-full" />
    </div>
  ),
});

const lessonInfo = {
    lessonTitle: "الدرس الثاني: الحالة السائلة",
    lessonSubtitle: "التكاثف",
    mainIdea: "التكاثف هو عملية تحول المادة من الحالة الغازية إلى السائلة، وهي عملية طاردة للطاقة وتعتمد على خفض درجة الحرارة وزيادة الضغط.",
    learningOutcomes: [
        "أصف عملية تكاثف الغاز باستخدام نظرية الحركة الجزيئية.",
        "أفسر طاقة التكاثف المولية وأقارنها بطاقة التبخر.",
        "أحلل منحنى التبريد لمادة نقية."
    ],
    lessonContent: `<p>بعد أن فهمنا كيف تتحول السوائل إلى غازات، سنستكشف الآن العملية العكسية: التكاثف. هذه الظاهرة نراها يوميًا، من قطرات الندى على أوراق الشجر صباحًا إلى تشكل السحب في السماء. دعنا نتعمق في الآلية التي تحكم هذه العملية.</p>`,
    lessonId: "/materials/semester-1/unit-1/lesson-2/part-3",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-2/part-2",
    nextLesson: "/materials/semester-1/unit-1/lesson-2/part-4",
    previousLessonTitle: "الجزء السابق: التبخر",
    nextLessonTitle: "الجزء التالي: الضغط البخاري"
};

export default function LessonPartPage() {
    const [completedInteractive, setCompletedInteractive] = useState<Set<string>>(new Set());

    useEffect(() => {
        try {
            const savedProgress = localStorage.getItem('completedLessons') || '[]';
            const completedLessons = new Set(JSON.parse(savedProgress));
            if (completedInteractive.size >= 2) {
                completedLessons.add(lessonInfo.lessonId);
                localStorage.setItem('completedLessons', JSON.stringify(Array.from(completedLessons)));
            }
        } catch (error) {
            console.error("Failed to save lesson progress:", error);
        }
    }, [completedInteractive]);

    const handleCorrectAnswer = (questionId: string) => {
        setCompletedInteractive(prev => new Set(prev.add(questionId)));
    };

  return (
    <LessonLayout {...lessonInfo}>
        <div className="space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookCopy className="h-6 w-6 text-primary" /> الخلفية العلمية</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        التكاثف هو العملية المعاكسة للتبخر حيث تفقد جزيئات الغاز طاقتها الحركية وتتقارب من بعضها البعض بفعل قوى التجاذب متحولةً إلى الحالة السائلة هذه العملية أساسية في دورة الماء في الطبيعة وفي العديد من التطبيقات الصناعية مثل التقطير
                    </p>
                </CardContent>
            </Card>
            <div className="grid md:grid-cols-2 gap-6">
                <FlippableCard cardTitle="تعريف وشروط التكاثف" cardIcon={<Droplets className="h-6 w-6" />}>
                    <div className="space-y-3">
                        <p className="font-semibold text-sm">التكاثف هو تحول المادة من الحالة الغازية إلى السائلة طارد للطاقة</p>
                        <p className="text-xs font-bold text-accent">يحدث عن طريق خفض درجة الحرارة التبريد لتقليل طاقة الجزيئات وسرعتها وتقارب الجزيئات من بعضها وزيادة الضغط لزيادة تأثير قوى التجاذب بينها</p>
                    </div>
                </FlippableCard>

                <FlippableCard cardTitle="آلية التكاثف" cardIcon={<Cpu className="h-6 w-6" />}>
                     <p className="text-sm">
                        عند انخفاض درجة حرارة الغاز تقل طاقة جزيئاته الحركية وتقل سرعتها وهذا يسمح لقوى التجاذب بأن تصبح أكثر تأثيرًا فتتقارب الجزيئات من بعضها وتتشابك لتشكل الحالة السائلة عند درجة حرارة معينة تعرف بدرجة التكاثف أو درجة الغليان
                    </p>
                </FlippableCard>

                 <FlippableCard cardTitle="طاقة التكاثف المولية" cardIcon={<Zap className="h-6 w-6" />}>
                    <p className="text-sm mb-2">هي كمية الطاقة المنطلقة الطاردة عند تحول مول واحد من المادة من الحالة الغازية إلى السائلة عند درجة حرارة ثابتة</p>
                    <div className="my-2 text-center p-2 bg-muted rounded-lg" dir="ltr">
                        <BlockMath math="H_2O_{(g)} \rightleftharpoons H_2O_{(l)} + 40.7kJ/mol" />
                    </div>
                    <p className="text-xs">تتساوى طاقة التكاثف المولية مع طاقة التبخر المولية في القيمة وتختلفان في الإشارة التكاثف طارد للطاقة والتبخر ماص للطاقة</p>
                </FlippableCard>

                <FlippableCard cardTitle="تفسير علمي" cardIcon={<AlertTriangle className="h-6 w-6" />}>
                     <p className="text-sm font-semibold mb-2">لماذا تكون الحروق الناتجة عن بخار الماء أشد من الحروق الناتجة عن الماء الساخن عند نفس درجة الحرارة <span dir="ltr" className="inline-block">100°C</span>؟</p>
                    <p className="text-xs text-muted-foreground">
                        السبب هو أن بخار الماء يختزن كمية طاقة أكبر طاقة التبخر الكامنة عندما يلامس البخار الجلد فإنه يفقد هذه الطاقة الكبيرة طاقة التكاثف ليتحول أولاً إلى ماء سائل عند <span dir="ltr" className="inline-block">100°C</span> ثم يبدأ هذا الماء الساخن بنقل حرارته إلى الجلد مما يسبب حرقًا أشد
                    </p>
                </FlippableCard>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart3 className="h-6 w-6 text-primary" /> منحنى التبريد للماء النقي</CardTitle>
                    <CardDescription>لاحظ كيف تتغير درجة الحرارة مع مرور الزمن أثناء تبريد الماء وتحوله من الحالة الغازية إلى الصلبة</CardDescription>
                </CardHeader>
                <CardContent>
                    <CoolingCurveDiagram />
                </CardContent>
            </Card>

        </div>
        
        <div className="space-y-4 mt-8">
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
                  onCorrect={handleCorrectAnswer}
                  question="ما هي العملية المعاكسة لعملية التكاثف"
                  options={[
                      "التجمد",
                      "الانصهار",
                      "التبخر",
                      "التسامي"
                  ]}
                  correctAnswerIndex={2}
                  explanation="التكاثف هو تحول المادة من غاز إلى سائل العملية المعاكسة تمامًا هي التبخر وهي تحول المادة من سائل إلى غاز"
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={handleCorrectAnswer}
                  question={<><span>عندما يتكاثف 1 مول من بخار الماء فإن النظام</span></>}
                  options={[
                      "يمتص طاقة مقدارها 40.7kJ",
                      "يطلق طاقة مقدارها 40.7kJ",
                      "لا يمتص ولا يطلق طاقة",
                      "يمتص طاقة ثم يطلقها"
                  ]}
                  correctAnswerIndex={1}
                  explanation="عملية التكاثف هي عملية طاردة للطاقة حيث تفقد جزيئات الغاز طاقتها لتتقارب وتتحول إلى سائل طاقة التكاثف المولية للماء تساوي 40.7kJ/mol وهي الطاقة المنطلقة"
              />
          </div>
        </div>
    </LessonLayout>
  );
}
