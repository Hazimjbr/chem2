
'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Info, Beaker, GitCommitHorizontal, HelpCircle, Cloud, Lightbulb, Thermometer, Move, Boxes, RefreshCw, Ban, BookOpen } from 'lucide-react';
import FlippableCard from './flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState } from 'react';
import { useApp } from '@/context/CurriculumContext';
import { markLessonAsComplete } from '@/lib/firebase/progress.actions';

const lessonInfo = {
  lessonTitle: "الدرس الأول: الحالة الغازية",
  lessonSubtitle: "نظرية الحركة الجزيئية",
  mainIdea: "تصف نظرية الحركة الجزيئية سلوك المادة بالاعتماد على حركة جسيماتها وتفسر الخصائص الفيزيائية للمواد في حالاتها المختلفة",
  learningOutcomes: [
    "أصف الخصائص الفيزيائية للغازات وأفسرها باستخدام نظرية الحركة الجزيئية"
  ],
  lessonId: "/materials/semester-1/unit-1/lesson-1/part-1",
  staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
  previousLesson: null,
  nextLesson: "/materials/semester-1/unit-1/lesson-1/part-2",
  nextLessonTitle: "الجزء التالي: مقدمة قوانين الغازات",
  lessonContent: "أنت مساعد تعليمي خبير في الكيمياء مهمتك هي إنشاء اختبار قصير (كويز) من 5 أسئلة اختيار من متعدد بناءً على محتوى الدرس التالي ومستوى الصعوبة المحدد. مستوى الصعوبة الحالي: {{difficultyLevel}}. بنود نظرية الحركة الجزيئية للغازات: يتكون الغاز من جسيمات صغيرة جدا (مهملة الحجم) ومتباعدة وقوى التجاذب بينها شبه معدومة. حركة الجسيمات: مستمرة عشوائية وسريعة في خطوط مستقيمة. التصادمات المرنة: لا تفقد فيها الطاقة الحركية الكلية. الطاقة والحرارة: متوسط الطاقة الحركية للجسيمات يتناسب طرديًا مع درجة الحرارة المطلقة. الغاز المثالي: غاز افتراضي حجم جسيماته وقوى التجاذب بينها تساوي صفر. الغاز الحقيقي: يسلك سلوكًا قريبًا من المثالي في الضغط المنخفض والحرارة المرتفعة."
}

// Create a separate component for the lesson's main content
const LessonContent = ({ onCorrect }: { onCorrect: (id: string) => void }) => {
    const Diagram = dynamic(() => import('./diagram'), {
      ssr: false,
      loading: () => (
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-[250px] w-full rounded-lg" />
           <div className="w-full grid grid-cols-2 gap-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
          <Skeleton className="h-24 w-full" />
        </div>
      ),
    });

    return (
      <>
        <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><BookOpen className="h-6 w-6 text-primary" /> مصطلحات أساسية</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                  <h4 className="font-bold text-accent">نظرية الحركة الجزيئية</h4>
                  <p className="text-muted-foreground">نموذج علمي يصف سلوك المادة (صلبة سائلة غازية) بناءً على حركة جسيماتها المستمرة</p>
              </div>
               <div>
                  <h4 className="font-bold text-accent">الغاز المثالي</h4>
                  <p className="text-muted-foreground">غاز افتراضي تنطبق عليه تمامًا جميع افتراضات نظرية الحركة الجزيئية</p>
              </div>
                <div>
                  <h4 className="font-bold text-accent">الغاز الحقيقي</h4>
                  <p className="text-muted-foreground">الغازات الموجودة فعليًا في الطبيعة والتي تحيد عن السلوك المثالي في ظروف معينة</p>
              </div>
               <div>
                  <h4 className="font-bold text-accent">الحركة البراونية</h4>
                  <p className="text-muted-foreground">الحركة العشوائية للجسيمات المعلقة في مائع (سائل أو غاز) نتيجة اصطدامها بجزيئات ذلك المائع</p>
              </div>
              <div>
                  <h4 className="font-bold text-accent">ضغط الغاز</h4>
                  <p className="text-muted-foreground">القوة المؤثرة على وحدة المساحة والناتجة من تصادم جسيمات الغاز مع جدار الوعاء باستمرار</p>
              </div>
            </CardContent>
          </Card>
        
        <div className="grid md:grid-cols-2 gap-6">
              <FlippableCard
                cardTitle="نظرية الحركة الجزيئية"
                cardIcon={<HelpCircle className="h-6 w-6" />}
              >
                 <ul className="space-y-4 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-primary text-lg mt-[-2px]">1</span>
                      <div>
                        <p className='font-semibold'>تصف سلوك جسيمات المادة وتفترض حركتها الدائمة المستمرة:</p>
                         <ul className="mt-2 space-y-1 mr-4 text-sm">
                            <li><strong className="font-semibold text-accent/80">أ) الصلبة:</strong> حركة اهتزازية في مكانها</li>
                            <li><strong className="font-semibold text-accent/80">ب) السائلة والغازية:</strong> تتحرك عشوائيا في جميع الاتجاهات</li>
                        </ul>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-primary text-lg mt-[-2px]">2</span>
                       <div>
                        <p className='font-semibold'>تفسر الخصائص الفيزيائية والسلوك الفيزيائي للمواد اعتمادا على:</p>
                         <ul className="mt-2 space-y-1 mr-4 text-sm">
                            <li><strong className="font-semibold text-accent/80">أ) الطاقة الحركية للجسيمات</strong></li>
                            <li><strong className="font-semibold text-accent/80">ب) قوى التجاذب بين الجسيمات</strong></li>
                        </ul>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold text-primary text-lg mt-[-2px]">3</span>
                      <p className='font-semibold'>تستخدم قوانين الغازات في وصف العلاقة بين العوامل المؤثرة في سلوك الغاز الفيزيائي</p>
                    </li>
                 </ul>
              </FlippableCard>

              <FlippableCard
                cardTitle="بنود نظرية الحركة الجزيئية للغازات"
                cardIcon={<Info className="h-6 w-6" />}
              >
                 <ul className="space-y-4 text-sm">
                     <li className="flex items-start gap-3">
                      <Boxes className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p><strong className="font-semibold">تكوين الغاز:</strong> يتكون من جسيمات صغيرة جدا (مهملة الحجم) ومتباعدة وقوى التجاذب بينها شبه معدومة لذلك معظم حجمه فراغ</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <Move className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p><strong className="font-semibold">حركة الجسيمات:</strong> مستمرة عشوائية وسريعة في خطوط مستقيمة مما يكسبها طاقة حركية عالية</p>
                    </li>
                     <li className="flex items-start gap-3">
                      <RefreshCw className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p><strong className="font-semibold">التصادمات المرنة:</strong> تصادمات لا تفقد فيها الطاقة الحركية الكلية للنظام وتسبب ضغط الغاز عند اصطدامها بجدار الوعاء</p>
                    </li>
                     <li className="flex items-start gap-3">
                      <Thermometer className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <p><strong className="font-semibold">الطاقة والحرارة:</strong> متوسط الطاقة الحركية للجسيمات يتناسب طرديًا مع درجة الحرارة المطلقة (بالكلفن)</p>
                    </li>
                 </ul>
              </FlippableCard>
              
              <FlippableCard
                cardTitle="الغاز المثالي (Ideal Gas)"
                cardIcon={<Beaker className="h-6 w-6" />}
              >
                  <p className="mb-4 font-semibold">هو غاز افتراضي يتميز بالخصائص التالية:</p>
                  <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                          <span className="font-bold text-primary text-lg mt-[-2px]">1</span>
                          <p>حجم جسيماته يساوي صفر</p>
                      </li>
                      <li className="flex items-start gap-3">
                          <span className="font-bold text-primary text-lg mt-[-2px]">2</span>
                          <p>قوى التجاذب بين جسيماته تساوي صفر (معدومة)</p>
                      </li>
                      <li className="flex items-start gap-3">
                          <span className="font-bold text-primary text-lg mt-[-2px]">3</span>
                          <p>تنطبق عليه فرضيات نظرية الحركة الجزيئية وقوانين الغازات عند كل الظروف</p>
                      </li>
                      <li className="flex items-start gap-3">
                          <span className="font-bold text-primary text-lg mt-[-2px]">4</span>
                          <p>لا يمكن إسالته مهما انخفضت درجة حرارته أو زاد الضغط عليه</p>
                      </li>
                  </ul>
                  <p className='text-sm mt-4 text-muted-foreground italic border-t pt-3'>
                    يستخدم العلماء نموذج الغاز المثالي لتبسيط الحسابات وفهم سلوك الغازات الحقيقية في ظروف معينة (مثل الضغط المنخفض والحرارة المرتفعة)
                  </p>
              </FlippableCard>

               <FlippableCard
                cardTitle="الغاز الحقيقي (Real Gas)"
                cardIcon={<Cloud className="h-6 w-6" />}
              >
                  <p className="mb-4 font-semibold">هو الغاز الموجود فعليًا في الطبيعة وتتشابه معظم الغازات في سلوكها الفيزيائي</p>
                  <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                          <span className="font-bold text-primary text-lg mt-[-2px]">1</span>
                          <p>حجم جسيماته صغير جدًا ولكنه ليس صفرًا (لا يمكن إهماله في الحسابات الدقيقة)</p>
                      </li>
                      <li className="flex items-start gap-3">
                          <span className="font-bold text-primary text-lg mt-[-2px]">2</span>
                          <p>توجد قوى تجاذب بين جسيماته وإن كانت ضعيفة جدًا</p>
                      </li>
                      <li className="flex items-start gap-3">
                          <span className="font-bold text-primary text-lg mt-[-2px]">3</span>
                          <p>يسلك سلوكًا قريبًا جدًا من الغاز المثالي في الظروف العادية (الضغط الجوي ودرجة حرارة الغرفة)</p>
                      </li>
                      <li className="flex items-start gap-3">
                          <span className="font-bold text-primary text-lg mt-[-2px]">4</span>
                          <p>يمكن تحويله إلى سائل (إسالته) عن طريق زيادة الضغط وخفض درجة الحرارة</p>
                      </li>
                  </ul>
              </FlippableCard>

               <FlippableCard
                cardTitle="انحراف الغازات الحقيقية"
                cardIcon={<GitCommitHorizontal className="h-6 w-6" />}
              >
                  <p className="mb-4 text-sm">تتشابه الغازات الحقيقية مع الغاز المثالي في الظروف الطبيعية إلى حد كبير</p>
                  <p className="mb-4 font-semibold">يزداد انحراف الغازات الحقيقية عن سلوك الغاز المثالي كلما:</p>
                  <ul className="space-y-4 text-sm">
                      <li className="flex items-start gap-3">
                          <span className="font-bold text-primary text-lg mt-[-2px]">1</span>
                          <div>
                              <p className='font-semibold'>ازدادت قوى التجاذب بين جسيمات الغاز:</p>
                              <ul className="mt-2 space-y-2 mr-4 text-sm">
                                  <li><strong className="font-semibold text-accent/80">أ) اختلاف نوع الترابط بين الجسيمات:</strong> (هيدروجيني مثل HF {'>'} ثنائي قطب مثل NH3 {'>'} قوى لندن مثل Ne)</li>
                                  <li><strong className="font-semibold text-accent/80">ب) ازدياد الكتلة المولية:</strong> (مثلًا Cl2 {'>'} F2) لأن زيادة الكتلة المولية تزيد من قوى لندن</li>
                              </ul>
                          </div>
                      </li>
                      <li className="flex items-start gap-3">
                          <span className="font-bold text-primary text-lg mt-[-2px]">2</span>
                          <p className='font-semibold'>ازداد الضغط على الغاز أو قل حجمه</p>
                      </li>
                       <li className="flex items-start gap-3">
                          <span className="font-bold text-primary text-lg mt-[-2px]">3</span>
                          <p className='font-semibold'>انخفضت درجة الحرارة</p>
                      </li>
                  </ul>
                  <p className='text-sm mt-3 text-muted-foreground'>
                      (ملاحظة: زيادة الحرارة تقلل من قوة الترابط بين الجسيمات وتزيد من طاقتها الحركية مما يجعلها تسلك سلوكًا أقرب للمثالي)
                  </p>
              </FlippableCard>

              <Card>
                  <CardHeader>
                      <CardTitle>محاكاة سلوك الغاز</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <Diagram />
                      <p className="text-sm text-muted-foreground mt-4 text-center">
                      تحكم في درجة الحرارة والضغط ولاحظ كيف يتغير سلوك الغاز بين المثالي والحقيقي
                      </p>
                  </CardContent>
              </Card>
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
                    onCorrect={onCorrect}
                    question="الغاز A محصور في وعاء عند درجة حرارة ثابتة فإن العبارة الخاطئة:"
                    options={[
                        "حركة جسيمات الغاز مستمرة وعشوائية وفي خط مستقيم",
                        "تتحرك جسيمات الغاز جميعها بنفس السرعة عند نفس درجة الحرارة",
                        "متوسط الطاقة الحركية لجسيمات الغاز ثابت عند نفس درجة الحرارة",
                        "تتصادم جسيمات الغاز تصادمات مرنة مع بعضها ومع جدار الوعاء"
                    ]}
                    correctAnswerIndex={1}
                    explanation="عند درجة حرارة ثابتة يكون لجسيمات الغاز *متوسط* طاقة حركية ثابت ولكن لا تتحرك جميع الجسيمات بنفس السرعة بل تمتلك توزيعًا من السرعات المختلفة"
                />
                 <InteractiveQuestionCard 
                    questionId="q2"
                    lessonId={lessonInfo.lessonId}
                    onCorrect={onCorrect}
                    question="أحد الغازات الآتية لا يمكن إسالته على جميع قيم الضغط ودرجات الحرارة:"
                    options={[
                        "الغاز المثالي",
                        "غاز النيتروجين",
                        "غاز الأكسجين",
                        "غاز الهيدروجين"
                    ]}
                    correctAnswerIndex={0}
                    explanation="الغاز المثالي هو غاز افتراضي تُهمل فيه قوى التجاذب بين جسيماته تمامًا ولذلك لا يمكن تحويله إلى سائل مهما زاد الضغط أو انخفضت درجة الحرارة"
                />
            </div>
          </div>
      </>
    );
}

export default function LessonPartPage() {
    const [completedInteractive, setCompletedInteractive] = React.useState<Set<string>>(new Set());

    const handleCorrectAnswer = (questionId: string) => {
        const newSet = new Set(completedInteractive).add(questionId);
        setCompletedInteractive(newSet);
    };
  
    return (
        <LessonLayout {...lessonInfo}>
            <LessonContent onCorrect={handleCorrectAnswer} />
        </LessonLayout>
    );
}
