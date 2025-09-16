'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Cpu, Layers, Thermometer, GitCompare, Zap, FlaskConical } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { InlineMath, BlockMath } from 'react-katex';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


const lessonInfo = {
    lessonTitle: "الدرس الأول تصنيف المحاليل",
    lessonSubtitle: "المحاليل السائلة",
    mainIdea: "الذائبية هي مقياس لقدرة المذاب على الذوبان وتعتمد على طبيعة المادة والحرارة والضغط",
    learningOutcomes: [
        "أصف العوامل المؤثرة في ذائبية المواد الصلبة والسائلة والغازية",
        "أطبق قانون هنري في حسابات ذائبية الغازات"
    ],
    lessonId: "/materials/semester-1/unit-2/lesson-1/part-3",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-2/lesson-1/part-2",
    nextLesson: "/materials/semester-1/unit-2/lesson-2/part-1",
    previousLessonTitle: "الجزء السابق تكون المحاليل",
    nextLessonTitle: "الدرس التالي خصائص المحاليل"
};

const LessonContent = ({ onCorrect }: { onCorrect: (id: string) => void }) => (
    <div className="space-y-8">
        <FlippableCard cardTitle="الذائبية والعوامل المؤثرة فيها" cardIcon={<FlaskConical className="h-6 w-6" />}>
            <div className="p-4 space-y-4">
                <p className="font-semibold">الذائبية أكبر كتلة من المذاب يمكن أن تذوب في <span dir="ltr">100g</span> من الماء عند درجة حرارة معينة</p>
                
                <div>
                    <h4 className="font-bold text-accent">تعتمد ذائبية المركبات الأيونية الصلبة على</h4>
                    <ul className="list-decimal mr-4 mt-2 text-sm space-y-1">
                        <li>طبيعة المادة لكل مادة ذائبية تعتمد على قوى الترابط بين الجسيمات</li>
                        <li>درجة الحرارة (علاقة طردية) باستثناء كبريتات السيريوم <span dir="ltr">Ce2(SO4)3</span> (علاقة عكسية)</li>
                    </ul>
                </div>

                <div className="border-t pt-3">
                    <h4 className="font-bold text-accent">ذائبية المركبات الأيونية (الصلبة) في الماء</h4>
                     <div className="flex justify-center my-2">
                        <Image src="https://i.ibb.co/gbWxHr6K/image.jpg" alt="جدول الذائبية" width={400} height={300} className="rounded-lg border" data-ai-hint="solubility rules table" />
                    </div>
                </div>
                 <div className="border-t pt-3 text-sm" dir="rtl">
                    <p>أيونات المجموعة الأولى (<span dir="ltr">Li⁺ Na⁺ K⁺ Rb⁺</span>)</p>
                    <p>أيونات المجموعة الثانية (<span dir="ltr">Mg²⁺ Ca²⁺ Sr²⁺ Ba²⁺</span>)</p>
                </div>
            </div>
        </FlippableCard>

        <FlippableCard cardTitle="ذائبية السوائل والغازات" cardIcon={<Layers className="h-6 w-6" />}>
             <div className="p-4 space-y-4">
                <p className="text-sm">تعتمد ذائبية المواد السائلة على تشابه قوى الترابط بين كل من المذاب السائل والماء</p>
                <div className="border-t pt-3">
                    <h4 className="font-bold text-accent">ذائبية الغازات في الماء قليلة عموما وتعتمد على</h4>
                    <ul className="list-decimal mr-4 mt-2 text-sm space-y-2">
                        <li><strong className="font-semibold">طبيعة المادة</strong> (علاقة طردية مع قوى الترابط بين الجسيمات) كلما زادت الكتلة المولية للغاز زادت قوى لندن وزادت الذائبية</li>
                        <li><strong className="font-semibold">درجة الحرارة</strong> (علاقة عكسية) لأن زيادة الحرارة تزيد الطاقة الحركية لجسيمات الغاز فتتغلب على قوى التجاذب مع الماء وتفلت من المحلول وتغادره</li>
                        <li><strong className="font-semibold">الضغط الخارجي أو الجزئي</strong> (علاقة طردية خطية)</li>
                    </ul>
                </div>
            </div>
        </FlippableCard>
        
        <FlippableCard cardTitle="قانون هنري" cardIcon={<Cpu className="h-6 w-6" />}
             imageContent={
                <Image src="https://i.ibb.co/DfVsvpZv/image.jpg" alt="قانون هنري" width={300} height={200} className="rounded-lg border" data-ai-hint="Henry's law graph" />
            }
        >
             <div className="p-4 space-y-3">
                <blockquote className="border-r-4 border-primary pr-4">
                   تتناسب ذائبية الغاز في سائل ما تناسبا طرديا مع الضغط الجزئي المؤثر في سطح السائل عند ثبات درجة الحرارة
                </blockquote>
                <div className="text-center" dir="ltr">
                    <BlockMath math="S = K_H P \quad \text{أو} \quad \frac{S_1}{P_1} = \frac{S_2}{P_2}" />
                </div>
                <div>
                    <h4 className="font-semibold text-accent">حيث</h4>
                    <ul className="list-decimal mr-4 mt-2 text-sm space-y-1">
                         <li><span dir="ltr">S</span> الذائبية بوحدة <span dir="ltr">g/L</span></li>
                         <li><span dir="ltr">P</span> الضغط الجزئي للغاز بوحدة <span dir="ltr">atm</span></li>
                         <li><span dir="ltr">KH</span> ثابت هنري بوحدة <span dir="ltr">g/L.atm</span> (قيمته تتغير بتغير نوع الغاز ودرجة الحرارة)</li>
                         <li><span dir="ltr">T = 0°C = 273K</span></li>
                    </ul>
                </div>
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
                  question="أي الأملاح التالية تتوقع أن تكون ذائبيته هي الأعلى في الماء"
                  options={[
                      "AgCl",
                      "CaSO₄",
                      "KNO₃",
                      "BaCO₃"
                  ]}
                  correctAnswerIndex={2}
                  explanation="أملاح النترات (NO₃⁻) وأملاح عناصر المجموعة الأولى (مثل البوتاسيوم K⁺) ذائبة دائمًا في الماء بدون استثناء"
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={onCorrect}
                  question="لزيادة ذائبية غاز ثاني أكسيد الكربون في مشروب غازي يجب"
                  options={[
                      "رفع درجة الحرارة وخفض الضغط",
                      "خفض درجة الحرارة وزيادة الضغط",
                      "رفع درجة الحرارة وزيادة الضغط",
                      "خفض درجة الحرارة والضغط"
                  ]}
                  correctAnswerIndex={1}
                  explanation="ذائبية الغازات في السوائل تزداد بانخفاض درجة الحرارة (علاقة عكسية) وزيادة الضغط (علاقة طردية) وفقًا لقانون هنري"
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
        <LessonContent onCorrect={onCorrect} />
    </LessonLayout>
  );
}
