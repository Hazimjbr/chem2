'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Cpu, Layers, Atom, Binary, Droplets, HelpCircle, GitCommitHorizontal, CheckCircle, Boxes, Move, Thermometer, Diamond } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { InlineMath } from 'react-katex';

const lessonInfo = {
    lessonTitle: "الدرس الأول: تصنيف المحاليل",
    lessonSubtitle: "تكون المحاليل",
    mainIdea: "تعتمد عملية الإذابة على مبدأ 'الشبيه يذيب شبيهه'، حيث تتغلب قوى التجاذب بين المذيب والمذاب على القوى بين جسيمات المذاب نفسه، مما يؤدي إلى تكون محلول متجانس",
    learningOutcomes: [
        "أصف عملية الإذابة",
        "أفسر آلية الإذابة في المركبات الأيونية والتساهمية",
        "أربط بين قطبية المواد وقابليتها للذوبان في الماء"
    ],
    lessonId: "/materials/semester-1/unit-2/lesson-1/part-2",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-2/lesson-1/part-1",
    nextLesson: "/materials/semester-1/unit-2/lesson-1/part-3",
    previousLessonTitle: "الجزء السابق: تصنيف المواد",
    nextLessonTitle: "الجزء التالي: المحاليل السائلة"
};

const LessonContent = ({ onCorrect }: { onCorrect: (id: string) => void }) => (
    <div className="space-y-8">
        <FlippableCard cardTitle="الإذابة ومبدأ 'الشبيه يذيب شبيهه'" cardIcon={<Layers className="h-6 w-6" />}>
            <div className="p-4 space-y-4">
                <div>
                    <h4 className="font-bold text-accent">الإذابة</h4>
                    <p className="text-sm mt-1">إحاطة جسيمات المذاب بجسيمات المذيب بحيث تتكون قوى التجاذب بين جسيمات المذيب والمذاب وتكون كافية للتغلب على قوى التجاذب بين جسيمات المذاب نفسه</p>
                </div>
                <div className="border-t pt-3">
                    <h4 className="font-bold text-accent">الشبيه يذيب شبيهه</h4>
                    <p className="text-sm mt-1">أي أن المذيبات:</p>
                    <ul className="list-decimal mr-4 mt-2 text-sm space-y-1">
                        <li><strong>المواد القطبية</strong> تذيب المركبات الأيونية والجزيئات القطبية</li>
                        <li><strong>المواد غير القطبية</strong> تذيب المركبات غير القطبية</li>
                    </ul>
                </div>
            </div>
        </FlippableCard>

        <FlippableCard cardTitle="آلية الإذابة" cardIcon={<Cpu className="h-6 w-6" />}>
            <div className="p-4 space-y-4 text-sm">
                <ol className="list-decimal mr-4 space-y-3">
                    <li>
                        <p>في المركبات الأيونية كملح الطعام NaCl تحيط جزيئات الماء أيونات ⁺Na من طرف ذرة الأكسجين (δ⁻) وأيونات ⁻Cl من طرف ذرة الهيدروجين (δ⁺) لينتج من ذلك قوة تجاذب بين جزيئات الماء القطبية والأيونات أقوى من قوى التجاذب بين الأيونات في البلورة فتتغلب عليها وتتحرر الأيونات من البلورة</p>
                         <div className="flex justify-center my-2">
                            <Image src="https://i.ibb.co/G4t9Fhb6/3.jpg" alt="Dissolving NaCl in water" width={300} height={200} className="rounded-lg border bg-white" data-ai-hint="dissolving salt water" />
                        </div>
                    </li>
                    <li>
                        <p>في المركبات التساهمية (الجزيئية) مثل سكر المائدة السكروز (C₆H₁₂O₆) أو الكحول كالإيثانول (CH₃CH₂OH) فيحتوي كل منها على مجموعة الهيدروكسيل OH التي تكون روابط هيدروجينية مع جزيئات الماء</p>
                    </li>
                    <li>
                        <p>يذوب الزيت في البنزين لأن كليهما غير قطبيين تترابط جزيئاتهما بقوى لندن بينما لا يذوب في الماء</p>
                    </li>
                </ol>
            </div>
        </FlippableCard>
        
        <FlippableCard cardTitle="ملاحظات هامة حول الذائبية" cardIcon={<BookCopy className="h-6 w-6" />}>
            <ul className="p-4 space-y-3 text-sm list-disc mr-4">
                <li>محاليل المركبات الأيونية والمركبات التساهمية القطبية التي ينتج عن ذوبانها أيونات كالحموض مثل HCl والقواعد مثل NH₃ والكحولات مثل CH₃OH توصل التيار الكهربائي ويزداد التوصيل الكهربائي بازدياد تركيز الأيونات</li>
                <li>تقل ذائبية المركبات العضوية (مشتقات الهيدروكربونات مثل الكحول) في الماء بازدياد طول سلسلة الكربون (الكتلة المولية) لأنها تمثل الشق غير القطبي في المركب</li>
                <li>المركبات غير القطبية كالبنزين (C₆H₆) والزيوت والهيدروكربونات (غير قطبي) لا تذوب في الماء (هيدروجيني) لذلك تكوّن مع الماء طبقتين منفصلتين لا تمتزجان</li>
                <li>يعتبر الماء مذيبا عاما لأنه يذيب كثيرا من المركبات الأيونية والتساهمية</li>
            </ul>
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
                  question="لماذا يذوب ملح الطعام (NaCl) في الماء؟"
                  options={[
                      "لأن كليهما غير قطبي",
                      "لأن الماء يكون روابط هيدروجينية مع الملح",
                      "لأن جزيئات الماء القطبية تحيط بالأيونات وتفصلها عن البلورة",
                      "لأن الملح يتفاعل كيميائيًا مع الماء"
                  ]}
                  correctAnswerIndex={2}
                  explanation="يذوب الملح لأن قوى التجاذب بين جزيئات الماء القطبية وأيونات Na⁺ و Cl⁻ تكون أقوى من قوى التجاذب بين الأيونات في البلورة نفسها، مما يؤدي إلى تفككها."
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={onCorrect}
                  question={<><span>أي المركبات التالية تتوقع أن يكون الأقل ذائبية في الماء؟</span></>}
                  options={[
                      "الإيثانول (CH₃CH₂OH)",
                      "البروبانول (CH₃CH₂CH₂OH)",
                      "البنتانول (CH₃(CH₂)₄OH)",
                      "الميثانول (CH₃OH)"
                  ]}
                  correctAnswerIndex={2}
                  explanation="تقل ذائبية الكحولات في الماء بزيادة طول السلسلة الكربونية (الشق غير القطبي). البنتانول يمتلك أطول سلسلة كربونية، لذا فهو الأقل ذائبية."
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
