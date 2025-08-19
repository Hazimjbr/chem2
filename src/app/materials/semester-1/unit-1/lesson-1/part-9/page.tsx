
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Cpu, Lightbulb, Layers } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';

const lessonInfo = {
    lessonTitle: "الدرس الأول: الحالة الغازية",
    lessonSubtitle: "قانون دالتون للضغوط الجزئية",
    mainIdea: "الضغط الكلي لخليط من الغازات غير المتفاعلة يساوي مجموع الضغوط الجزئية لكل غاز على حدة.",
    learningOutcomes: [
        "أصف قانون دالتون للضغوط الجزئية.",
        "أحل مسائل حسابية باستخدام قانون دالتون."
    ],
    lessonContent: `<p>حتى الآن، تعاملنا مع غاز واحد في كل مرة. لكن الهواء الذي نتنفسه هو خليط من غازات متعددة. قانون دالتون للضغوط الجزئية يشرح كيف يتصرف خليط من الغازات وكيف يساهم كل غاز في الضغط الكلي.</p>`,
    lessonId: "/materials/semester-1/unit-1/lesson-1/part-9",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-1/part-8",
    nextLesson: "/materials/semester-1/unit-1/lesson-1/part-10",
    previousLessonTitle: "الجزء السابق: قانون الغاز المثالي",
    nextLessonTitle: "الجزء التالي: قانون جراهام"
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
                        لاحظ العالم جون دالتون أن الغازات تختلط ببعضها البعض بسبب الحركة العشوائية لجسيماتها. واستنتج أن كل غاز في الخليط يمارس ضغطًا كما لو كان موجودًا بمفرده، وأن الضغط الكلي هو ببساطة مجموع هذه الضغوط الفردية.
                    </p>
                </CardContent>
            </Card>

             <FlippableCard
                cardTitle="نص قانون دالتون"
                cardIcon={<Layers className="h-6 w-6" />}
            >
                 <div className="space-y-3">
                    <blockquote className="border-r-4 border-primary pr-4">
                        "الضغط الكلي لخليط من الغازات (غير المتفاعلة مع بعضها) يساوي مجموع الضغوط الجزئية لها"
                    </blockquote>
                    <p className="text-xs text-muted-foreground pt-2 border-t">الضغط الجزئي هو الضغط الذي سيمارسه غاز معين لو كان موجودًا بمفرده في نفس الوعاء وعند نفس درجة الحرارة.</p>
                </div>
            </FlippableCard>

             <FlippableCard
                cardTitle="العلاقة الرياضية"
                cardIcon={<Cpu className="h-6 w-6" />}
            >
               <div className="space-y-4 text-center">
                  <p>الصيغة الأساسية لحساب الضغط الكلي (<span dir="ltr" className="inline-block"><InlineMath math="P_{Total}"/></span>):</p>
                  <div dir="ltr"><BlockMath math="P_{Total} = P_A + P_B + P_C + \dots" /></div>
                  <p>لحساب الضغط الجزئي لغاز معين (<span dir="ltr" className="inline-block"><InlineMath math="P_A"/></span>) نستخدم الكسر المولي (<span dir="ltr" className="inline-block"><InlineMath math="X_A"/></span>):</p>
                   <div dir="ltr"><BlockMath math="P_A = X_A \cdot P_{Total}" /></div>
                   <p className="text-sm">حيث أن الكسر المولي للغاز A هو نسبة عدد مولاته إلى العدد الكلي للمولات:</p>
                   <div dir="ltr"><BlockMath math="X_A = \frac{n_A}{n_{Total}}" /></div>
              </div>
            </FlippableCard>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-7 w-7 text-yellow-400" />
            <div>
              <h3 className="text-xl font-bold">تحقق من فهمك</h3>
              <p className="text-muted-foreground">أجب عن الأسئلة السريعة التالية لترسيخ المفاهيم.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
              <InteractiveQuestionCard 
                  questionId="q1"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={handleCorrectAnswer}
                  question={<><span>يحتوي وعاء حجمه </span><span dir="ltr" className='inline-block mx-1'><InlineMath math="2L"/></span><span> ثلاث غازات A, B, C عدد مولاتها على التوالي 2, 3, 1 mol عند حرارة </span><span dir="ltr" className='inline-block mx-1'><InlineMath math="27^\circ C"/></span><span> فإن قيمة الضغط في الوعاء تساوي:</span></>}
                  options={[
                      "295.2atm",
                      "73.8atm",
                      "0.49atm",
                      "6.6atm"
                  ]}
                  correctAnswerIndex={1}
                  explanation="أولاً، نجمع المولات: n_total = 2+3+1 = 6mol. ثم نستخدم قانون الغاز المثالي: P = nRT/V. الحرارة T = 27+273 = 300K. إذن P = (6 * 0.082 * 300) / 2 = 73.8atm."
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={handleCorrectAnswer}
                  question={<><span>يحتوي وعاء حجمه </span><span dir="ltr" className='inline-block mx-1'><InlineMath math="1L"/></span><span> غازين A, B في الظروف المعيارية حيث يشكل الغاز B 70% فإن قيمة ضغط الغاز A تساوي:</span></>}
                  options={[
                      "0.7atm",
                      "0.3atm",
                      "1atm",
                      "6.7atm"
                  ]}
                  correctAnswerIndex={1}
                  explanation="في الظروف المعيارية، الضغط الكلي P_total = 1atm. إذا كان الغاز B يشكل 70%، فإن الغاز A يشكل 30%. الكسر المولي للغاز A هو X_A = 0.3. الضغط الجزئي لـ A هو P_A = X_A * P_total = 0.3 * 1atm = 0.3atm."
              />
          </div>
        </div>
    </LessonLayout>
  );
}
