
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Cpu, Layers, Beaker, SlidersHorizontal, Scale } from 'lucide-react';
import FlippableCard from '@/components/flippable-card';
import InteractiveQuestionCard from '../../../../../../components/interactive-question-card';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { InlineMath, BlockMath } from 'react-katex';

const lessonInfo = {
    lessonTitle: "الدرس الثاني: خصائص المحاليل",
    lessonSubtitle: "الخصائص الجامعة للمحاليل",
    mainIdea: "الخصائص الجامعة هي خصائص فيزيائية للمحاليل تعتمد على عدد جسيمات المذاب وليس على طبيعتها وتشمل الانخفاض في الضغط البخاري والارتفاع في درجة الغليان والانخفاض في درجة التجمد والضغط الأسموزي",
    learningOutcomes: [
        "أعرف الخصائص الجامعة للمحاليل",
        "أفرق بين المواد المتطايرة وغير المتطايرة",
        "أحسب التركيز المولالي لمحلول"
    ],
    lessonId: "/materials/semester-1/unit-2/lesson-2/part-1",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-2/lesson-1/part-3",
    nextLesson: "/materials/semester-1/unit-2/lesson-2/part-2",
    previousLessonTitle: "الجزء السابق: المحاليل السائلة",
    nextLessonTitle: "الجزء التالي: الانخفاض في الضغط البخاري"
};

const LessonContent = ({ onCorrect }: { onCorrect: (id: string) => void }) => (
    <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookCopy className="h-6 w-6 text-primary" /> مقدمة</CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                    عندما نذيب مادة في سائل نقي فإننا نغير خصائصه الفيزيائية على سبيل المثال إضافة الملح إلى الماء لا تجعله مالحًا فحسب بل تغير أيضًا درجة تجمده ودرجة غليانه هذه التغيرات التي تعتمد على كمية المذاب تُعرف بالخصائص الجامعة وهي أساس هذا الدرس
                </p>
            </CardContent>
        </Card>

        <FlippableCard
            cardTitle="مصطلحات أساسية"
            cardIcon={<Layers className="h-6 w-6" />}
            imageContent={
                <div className="relative w-full h-full">
                    <Image 
                        src="https://i.ibb.co/TqYY0RPr/Heating-curve.jpg" 
                        alt="Heating-curve" 
                        layout="fill" 
                        className="rounded-lg object-contain"
                        data-ai-hint="heating curve"
                    />
                </div>
            }
            hasImage={true}
        >
            <ul className="p-4 space-y-3 text-sm">
                <li><strong className="text-accent">الغليان</strong> تحول المادة من الحالة السائلة إلى الغازية من جميع أنحاء السائل عندما يتساوى الضغط البخاري للسائل مع الضغط الواقع عليه</li>
                <li><strong className="text-accent">المواد غير المتطايرة</strong> مواد صلبة ذات درجات انصهار وغليان مرتفعة مثل الملح والسكر</li>
                <li><strong className="text-accent">المواد المتطايرة</strong> مواد سائلة ذات درجات غليان منخفضة (مثل الكحول)</li>
                <li><strong className="text-accent">للسائل النقي</strong> درجتي غليان وتجمد ثابتتين ومحددتين عند ثبات الضغط</li>
            </ul>
        </FlippableCard>

        <div className="space-y-6">
            <FlippableCard
                cardTitle="الخصائص الجامعة للمحاليل"
                cardIcon={<SlidersHorizontal className="h-6 w-6" />}
            >
                <div className="p-4 space-y-3 text-sm">
                    <p className="font-semibold">هي خصائص فيزيائية للمحاليل تتأثر بكمية جسيمات المذاب (تركيزها) وليس بنوعها أو طبيعتها</p>
                    <p className="font-bold text-accent">تشمل أربع خصائص رئيسية</p>
                    <ol className="list-decimal mr-4 space-y-1">
                        <li>الانخفاض في الضغط البخاري</li>
                        <li>الارتفاع في درجة الغليان</li>
                        <li>الانخفاض في درجة التجمد</li>
                        <li>الضغط الأسموزي</li>
                    </ol>
                </div>
            </FlippableCard>

            <FlippableCard
                cardTitle="التركيز المولالي (Molality)"
                cardIcon={<Scale className="h-6 w-6" />}
            >
                <div className="p-4 space-y-3 text-sm">
                    <p>نظرًا لأن الخصائص الجامعة تعتمد على التركيز فإننا نستخدم وحدة تركيز خاصة لا تتأثر بتغير درجة الحرارة وهي المولالية</p>
                    <p className="font-semibold">المولالية (m): نسبة عدد مولات المذاب (n) إلى كتلة المذيب بالكيلوغرام (kg)</p>
                    <div className="text-center bg-muted p-2 rounded-lg" dir="ltr">
                        <BlockMath math="m = \frac{\text{n solute (mol)}}{\text{mass solvent (kg)}}" />
                    </div>
                     <div className="relative w-full h-56 mt-4">
                        <Image 
                            src="https://i.ibb.co/4nYqLDct/molality.jpg" 
                            alt="molality" 
                            layout="fill" 
                            className="rounded-lg object-contain" 
                            data-ai-hint="molality calculation triangle"
                        />
                     </div>
                </div>
            </FlippableCard>
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
                  onCorrect={onCorrect}
                  question="أي من الخصائص التالية لا تعتبر من الخصائص الجامعة للمحاليل"
                  options={[
                      "درجة الغليان",
                      "الضغط البخاري",
                      "الكثافة",
                      "درجة التجمد"
                  ]}
                  correctAnswerIndex={2}
                  explanation="الكثافة خاصية فيزيائية تعتمد على طبيعة المادة نفسها (نوعها) وليس فقط على عدد جسيماتها لذلك هي ليست خاصية جامعة"
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={onCorrect}
                  question="ما هي وحدة قياس التركيز المولالي"
                  options={[
                      "mol/L",
                      "g/L",
                      "mol/kg",
                      "g/mol"
                  ]}
                  correctAnswerIndex={2}
                  explanation="تعريف المولالية هو عدد مولات المذاب مقسومًا على كتلة المذيب بالكيلوغرام لذا وحدتها هي mol/kg"
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
