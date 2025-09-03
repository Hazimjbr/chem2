
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Cpu, Layers, Atom, Binary, Waves } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';

const lessonInfo = {
    lessonTitle: "الدرس الثاني: الحالة السائلة",
    lessonSubtitle: "مقدمة عن المواد السائلة",
    mainIdea: "تتميز السوائل بخصائص فريدة مثل حجمها الثابت وشكلها المتغير، وتعتمد هذه الخصائص بشكل أساسي على طبيعة قوى الترابط بين جزيئاتها وأنواعها.",
    learningOutcomes: [
        "أصف الخصائص الفيزيائية للمواد السائلة.",
        "أقارن بين أنواع قوى الترابط بين الجزيئات."
    ],
    lessonContent: `<p>بعد أن درسنا الحالة الغازية، ننتقل الآن إلى الحالة السائلة. السوائل، مثل الماء والزيت، هي جزء أساسي من حياتنا اليومية. في هذا الدرس، سنتعرف على الخصائص التي تميز السوائل وعلى القوى التي تربط جزيئاتها ببعضها البعض، والتي تمنحها سلوكها الفريد.</p>`,
    lessonId: "/materials/semester-1/unit-1/lesson-2/part-1",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-1/part-10",
    nextLesson: "/materials/semester-1/unit-1/lesson-2/part-2",
    previousLessonTitle: "الجزء السابق: قانون جراهام",
    nextLessonTitle: "الجزء التالي: التبخر"
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
                    <CardTitle className="flex items-center gap-2"><Layers className="h-6 w-6 text-primary" /> أنواع الترابط بين الجزيئات</CardTitle>
                    <CardDescription>القوى التي تربط الجزيئات ببعضها وتحدد خصائص المادة.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-bold text-accent flex items-center gap-2 mb-2"><Atom className="h-5 w-5" /> 1. ترابط قوى لندن (London Dispersion Forces)</h4>
                        <p className="text-sm">ينشأ بفعل الاستقطاب اللحظي لذرات العناصر الخاملة أو الجزيئات غير القطبية مثل الهيدروكربونات (ألكان، ألكين، ألكاين). تزداد قوتها بازدياد الكتلة المولية وقلة تفرعات السلاسل.</p>
                    </div>
                     <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-bold text-accent flex items-center gap-2 mb-2"><Binary className="h-5 w-5" /> 2. ترابط ثنائي القطب (Dipole-Dipole)</h4>
                        <p className="text-sm">ينشأ بين الجزيئات القطبية حيث تتجاذب ذرة تحمل شحنة جزئية سالبة (<span dir="ltr"><InlineMath math="\delta-" /></span>) في جزيء مع ذرة تحمل شحنة جزئية موجبة (<span dir="ltr"><InlineMath math="\delta+" /></span>) في جزيء مجاور. مثال: هاليد الألكيل، الإيثر، الألدهيد، الكيتون، والإستر.</p>
                    </div>
                     <div className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-bold text-accent flex items-center gap-2 mb-2"><Waves className="h-5 w-5" /> 3. ترابط هيدروجيني (Hydrogen Bonding)</h4>
                        <p className="text-sm">هو نوع خاص وقوي من ترابط ثنائي القطب، ينشأ بين الجزيئات القطبية التي يحتوي أحدها على ذرة هيدروجين مرتبطة تساهمياً مع ذرة ذات كهروسلبية عالية (N, O, F)، وجزيء آخر يحتوي على أحد الذرات (N, O, F). مثال: الماء، الكحول، الحمض الكربوكسيلي، والأمين.</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>خصائص المواد السائلة</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3"><span className="font-bold text-primary">1.</span><div><strong>حجمها ثابت:</strong> غير قابلة للانضغاط لأن جزيئاتها متقاربة.</div></li>
                            <li className="flex items-start gap-3"><span className="font-bold text-primary">2.</span><div><strong>شكلها متغير:</strong> تأخذ شكل حيز الوعاء الذي توضع فيه وتملأ قاعه.</div></li>
                            <li className="flex items-start gap-3"><span className="font-bold text-primary">3.</span><div><strong>جسيماتها متحركة:</strong> في حركة مستمرة وعشوائية لكن طاقتها الحركية أقل من الغازات.</div></li>
                            <li className="flex items-start gap-3"><span className="font-bold text-primary">4.</span><div><strong>قوى ترابط متوسطة:</strong> أضعف من المواد الصلبة ولكنها أقوى من الغازية.</div></li>
                             <li className="flex items-start gap-3"><span className="font-bold text-primary">5.</span><div><strong>كثافتها أكبر:</strong> بشكل عام، كثافة السوائل أكبر من كثافة الغازات.</div></li>
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>ما هو المائع؟</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p>المائع هو أي مادة لها القدرة على الجريان وتأخذ شكل الإناء الذي توضع فيه. بناءً على هذا التعريف، تعتبر كل من السوائل والغازات موائع.</p>
                    </CardContent>
                </Card>
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
                  question="أي نوع من قوى الترابط هو الأقوى بين جزيئات الماء (H₂O)؟"
                  options={[
                      "قوى لندن",
                      "ترابط ثنائي القطب",
                      "ترابط هيدروجيني",
                      "ترابط أيوني"
                  ]}
                  correctAnswerIndex={2}
                  explanation="جزيء الماء يحتوي على ذرة أكسجين (ذات كهروسلبية عالية) مرتبطة بذرتي هيدروجين، مما يسمح بتكون روابط هيدروجينية قوية بين جزيئاته."
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={handleCorrectAnswer}
                  question="لماذا تأخذ السوائل شكل الوعاء الذي توضع فيه بينما يبقى حجمها ثابتًا؟"
                  options={[
                      "لأن جزيئاتها لا تتحرك أبدًا.",
                      "لأن قوى الترابط بينها قوية جدًا كالمواد الصلبة.",
                      "لأن جزيئاتها متباعدة جدًا كالغازات.",
                      "لأن جزيئاتها قادرة على الحركة والانزلاق فوق بعضها ولكنها تبقى متقاربة."
                  ]}
                  correctAnswerIndex={3}
                  explanation="جزيئات السائل تمتلك طاقة حركية كافية للتغلب جزئيًا على قوى التجاذب والانزلاق فوق بعضها البعض (مما يمنحها شكلاً متغيرًا)، لكن هذه القوى لا تزال قوية بما يكفي لإبقائها متقاربة (مما يحافظ على حجم ثابت)."
              />
          </div>
        </div>
    </LessonLayout>
  );
}
