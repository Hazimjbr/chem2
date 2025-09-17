
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Cpu, Thermometer, Wind, Zap, BarChart3, Droplets, AlertTriangle, GitCompare, Scale } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '../../../../../../components/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';
import { BoilingCurve, BoilingPointTrends } from './diagram';

const lessonInfo = {
    lessonTitle: "الدرس الثاني: الحالة السائلة",
    lessonSubtitle: "درجة الغليان",
    mainIdea: "الغليان هو تحول المادة من سائل إلى غاز عندما يتساوى ضغطها البخاري مع الضغط الخارجي، وتعتمد درجة الغليان على قوة الترابط والضغط الخارجي.",
    learningOutcomes: [
        "أصف عملية غليان السائل.",
        "أفسر العوامل المؤثرة في درجة الغليان."
    ],
    lessonId: "/materials/semester-1/unit-1/lesson-2/part-5",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-2/part-4",
    nextLesson: "/materials/semester-1/unit-1/lesson-3/part-1",
    previousLessonTitle: "الجزء السابق: الضغط البخاري",
    nextLessonTitle: "الدرس التالي: مقدمة المواد الصلبة"
};

const LessonContent = ({ onCorrect }: { onCorrect: (id: string) => void }) => (
    <div className="space-y-8">
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookCopy className="h-6 w-6 text-primary" /> الخلفية العلمية</CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                    عند تسخين سائل، تزداد الطاقة الحركية لجزيئاته ويزداد ضغطه البخاري. الغليان هو نقطة التحول الحرجة التي تصبح فيها طاقة الجزيئات عالية بما يكفي لتكوين فقاعات من البخار داخل السائل نفسه، وليس فقط على السطح. هذه العملية لا تحدث إلا عندما يتغلب ضغط البخار الداخلي على الضغط الجوي الخارجي.
                </p>
            </CardContent>
        </Card>

        <FlippableCard
            cardTitle="تعريف الغليان"
            cardIcon={<BookCopy className="h-6 w-6" />}
        >
            <div className="space-y-2 text-sm p-4">
                <p className="font-semibold">الغليان: تحول المادة من الحالة السائلة إلى الغازية من جميع أنحاء السائل عندما يتساوى الضغط البخاري للسائل مع الضغط الواقع عليه.</p>
                <ul className="list-disc mr-4 space-y-2 text-muted-foreground">
                    <li>يحدث الغليان للسائل النقي عند درجة حرارة ثابتة تسمى درجة الغليان.</li>
                    <li>على عكس التبخر الذي يحدث على السطح فقط، يحدث الغليان في جميع أجزاء السائل.</li>
                </ul>
            </div>
        </FlippableCard>

        <FlippableCard cardTitle="العوامل المؤثرة في درجة الغليان" cardIcon={<Zap className="h-6 w-6" />}>
            <ul className="space-y-4 text-sm p-4">
                <li className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary flex-shrink-0" />
                        <strong className="font-semibold">قوة الترابط بين الجزيئات (علاقة طردية)</strong>
                    </div>
                    <p className="text-sm mt-1 text-muted-foreground mr-7">
                        كلما كانت قوى الترابط أقوى، احتاج السائل إلى درجة حرارة أعلى ليتساوى ضغطه البخاري مع الضغط الخارجي، فتزداد درجة الغليان.
                    </p>
                </li>
                <li className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-2">
                        <GitCompare className="h-5 w-5 text-primary flex-shrink-0" />
                        <strong className="font-semibold">الضغط الخارجي (علاقة طردية)</strong>
                    </div>
                    <p className="text-sm mt-1 text-muted-foreground mr-7">
                        زيادة الضغط الخارجي (مثل الطبخ في طنجرة الضغط) تجبر السائل على الوصول لدرجة حرارة أعلى ليغلي. والعكس صحيح، حيث يغلي الماء عند درجة حرارة أقل من <span dir="ltr" className="inline-block">100°C</span> على قمم الجبال بسبب انخفاض الضغط الجوي.
                    </p>
                </li>
            </ul>
        </FlippableCard>

        <FlippableCard
            cardTitle="درجة الغليان المعيارية"
            cardIcon={<Thermometer className="h-6 w-6" />}
        >
            <p className="text-sm p-4">
                هي درجة الحرارة التي يغلي عندها السائل عندما يكون الضغط الخارجي الواقع عليه يساوي 1 ضغط جوي (1atm أو 760mmHg). وهي القيمة التي نستخدمها عادةً للمقارنة بين السوائل.
            </p>
        </FlippableCard>

        <FlippableCard
            cardTitle="اتجاهات درجة الغليان في الجدول الدوري"
            cardIcon={<BarChart3 className="h-6 w-6" />}
        >
            <div className="space-y-2 text-sm p-4">
                <p className="font-semibold">تزداد درجة غليان هيدريدات عناصر المجموعات (15, 16, 17) بزيادة الكتلة المولية بسبب زيادة قوة قوى لندن.</p>
                <p className="font-semibold text-destructive">الاستثناءات (الشذوذ):</p>
                <p className="text-sm text-muted-foreground">تمتلك المركبات (NH₃, H₂O, HF) درجات غليان مرتفعة جدًا مقارنة ببقية عناصر مجموعاتها، وذلك بسبب قدرتها على تكوين روابط هيدروجينية قوية بين جزيئاتها، وهي أقوى بكثير من قوى لندن.</p>
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
                  question="ما الفرق الجوهري بين التبخر والغليان؟"
                  options={[
                      "التبخر طارد للطاقة والغليان ماص",
                      "التبخر يحدث على السطح فقط، بينما الغليان يحدث في كل السائل",
                      "الغليان يحدث عند أي درجة حرارة",
                      "لا يوجد فرق جوهري"
                  ]}
                  correctAnswerIndex={1}
                  explanation="التبخر هو ظاهرة سطحية تحدث عند أي درجة حرارة، بينما الغليان هو ظاهرة حجمية (تحدث في كل مكان في السائل) ولا تحدث إلا عند درجة حرارة معينة يتساوى فيها الضغط البخاري مع الضغط الخارجي."
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={onCorrect}
                  question={<><span>لماذا درجة غليان الماء (<InlineMath math="H_2O"/>) أعلى بكثير من درجة غليان كبريتيد الهيدروجين (<InlineMath math="H_2S"/>) على الرغم من أن H₂S له كتلة مولية أكبر؟</span></>}
                  options={[
                      "لأن الماء أكثر تطايرًا",
                      "لأن قوى لندن في H₂S أضعف",
                      "لأن الماء يكون روابط هيدروجينية قوية جدًا",
                      "لأن الضغط الجوي يؤثر على الماء فقط"
                  ]}
                  correctAnswerIndex={2}
                  explanation="السبب هو وجود الروابط الهيدروجينية القوية جدًا بين جزيئات الماء، والتي تتطلب طاقة هائلة للتغلب عليها، مما يرفع درجة غليانه بشكل استثنائي. قوى الترابط في H₂S (ثنائي القطب وقوى لندن) أضعف بكثير."
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
