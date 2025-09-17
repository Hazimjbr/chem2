
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
    lessonSubtitle: "المواد الصلبة البلورية الأيونية",
    mainIdea: "تتكون المواد الصلبة الأيونية من أيونات موجبة وسالبة مرتبطة بقوى تجاذب كهربائي قوية مما يجعلها صلبة وهشة وذات درجات انصهار مرتفعة وتوصل الكهرباء فقط في حالة المحلول أو المصهور",
    learningOutcomes: [
        "أصف الرابطة الأيونية وخصائص المواد الصلبة الأيونية",
        "أفسر سبب هشاشة المواد الأيونية وقدرة مصاهيرها ومحاليلها على توصيل الكهرباء"
    ],
    lessonId: "/materials/semester-1/unit-1/lesson-3/part-5",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-3/part-4",
    nextLesson: "/materials/semester-1/unit-1/section-4/part-1",
    previousLessonTitle: "الجزء السابق: المواد الصلبة البلورية الفلزية",
    nextLessonTitle: "الإثراء والتوسع"
};

const LessonContent = ({ onCorrect }: { onCorrect: (id: string) => void }) => (
    <div className="space-y-8">
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookCopy className="h-6 w-6 text-primary" /> الخلفية العلمية</CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                    تنشأ المواد الأيونية من قوة التجاذب الكهروستاتيكي الكبيرة بين الأيونات ذات الشحنات المختلفة هذا التجاذب القوي ينظم الأيونات في بنية بلورية ثلاثية الأبعاد ومنتظمة حيث يكون كل أيون موجب محاطًا بأيونات سالبة والعكس صحيح هذه البنية المتراصة والقوية هي المسؤولة عن الخصائص المميزة للمواد الأيونية
                </p>
            </CardContent>
        </Card>
        
        <FlippableCard
            cardTitle="الرابطة الأيونية"
            cardIcon={<Atom className="h-6 w-6" />}
            imageContent={
                <Image
                    src="https://i.ibb.co/rGJN0yG8/1.jpg"
                    alt="الرابطة الأيونية"
                    width={200}
                    height={133}
                    className="rounded-lg object-contain h-48 w-auto"
                    data-ai-hint="ionic bond NaCl"
                />
            }
        >
            <div className="flex flex-col items-center justify-center p-2 text-center h-full">
                <p className="font-semibold mb-2">قوة التجاذب الكبيرة بين الأيونات مختلفة الشحنة</p>
                <p className="text-foreground text-sm">تنشأ من تفاعل فلز مع لافلز مثل: KCl, CaO</p>
            </div>
        </FlippableCard>

        <FlippableCard
            cardTitle="خصائص المواد الصلبة الأيونية"
            cardIcon={<Layers className="h-6 w-6" />}
            imageContent={
                <Image src="https://i.ibb.co/4wYqgx2v/image.jpg" alt="خصائص المواد الصلبة الأيونية" width={200} height={150} className="mx-auto h-full w-auto object-contain p-2" />
            }
        >
             <ul className="space-y-3 text-sm p-4">
                <li><strong className="text-accent">صلبة جدا</strong> بسبب قوة الرابطة الأيونية</li>
                <li><strong className="text-accent">درجات انصهارها مرتفعة</strong> تتطلب طاقة عالية للتغلب على قوى التجاذب في الشبكة البلورية</li>
                <li><strong className="text-accent">هشة</strong> تتكسر عند الطرق بسبب انزلاق الطبقات وتنافر الأيونات المتشابهة</li>
                <li><strong className="text-accent">لا توصل الكهرباء (صلبة)</strong> لأن أيوناتها مقيدة الحركة</li>
                <li><strong className="text-accent">توصل الكهرباء (محلول/مصهور)</strong> لأن أيوناتها تصبح حرة الحركة</li>
                <li className="border-t pt-2"><strong className="text-primary">تزداد قوة الرابطة الأيونية بازدياد شحنة الأيونات وعددها</strong></li>
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
                  question="لماذا لا توصل بلورة ملح الطعام (NaCl) الكهرباء في حالتها الصلبة"
                  options={[
                      "لأنها لا تحتوي على أيونات",
                      "لأن أيوناتها مقيدة الحركة في الشبكة البلورية",
                      "لأنها مادة جزيئية",
                      "لأنها غير قطبية"
                  ]}
                  correctAnswerIndex={1}
                  explanation="التوصيل الكهربائي يتطلب وجود جسيمات مشحونة حرة الحركة في الحالة الصلبة تكون أيونات الصوديوم والكلوريد موجودة ولكنها ثابتة في أماكنها ضمن الشبكة البلورية ولا تستطيع الحركة"
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={onCorrect}
                  question={<><span>أي المركبين التاليين له درجة انصهار أعلى: KCl أم CaO</span></>}
                  options={[
                      "KCl",
                      "CaO",
                      "لهما نفس درجة الانصهار",
                      "لا يمكن التحديد"
                  ]}
                  correctAnswerIndex={1}
                  explanation="تعتمد قوة الرابطة الأيونية على مقدار الشحنة شحنات أيونات CaO هي +2 و -2 بينما في KCl هي +1 و -1 التجاذب الأقوى في CaO يتطلب طاقة أكبر بكثير لصهره لذا درجة انصهاره أعلى"
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
