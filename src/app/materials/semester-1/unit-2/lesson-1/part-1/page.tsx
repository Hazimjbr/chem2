
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Beaker, GitCommitHorizontal, CircleDot, Workflow, Blend, Package, Layers } from 'lucide-react';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { InlineMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';

const lessonInfo = {
    lessonTitle: "الدرس الأول تصنيف المحاليل",
    lessonSubtitle: "الجزء الأول تصنيف المواد",
    mainIdea: "تقسم المواد حسب تركيبها إلى مواد نقية (عناصر ومركبات) ومخاليط (متجانسة وغير متجانسة) ولكل منها خصائصها التي تميزها",
    learningOutcomes: [
        "أصنف المواد إلى نقية ومخاليط",
        "أقارن بين أنواع المخاليط المختلفة"
    ],
    lessonContent: `<p>كل شيء حولنا يتكون من مادة ولكن هل جميع المواد متشابهة في هذا الدرس سنتعلم كيف يصنف الكيميائيون المواد بناءً على تركيبها الأساسي مما يساعدنا على فهم خصائصها وسلوكها بشكل أفضل</p>`,
    lessonId: "/materials/semester-1/unit-2/lesson-1/part-1",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/section-5",
    nextLesson: "/materials/semester-1/unit-2/lesson-1/part-2",
    previousLessonTitle: "مراجعة الوحدة الأولى",
    nextLessonTitle: "الجزء التالي تكون المحاليل"
};

export default function LessonPartPage() {
    const [completedInteractive, setCompletedInteractive] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (typeof window !== 'undefined' && completedInteractive.size >= 2) {
            const savedProgress = JSON.parse(localStorage.getItem('completedLessons') || '[]');
            const completedLessons = new Set(savedProgress);
            completedLessons.add(lessonInfo.lessonId);
            localStorage.setItem('completedLessons', JSON.stringify(Array.from(completedLessons)));
        }
    }, [completedInteractive]);

    const handleCorrectAnswer = (questionId: string) => {
        setCompletedInteractive(prev => new Set(prev).add(questionId));
    };

  return (
    <LessonLayout {...lessonInfo}>
        <div className="space-y-8">
            <FlippableCard
                cardTitle="المواد النقية"
                cardIcon={<CircleDot className="h-6 w-6" />}
            >
                <div className="space-y-3">
                    <p className='font-semibold'>تتكون من نوع واحد من الجسيمات ذات تركيب ثابت ومنتظم وتقسم إلى</p>
                    <div className='p-3 bg-muted/50 rounded-lg'>
                        <h4 className='font-bold text-accent mb-2'>أ) العناصر</h4>
                        <p className='text-sm text-muted-foreground'>أبسط أشكال المادة النقية لا يمكن تحليلها إلى مواد أبسط</p>
                        <p className='text-sm font-mono text-left mt-1' dir="ltr">Cu(s) Ag(s) Au(s) H₂(g) N₂(g) O₂(g) F₂(g) Cl₂(g) Br₂(l) I₂(s) P₄(s) S₈(s)</p>
                    </div>
                     <div className='p-3 bg-muted/50 rounded-lg'>
                        <h4 className='font-bold text-accent mb-2'>ب) المركبات</h4>
                        <p className='text-sm text-muted-foreground'>ناتجة من اتحاد عنصرين أو أكثر مثل الماء H₂O أكسيد الحديد (الصدأ) Fe₂O₃·2H₂O</p>
                    </div>
                </div>
            </FlippableCard>

            <FlippableCard
                cardTitle="المخاليط"
                cardIcon={<Blend className="h-6 w-6" />}
            >
                 <div className="space-y-3">
                    <p className='font-semibold'>مزيج من مادتين نقيتين أو أكثر تبقى كل منهما محتفظة بخصائصها الكيميائية (لا تتفاعل)</p>
                    <p className='text-sm text-muted-foreground'>تختلف المخاليط باختلاف نسب مكوناتها وكيفية توزيع هذه المكونات</p>
                </div>
            </FlippableCard>

            <h3 className="text-2xl font-bold text-center">أنواع المخاليط</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FlippableCard
                    cardTitle="المخلوط المعلق"
                    cardIcon={<Layers className="h-6 w-6" />}
                >
                    <ul className="space-y-2 text-sm">
                        <li>لا تمتزج مكوناته تمامًا</li>
                        <li>قطر جسيماته يزيد عن <InlineMath math="1000nm"/></li>
                        <li>يمكن فصله بالترشيح أو الترسيب</li>
                        <li>بعضها يشتت الضوء (ظاهرة تندال)</li>
                        <li className='border-t pt-2 mt-2'><strong className='text-accent text-xs'>أمثلة</strong> تراب وماء أو عصير برتقال طبيعي أو زيت وماء</li>
                    </ul>
                </FlippableCard>

                <FlippableCard
                    cardTitle="المخلوط الغروي"
                    cardIcon={<Beaker className="h-6 w-6" />}
                >
                    <ul className="space-y-2 text-sm">
                        <li>حالة وسط بين المتجانس والمعلق</li>
                        <li>قطر جسيماته يتراوح بين <InlineMath math="1-1000nm"/></li>
                        <li>لا يمكن فصله بالترشيح أو الترسيب</li>
                        <li>يشتت الضوء (ظاهرة تندال) وتتحرك جسيماته حركة براونية</li>
                        <li className='border-t pt-2 mt-2'><strong className='text-accent text-xs'>أمثلة</strong> الحليب والضباب والدهان والدخان</li>
                    </ul>
                </FlippableCard>

                <FlippableCard
                    cardTitle="المخلوط المتجانس (المحلول)"
                    cardIcon={<Package className="h-6 w-6" />}
                >
                   <ul className="space-y-2 text-sm">
                        <li>تمتزج مكوناته مع بعضها امتزاجا تاما بشكل منتظم ولا يمكن تمييزها عن بعضها</li>
                        <li>يتراوح قطر الجزيئات بين <InlineMath math="0.1-1 nm"/> فلا ترى بالعين أو المجهر</li>
                        <li>لا يمكن فصله بالترشيح أو الترسيب ولا يشتت الضوء</li>
                        <li>يصنف حسب حالة الإشباع أو القدرة على توصيل الكهرباء</li>
                        <li className='border-t pt-2 mt-2'><strong className='text-accent text-xs'>أمثلة</strong> ماء وسكر أو الهواء الجوي</li>
                    </ul>
                </FlippableCard>
            </div>
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
                  question="أي من الخيارات التالية يمثل مادة نقية"
                  options={[
                      "عصير البرتقال",
                      "الهواء",
                      "الذهب (Au)",
                      "الحليب"
                  ]}
                  correctAnswerIndex={2}
                  explanation="الذهب (Au) هو عنصر والعناصر تعتبر مواد نقية الخيارات الأخرى هي مخاليط"
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={handleCorrectAnswer}
                  question="ما هي الخاصية التي تسمح بالتمييز بين محلول حقيقي ومخلوط غروي شفاف"
                  options={[
                      "اللون",
                      "الكثافة",
                      "القدرة على الترشيح",
                      "ظاهرة تندال (تشتيت الضوء)"
                  ]}
                  correctAnswerIndex={3}
                  explanation="المخلوط الغروي يشتت الضوء المار من خلاله (ظاهرة تندال) بينما المحلول الحقيقي لا يشتت الضوء"
              />
          </div>
        </div>
    </LessonLayout>
  );
}
