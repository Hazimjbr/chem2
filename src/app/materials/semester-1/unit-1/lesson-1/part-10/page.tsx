
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Cpu, Lightbulb, Wind, Waves } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';

const lessonInfo = {
    lessonTitle: "الدرس الأول: الحالة الغازية",
    lessonSubtitle: "قانون جراهام للانتشار والتدفق",
    mainIdea: "عند نفس الظروف من الحرارة والضغط يتناسب معدل سرعة انتشار أو تدفق الغاز تناسبًا عكسيًا مع الجذر التربيعي لكتلته المولية ببساطة: الغازات الأخف هي الأسرع",
    learningOutcomes: [
        "أقارن بين معدل سرعة تدفق غازين مختلفين",
        "أحل مسائل حسابية على قانون جراهام"
    ],
    lessonContent: `<p>آخر قانون في رحلتنا مع الغازات هو قانون جراهام الذي يصف ظاهرة مهمة جدًا وهي سرعة حركة الغازات هل تساءلت يومًا لماذا نشم رائحة عطر في أحد أركان الغرفة بعد فترة قصيرة من رشه في الركن الآخر؟ قانون جراهام يجيب على هذا السؤال</p>`,
    lessonId: "/materials/semester-1/unit-1/lesson-1/part-10",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-1/part-9",
    nextLesson: "/materials/semester-1/unit-1/lesson-2/part-1",
    previousLessonTitle: "الجزء السابق: قانون دالتون",
    nextLessonTitle: "الدرس التالي: الحالة السائلة"
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
                        لاحظ العالم توماس جراهام أن الغازات الخفيفة مثل الهيدروجين والأمونيا تنتشر أسرع بكثير من الغازات الثقيلة مثل ثاني أكسيد الكربون قاده ذلك إلى إجراء تجارب دقيقة لقياس سرعة تدفق الغازات المختلفة عبر ثقوب صغيرة واستنتج من ذلك العلاقة الرياضية التي تربط بين سرعة التدفق والكتلة المولية
                    </p>
                </CardContent>
            </Card>

             <div className="grid md:grid-cols-2 gap-6">
                <FlippableCard
                    cardTitle="الانتشار (Diffusion)"
                    cardIcon={<Waves className="h-6 w-6" />}
                >
                    <div className="space-y-3 text-sm">
                        <p className="font-semibold">هو الاختلاط التدريجي لجسيمات غاز مع جسيمات غاز آخر</p>
                        <ul className="list-disc mr-4 space-y-2">
                            <li>تنتقل الجسيمات من منطقة التركيز المرتفع إلى منطقة التركيز المنخفض</li>
                            <li>تستمر الحركة حتى يتوزع الغاز بشكل متساوٍ في الوعاء</li>
                            <li>مثال: انتشار رائحة الطعام في المنزل</li>
                        </ul>
                    </div>
                </FlippableCard>

                <FlippableCard
                    cardTitle="التدفق (Effusion)"
                    cardIcon={<Wind className="h-6 w-6" />}
                >
                    <div className="space-y-3 text-sm">
                        <p className="font-semibold">هو عملية تسرب غاز مضغوط من خلال فتحة صغيرة جدًا</p>
                         <ul className="list-disc mr-4 space-y-2">
                            <li>يحدث عندما يكون ضغط الغاز داخل الوعاء أعلى من الضغط خارجه</li>
                            <li>مثال: تسرب الهواء من ثقب صغير في إطار سيارة</li>
                        </ul>
                    </div>
                </FlippableCard>
            </div>
            
            <FlippableCard
                cardTitle="نص قانون جراهام"
                cardIcon={<BookCopy className="h-6 w-6" />}
            >
                 <div className="space-y-3">
                    <blockquote className="border-r-4 border-primary pr-4">
                        "يتناسب معدل سرعة انتشار (أو تدفق) الغاز عكسيًا مع الجذر التربيعي لكتلته المولية عند ثبات درجة الحرارة والضغط"
                    </blockquote>
                     <div dir="ltr" className="text-center pt-2 border-t mt-2"><BlockMath math="r \propto \frac{1}{\sqrt{Mr}}" /></div>
                </div>
            </FlippableCard>
        </div>
        
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
                  onCorrect={handleCorrectAnswer}
                  question={<><span>أي الغازين أسرع انتشارًا: الأمونيا (<span dir="ltr" className="inline-block"><InlineMath math="NH_3"/></span>) أم كلوريد الهيدروجين (<span dir="ltr" className="inline-block"><InlineMath math="HCl"/></span>)؟ (الكتل المولية: N=14, H=1, Cl=35.5)</span></>}
                  options={[
                      "الأمونيا أسرع",
                      "كلوريد الهيدروجين أسرع",
                      "لهما نفس السرعة",
                      "لا يمكن التحديد"
                  ]}
                  correctAnswerIndex={0}
                  explanation="الكتلة المولية لـ NH₃ ≈ 17g/mol بينما لـ HCl ≈ 36.5g/mol بما أن الأمونيا أخف (كتلتها المولية أقل) فهي الأسرع انتشارًا وفقًا لقانون جراهام"
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={handleCorrectAnswer}
                  question={<><span>إذا كان معدل انتشار غاز مجهول هو نصف معدل انتشار غاز الميثان (<span dir="ltr" className="inline-block"><InlineMath math="CH_4"/></span> كتلته المولية 16g/mol) فما هي الكتلة المولية للغاز المجهول?</span></>}
                  options={[
                      "8g/mol",
                      "32g/mol",
                      "64g/mol",
                      "4g/mol"
                  ]}
                  correctAnswerIndex={2}
                  explanation="(r_X / r_CH4)² = Mr_CH4 / Mr_X. لدينا r_X = 0.5 * r_CH4. إذن (0.5)² = 16 / Mr_X. ومنها 0.25 = 16 / Mr_X. وبالتالي Mr_X = 16 / 0.25 = 64g/mol."
              />
          </div>
        </div>
    </LessonLayout>
  );
}
