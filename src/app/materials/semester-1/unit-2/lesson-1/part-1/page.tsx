
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, Beaker, GitCommitHorizontal, CircleDot, Workflow, Blend, Package, Layers } from 'lucide-react';
import LessonLayout from '@/components/lesson-layout';
import React, { useState, useEffect } from 'react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/components/interactive-question-card';
import { InlineMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import Image from 'next/image';

const lessonInfo = {
    lessonTitle: "الدرس الأول تصنيف المحاليل",
    lessonSubtitle: "تصنيف المواد",
    mainIdea: "تقسم المواد حسب تركيبها إلى مواد نقية (عناصر ومركبات) ومخاليط (متجانسة وغير متجانسة) ولكل منها خصائصها التي تميزها",
    learningOutcomes: [
        "أصنف المواد إلى نقية ومخاليط",
        "أقارن بين أنواع المخاليط المختلفة"
    ],
    lessonId: "/materials/semester-1/unit-2/lesson-1/part-1",
    staticQuizzes: { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 },
    previousLesson: "/materials/semester-1/unit-1/section-5",
    nextLesson: "/materials/semester-1/unit-2/lesson-1/part-2",
    previousLessonTitle: "مراجعة الوحدة الأولى",
    nextLessonTitle: "الجزء التالي تكون المحاليل"
};

const LessonContent = ({ onCorrect }: { onCorrect: (id: string) => void }) => (
    <div className="space-y-8">
        <FlippableCard
            cardTitle="تصنيف المواد"
            cardIcon={<Workflow className="h-6 w-6" />}
        >
            <div className="space-y-4">
                <p className="font-semibold">تقسم المواد حسب تركيبها إلى</p>
                <div className='p-3 bg-muted/50 rounded-lg'>
                    <h4 className='font-bold text-accent mb-2'>المواد النقية</h4>
                    <p className='text-sm text-muted-foreground'>تتكون من نوع واحد من الجسيمات ذات تركيب ثابت ومنتظم وتقسم إلى</p>
                     <div className='p-3 bg-background/70 rounded-lg mt-2 space-y-2'>
                        <h5 className='font-semibold text-accent/80 text-sm'>أ) عناصر</h5>
                        <p className='text-muted-foreground' style={{fontSize: '14px'}}>أبسط أشكال المادة النقية لا يمكن تحليلها إلى مواد أبسط</p>
                        <p className='font-mono text-left' dir="ltr" style={{fontSize: '14px'}}>Cu(s) Ag(s) Au(s) H₂(g) N₂(g) O₂(g) F₂(g) Cl₂(g) Br₂(l) I₂(s) P₄(s) S₈(s)</p>
                    </div>
                    <div className='p-3 bg-background/70 rounded-lg mt-2 space-y-2'>
                        <h5 className='font-semibold text-accent/80 text-sm'>ب) مركبات</h5>
                        <p className='text-muted-foreground' style={{fontSize: '14px'}}>ناتجة من اتحاد عنصرين أو أكثر مثل الماء H₂O أكسيد الحديد (الصدأ) Fe₂O₃·2H₂O</p>
                    </div>
                </div>
                 <div className='p-3 bg-muted/50 rounded-lg'>
                    <h4 className='font-bold text-accent mb-2'>المخاليط</h4>
                    <p className='text-muted-foreground'>مزيج من مادتين نقيتين أو أكثر تبقى كل منهما محتفظة بخصائصها الكيميائية (لا تتفاعل)</p>
                    <p className='text-muted-foreground' style={{fontSize: '14px'}}>تختلف المخاليط باختلاف نسب مكوناتها وكيفية توزيع هذه المكونات</p>
                </div>
            </div>
        </FlippableCard>
        
        <h3 className="text-2xl font-bold text-center">أنواع المخاليط</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
            <FlippableCard
                cardTitle="المخلوط المعلق"
                cardIcon={<Layers className="h-6 w-6" />}
            >
                <ul className="space-y-2 text-sm">
                    <li>لا تمتزج مكوناته امتزاجا تاما وتبقى متمايزة عن غيرها (غير متجانسة)</li>
                    <li>قطر جسيماته يزيد عن 1000nm</li>
                    <li>يمكن فصله بالترشيح أو الترسيب</li>
                    <li>بعضها يمتاز بظاهرة تندال</li>
                     <li className='border-t pt-2 mt-2'>
                        <strong className='text-accent text-sm'>من أمثلتها</strong>
                         <ul className="list-disc mr-4 mt-2">
                            <li>تراب + ماء (طبقتين منفصلتين صلب + سائل)</li>
                            <li>عصير البرتقال الطبيعي (طبقتين منفصلتين صلب + سائل)</li>
                            <li>ماء + زيت أو ماء + بنزين (طبقتين سائلتين منفصلتين)</li>
                         </ul>
                    </li>
                </ul>
            </FlippableCard>

             <FlippableCard
                cardTitle="المخلوط الغروي"
                cardIcon={<Beaker className="h-6 w-6" />}
            >
                <ul className="space-y-2 text-sm">
                    <li>تتكون من جسيمات يتراوح قطرها بين (1-1000)nm منتشرة خلال مادة أخرى (وسط الانتشار) لذلك لا يمكن فصلها بالترشيح أو الترسيب</li>
                    <li>تتحرك جسيماتها حركة عشوائية في جميع الاتجاهات (الحركة البراونية) ما يمنع ترسبها</li>
                    <li>تمتاز بظاهرة تندال وهي تشتيت الضوء المار من خلالها ويزداد التشتيت بزيادة حجم الجسيمات وتركيزها</li>
                    <li>تتدرج بالوصف من الشفافة حتى العكرة والمعتمة</li>
                    <li className='border-t pt-2 mt-2'><strong className='text-accent text-sm'>تصنف حسب حالة كل من الجسيمات المنتشرة ووسط الانتشار ومن أمثلتها</strong>
                        <ul className="list-disc mr-4 mt-2">
                            <li>الضباب والغيوم والرذاذ (سائل في غاز)</li>
                            <li>الدخان والرماد والغبار (صلب في غاز)</li>
                            <li>الحليب والمايونيز (سائل في سائل)</li>
                            <li>الدهان (صلب في سائل)</li>
                            <li>حجر الخفاف البركاني (غاز في صلب)</li>
                        </ul>
                    </li>
                </ul>
            </FlippableCard>
        </div>
        <FlippableCard
            cardTitle="المخلوط المتجانس (المحلول)"
            cardIcon={<Package className="h-6 w-6" />}
             className="md:col-span-2"
        >
           <ul className="space-y-2 text-sm">
                <li>تمتزج مكوناته مع بعضها امتزاجا تاما بشكل منتظم ولا يمكن تمييزها عن بعضها (تجانس في التركيب والقوام)</li>
                <li>يتراوح قطر الجزيئات بين (0.1-1)nm فلا ترى بالعين أو المجهر ولا يمكن فصلها بالترشيح أو الترسيب</li>
                <li className="font-semibold text-accent">يصنف حسب نسبة المذاب في المذيب (حالة الإشباع) إلى</li>
                <ul className="list-decimal mr-4">
                    <li style={{fontSize: '14px'}}>غير مشبعة يمكن أن تستوعب كمية إضافية من المذاب عند نفس درجة الحرارة</li>
                    <li style={{fontSize: '14px'}}>مشبعة لا يمكن أن تستوعب كمية إضافية من المذاب عند نفس درجة الحرارة</li>
                    <li style={{fontSize: '14px'}}>فوق مشبعة تحتوي كمية إضافية من المذاب أكثر مما يمكن أن تستوعبها عند ظروف معينة</li>
                </ul>
                 <li className="font-semibold text-accent">يصنف حسب قابلية التوصيل الكهربائي إلى</li>
                 <ul className="list-decimal mr-4">
                    <li style={{fontSize: '14px'}}>كهرلية (قوية أو ضعيفة) توصل التيار الكهربائي لاحتوائها على أيونات حرة الحركة</li>
                    <li style={{fontSize: '14px'}}>لا كهرلية لا توصل التيار الكهربائي لعدم احتوائها على أيونات حرة الحركة</li>
                </ul>
                 <li className="font-semibold text-accent">يصنف حسب حالة المذيب الفيزيائية إلى</li>
                 <li className="flex justify-center">
                    <Image src="https://i.ibb.co/gLWhqy1V/3.jpg" alt="3" width={250} height={150} className="rounded-lg w-full h-auto" />
                </li>
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
                  question="أي من الخيارات التالية يمثل مادة نقية"
                  options={[
                      "عصير البرتقال",
                      "الهواء",
                      "الذهب (Au)",
                      "الحليب"
                  ]}
                  correctAnswerIndex={2}
                  explanation="الذهب (Au) هو عنصر والعناصر تعتبر مواد نقية الخيارات الأخرى هي مخاليط"
              />
               <InteractiveQuestionCard 
                  questionId="q2"
                  lessonId={lessonInfo.lessonId}
                  onCorrect={onCorrect}
                  question="ما هي الخاصية التي تسمح بالتمييز بين محلول حقيقي ومخلوط غروي شفاف"
                  options={[
                      "اللون",
                      "الكثافة",
                      "القدرة على الترشيح",
                      "ظاهرة تندال (تشتيت الضوء)"
                  ]}
                  correctAnswerIndex={3}
                  explanation="المخلوط الغروي يشتت الضوء المار من خلاله (ظاهرة تندال) بينما المحلول الحقيقي لا يشتت الضوء"
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
