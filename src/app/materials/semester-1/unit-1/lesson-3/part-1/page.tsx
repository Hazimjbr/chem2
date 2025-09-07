
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Cpu, Layers, Atom, Binary, Wind, HelpCircle, GitCommitHorizontal, CheckCircle, Boxes, Move, Thermometer } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';

const lessonInfo = {
    lessonTitle: "الدرس الثالث: الحالة الصلبة",
    lessonSubtitle: "مقدمة عن المواد الصلبة",
    mainIdea: "تمتاز المواد الصلبة بجسيماتها المتقاربة وحركتها الاهتزازية المحدودة مما يمنحها شكلاً وحجمًا ثابتين ودرجات انصهار وغليان مرتفعة",
    learningOutcomes: [
        "أصف الخصائص العامة للمواد الصلبة",
        "أقارن بين المواد الصلبة البلورية وغير البلورية"
    ],
    lessonContent: `<p>نصل الآن إلى الحالة الأخيرة من حالات المادة وهي الحالة الصلبة التي تتميز بقوتها وصلابتها في هذا الدرس سنتعرف على الخصائص الأساسية للمواد الصلبة وعلى كيفية تصنيفها بناءً على ترتيب جسيماتها الداخلي</p>`,
    lessonId: "/materials/semester-1/unit-1/lesson-3/part-1",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-2/part-5",
    nextLesson: "/materials/semester-1/unit-1/lesson-3/part-2",
    previousLessonTitle: "الجزء السابق: درجة الغليان",
    nextLessonTitle: "الجزء التالي: المواد الصلبة البلورية الجزيئية"
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
                        تتميز المواد الصلبة بأن جسيماتها (ذرات أو أيونات أو جزيئات) متراصة بشكل متقارب جدًا وقوى التجاذب بينها قوية جدًا هذه القوة في الترابط تحد من حركة الجسيمات وتجعلها تهتز في مواضع ثابتة فقط مما يعطي المواد الصلبة خصائصها الفريدة من شكل وحجم ثابتين
                    </p>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                 <FlippableCard
                    cardTitle="خصائص المواد الصلبة"
                    cardIcon={<Layers className="h-6 w-6" />}
                >
                     <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                           <Boxes className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                           <div>
                                <strong className="font-semibold">شكل وحجم ثابتان</strong>
                                <p className="text-xs mt-1">جسيماتها متقاربة جدًا وقوى التجاذب بينها قوية لذلك هي غير قابلة للانضغاط</p>
                           </div>
                        </li>
                         <li className="flex items-start gap-3">
                           <GitCommitHorizontal className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                           <div>
                                <strong className="font-semibold">غير قابلة للجريان</strong>
                                <p className="text-xs mt-1">قوة التجاذب العالية تمنع جسيماتها من الانزلاق فوق بعضها البعض</p>
                           </div>
                        </li>
                         <li className="flex items-start gap-3">
                           <Move className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                           <div>
                                <strong className="font-semibold">حركة اهتزازية</strong>
                                <p className="text-xs mt-1">جسيماتها تهتز في مكانها فقط ولا تنتقل من مكان لآخر</p>
                           </div>
                        </li>
                     </ul>
                </FlippableCard>

                <FlippableCard
                    cardTitle="الانصهار ودرجة الانصهار"
                    cardIcon={<Thermometer className="h-6 w-6" />}
                >
                    <div className="space-y-3 text-sm">
                        <p className="font-semibold">درجة الانصهار هي درجة الحرارة التي تتحول عندها المادة من الحالة الصلبة إلى الحالة السائلة</p>
                        <div>
                             <strong className="font-semibold text-accent text-xs">آلية الانصهار</strong>
                             <p className="text-xs mt-1 text-muted-foreground">عند تسخين المادة الصلبة تزداد الطاقة الحركية لجسيماتها ويزداد اهتزازها فيضعف التجاذب بينها وعند درجة الانصهار تكون الطاقة كافية للتغلب على قوى التجاذب فتتحول المادة إلى سائل</p>
                        </div>
                    </div>
                </FlippableCard>
            </div>
            
            <FlippableCard
                cardTitle="تصنيف المواد الصلبة"
                cardIcon={<Cpu className="h-6 w-6" />}
            >
               <div className="space-y-4">
                  <p>تصنف المواد الصلبة بناءً على انتظام ترتيب جسيماتها إلى نوعين رئيسيين</p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-background rounded-lg border">
                            <h4 className="font-bold text-accent">مواد صلبة غير بلورية</h4>
                            <p className="text-xs mt-1 text-muted-foreground">ذات أشكال غير منتظمة وترتيب عشوائي للجسيمات</p>
                             <p className="text-xs mt-2">مثل البلاستيك والزجاج والأسفلت</p>
                        </div>
                        <div className="p-3 bg-background rounded-lg border">
                             <h4 className="font-bold text-accent">مواد صلبة بلورية</h4>
                             <p className="text-xs mt-1 text-muted-foreground">ذات أشكال هندسية منتظمة وترتيب متكرر للجسيمات</p>
                             <ul className="text-xs mt-2 space-y-1">
                                <li>‌أ) جزيئية مثل السكر</li>
                                <li>‌ب) شبكية تساهمية مثل الماس</li>
                                <li>‌ج) فلزية مثل الحديد</li>
                                <li>‌د) أيونية مثل ملح الطعام</li>
                             </ul>
                        </div>
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
                  onCorrect={handleCorrectAnswer}
                  question="أي من الخصائص التالية لا تنطبق على المواد الصلبة؟"
                  options={[
                      "لها شكل ثابت",
                      "غير قابلة للانضغاط",
                      "جسيماتها تهتز في مكانها",
                      "قابلة للجريان بسهولة"
                  ]}
                  correctAnswerIndex={3}
                  explanation="المواد الصلبة غير قابلة للجريان بسبب قوى التجاذب القوية التي تثبت جسيماتها في مكانها"
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={handleCorrectAnswer}
                  question="ما هو الفرق الأساسي بين المواد الصلبة البلورية وغير البلورية؟"
                  options={[
                      "نوع الجسيمات",
                      "درجة الانصهار",
                      "انتظام ترتيب الجسيمات",
                      "القوة"
                  ]}
                  correctAnswerIndex={2}
                  explanation="الفرق الجوهري هو أن المواد البلورية لها ترتيب هندسي منتظم ومتكرر للجسيمات بينما المواد غير البلورية ترتيبها عشوائي"
              />
          </div>
        </div>
    </LessonLayout>
  );
}
