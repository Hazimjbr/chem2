
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Cpu, Layers, Atom, Binary, Wind, HelpCircle, GitCommitHorizontal, CheckCircle, Boxes, Move, Thermometer, Diamond } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { InlineMath } from 'react-katex';

const lessonInfo = {
    lessonTitle: "الدرس الثالث: الحالة الصلبة",
    lessonSubtitle: "المواد الصلبة البلورية الفلزية",
    mainIdea: "تتميز المواد الصلبة الفلزية بوجود بحر من الإلكترونات حرة الحركة التي تحيط بالأيونات الموجبة، مما يكسبها خصائص فريدة مثل التوصيل الكهربائي والحراري، واللمعان، وقابليتها للطرق والسحب",
    learningOutcomes: [
        "أصف الرابطة الفلزية",
        "أفسر خصائص المواد الصلبة الفلزية",
    ],
    lessonContent: `<p>بعد أن تعرفنا على المواد الصلبة الشبكية التساهمية، ننتقل إلى نوع آخر مهم جدًا وهو المواد الصلبة الفلزية، والتي تشكل معظم العناصر في الجدول الدوري. تتميز هذه المواد بخصائص فريدة تجعلها أساسية في حياتنا اليومية، من أسلاك الكهرباء إلى هياكل السيارات.</p>`,
    lessonId: "/materials/semester-1/unit-1/lesson-3/part-4",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-3/part-3",
    nextLesson: "/materials/semester-1/unit-1/lesson-3/part-5",
    previousLessonTitle: "الجزء السابق: المواد الصلبة الشبكية التساهمية",
    nextLessonTitle: "الجزء التالي: المواد الصلبة البلورية الأيونية"
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
                        تمتلك الفلزات عددًا قليلًا من إلكترونات التكافؤ وطاقة تأين منخفضة، مما يسهل فقدانها لهذه الإلكترونات. في الحالة الصلبة، تتجمع ذرات الفلز معًا وتتحرر إلكترونات التكافؤ من ذراتها لتكون "بحرًا" من الإلكترونات حرة الحركة يحيط بالأيونات الموجبة للفلز. هذا النموذج هو أساس فهم خصائص الفلزات.
                    </p>
                </CardContent>
            </Card>
            
            <FlippableCard
                cardTitle="الرابطة الفلزية"
                cardIcon={<Atom className="h-6 w-6" />}
            >
                <div className="flex flex-col items-center justify-center p-2 text-center h-full">
                    <p className="font-semibold mb-2">قوة التجاذب الكبيرة بين الأيونات الموجبة وبحر الإلكترونات حرة الحركة</p>
                    <Image 
                        src="https://i.ibb.co/3W6xSvB/1.jpg" 
                        alt="الرابطة الفلزية" 
                        width={96} 
                        height={69} 
                        className="rounded-lg mt-2 object-contain" 
                        data-ai-hint="metallic bond sea of electrons"
                    />
                </div>
            </FlippableCard>

            <FlippableCard
                cardTitle="خصائص المواد الصلبة الفلزية"
                cardIcon={<Layers className="h-6 w-6" />}
            >
                 <ul className="space-y-3 text-sm">
                    <li>جسيماتها ذرات الفلزات التي تتجاذب بروابط فلزية قوية لذلك تكون صلبة جدا ودرجات انصهارها مرتفعة غالبا (باستثناء عناصر المجموعة الأولى والزئبق)</li>
                    <li>توصل الكهرباء في الحالتين الصلبة والسائلة بسبب الإلكترونات حرة الحركة</li>
                    <li>قابلة للطرق والسحب (تشكيل صفائح، أسلاك وقضبان) لأن صفوف الأيونات الموجبة تنزلق عند الطرق عليها وتبقى مترابطة بفعل تجاذبها مع الإلكترونات حرة الحركة</li>
                    <li>قساوة عالية، درجات انصهار مرتفعة بسبب الغلاف الأخير للفلزات ضعيفة الارتباط بأنويتها</li>
                    <li>لامعة</li>
                 </ul>
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
                  question="لماذا تعتبر الفلزات موصلة جيدة للكهرباء؟"
                  options={[
                      "لأنها صلبة جدًا",
                      "بسبب وجود إلكترونات حرة الحركة",
                      "لأنها لامعة",
                      "بسبب درجات انصهارها المرتفعة"
                  ]}
                  correctAnswerIndex={1}
                  explanation="التوصيل الكهربائي يعتمد على وجود جسيمات مشحونة حرة الحركة. في الفلزات، 'بحر الإلكترونات' هو المسؤول عن نقل الشحنة الكهربائية بسهولة عبر المادة."
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={handleCorrectAnswer}
                  question="ما الذي يفسر قابلية الفلزات للطرق والسحب؟"
                  options={[
                      "ضعف الروابط بين ذراتها",
                      "طبيعة الأيونات الموجبة",
                      "انزلاق صفوف الأيونات الموجبة مع بقاء تجاذبها مع بحر الإلكترونات",
                      "وجود فراغات كبيرة في الشبكة البلورية"
                  ]}
                  correctAnswerIndex={2}
                  explanation="عند طرق الفلز، تنزلق طبقات الأيونات الموجبة فوق بعضها، لكنها لا تتنافر أو تنكسر لأنها تظل مغمورة في بحر الإلكترونات السالب الذي يستمر في ربطها معًا، مما يسمح للفلز بتغيير شكله دون أن ينكسر."
              />
          </div>
        </div>
    </LessonLayout>
  );
}



    