
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Cpu, ArrowDownCircle, BarChart3 } from 'lucide-react';
import LessonLayout from '@/components/lesson-layout';
import React, { useState } from 'react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '../../../../../../components/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import Image from 'next/image';

const lessonInfo = {
    lessonTitle: "الدرس الثاني: خصائص المحاليل",
    lessonSubtitle: "الانخفاض في الضغط البخاري",
    mainIdea: "إذابة مادة غير متطايرة في مذيب نقي تقلل من عدد جسيمات المذيب على السطح القادرة على التبخر، مما يؤدي إلى انخفاض الضغط البخاري للمحلول.",
    learningOutcomes: [
        "أفسر سبب انخفاض الضغط البخاري للمذيب عند إذابة مادة غير متطايرة فيه.",
        "أوضح أن الانخفاض في الضغط البخاري خاصية جامعة تعتمد على تركيز المذاب.",
    ],
    lessonId: "/materials/semester-1/unit-2/lesson-2/part-2",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-2/lesson-2/part-1",
    nextLesson: "/materials/semester-1/unit-2/lesson-2/part-3",
    previousLessonTitle: "الجزء السابق: الخصائص الجامعة",
    nextLessonTitle: "الجزء التالي: الارتفاع في درجة الغليان",
    lessonContent: "الانخفاض في الضغط البخاري: ينخفض الضغط البخاري لمذيب نقي بإذابة مادة صلبة غير متطايرة فيه. الأسباب: 1) جزيئات المذاب تحتل جزءًا من السطح. 2) تنشأ قوى تجاذب جديدة بين المذاب والمذيب. الانخفاض يتناسب طرديًا مع كمية جسيمات المذاب."
};

const LessonContent = ({ onCorrect }: { onCorrect: (id: string) => void }) => (
    <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookCopy className="h-6 w-6 text-primary" /> مقدمة</CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                    عندما تذيب ملحًا أو سكرًا في كوب من الماء، فإنك لا تغير الطعم فحسب، بل تغير أيضًا خاصية فيزيائية مهمة جدًا وهي الضغط البخاري. هذه الخاصية هي أولى الخصائص الجامعة التي سندرسها، وهي المفتاح لفهم الخصائص الأخرى مثل درجة الغليان والتجمد.
                </p>
            </CardContent>
        </Card>

        <FlippableCard
            cardTitle="الانخفاض في الضغط البخاري"
            cardIcon={<ArrowDownCircle className="h-6 w-6" />}
        >
            <div className="p-4 space-y-3">
                <p className="font-semibold text-sm">
                    ينخفض الضغط البخاري لمذيب نقي (مثل الماء) عند إذابة مادة صلبة غير متطايرة (مثل الملح) فيه.
                </p>
                <p className="text-muted-foreground text-xs">
                    ببساطة، يصبح تبخر المذيب أكثر صعوبة، فيقل عدد جزيئات البخار فوق السائل، وبالتالي يقل ضغطه.
                </p>
            </div>
        </FlippableCard>

        <FlippableCard
            cardTitle="لماذا ينخفض الضغط البخاري؟"
            cardIcon={<Cpu className="h-6 w-6" />}
             imageContent={
                <Image 
                    src="https://i.ibb.co/30Z3rXf/vapor-pressure-lowering.jpg"
                    alt="انخفاض الضغط البخاري"
                    width={300}
                    height={200}
                    className="rounded-lg object-contain"
                    data-ai-hint="vapor pressure lowering solvent solute"
                />
            }
        >
            <div className="p-4 space-y-3 text-sm">
                <p className="font-bold">هناك سببان رئيسيان لذلك:</p>
                <ol className="list-decimal mr-4 space-y-2">
                    <li>
                        <strong>إعاقة السطح:</strong> تحتل جسيمات المذاب جزءًا من مساحة سطح المذيب، مما يقلل من عدد جسيمات المذيب التي يمكنها الهروب والتبخر.
                    </li>
                    <li>
                        <strong>قوى تجاذب جديدة:</strong> تنشأ قوى تجاذب بين جسيمات المذاب والمذيب. هذه القوى الجديدة "تمسك" بجسيمات المذيب وتجعل إفلاتها من السطح أصعب، فتحتاج طاقة أكبر للتغلب عليها.
                    </li>
                </ol>
            </div>
        </FlippableCard>

         <FlippableCard
            cardTitle="خاصية جامعة"
            cardIcon={<BarChart3 className="h-6 w-6" />}
        >
            <div className="p-4 space-y-3 text-sm">
                <p>
                    مقدار الانخفاض في الضغط البخاري يتناسب طرديًا مع كمية (تركيز) جسيمات المذاب، وليس مع نوعها.
                </p>
                <ul className="list-disc mr-4 mt-2 space-y-2 text-muted-foreground">
                    <li>
                       يقاس الانخفاض بحساب الفرق بين الضغط البخاري للمذيب النقي والضغط البخاري للمحلول.
                    </li>
                    <li>
                       لذلك، فإن محلول ملح الطعام (NaCl) بتركيز <span dir="ltr">1m</span> يسبب انخفاضًا في الضغط البخاري أكبر من محلول السكر بنفس التركيز، لأن NaCl يتأين إلى جسيمين (<span dir="ltr">Na⁺, Cl⁻</span>) بينما السكر يبقى جزيئًا واحدًا.
                    </li>
                </ul>
            </div>
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
                  question="عند إضافة السكر إلى الماء، لماذا ينخفض الضغط البخاري للماء؟"
                  options={[
                      "لأن السكر يتفاعل مع الماء.",
                      "لأن السكر يقلل من درجة حرارة الماء.",
                      "لأن جزيئات السكر تعيق تبخر جزيئات الماء من السطح.",
                      "لأن كثافة المحلول تزداد."
                  ]}
                  correctAnswerIndex={2}
                  explanation="وجود جزيئات السكر على السطح يقلل من المساحة المتاحة لجزيئات الماء للتبخر، بالإضافة إلى تكوين روابط هيدروجينية جديدة، مما يقلل من الضغط البخاري."
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={onCorrect}
                  question={<><span>أي محلول من المحاليل المائية التالية بتركيز <InlineMath math="1m"/> له أقل ضغط بخاري؟</span></>}
                  options={[
                      "C₆H₁₂O₆ (سكر الجلوكوز)",
                      "NaCl (كلوريد الصوديوم)",
                      "MgCl₂ (كلوريد المغنيسيوم)",
                      "جميعها لها نفس الضغط البخاري"
                  ]}
                  correctAnswerIndex={2}
                  explanation="أقل ضغط بخاري يعني أكبر انخفاض، وهذا يحدث بوجود أكبر عدد من الجسيمات. MgCl₂ يتفكك إلى 3 أيونات (Mg²⁺, 2Cl⁻)، وهو العدد الأكبر مقارنة بـ NaCl (أيونان) والجلوكوز (جزيء واحد)."
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
