
'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Cpu, Pipette, LineChart } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';
import Diagram from './diagram';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';

const lessonInfo = {
    lessonTitle: "الدرس الأول: الحالة الغازية",
    lessonSubtitle: "قانون أفوجادرو",
    mainIdea: "عند ثبات الضغط والحرارة، يتناسب حجم الغاز تناسبًا طرديًا مع عدد مولاته. أي أن الحجوم المتساوية من الغازات المختلفة عند نفس الظروف تحتوي على نفس العدد من الجسيمات.",
    learningOutcomes: [
        "أصف العلاقة بين حجم الغاز وعدد مولاته.",
        "أستخدم مبدأ أفوجادرو في الحسابات الكيميائية المتعلقة بالغازات."
    ],
    lessonContent: `<p>يُعَدُّ هذا القانون من أهم قوانين الغازات، حيث يربط بين كمية الغاز (التي يصعب قياسها مباشرة) وحجمه (الذي يسهل قياسه). اكتشف هذا المبدأ العالم الإيطالي أميديو أفوجادرو.</p>`,
    lessonId: "/materials/semester-1/unit-1/lesson-1/part-7",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-1/part-6",
    nextLesson: "/materials/semester-1/unit-1/lesson-1/part-8",
    previousLessonTitle: "الجزء السابق: القانون الجامع",
    nextLessonTitle: "الجزء التالي: قانون الغاز المثالي"
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
                        القوانين السابقة (بويل، شارل، جاي-لوساك) تعاملت مع كمية ثابتة من الغاز. لكن ماذا يحدث إذا تغيرت كمية الغاز نفسها، كما في حالة نفخ بالون أو تسرب الهواء من إطار السيارة؟ هنا يأتي دور قانون أفوجادرو الذي يربط بين حجم الغاز وكميته.
                    </p>
                </CardContent>
            </Card>

             <div className="grid md:grid-cols-2 gap-6">
                <FlippableCard
                    cardTitle="نص قانون أفوجادرو"
                    cardIcon={<BookCopy className="h-6 w-6" />}
                >
                    <div className="space-y-3 text-sm">
                        <p>يمكن التعبير عن قانون أفوجادرو بعدة طرق مترابطة:</p>
                        <ul className="list-disc mr-4 space-y-2">
                        <li>"تحتوي الحجوم المتساوية من الغازات المختلفة على نفس العدد من الجزيئات عند نفس الظروف من الضغط ودرجة الحرارة."</li>
                        <li>"يتناسب حجم الغاز تناسبًا طرديًا مع عدد مولاته عند ثبات الضغط والحرارة."</li>
                        <li>"يتناسب ضغط الغاز تناسبًا طرديًا مع عدد مولاته عند ثبات الحجم والحرارة."</li>
                        </ul>
                    </div>
                </FlippableCard>

                <FlippableCard
                    cardTitle="العلاقة الرياضية"
                    cardIcon={<Cpu className="h-6 w-6" />}
                >
                <div className="space-y-4">
                    <p>يمكن التعبير عن العلاقة الطردية بين الحجم (V) وعدد المولات (n) رياضيًا كالتالي:</p>
                    <div className="text-left" dir="ltr"><BlockMath math="V \propto n" /></div>
                    <p>لتحويل التناسب إلى مساواة، نستخدم ثابتًا (k) لتصبح المعادلة:</p>
                    <div className="text-left" dir="ltr"><BlockMath math="\frac{V}{n} = k" /></div>
                    <p>ويمكن استخدام هذه العلاقة لمقارنة حالتين مختلفتين للغاز:</p>
                    <div className="text-left" dir="ltr"><BlockMath math="\frac{V_1}{n_1} = \frac{V_2}{n_2}" /></div>
                    <p className="text-sm text-muted-foreground">
                        <span>حيث </span>
                        <span dir="ltr" className="inline-block"><InlineMath math="V_1, n_1" /></span>
                        <span> هما الحجم وعدد المولات الابتدائيان، و </span>
                        <span dir="ltr" className="inline-block"><InlineMath math="V_2, n_2" /></span>
                        <span> هما الحجم وعدد المولات النهائيان.</span>
                    </p>
                </div>
                </FlippableCard>
            </div>
            
             <Card>
                <CardHeader>
                    <CardTitle>مثال محلول</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">
                        <span>عينة من غاز النيتروجين (</span>
                        <span dir="ltr" className="inline-block"><InlineMath math="N_2" /></span>
                        <span>) حجمها </span>
                        <span dir="ltr" className="inline-block"><InlineMath math="5.0L" /></span>
                        <span> تحتوي على </span>
                        <span dir="ltr" className="inline-block"><InlineMath math="0.5\text{mol}" /></span>
                        <span>. ما حجم العينة إذا أضيف إليها </span>
                        <span dir="ltr" className="inline-block"><InlineMath math="0.25\text{mol}" /></span>
                        <span> من الغاز عند نفس الظروف من الحرارة والضغط؟</span>
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                        <div>
                            <p><strong className="text-accent">المعطيات:</strong></p>
                            <div className='grid grid-cols-2 gap-x-4 text-sm text-left' dir="ltr">
                                <p><InlineMath math="V_1 = 5.0L" /></p>
                                <p><InlineMath math="V_2 = ?" /></p>
                                <p><InlineMath math="n_1 = 0.5\text{mol}" /></p>
                                <p><InlineMath math="n_2 = ?" /></p>
                            </div>
                        </div>
                        <div>
                            <p><strong className="text-accent">الحل:</strong></p>
                            <ol className="list-decimal mr-6 text-sm space-y-2">
                                <li>
                                    <span>نحسب عدد المولات النهائي (</span><span dir="ltr"><InlineMath math="n_2" /></span><span>):</span>
                                    <div className="text-left" dir="ltr"><BlockMath math="n_2 = n_1 + n_{\text{added}} = 0.5\text{mol} + 0.25\text{mol} = 0.75\text{mol}" /></div>
                                </li>
                                <li>
                                    <span>نكتب قانون أفوجادرو.</span>
                                    <div className="text-left" dir="ltr"><BlockMath math="\frac{V_1}{n_1} = \frac{V_2}{n_2}" /></div>
                                </li>
                                <li>
                                    <span>نعيد ترتيب المعادلة لحل </span><span dir="ltr"><InlineMath math="V_2" /></span>.
                                    <div className="text-left" dir="ltr"><BlockMath math="V_2 = \frac{V_1 n_2}{n_1}" /></div>
                                </li>
                                <li>
                                    <span>نعوض القيم.</span>
                                    <div className="text-left" dir="ltr"><BlockMath math="V_2 = \frac{(5.0\text{L}) \cdot (0.75\text{mol})}{0.5\text{mol}}" /></div>
                                </li>
                                <li>
                                    <span>نحسب الناتج.</span>
                                    <div className="text-left" dir="ltr"><BlockMath math="V_2 = 7.5\text{L}" /></div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 items-start">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2 text-base font-semibold"><Pipette className="h-5 w-5 text-primary" /> الحجم المولي للغازات</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <p className="text-sm">
                            <span>من أهم تطبيقات قانون أفوجادرو هو مفهوم </span>
                            <strong className="font-bold">الحجم المولي</strong>
                            <span>، وهو الحجم الذي يشغله </span>
                            <span dir="ltr" style={{display: "inline-block"}}><InlineMath math="1\text{ mol}" /></span>
                            <span> من أي غاز في الظروف المعيارية (</span>
                            <span dir="ltr" style={{display: "inline-block"}}>STP: 0°C</span>
                            <span> و </span>
                            <span dir="ltr" style={{display: "inline-block"}}>1 atm</span>
                            <span>).</span>
                        </p>
                        <div className="text-center bg-primary/10 p-4 rounded-lg">
                            <p className="font-bold text-lg">
                                <span>حجم </span>
                                <span dir="ltr" style={{display: "inline-block"}}><InlineMath math="1\text{ mol}" /></span>
                                <span> من أي غاز عند </span>
                                <span dir="ltr" style={{display: "inline-block"}}>STP</span>
                            </p>
                            <p className="text-4xl font-mono font-bold text-primary my-2" dir="ltr">22.4 L</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2 text-base font-semibold">
                            <LineChart className="h-5 w-5 text-primary" /> العلاقة البيانية (V مقابل n)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Diagram />
                    </CardContent>
                </Card>
            </div>
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
                  question={<>
                    <span>عينة من الغاز A حجمها</span>
                    <span dir="ltr" className="inline-block mx-1"><InlineMath math="3.2\text{L}"/></span>
                    <span> تحتوي على </span>
                    <span dir="ltr" className="inline-block mx-1"><InlineMath math="0.2\text{mol}"/></span>
                    <span>. أضيف لها كمية من الغاز B ليصبح حجمها </span>
                    <span dir="ltr" className="inline-block mx-1"><InlineMath math="4\text{L}"/></span>
                    <span>. بفرض ثبات الضغط والحرارة، فإن عدد مولات العينة بعد الإضافة أصبح:</span>
                  </>}
                  options={[
                      "0.25",
                      "0.5",
                      "0.05",
                      "0.16"
                  ]}
                  correctAnswerIndex={0}
                  explanation="باستخدام قانون أفوجادرو (V₁/n₁ = V₂/n₂)، فإن عدد المولات النهائي n₂ = (V₂ * n₁) / V₁ = (4 L * 0.2 mol) / 3.2 L = 0.25 mol."
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={handleCorrectAnswer}
                  question={<>
                    <span>عينة من الغاز A حجمها</span>
                    <span dir="ltr" className="inline-block mx-1"><InlineMath math="3.2\text{L}"/></span>
                    <span> تحتوي على </span>
                    <span dir="ltr" className="inline-block mx-1"><InlineMath math="0.2\text{mol}"/></span>
                    <span>. أضيف لها كمية من الغاز B ليصبح حجمها </span>
                    <span dir="ltr" className="inline-block mx-1"><InlineMath math="4\text{L}"/></span>
                    <span>. بفرض ثبات الضغط والحرارة، فإن عدد مولات الغاز B المضافة يساوي:</span>
                  </>}
                  options={[
                      "0.25",
                      "0.5",
                      "0.05",
                      "0.16"
                  ]}
                  correctAnswerIndex={2}
                  explanation="أولاً نجد عدد المولات الكلي بعد الإضافة (n₂) = 0.25 mol (من السؤال السابق). عدد مولات B المضافة = n₂ - n₁ = 0.25 - 0.2 = 0.05 mol."
              />
          </div>
        </div>
    </LessonLayout>
  );
}
