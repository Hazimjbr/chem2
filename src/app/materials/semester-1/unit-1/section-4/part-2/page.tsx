
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, FlaskConical, Stethoscope, Cloud, CookingPot, Zap, Recycle, Building, Star } from 'lucide-react';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';


const lessonInfo = {
    lessonTitle: "الإثراء والتوسع",
    lessonSubtitle: "البلازما: الحالة الرابعة للمادة",
    mainIdea: "البلازما هي حالة متميزة من المادة تتكون من خليط من الأيونات والإلكترونات وتمتلك خصائص فريدة وتطبيقات واعدة مثل تحويل النفايات إلى طاقة",
    learningOutcomes: [
        "أتعرف على مفهوم البلازما وخصائصها",
        "أصف كيفية عمل محول النفايات البلازمي وميزاته",
    ],
    lessonContent: `<p>إلى جانب الحالات الثلاث التي درسناها توجد حالة رابعة ومثيرة للمادة تسمى البلازما على الرغم من أنها قد تبدو غريبة إلا أنها الحالة الأكثر شيوعًا في الكون حيث تشكل النجوم والشمس</p>`,
    lessonId: "/materials/semester-1/unit-1/section-4/part-2",
    staticQuizzes: { lvl1: [], lvl2: [], lvl3: [] }, // No quiz for this section
    previousLesson: "/materials/semester-1/unit-1/section-4/part-1",
    nextLesson: "/materials/semester-1/unit-1/section-5",
    previousLessonTitle: "الجزء السابق: الربط بالعلوم",
    nextLessonTitle: "مراجعة الوحدة"
};

export default function LessonPartPage() {
    const [completedInteractive, setCompletedInteractive] = useState<Set<string>>(new Set());

     useEffect(() => {
        // This is a placeholder for future logic.
        if (completedInteractive.size > 0) {
            // console.log('Interactive questions completed:', completedInteractive);
        }
    }, [completedInteractive]);

    const handleCorrectAnswer = (questionId: string) => {
        setCompletedInteractive(prev => new Set(prev).add(questionId));
    };

  return (
    <LessonLayout {...lessonInfo}>
        <div className="space-y-8">
            <FlippableCard
                cardTitle="ما هي البلازما (الحالة الرابعة للمادة)"
                cardIcon={<Star className="h-6 w-6 text-primary" />}
            >
                <CardContent className="space-y-4">
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
                <CardContent>
                    <CardDescription className="mb-4">أحد الاستخدامات الواعدة للبلازما هو معالجة النفايات</CardDescription>
                    <h4 className="font-semibold text-accent mb-2">آلية العمل</h4>
                    <ul className="list-decimal mr-6 space-y-3">
                        <li>
                            <strong>تكسير الروابط</strong> تعمل الطاقة الهائلة المختزنة في البلازما على تكسير روابط جميع أنواع النفايات وتفكيكها إلى عناصرها الأولية
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
                  question="ما هي الخاصية الأساسية للبلازما التي تجعلها فعالة في تكسير روابط النفايات؟"
                  options={[
                      "لونها المميز",
                      "قدرتها على توصيل الكهرباء",
                      "الطاقة الهائلة التي تختزنها",
                      "شكلها وحجمها المتغيران"
                  ]}
                  correctAnswerIndex={2}
                  explanation="الطاقة الهائلة المختزنة في البلازما هي التي تسمح بتكسير الروابط الكيميائية القوية في جميع أنواع النفايات وتحويلها إلى عناصرها الأولية"
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={handleCorrectAnswer}
                  question="ما هي السلبية الرئيسية المذكورة لتقنية محول النفايات البلازمي؟"
                  options={[
                      "تنتج غازات دفيئة أكثر من الحرق",
                      "تحتاج إلى مساحات واسعة جدًا",
                      "لا يمكنها معالجة النفايات العضوية",
                      "ارتفاع تكلفة الإنشاء الأولية"
                  ]}
                  correctAnswerIndex={3}
                  explanation="ذكر النص أن من أهم سلبيات تقنية محول النفايات البلازمي هو ارتفاع التكلفة الأولية لإنشاء المحولات"
              />
          </div>
        </div>
    </LessonLayout>
  );
}
