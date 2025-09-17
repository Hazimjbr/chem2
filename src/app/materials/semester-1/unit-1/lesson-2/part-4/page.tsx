
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Cpu, Thermometer, Wind, Zap, BarChart3, Droplets, AlertTriangle, GitCompare, Scale } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '../../../../../../components/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';
import { VaporPressureDiagram, VaporPressureCurves } from './diagram';

const lessonInfo = {
    lessonTitle: "الدرس الثاني: الحالة السائلة",
    lessonSubtitle: "الضغط البخاري",
    mainIdea: "الضغط البخاري هو ضغط بخار السائل عندما يكون في حالة اتزان ديناميكي مع سائله في وعاء مغلق ويعتمد على درجة الحرارة وقوة الترابط",
    learningOutcomes: [
        "أصف الضغط البخاري والاتزان الديناميكي",
        "أفسر العوامل المؤثرة في الضغط البخاري"
    ],
    lessonId: "/materials/semester-1/unit-1/lesson-2/part-4",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-2/part-3",
    nextLesson: "/materials/semester-1/unit-1/lesson-2/part-5",
    previousLessonTitle: "الجزء السابق: التكاثف",
    nextLessonTitle: "الجزء التالي: درجة الغليان"
};

const LessonContent = ({ onCorrect }: { onCorrect: (id: string) => void }) => (
    <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookCopy className="h-6 w-6 text-primary" /> الخلفية العلمية</CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                    عند وضع سائل في وعاء مغلق تبدأ بعض الجزيئات بالتبخر هذه الجزيئات المتبخرة تتحرك عشوائيًا وتصطدم مع جدار الوعاء ومع سطح السائل في هذا الدرس سنستكشف كيف ينشأ ضغط من هذا البخار وما هي العوامل التي تتحكم فيه
                </p>
                <ul className="list-disc mr-6 mt-2 space-y-1">
                    <li><strong>جدار الوعاء</strong> مما يسبب ما يعرف بالضغط البخاري</li>
                    <li><strong>جزيئات الغاز الأخرى</strong></li>
                    <li><strong>سطح السائل</strong> مما قد يؤدي إلى عودتها للحالة السائلة (التكاثف)</li>
                </ul>
                <p className="mt-2">
                    يستمر هذا الوضع حتى تتساوى سرعة التبخر مع سرعة التكاثف فيصل النظام إلى حالة اتزان ويثبت عندها الضغط البخاري
                </p>
            </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
             <FlippableCard cardTitle="تعريف الضغط البخاري" cardIcon={<GitCompare className="h-6 w-6" />}>
                <p className="text-sm">
                    هو الضغط الذي يسببه البخار على سطح السائل عند الاتزان عند درجة حرارة وضغط ثابتين
                </p>
                <p className="text-sm text-muted-foreground mt-4 border-t pt-2">
                    ببساطة هو ضغط البخار فوق السائل في وعاء مغلق بعد فترة من الزمن
                </p>
            </FlippableCard>

            <FlippableCard cardTitle="حالة الاتزان الديناميكي" cardIcon={<Scale className="h-6 w-6" />}>
                 <p className="text-sm">
                    هي الحالة التي يتساوى فيها معدل سرعة تبخر السائل مع معدل سرعة تكاثف بخاره في وعاء مغلق
                </p>
                <p className="text-sm text-muted-foreground mt-4 border-t pt-2">
                    عند الاتزان لا تتوقف العمليتان بل تحدثان بنفس السرعة فيبقى عدد جزيئات البخار ثابتًا وبالتالي يثبت الضغط البخاري
                </p>
            </FlippableCard>
        </div>
        
         <FlippableCard
            cardTitle="مراحل الوصول للاتزان"
            cardIcon={<BarChart3 className="h-6 w-6" />}
            imageContent={<VaporPressureDiagram />}
            imageCardClassName="flex items-center justify-center"
        >
            <div className="space-y-2 text-sm p-4">
                <p><strong className="font-semibold text-accent">عند لحظة البداية</strong> تكون سرعة التبخر ثابتة عند نفس درجة الحرارة وسرعة التكاثف تساوي صفرًا لعدم وجود جزيئات بخار</p>
                <p><strong className="font-semibold text-accent">مع مرور الوقت</strong> يزداد عدد جزيئات البخار فتبدأ سرعة التكاثف بالازدياد</p>
                <p><strong className="font-semibold text-accent">عند الزمن A</strong> تتساوى سرعة التبخر مع سرعة التكاثف ويصل النظام إلى حالة الاتزان الديناميكي ويثبت الضغط البخاري</p>
            </div>
        </FlippableCard>
        
         <FlippableCard cardTitle="العوامل المؤثرة في الضغط البخاري" cardIcon={<Zap className="h-6 w-6" />}>
            <div className="w-full h-full p-4">
                <ul className="space-y-4 text-sm">
                    <li className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                            <Thermometer className="h-5 w-5 text-primary flex-shrink-0" />
                            <strong className="font-semibold">درجة الحرارة (علاقة طردية)</strong>
                        </div>
                        <p className="text-sm mt-1 text-muted-foreground mr-7">
                            بزيادة درجة الحرارة تزداد الطاقة الحركية للجزيئات فيزداد عدد الجزيئات القادرة على التبخر مما يزيد من الضغط البخاري
                        </p>
                    </li>
                    <li className="flex flex-col items-start gap-1">
                        <div className="flex items-center gap-2">
                            <Zap className="h-5 w-5 text-destructive flex-shrink-0" />
                            <strong className="font-semibold">قوة الترابط بين الجزيئات (علاقة عكسية)</strong>
                        </div>
                        <p className="text-sm mt-1 text-muted-foreground mr-7">
                            كلما كانت قوى الترابط أقوى قل عدد الجزيئات القادرة على الإفلات من السطح وبالتالي يقل الضغط البخاري
                        </p>
                    </li>
                </ul>
            </div>
        </FlippableCard>
    
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
                  onCorrect={onCorrect}
                  question="ماذا يحدث لسرعة التكاثف في وعاء مغلق مع مرور الوقت؟"
                  options={[
                      "تبقى ثابتة",
                      "تقل تدريجيًا",
                      "تزداد حتى تتساوى مع سرعة التبخر",
                      "تساوي صفرًا دائمًا"
                  ]}
                  correctAnswerIndex={2}
                  explanation="في البداية تكون سرعة التكاثف صفرًا مع تبخر المزيد من الجزيئات يزداد تركيز البخار فتزداد سرعة التكاثف حتى تصل إلى سرعة التبخر عند حالة الاتزان"
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={onCorrect}
                  question={<><span>أي السوائل التالية تتوقع أن يكون له أعلى ضغط بخاري عند </span><span dir="ltr" className="inline-block">25°C</span><span>؟</span></>}
                  options={[
                      "الماء (H₂O)",
                      "الإيثانول (C₂H₅OH)",
                      "الأسيتون (CH₃COCH₃)",
                      "البنتان (C₅H₁₂)"
                  ]}
                  correctAnswerIndex={3}
                  explanation="أعلى ضغط بخاري يعني أضعف قوى ترابط البنتان هو جزيء غير قطبي يمتلك أضعف قوى ترابط (قوى لندن فقط) لذا فهو يحتاج طاقة أقل للتبخر وهو الأسرع تبخرًا"
              />
          </div>
        </div>
    </div>
);


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
