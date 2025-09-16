
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, FlaskConical, Stethoscope, Cloud, CookingPot, Zap, Recycle, Building, Star } from 'lucide-react';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import Image from 'next/image';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';


const lessonInfo = {
    lessonTitle: "الإثراء والتوسع",
    lessonSubtitle: "البلازما: الحالة الرابعة للمادة",
    mainIdea: "البلازما هي حالة متميزة من المادة تتكون من خليط من الأيونات والإلكترونات وتمتلك خصائص فريدة وتطبيقات واعدة مثل تحويل النفايات إلى طاقة",
    learningOutcomes: [
        "أتعرف على مفهوم البلازما وخصائصها",
        "أصف كيفية عمل محول النفايات البلازمي وميزاته",
    ],
    lessonId: "/materials/semester-1/unit-1/section-4/part-2",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/section-4/part-1",
    nextLesson: "/materials/semester-1/unit-1/section-5",
    previousLessonTitle: "الجزء السابق: الربط بالعلوم",
    nextLessonTitle: "مراجعة الوحدة"
};

const LessonContent = ({ onCorrect }: { onCorrect: (id: string) => void }) => (
    <div className="space-y-8">
        <FlippableCard
            cardTitle="ما هي البلازما (الحالة الرابعة للمادة)"
            cardIcon={<Star className="h-6 w-6 text-primary" />}
             imageContent={
                <Image
                    src="https://i.ibb.co/67zRnBqJ/image.jpg"
                    alt="حالة البلازما"
                    width={300}
                    height={200}
                    className="rounded-lg object-contain h-48 w-auto"
                    data-ai-hint="plasma state"
                />
            }
        >
            <CardContent className="space-y-4 p-4">
                <p>
                    هي خليط غازي لأيونات الغاز الموجبة وإلكتروناتها حرة الحركة المنفصلة عنها تتكون بسبب درجات الحرارة العالية جدا في النجوم أو بفعل البرق في الهواء الجوي أو صناعيا في المختبرات
                </p>
                <div>
                    <h4 className="font-semibold text-accent mb-2">تمتاز البلازما بالآتي</h4>
                     <ul className="list-disc mr-6 space-y-2">
                        <li>حجم وشكل متغيران</li>
                        <li>تختزن طاقة هائلة</li>
                        <li>توصل التيار الكهربائي بسبب الإلكترونات حرة الحركة</li>
                    </ul>
                </div>
            </CardContent>
        </FlippableCard>

         <FlippableCard
            cardTitle="تطبيق محول النفايات البلازمي"
            cardIcon={<Recycle className="h-6 w-6 text-primary" />}
        >
            <CardContent className="p-4">
                <CardDescription className="mb-4">أحد الاستخدامات الواعدة للبلازما هو معالجة النفايات</CardDescription>
                <h4 className="font-semibold text-accent mb-2">آلية العمل</h4>
                <ul className="list-decimal mr-6 space-y-3">
                    <li>
                       تعمل الطاقة الهائلة المختزنة في البلازما على تكسير روابط جميع أنواع النفايات وتفكيكها إلى عناصرها الأولية
                    </li>
                     <li>
                        <strong>النواتج النهائية (تعتمد على نوع النفايات)</strong>
                        <ul className="list-disc mr-6 mt-2 space-y-1 text-sm">
                            <li><strong>النفايات العضوية</strong> تخرج على شكل غاز غني بالهيدروجين (غاز التصنيع) والذي يمكن استخدامه كوقود نظيف</li>
                            <li><strong>النفايات غير العضوية</strong> تخرج على شكل مادة صلبة زجاجية (خبث) والتي يمكن استخدامها في صناعة الأسفلت والإسمنت (الكونكريت)</li>
                        </ul>
                    </li>
                     <li>
                        <strong>الميزات والسلبيات</strong>
                         <ul className="list-disc mr-6 mt-2 space-y-1 text-sm">
                            <li><strong className="text-green-600">الميزات</strong> لا تحتاج إلى مساحات واسعة (مكبات) لطمر النفايات وكمية غازات الدفيئة والملوثات الناتجة عنها أقل بكثير من طرق الحرق التقليدية</li>
                            <li><strong className="text-destructive">السلبيات</strong> أهم سلبياتها هي ارتفاع تكلفة الإنشاء الأولية للمحولات</li>
                        </ul>
                    </li>
                </ul>
            </CardContent>
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
              question={staticQuizLvl1[0].question}
              options={staticQuizLvl1[0].options as string[]}
              correctAnswerIndex={staticQuizLvl1[0].correctAnswerIndex}
              explanation={staticQuizLvl1[0].explanation as string}
          />
           <InteractiveQuestionCard 
              questionId="q2"
              lessonId={lessonInfo.lessonId}
              onCorrect={onCorrect}
              question={staticQuizLvl1[1].question}
              options={staticQuizLvl1[1].options as string[]}
              correctAnswerIndex={staticQuizLvl1[1].correctAnswerIndex}
              explanation={staticQuizLvl1[1].explanation as string}
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

    