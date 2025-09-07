
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Cpu, Layers, Atom, Binary, Waves, HelpCircle, GitCommitHorizontal, CheckCircle, Boxes, Move, Thermometer } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { InlineMath } from 'react-katex';

const lessonInfo = {
    lessonTitle: "الدرس الثالث: الحالة الصلبة",
    lessonSubtitle: "المواد الصلبة البلورية الجزيئية",
    mainIdea: "تتكون المواد الصلبة الجزيئية من ذرات أو جزيئات متعادلة ترتبط ببعضها بقوى ضعيفة (لندن ثنائي القطب هيدروجينية) مما يجعلها هشة وذات درجات انصهار منخفضة بشكل عام",
    learningOutcomes: [
        "أصف خصائص المواد الصلبة الجزيئية",
        "أقارن بين أنواع قوى الترابط فيها"
    ],
    lessonContent: `<p>نبدأ بأول نوع من المواد الصلبة البلورية وهي المواد الجزيئية التي تتكون من وحدات أساسية هي الجزيئات أو الذرات المتعادلة وترتبط هذه الوحدات مع بعضها بقوى بين جزيئية ضعيفة نسبيًا</p>`,
    lessonId: "/materials/semester-1/unit-1/lesson-3/part-2",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-3/part-1",
    nextLesson: "/materials/semester-1/unit-1/lesson-3/part-3",
    previousLessonTitle: "الجزء السابق: مقدمة المواد الصلبة",
    nextLessonTitle: "الجزء التالي: المواد الصلبة الشبكية التساهمية"
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
                       المواد الصلبة الجزيئية هي مواد تتكون من جزيئات أو ذرات متعادلة ترتبط ببعضها البعض عن طريق قوى بين جزيئية مثل قوى لندن وقوى ثنائية القطب والروابط الهيدروجينية ولأن هذه القوى ضعيفة نسبيًا فإن هذه المواد غالبًا ما تكون لينة وذات درجات انصهار منخفضة
                    </p>
                </CardContent>
            </Card>

            <FlippableCard
                cardTitle="خصائص المواد الصلبة الجزيئية"
                cardIcon={<Layers className="h-6 w-6" />}
            >
                 <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                        <span className="font-bold text-primary">1</span>
                        <p>جسيماتها ذرات أو جزيئات تساهمية متعادلة الشحنة لذلك تكون غير موصلة للكهرباء</p>
                    </li>
                    <li className="flex items-start gap-3">
                         <span className="font-bold text-primary">2</span>
                        <p>قوى الترابط بين جسيماتها ضعيفة لذلك تكون مواد هشة ودرجات انصهارها منخفضة</p>
                    </li>
                 </ul>
            </FlippableCard>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <FlippableCard
                    cardTitle="ترابط ثنائي القطب"
                    cardIcon={<Binary className="h-6 w-6" />}
                >
                    <p className="font-semibold text-sm mb-2 text-left" dir="ltr">
                        SO<span className="align-sub text-xs">3</span>, Cl<span className="align-sub text-xs">2</span>O, SO<span className="align-sub text-xs">2</span>, C<span className="align-sub text-xs">8</span>H<span className="align-sub text-xs">17</span>Br
                    </p>
                </FlippableCard>

                <FlippableCard
                    cardTitle="ترابط هيدروجيني"
                    cardIcon={<Waves className="h-6 w-6" />}
                >
                    <div className="space-y-2">
                        <p className="font-semibold text-sm text-left" dir="ltr">H<span className="align-sub text-xs">2</span>O(s)</p>
                        <p className="text-xs text-muted-foreground">الجليد يرتبط كل جزيء ماء بأربع جزيئات أخرى ويكون مركزا لرباعي الأوجه منتظم</p>
                        <p className="font-semibold text-sm border-t pt-2">الأحماض الكربوكسيلية</p>
                        <p className="font-semibold text-sm text-left" dir="ltr">C<span className="align-sub text-xs">8</span>H<span className="align-sub text-xs">17</span>COOH</p>
                    </div>
                </FlippableCard>

                <FlippableCard
                    cardTitle="ترابط لندن"
                    cardIcon={<Atom className="h-6 w-6" />}
                >
                    <div className="space-y-2">
                        <p className="font-semibold text-sm">ذرات الغازات النبيلة في الحالة الصلبة</p>
                        <p className="font-mono text-xs text-left" dir="ltr">Ne, Ar</p>
                        <p className="font-semibold text-sm border-t pt-2">جزيئات متعادلة</p>
                        <p className="font-mono text-xs text-left" dir="ltr">I<span className="align-sub text-xs">2</span>, P<span className="align-sub text-xs">4</span>, S<span className="align-sub text-xs">8</span>, C<span className="align-sub text-xs">60</span>, SiF<span className="align-sub text-xs">4</span>, C<span className="align-sub text-xs">6</span>H<span className="align-sub text-xs">12</span>O<span className="align-sub text-xs">6</span></p>
                    </div>
                </FlippableCard>
            </div>
            
            <FlippableCard
                cardTitle="استثناءات درجات الانصهار"
                cardIcon={<Cpu className="h-6 w-6" />}
            >
               <p className="mb-2">بعضها له درجات انصهار مرتفعة بسبب قوى لندن الكبيرة بين جسيماته (تزداد بازدياد الكتلة المولية) مثل</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-background rounded-lg border">
                        <h4 className="font-bold text-accent">الكبريت (S<span className="align-sub text-xs">8</span>)</h4>
                        <p className="text-xs mt-1 text-muted-foreground">مادة صفراء ذات رائحة مميزة</p>
                    </div>
                    <div className="p-3 bg-background rounded-lg border">
                         <h4 className="font-bold text-accent">بكمنسترفولرين أو كرات باكي (C<span className="align-sub text-xs">60</span>)</h4>
                         <ul className="text-xs mt-2 space-y-1 text-muted-foreground">
                            <li>أ) يتكون كل جزيء من ارتباط 60ذرة كربون على شكل كرة مجوفة</li>
                            <li>ب) ترتبط كل ذرة كربون بثلاث ذرات أخرى بروابط تساهمية لتشكل حلقات خماسية وسداسية</li>
                            <li>ج) ترتبط الكرات (الجزيئات) مع بعضها بقوى لندن مكونة بلورات إبرية سوداء</li>
                            <li>د) غير موصلة للكهرباء لأن جزيئاتها متعادلة الشحنة</li>
                         </ul>
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
                  question="أي من المواد التالية تعتبر مادة صلبة جزيئية"
                  options={[
                      "الماس",
                      "الحديد",
                      "اليود (I₂)",
                      "ملح الطعام (NaCl)"
                  ]}
                  correctAnswerIndex={2}
                  explanation="اليود يتكون من جزيئات I₂ متعادلة ترتبط ببعضها عن طريق قوى لندن الضعيفة مما يجعله مادة صلبة جزيئية"
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={handleCorrectAnswer}
                  question="لماذا تكون المواد الصلبة الجزيئية غير موصلة للكهرباء بشكل عام"
                  options={[
                      "لأنها قوية جدا",
                      "لأنها تحتوي على إلكترونات حرة",
                      "لأن جسيماتها (الذرات أو الجزيئات) متعادلة الشحنة ولا توجد أيونات أو إلكترونات حرة لنقل التيار",
                      "لأن درجات انصهارها منخفضة"
                  ]}
                  correctAnswerIndex={2}
                  explanation="التوصيل الكهربائي يتطلب وجود جسيمات مشحونة حرة الحركة (إلكترونات أو أيونات) المواد الصلبة الجزيئية تتكون من جزيئات متعادلة لا تحمل شحنة"
              />
          </div>
        </div>
    </LessonLayout>
  );
}
