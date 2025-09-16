
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Pipette, Scale, GitCompare, Thermometer, Box, Lightbulb } from 'lucide-react';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { InlineMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import { CalculationTriangles } from '@/components/illustrations/calculation-triangles';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';


const lessonInfo = {
    lessonTitle: "الدرس الأول: الحالة الغازية",
    lessonSubtitle: "مقدمة قوانين الغازات",
    mainIdea: "يمكن وصف سلوك الغازات من خلال أربع متغيرات أساسية قابلة للقياس: الضغط (P)، الحجم (V)، درجة الحرارة (T)، وكمية الغاز (n). فهم هذه المتغيرات هو مفتاح فهم قوانين الغازات.",
    learningOutcomes: [
        "أحدد المتغيرات الأربعة (الضغط، الحجم، الحرارة، كمية الغاز) التي تصف سلوك الغاز.",
        "أصف المقصود بكل متغير، وأذكر وحدات القياس الشائعة له."
    ],
    lessonId: "/materials/semester-1/unit-1/lesson-1/part-2",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-1/part-1",
    nextLesson: "/materials/semester-1/unit-1/lesson-1/part-3",
    previousLessonTitle: "الجزء السابق: نظرية الحركة الجزيئية",
    nextLessonTitle: "الجزء التالي: قانون بويل"
}

const LessonContent = () => (
    <>
        <h3 className="text-2xl font-bold text-center">المتغيرات الأربعة لوصف الغاز المحصور</h3>
          <div className="grid md:grid-cols-2 gap-6">
              <FlippableCard
                cardTitle="1. الضغط (P)"
                cardIcon={<GitCompare className="h-6 w-6" />}
              >
                 <div className="space-y-3">
                    <p className="font-semibold text-sm">هو القوة المؤثرة عموديًا على وحدة المساحة.</p>
                    <p className="text-sm text-muted-foreground">ينشأ ضغط الغاز عن تصادم جسيماته بجدار الوعاء الذي يحتويه. كلما زادت التصادمات، زاد الضغط.</p>
                    <div>
                        <h4 className="font-semibold text-accent text-sm mb-1">وحدات القياس</h4>
                        <ul className="list-disc mr-4 text-sm space-y-1">
                            <li>باسكال (Pa)، وهي الوحدة الدولية (SI)</li>
                            <li>كيلوباسكال (kPa)</li>
                            <li>ضغظ جوي (atm)</li>
                            <li>مليمتر زئبق (mmHg)</li>
                        </ul>
                    </div>
                     <p className='text-sm mt-2 text-muted-foreground italic border-t pt-2' dir="ltr">
                        1 atm = 760 mmHg = 101.3 kPa
                    </p>
                 </div>
              </FlippableCard>

              <FlippableCard
                cardTitle="2. الحجم (V)"
                cardIcon={<Box className="h-6 w-6" />}
              >
                 <div className="space-y-3">
                    <p className="font-semibold text-sm">هو مقدار الحيز الذي تشغله جسيمات الغاز.</p>
                    <p className="text-sm text-muted-foreground">حجم الغاز يساوي حجم الوعاء الذي يوجد فيه.</p>
                    <div>
                        <h4 className="font-semibold text-accent text-sm mb-1">وحدات القياس</h4>
                        <ul className="list-disc mr-4 text-sm space-y-1">
                            <li>متر مكعب (m³)</li>
                            <li>لتر (L)</li>
                            <li>مليلتر (mL)</li>
                        </ul>
                    </div>
                     <p className='text-sm mt-2 text-muted-foreground italic border-t pt-2' dir="ltr">
                        1 L = 1000 mL
                    </p>
                 </div>
              </FlippableCard>

               <FlippableCard
                cardTitle="3. درجة الحرارة (T)"
                cardIcon={<Thermometer className="h-6 w-6" />}
              >
                 <div className="space-y-3">
                    <p className="font-semibold text-sm">هي مقياس لمتوسط الطاقة الحركية لجسيمات الغاز.</p>
                    <p className="text-sm text-muted-foreground">يجب استخدام درجة الحرارة المطلقة (بالكلفن) في جميع قوانين الغازات.</p>
                    <div>
                        <h4 className="font-semibold text-accent text-sm mb-1">وحدات القياس</h4>
                        <ul className="list-disc mr-4 text-sm space-y-1">
                            <li>كلفن (K)، وهي الوحدة المعتمدة</li>
                            <li>درجة مئوية (سيليزية) (°C)</li>
                        </ul>
                    </div>
                     <p className='text-sm mt-2 text-muted-foreground italic border-t pt-2' dir="ltr">
                        T(K) = T(°C) + 273
                    </p>
                 </div>
              </FlippableCard>

               <FlippableCard
                cardTitle="4. كمية الغاز (n)"
                cardIcon={<Pipette className="h-6 w-6" />}
              >
                 <div className="space-y-3">
                    <p className="font-semibold text-sm">هي عدد جسيمات الغاز الموجودة في حجم معين.</p>
                     <p className="text-sm text-muted-foreground">غالبًا ما يتم التعبير عن كمية الغاز بعدد المولات.</p>
                    <div>
                        <h4 className="font-semibold text-accent text-sm mb-1">وحدات القياس</h4>
                        <ul className="list-disc mr-4 text-sm space-y-1">
                            <li>مول (mol)، ويرمز له بالرمز n</li>
                        </ul>
                    </div>
                     <div className='text-sm mt-2 text-muted-foreground italic border-t pt-2'>
                        <p>المول الواحد يحتوي على عدد أفوجادرو من الجسيمات:</p>
                        <p dir="ltr" className="text-center font-mono mt-1">6.022 × 10²³</p>
                    </div>
                 </div>
              </FlippableCard>
          </div>
          
           <FlippableCard
            cardTitle="الظروف المعيارية (STP)"
            cardIcon={<Scale className="h-6 w-6" />}
          >
             <p className="mb-4 font-semibold text-sm">هي ظروف مرجعية متفق عليها عالميًا لتسهيل مقارنة البيانات التجريبية للغازات.</p>
              <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                      <span className="font-bold text-primary text-lg mt-[-2px]">1.</span>
                      <div>
                          <p className='font-semibold'>الضغط المعياري (Standard Pressure)</p>
                          <p className='text-muted-foreground mt-1' dir="ltr">P = 1 atm = 760 mmHg = 101.3 kPa</p>
                      </div>
                  </li>
                  <li className="flex items-start gap-3">
                      <span className="font-bold text-primary text-lg mt-[-2px]">2.</span>
                       <div>
                          <p className='font-semibold'>درجة الحرارة المعيارية (Standard Temperature)</p>
                          <p className='text-muted-foreground mt-1' dir="ltr">T = 0 °C = 273 K</p>
                      </div>
                  </li>
              </ul>
          </FlippableCard>

          <CalculationTriangles />

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
                    question="بالون يحتوي على غاز الهيليوم ضغطه 900mmHg فإن قيمة ضغطه بوحدة atm تساوي"
                    options={[
                        "1.18",
                        "0.84",
                        "1660",
                        "140"
                    ]}
                    correctAnswerIndex={0}
                    explanation="للتحويل من mmHg إلى atm، نقوم بالقسمة على 760. المعادلة هي: 900 mmHg / 760 ≈ 1.18 atm."
                />
                 <InteractiveQuestionCard 
                    questionId="q2"
                    lessonId={lessonInfo.lessonId}
                    onCorrect={() => {}}
                    question="بالون درجة حرارته 20°C فإن حرارته المطلقة تساوي"
                    options={[
                        "13.75",
                        "253",
                        "293",
                        "0.073"
                    ]}
                    correctAnswerIndex={2}
                    explanation="للتحويل من درجة سيليزية (°C) إلى كلفن (K)، نستخدم المعادلة: T(K) = T(°C) + 273. إذن 20 + 273 = 293 K."
                />
            </div>
          </div>
    </>
);

export default function LessonPartPage() {
  return (
    <LessonLayout {...lessonInfo}>
        <LessonContent />
    </LessonLayout>
  );
}

    