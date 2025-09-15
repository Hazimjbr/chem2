
'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Cpu, Thermometer, Wind, Zap, BarChart3 } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

const MaxwellBoltzmannDiagram = dynamic(() => import('./diagram'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="h-[250px] w-full rounded-lg" />
      <Skeleton className="h-12 w-full" />
    </div>
  ),
});

const lessonInfo = {
    lessonTitle: "الدرس الثاني: الحالة السائلة",
    lessonSubtitle: "التبخر",
    mainIdea: "التبخر هو عملية تحول المادة من الحالة السائلة إلى الغازية عند سطح السائل، وتعتمد سرعته على درجة الحرارة وقوة الترابط بين الجزيئات.",
    learningOutcomes: [
        "أصف عملية تبخر السائل باستخدام نظرية الحركة الجزيئية.",
        "أفسر العوامل المؤثرة في سرعة التبخر."
    ],
    lessonContent: `<p>هل لاحظت من قبل كيف تجف بركة ماء صغيرة بعد المطر حتى في يوم غير حار؟ هذه الظاهرة هي مثال على التبخر، وهي عملية أساسية تحدث باستمرار حولنا. في هذا الدرس، سنستكشف كيف ولماذا يحدث التبخر، وما هي العوامل التي تجعله أسرع أو أبطأ.</p>`,
    lessonId: "/materials/semester-1/unit-1/lesson-2/part-2",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-2/part-1",
    nextLesson: "/materials/semester-1/unit-1/lesson-2/part-3",
    previousLessonTitle: "الجزء السابق: مقدمة عن المواد السائلة",
    nextLessonTitle: "الجزء التالي: التكاثف"
};

export default function LessonPartPage() {
    
  return (
    <LessonLayout {...lessonInfo}>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookCopy className="h-6 w-6 text-primary" /> الخلفية العلمية</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        تعتمد عملية التبخر على نظرية الحركة الجزيئية. ففي أي سائل، لا تمتلك جميع الجزيئات نفس الطاقة الحركية، بل هناك توزيع لهذه الطاقات (كما يوضحه مخطط ماكسويل-بولتزمان). الجزيئات الموجودة على السطح والتي تمتلك طاقة حركية عالية كافية للتغلب على قوى التجاذب مع الجزيئات المجاورة، تتمكن من الإفلات والتحول إلى الحالة الغازية.
                    </p>
                </CardContent>
            </Card>
            
            <FlippableCard cardTitle="تعريف وآلية التبخر" cardIcon={<BookCopy className="h-6 w-6" />}>
                <div className="space-y-4">
                     <p>
                        <strong>التبخر:</strong> هو تحول المادة من الحالة السائلة إلى الغازية، وهي عملية تحدث على <strong>سطح السائل فقط</strong> عند أي درجة حرارة.
                    </p>
                    <p className="text-muted-foreground">
                        <strong>آلية الحدوث:</strong> لا تمتلك جميع جزيئات السائل نفس الطاقة الحركية. بعض الجزيئات على السطح تمتلك طاقة حركية عالية كافية للتغلب على قوى التجاذب مع الجزيئات المجاورة، فتتمكن من الإفلات والتحول إلى الحالة الغازية. هذه العملية ماصة للطاقة، ولذلك نشعر بالبرودة عند تبخر العرق عن جلدنا، حيث يسحب الحرارة من الجسم.
                    </p>
                </div>
            </FlippableCard>

            <Card className="mobile-landscape:col-span-2 mobile-landscape:overflow-hidden">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Cpu className="h-6 w-6 text-primary" /> محاكاة مخطط ماكسويل-بولتزمان</CardTitle>
                    <CardDescription>تحكم في درجة الحرارة ولاحظ كيف يتغير توزيع الطاقة الحركية وعدد الجزيئات القادرة على التبخر.</CardDescription>
                </CardHeader>
                <CardContent className="mobile-landscape:p-0 mobile-landscape:pb-2">
                    <MaxwellBoltzmannDiagram />
                </CardContent>
            </Card>

            <FlippableCard cardTitle="تحليل مخطط ماكسويل-بولتزمان" cardIcon={<BarChart3 className="h-6 w-6" />}>
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full md:w-1/2">
                         <Image
                            src="https://i.ibb.co/m50X6chT/22.png"
                            alt="مخطط ماكسويل بولتزمان"
                            width={400}
                            height={300}
                            className="rounded-lg border bg-white w-full h-auto"
                            data-ai-hint="Maxwell-Boltzmann distribution"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <p className="font-semibold mb-3">مخطط ماكسويل بولتزمان لطاقة الجزيئات الحركية حيث:</p>
                        <ul className="space-y-2 text-xs">
                            <li><strong className="text-accent font-mono">ع:</strong> الحد الأدنى من الطاقة اللازمة للتبخر (طاقة التنشيط) وتعتمد على قوى التجاذب لا على درجة الحرارة</li>
                            <li><strong className="text-accent font-mono">ص:</strong> متوسط الطاقة الحركية للجزيئات</li>
                            <li><strong className="text-accent font-mono">س:</strong> الطاقة الحركية التي يمتلكها أكبر عدد من الجزيئات</li>
                            <li><strong className="text-accent font-mono">ب:</strong> عدد الجزيئات التي تمتلك مقدار الطاقة الحركية س</li>
                            <li><strong className="text-accent font-mono">ك:</strong> عدد الجزيئات التي تمتلك متوسط الطاقة الحركية للجزيئات</li>
                            <li><strong className="text-accent font-mono">أ:</strong> عدد الجزيئات التي تمتلك الطاقة اللازمة للتبخر (Ea)</li>
                            <li><strong className="text-accent">المساحة المظللة:</strong> عدد الجزيئات التي تمتلك الطاقة اللازمة للتبخر وأكثر (طاقة التنشيط على الأقل)</li>
                        </ul>
                    </div>
                </div>
            </FlippableCard>


            <div className="grid md:grid-cols-2 gap-6">
                <FlippableCard cardTitle="العوامل المؤثرة في سرعة التبخر" cardIcon={<Zap className="h-6 w-6" />}>
                     <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                           <Thermometer className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                           <div>
                                <strong className="font-semibold">درجة الحرارة (علاقة طردية):</strong>
                                <p className="text-xs mt-1">زيادة الحرارة تزيد متوسط الطاقة الحركية، فيزداد عدد الجزيئات التي تمتلك طاقة التبخر (Ea).</p>
                           </div>
                        </li>
                         <li className="flex items-start gap-3">
                           <Wind className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                           <div>
                                <strong className="font-semibold">قوى التجاذب (علاقة عكسية):</strong>
                                <p className="text-xs mt-1">كلما كانت قوى التجاذب بين الجزيئات أقوى، احتاجت الجزيئات طاقة أعلى للتبخر، فقلّت سرعته.</p>
                                <p className="text-xs mt-1 font-mono">هيدروجينية > ثنائي قطب > لندن</p>
                           </div>
                        </li>
                     </ul>
                </FlippableCard>
                <FlippableCard cardTitle="طاقة التبخر المولية" cardIcon={<Zap className="h-6 w-6" />}>
                    <p className="text-sm">هي كمية الطاقة اللازمة لتحويل مول واحد من المادة من الحالة السائلة إلى الغازية عند درجة حرارة ثابتة.</p>
                    <div className="my-4 text-center p-2 bg-muted rounded-lg" dir="ltr">
                        <BlockMath math="H_2O_{(l)} + 40.7 \text{ kJ/mol} \rightleftharpoons H_2O_{(g)}" />
                    </div>
                    <p className="text-xs text-muted-foreground">تعتمد طاقة التبخر بشكل مباشر على قوة الترابط بين الجزيئات. كلما كانت القوى أقوى، زادت الطاقة اللازمة للتبخر.</p>
                </FlippableCard>
            </div>
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
                  onCorrect={() => {}}
                  question="عند زيادة درجة حرارة سائل، ماذا يحدث لعدد الجزيئات التي تمتلك طاقة كافية للتبخر؟"
                  options={[
                      "يزداد",
                      "يقل",
                      "يبقى ثابتًا",
                      "يصبح صفرًا"
                  ]}
                  correctAnswerIndex={0}
                  explanation="زيادة درجة الحرارة تزيد من متوسط الطاقة الحركية للجزيئات، مما يعني أن عددًا أكبر من الجزيئات سيصل إلى طاقة التنشيط اللازمة للتبخر (Ea) أو يتجاوزها."
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={() => {}}
                  question="أي السوائل التالية هو الأسرع تبخرًا عند نفس درجة الحرارة؟"
                  options={[
                      "الماء (روابط هيدروجينية)",
                      "الأسيتون (ثنائي القطب)",
                      "البنتان (قوى لندن)",
                      "جميعها تتبخر بنفس السرعة"
                  ]}
                  correctAnswerIndex={2}
                  explanation="سرعة التبخر تتناسب عكسيًا مع قوة الترابط. البنتان (غير قطبي) يمتلك أضعف قوى ترابط (قوى لندن فقط)، لذا فهو يحتاج طاقة أقل للتبخر وهو الأسرع تبخرًا."
              />
          </div>
        </div>
    </LessonLayout>
  );
}
