'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Cpu, Thermometer, Wind, Zap, BarChart3, Droplets, AlertTriangle, GitCompare, Scale } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { VaporPressureDiagram, VaporPressureCurves } from './diagram';

const lessonInfo = {
    lessonTitle: "الدرس الثاني: الحالة السائلة",
    lessonSubtitle: "الضغط البخاري",
    mainIdea: "الضغط البخاري هو ضغط بخار السائل عندما يكون في حالة اتزان ديناميكي مع سائله في وعاء مغلق، ويعتمد على درجة الحرارة وقوة الترابط.",
    learningOutcomes: [
        "أصف الضغط البخاري والاتزان الديناميكي.",
        "أفسر العوامل المؤثرة في الضغط البخاري."
    ],
    lessonContent: `<p>عند وضع سائل في وعاء مغلق، تبدأ بعض الجزيئات بالتبخر. هذه الجزيئات المتبخرة تتحرك عشوائيًا وتتصادم مع جدار الوعاء ومع سطح السائل. في هذا الدرس، سنستكشف كيف ينشأ ضغط من هذا البخار وما هي العوامل التي تتحكم فيه.</p>`,
    lessonId: "/materials/semester-1/unit-1/lesson-2/part-4",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-2/part-3",
    nextLesson: "/materials/semester-1/unit-1/lesson-2/part-5",
    previousLessonTitle: "الجزء السابق: التكاثف",
    nextLessonTitle: "الجزء التالي: درجة الغليان"
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
            <div className="grid md:grid-cols-2 gap-6">
                 <FlippableCard cardTitle="تعريف الضغط البخاري" cardIcon={<GitCompare className="h-6 w-6" />}>
                    <p className="text-sm">
                        هو الضغط الذي يسببه بخار السائل على سطح سائله عندما يكون البخار في حالة اتزان ديناميكي مع سائله في وعاء مغلق عند درجة حرارة وضغط ثابتين.
                    </p>
                    <p className="text-xs text-muted-foreground mt-4 border-t pt-2">
                        ببساطة، هو ضغط البخار فوق السائل في وعاء مغلق بعد فترة من الزمن.
                    </p>
                </FlippableCard>

                <FlippableCard cardTitle="حالة الاتزان الديناميكي" cardIcon={<Scale className="h-6 w-6" />}>
                     <p className="text-sm">
                        هي الحالة التي يتساوى فيها معدل سرعة تبخر السائل مع معدل سرعة تكاثف بخاره في وعاء مغلق.
                    </p>
                    <p className="text-xs text-muted-foreground mt-4 border-t pt-2">
                        عند الاتزان، لا تتوقف العمليتان، بل تحدثان بنفس السرعة، فيبقى عدد جزيئات البخار ثابتًا، وبالتالي يثبت الضغط البخاري.
                    </p>
                </FlippableCard>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>مراحل الوصول للاتزان</CardTitle>
                </CardHeader>
                <CardContent>
                    <VaporPressureDiagram />
                     <ul className="list-decimal mr-4 mt-4 space-y-2 text-sm">
                        <li><strong className="font-semibold">عند لحظة البداية:</strong> تكون سرعة التبخر ثابتة (عند درجة حرارة معينة) بينما سرعة التكاثف تساوي صفرًا لعدم وجود جزيئات بخار.</li>
                        <li><strong className="font-semibold">مع مرور الوقت:</strong> يزداد عدد جزيئات البخار، فتبدأ سرعة التكاثف بالازدياد.</li>
                        <li><strong className="font-semibold">عند الزمن A:</strong> تتساوى سرعة التبخر مع سرعة التكاثف، ويصل النظام إلى حالة الاتزان الديناميكي، ويثبت الضغط البخاري.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                 <CardHeader>
                    <CardTitle>العوامل المؤثرة في الضغط البخاري</CardTitle>
                </CardHeader>
                <CardContent>
                    <VaporPressureCurves />
                    <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                        <div className="p-3 rounded-lg bg-muted">
                            <h4 className="font-semibold flex items-center gap-2"><Thermometer className="h-5 w-5 text-primary" /> 1. درجة الحرارة (علاقة طردية)</h4>
                            <p className="text-xs mt-1 text-muted-foreground">بزيادة درجة الحرارة، تزداد الطاقة الحركية للجزيئات، فيزداد عدد الجزيئات القادرة على التبخر، مما يزيد من الضغط البخاري.</p>
                        </div>
                         <div className="p-3 rounded-lg bg-muted">
                            <h4 className="font-semibold flex items-center gap-2"><Zap className="h-5 w-5 text-destructive" /> 2. قوة الترابط بين الجزيئات (علاقة عكسية)</h4>
                            <p className="text-xs mt-1 text-muted-foreground">كلما كانت قوى الترابط أقوى، قل عدد الجزيئات القادرة على الإفلات من السطح، وبالتالي يقل الضغط البخاري.</p>
                        </div>
                    </div>
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
                  question="ماذا يحدث لسرعة التكاثف في وعاء مغلق مع مرور الوقت؟"
                  options={[
                      "تبقى ثابتة",
                      "تقل تدريجيًا",
                      "تزداد حتى تتساوى مع سرعة التبخر",
                      "تساوي صفرًا دائمًا"
                  ]}
                  correctAnswerIndex={2}
                  explanation="في البداية، تكون سرعة التكاثف صفرًا. مع تبخر المزيد من الجزيئات، يزداد تركيز البخار، فتزداد سرعة التكاثف حتى تصل إلى سرعة التبخر عند حالة الاتزان."
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={handleCorrectAnswer}
                  question="أي السوائل التالية تتوقع أن يكون له أعلى ضغط بخاري عند 25°C؟"
                  options={[
                      "الماء (H₂O)",
                      "الإيثانول (C₂H₅OH)",
                      "الأسيتون (CH₃COCH₃)",
                      "البنتان (C₅H₁₂)"
                  ]}
                  correctAnswerIndex={3}
                  explanation="أعلى ضغط بخاري يعني أضعف قوى ترابط. البنتان هو جزيء غير قطبي يمتلك أضعف قوى ترابط (قوى لندن فقط)، بينما المركبات الأخرى تمتلك قوى ثنائي القطب أو روابط هيدروجينية أقوى."
              />
          </div>
        </div>
    </LessonLayout>
  );
}
