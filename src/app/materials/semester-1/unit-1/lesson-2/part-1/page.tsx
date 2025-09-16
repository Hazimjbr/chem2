
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Cpu, Layers, Atom, Binary, Waves, HelpCircle, GitCommitHorizontal, CheckCircle, Boxes, Move, Thermometer, Beaker, Package, Workflow, Blend } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';


const lessonInfo = {
    lessonTitle: "الدرس الثاني: الحالة السائلة",
    lessonSubtitle: "مقدمة عن المواد السائلة",
    mainIdea: "تتميز السوائل بخصائص فريدة مثل حجمها الثابت وشكلها المتغير وتعتمد هذه الخصائص بشكل أساسي على طبيعة قوى الترابط بين جزيئاتها وأنواعها",
    learningOutcomes: [
        "أصف الخصائص الفيزيائية للمواد السائلة",
        "أقارن بين أنواع قوى الترابط بين الجزيئات"
    ],
    lessonId: "/materials/semester-1/unit-1/lesson-2/part-1",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-1/part-10",
    nextLesson: "/materials/semester-1/unit-1/lesson-2/part-2",
    previousLessonTitle: "الجزء السابق: قانون جراهام",
    nextLessonTitle: "الجزء التالي: التبخر"
};

const LessonContent = ({ onCorrect }: { onCorrect: (id: string) => void }) => (
    <div className="space-y-8">
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookCopy className="h-6 w-6 text-primary" /> الخلفية العلمية</CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                    تعتمد خصائص المادة في الحالة السائلة مثل كثافتها وقابليتها للجريان على طبيعة الجسيمات المكونة لها وقوى الترابط بينها السوائل على عكس الغازات تمتلك حجمًا ثابتًا لأن جسيماتها متقاربة لكنها تأخذ شكل الوعاء لأن هذه الجسيمات قادرة على الحركة والانزلاق فوق بعضها البعض
                </p>
            </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             <FlippableCard
                cardTitle="ترابط قوى لندن"
                cardIcon={<Atom className="h-6 w-6" />}
            >
                 <p className="font-semibold text-sm mb-2">ينشأ بفعل الاستقطاب اللحظي</p>
                <ul className="list-disc mr-4 text-sm space-y-1 text-muted-foreground">
                    <li>يوجد في ذرات العناصر الخاملة والجزيئات غير القطبية مثل CH₄ CO₂</li>
                    <li>تزداد قوته بازدياد الكتلة المولية وقلة تفرعات السلاسل</li>
                </ul>
            </FlippableCard>

            <FlippableCard
                cardTitle="ترابط ثنائي القطب"
                cardIcon={<Binary className="h-6 w-6" />}
            >
                <p className="font-semibold text-sm mb-2">ينشأ بين الجزيئات القطبية</p>
                 <ul className="list-disc mr-4 text-sm space-y-1 text-muted-foreground">
                    <li>يحدث تجاذب بين الشحنات الجزئية المختلفة δ+ و δ-</li>
                    <li>مثال هاليد الألكيل الإيثر الألدهيد الكيتون</li>
                    <li>أقوى من قوى لندن للجزيئات المتقاربة في الكتلة المولية</li>
                </ul>
            </FlippableCard>

            <FlippableCard
                cardTitle="ترابط هيدروجيني"
                cardIcon={<Waves className="h-6 w-6" />}
            >
                <p className="font-semibold text-sm mb-2">أقوى أنواع الترابط بين الجزيئات</p>
                 <ul className="list-disc mr-4 text-sm space-y-1 text-muted-foreground">
                    <li>نوع خاص من ترابط ثنائي القطب</li>
                    <li>يحدث عندما ترتبط ذرة H بذرة ذات كهروسلبية عالية N O F</li>
                    <li>مثال الماء H₂O الكحول R-OH الأمونيا NH₃</li>
                </ul>
            </FlippableCard>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
            <FlippableCard
                cardTitle="خصائص المواد السائلة"
                cardIcon={<Layers className="h-6 w-6" />}
            >
                <p className="text-sm font-bold mb-4">تمتاز السوائل بخصائص محددة اعتمادا على قوى التجاذب بين جزيئاتها</p>
                <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3"><span className="font-bold text-primary">1</span><div><strong>حجمها ثابت</strong> غير قابلة للانضغاط لأن جزيئاتها متقاربة</div></li>
                    <li className="flex items-start gap-3"><span className="font-bold text-primary">2</span><div><strong>شكلها متغير</strong> تأخذ شكل حيز الوعاء الذي توضع فيه وتملأ قاعه</div></li>
                    <li className="flex items-start gap-3"><span className="font-bold text-primary">3</span><div><strong>جسيماتها متحركة</strong> في حركة مستمرة وعشوائية لكن طاقتها الحركية أقل من الغازات</div></li>
                    <li className="flex items-start gap-3"><span className="font-bold text-primary">4</span><div><strong>قوى ترابط متوسطة</strong> أضعف من المواد الصلبة ولكنها أقوى من الغازية</div></li>
                     <li className="flex items-start gap-3"><span className="font-bold text-primary">5</span><div><strong>كثافتها أكبر</strong> بشكل عام كثافة السوائل أكبر من كثافة الغازات</div></li>
                </ul>
            </FlippableCard>

             <FlippableCard
                cardTitle="ما هو المائع؟"
                cardIcon={<HelpCircle className="h-6 w-6" />}
            >
               <CardContent>
                    <p className="text-sm">المائع هو أي مادة لها القدرة على الجريان أو الانسياب والانتشار وتأخذ شكل الإناء الذي توضع فيه بناءً على هذا التعريف تعتبر كل من السوائل والغازات موائع</p>
               </CardContent>
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
                  onCorrect={onCorrect}
                  question="السائل الذي تترابط جزيئاته بقوى ترابط هيدروجينية من السوائل الآتية"
                  options={[
                      "CH₃OH",
                      "CH₃CH₂Cl",
                      "CH₃COCH₃",
                      "CH₃CH₃"
                  ]}
                  correctAnswerIndex={0}
                  explanation="الترابط الهيدروجيني يحدث عند ارتباط ذرة H مباشرة بذرة ذات كهروسلبية عالية (مثل O N F) وهذا الشرط ينطبق فقط على الميثانول (CH₃OH) الذي يحتوي على رابطة O-H"
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={onCorrect}
                  question="لماذا تأخذ السوائل شكل الوعاء الذي توضع فيه بينما يبقى حجمها ثابتًا"
                  options={[
                      "لأن جزيئاتها لا تتحرك أبدًا",
                      "لأن قوى الترابط بينها قوية جدًا كالمواد الصلبة",
                      "لأن جزيئاتها متباعدة جدًا كالغازات",
                      "لأن جزيئاتها قادرة على الحركة والانزلاق فوق بعضها ولكنها تبقى متقاربة"
                  ]}
                  correctAnswerIndex={3}
                  explanation="جزيئات السائل تمتلك طاقة حركية كافية للتغلب جزئيًا على قوى التجاذب والانزلاق فوق بعضها البعض مما يمنحها شكلاً متغيرًا لكن هذه القوى لا تزال قوية بما يكفي لإبقائها متقاربة مما يحافظ على حجم ثابت"
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

    