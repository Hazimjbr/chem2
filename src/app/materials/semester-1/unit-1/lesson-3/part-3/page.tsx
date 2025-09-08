
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Cpu, Layers, Atom, Binary, Wind, HelpCircle, GitCommitHorizontal, CheckCircle, Boxes, Move, Thermometer, Diamond } from 'lucide-react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';
import { DiamondStructure, GraphiteStructure, SiliconDioxideStructure } from './diagram';

const lessonInfo = {
    lessonTitle: "الدرس الثالث: الحالة الصلبة",
    lessonSubtitle: "المواد الصلبة الشبكية التساهمية",
    mainIdea: "تتكون المواد الصلبة الشبكية التساهمية من ذرات ترتبط ببعضها بروابط تساهمية قوية جدًا تمتد في جميع الاتجاهات لتشكل شبكة بلورية ثلاثية الأبعاد مما يكسبها صلابة استثنائية ودرجات انصهار وغليان هي الأعلى على الإطلاق",
    learningOutcomes: [
        "أصف خصائص المواد الصلبة الشبكية التساهمية",
        "أقارن بين الألماس والجرافيت من حيث البنية والخصائص"
    ],
    lessonContent: `<p>ننتقل الآن إلى أقوى أنواع المواد الصلبة على الإطلاق وهي المواد الصلبة الشبكية التساهمية التي تتميز بصلابتها الشديدة ودرجات انصهارها الخيالية فما سر هذه القوة دعنا نكتشف ذلك</p>`,
    lessonId: "/materials/semester-1/unit-1/lesson-3/part-3",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/lesson-3/part-2",
    nextLesson: "/materials/semester-1/unit-1/lesson-3/part-4",
    previousLessonTitle: "الجزء السابق: المواد الصلبة البلورية الجزيئية",
    nextLessonTitle: "الجزء التالي: المواد الصلبة البلورية الفلزية"
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
                        على عكس المواد الصلبة الجزيئية التي ترتبط جزيئاتها بقوى ضعيفة تتكون المواد الصلبة الشبكية التساهمية من شبكة عملاقة من الذرات المترابطة بروابط تساهمية قوية جدًا لا يوجد هنا جزيئات منفصلة بل البلورة كلها تعتبر جزيئًا واحدًا ضخمًا وهذا هو سر قوتها وصلابتها الاستثنائية
                    </p>
                </CardContent>
            </Card>

            <FlippableCard
                cardTitle="خصائص المواد الصلبة الشبكية التساهمية"
                cardIcon={<Layers className="h-6 w-6" />}
            >
                 <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                        <span className="font-bold text-primary">1</span>
                        <p><strong>جسيماتها ذرات</strong> ترتبط بروابط تساهمية قوية جدًا</p>
                    </li>
                    <li className="flex items-start gap-3">
                         <span className="font-bold text-primary">2</span>
                        <p><strong>شديدة الصلابة</strong> بسبب قوة الروابط التساهمية التي تشكل شبكة ثلاثية الأبعاد</p>
                    </li>
                     <li className="flex items-start gap-3">
                         <span className="font-bold text-primary">3</span>
                        <p><strong>درجات انصهارها وغليانها مرتفعة جدًا</strong> وتحتاج طاقة هائلة للتغلب على الروابط</p>
                    </li>
                     <li className="flex items-start gap-3">
                         <span className="font-bold text-primary">4</span>
                        <p><strong>غير موصلة للكهرباء</strong> بشكل عام لعدم وجود إلكترونات حرة (باستثناء الجرافيت)</p>
                    </li>
                 </ul>
            </FlippableCard>

            <div className="grid md:grid-cols-2 gap-6">
                <FlippableCard
                    cardTitle="متآصلات الكربون: الألماس"
                    cardIcon={<Diamond className="h-6 w-6" />}
                >
                    <ul className="space-y-2 text-xs">
                        <li>ترتبط كل ذرة كربون بـ <strong>4</strong> ذرات أخرى بروابط تساهمية قوية</li>
                        <li>التهجين من نوع <strong>sp³</strong> والشكل الهندسي <strong>رباعي الأوجه منتظم</strong></li>
                        <li>يشكل شبكة ثلاثية الأبعاد شديدة الصلابة</li>
                        <li><strong>غير موصل للكهرباء</strong> لأن جميع إلكترونات التكافؤ مرتبطة</li>
                        <li>يعتبر أقسى مادة طبيعية وله درجة انصهار عالية جدًا</li>
                    </ul>
                </FlippableCard>
                <FlippableCard
                    cardTitle="متآصلات الكربون: الجرافيت"
                    cardIcon={<Diamond className="h-6 w-6" />}
                >
                    <ul className="space-y-2 text-xs">
                        <li>ترتبط كل ذرة كربون بـ <strong>3</strong> ذرات أخرى بروابط تساهمية قوية في نفس الطبقة</li>
                        <li>التهجين من نوع <strong>sp²</strong> والشكل الهندسي <strong>مثلث مستو</strong></li>
                        <li>يشكل <strong>طبقات</strong> يمكنها الانزلاق فوق بعضها البعض مما يجعله هشًا وزلقًا</li>
                        <li><strong>موصل للكهرباء</strong> بسبب وجود إلكترون تكافؤ حر الحركة لكل ذرة</li>
                        <li>يستخدم في صناعة أقلام الرصاص والأقطاب الكهربائية</li>
                    </ul>
                </FlippableCard>
            </div>
            
            <FlippableCard
                cardTitle="مثال آخر: ثاني أكسيد السيليكون"
                cardIcon={<Cpu className="h-6 w-6" />}
            >
               <p className="text-sm">يعرف أيضًا بالكوارتز أو الرمل وهو المكون الأساسي للزجاج</p>
                <ul className="space-y-2 text-xs mt-2">
                    <li>ترتبط كل ذرة سيليكون بـ <strong>4</strong> ذرات أكسجين</li>
                    <li>ترتبط كل ذرة أكسجين بـ <strong>2</strong> ذرة سيليكون</li>
                    <li>الروابط تساهمية قوية جدًا مما يجعله شديد الصلابة وذا درجة انصهار مرتفعة</li>
                </ul>
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
                  onCorrect={handleCorrectAnswer}
                  question="لماذا يعتبر الألماس شديد الصلابة بينما الجرافيت هش"
                  options={[
                      "لأن الألماس يتكون من ذرات أكبر",
                      "لأن الروابط في الألماس أيونية",
                      "بسبب بنية الألماس الشبكية ثلاثية الأبعاد مقابل بنية الجرافيت الطبقية",
                      "لأن الجرافيت موصل للكهرباء"
                  ]}
                  correctAnswerIndex={2}
                  explanation="الروابط في الألماس تمتد في ثلاثة أبعاد مكونة شبكة متماسكة وقوية جدًا أما في الجرافيت فتوجد طبقات قوية لكن الروابط بين هذه الطبقات ضعيفة مما يسمح لها بالانزلاق بسهولة"
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={handleCorrectAnswer}
                  question="ما هو السبب الرئيسي لكون الجرافيت موصلًا للكهرباء بينما الألماس عازل"
                  options={[
                      "لأن الجرافيت أسود اللون",
                      "لأن الألماس أكثر كثافة",
                      "لأن الجرافيت يحتوي على إلكترونات تكافؤ حرة الحركة بينما جميع إلكترونات الألماس مرتبطة",
                      "لأن الجرافيت يستخدم في البطاريات"
                  ]}
                  correctAnswerIndex={2}
                  explanation="في الجرافيت ترتبط كل ذرة كربون بثلاث ذرات أخرى ويبقى لديها إلكترون تكافؤ واحد حر الحركة بين الطبقات وهذا الإلكترون هو المسؤول عن توصيل الكهرباء أما في الألماس فجميع إلكترونات التكافؤ الأربعة تشارك في روابط تساهمية قوية ولا توجد إلكترونات حرة"
              />
          </div>
        </div>
    </LessonLayout>
  );
}
