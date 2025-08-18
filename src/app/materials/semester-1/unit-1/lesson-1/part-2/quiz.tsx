'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, X, BookOpen, Thermometer, Box, Beaker, GitCompare, Pipette, Scale, Lightbulb, HelpCircle, ArrowRight, Triangle } from 'lucide-react';
import Quiz from '@/components/quiz';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card'; // Re-using the same component
import InteractiveQuestionCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/interactive-question-card';
import { InlineMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';


const lessonContent = `<p>لفهم سلوك الغازات بشكل دقيق، نحتاج إلى دراسة العوامل التي تؤثر فيها. هذه العوامل هي متغيرات يمكن قياسها وتغييرها، وهي تحدد حالة الغاز. في هذا الجزء، سنتعرف على هذه المتغيرات الأربعة الأساسية التي ستكون حجر الزاوية في جميع قوانين الغازات التي سندرسها لاحقًا.</p>`;

export default function LessonPartPage() {
  const staticQuizzes = { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 };
  
  return (
    <div className="container mx-auto p-8 relative">
       <Link href="/materials/semester-1" passHref>
          <Button variant="ghost" size="icon" className="absolute top-4 left-4">
            <X className="h-6 w-6" />
            <span className="sr-only">إغلاق</span>
          </Button>
        </Link>
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">الدرس الأول: الحالة الغازية</h1>
        <p className="text-lg text-muted-foreground">مقدمة قوانين الغازات</p>
      </header>

      <main className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الفكرة الرئيسة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                يمكن وصف سلوك الغازات من خلال أربع متغيرات أساسية قابلة للقياس: الضغط (P)، الحجم (V)، درجة الحرارة (T)، وكمية الغاز (n). فهم هذه المتغيرات هو مفتاح فهم قوانين الغازات.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>نتاجات التعلم</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 ml-2 flex-shrink-0" />
                  <span>
                    أحدد المتغيرات الأربعة (الضغط، الحجم، الحرارة، كمية الغاز) التي تصف سلوك الغاز.
                  </span>
                </li>
                 <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 ml-2 flex-shrink-0" />
                  <span>
                    أصف المقصود بكل متغير وأذكر وحدات القياس الشائعة له.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <article 
            className="prose prose-lg max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: lessonContent }}
          />
        
          <h3 className="text-2xl font-bold text-center">المتغيرات الأربعة لوصف الغاز المحصور</h3>
          <div className="grid md:grid-cols-2 gap-6">
              <FlippableCard
                cardTitle="1. الضغط (P)"
                cardIcon={<GitCompare className="h-6 w-6" />}
              >
                 <div className="space-y-3">
                    <p className="font-semibold text-sm">هو القوة المؤثرة عموديًا على وحدة المساحة</p>
                    <p className="text-xs text-muted-foreground">ينشأ ضغط الغاز عن تصادم جسيماته بجدار الوعاء الذي يحتويه. كلما زادت التصادمات، زاد الضغط</p>
                    <div>
                        <h4 className="font-semibold text-accent text-xs mb-1">وحدات القياس</h4>
                        <ul className="list-disc mr-4 text-xs space-y-1">
                            <li>باسكال (Pa) وهي الوحدة الدولية (SI)</li>
                            <li>كيلوباسكال (kPa)</li>
                            <li>ضغظ جوي (atm)</li>
                            <li>مليمتر زئبق (mmHg)</li>
                        </ul>
                    </div>
                     <p className='text-xs mt-2 text-muted-foreground italic border-t pt-2' dir="ltr">
                        1 atm = 760 mmHg = 101.3 kPa
                    </p>
                 </div>
              </FlippableCard>

              <FlippableCard
                cardTitle="2. الحجم (V)"
                cardIcon={<Box className="h-6 w-6" />}
              >
                 <div className="space-y-3">
                    <p className="font-semibold text-sm">هو مقدار الحيز الذي تشغله جسيمات الغاز</p>
                    <p className="text-xs text-muted-foreground">حجم الغاز يساوي حجم الوعاء الذي يوجد فيه</p>
                    <div>
                        <h4 className="font-semibold text-accent text-xs mb-1">وحدات القياس</h4>
                        <ul className="list-disc mr-4 text-xs space-y-1">
                            <li>متر مكعب (m³)</li>
                            <li>لتر (L)</li>
                            <li>مليلتر (mL)</li>
                        </ul>
                    </div>
                     <p className='text-xs mt-2 text-muted-foreground italic border-t pt-2' dir="ltr">
                        1 L = 1000 mL
                    </p>
                 </div>
              </FlippableCard>

               <FlippableCard
                cardTitle="3. درجة الحرارة (T)"
                cardIcon={<Thermometer className="h-6 w-6" />}
              >
                 <div className="space-y-3">
                    <p className="font-semibold text-sm">هي مقياس لمتوسط الطاقة الحركية لجسيمات الغاز</p>
                    <p className="text-xs text-muted-foreground">يجب استخدام درجة الحرارة المطلقة (بالكلفن) في جميع قوانين الغازات</p>
                    <div>
                        <h4 className="font-semibold text-accent text-xs mb-1">وحدات القياس</h4>
                        <ul className="list-disc mr-4 text-xs space-y-1">
                            <li>كلفن (K) وهي الوحدة المعتمدة</li>
                            <li>درجة مئوية (سيليزية) (°C)</li>
                        </ul>
                    </div>
                     <p className='text-xs mt-2 text-muted-foreground italic border-t pt-2' dir="ltr">
                        T(K) = T(°C) + 273
                    </p>
                 </div>
              </FlippableCard>

               <FlippableCard
                cardTitle="4. كمية الغاز (n)"
                cardIcon={<Pipette className="h-6 w-6" />}
              >
                 <div className="space-y-3">
                    <p className="font-semibold text-sm">هي عدد جسيمات الغاز الموجودة في حجم معين</p>
                     <p className="text-xs text-muted-foreground">غالبًا ما يتم التعبير عن كمية الغاز بعدد المولات</p>
                    <div>
                        <h4 className="font-semibold text-accent text-xs mb-1">وحدات القياس</h4>
                        <ul className="list-disc mr-4 text-xs space-y-1">
                            <li>مول (mol) ويرمز له بالرمز n</li>
                        </ul>
                    </div>
                     <div className='text-xs mt-2 text-muted-foreground italic border-t pt-2'>
                        <p>المول الواحد يحتوي على عدد أفوجادرو من الجسيمات</p>
                        <p dir="ltr" className="text-center font-mono mt-1">6.022 × 10²³</p>
                    </div>
                 </div>
              </FlippableCard>
          </div>
          
           <FlippableCard
            cardTitle="الظروف المعيارية (STP)"
            cardIcon={<Scale className="h-6 w-6" />}
          >
             <p className="mb-4 font-semibold text-sm">هي ظروف مرجعية متفق عليها عالميًا لتسهيل مقارنة البيانات التجريبية للغازات</p>
              <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                      <span className="font-bold text-primary text-lg mt-[-2px]">1.</span>
                      <div>
                          <p className='font-semibold'>الضغط المعياري (Standard Pressure)</p>
                          <p className='text-muted-foreground mt-1' dir="ltr">P = 1 atm = 760 mmHg = 101.3 kPa</p>
                      </div>
                  </li>
                  <li className="flex items-start gap-3">
                      <span className="font-bold text-primary text-lg mt-[-2px]">2.</span>
                       <div>
                          <p className='font-semibold'>درجة الحرارة المعيارية (Standard Temperature)</p>
                          <p className='text-muted-foreground mt-1' dir="ltr">T = 0 °C = 273 K</p>
                      </div>
                  </li>
              </ul>
          </FlippableCard>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Triangle className="h-6 w-6 text-primary" />
                علاقات رياضية مساعدة
              </CardTitle>
              <CardDescription>
                هذه المثلثات تساعدك على تذكر وحساب الكميات الأساسية بسهولة.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center" dir="ltr">
              {/* Triangle 1: Moles, Concentration, Volume */}
              <div className="flex flex-col items-center">
                <svg viewBox="0 0 120 100" className="w-48 h-auto">
                  <polygon points="60,5 115,95 5,95" className="fill-muted stroke-foreground" strokeWidth="1" />
                  <line x1="32.5" y1="50" x2="87.5" y2="50" className="stroke-foreground" strokeWidth="1" />
                  <line x1="60" y1="50" x2="60" y2="95" className="stroke-foreground" strokeWidth="1" />
                  <text x="60" y="32" textAnchor="middle" className="font-bold text-lg fill-foreground">n</text>
                  <text x="60" y="45" textAnchor="middle" className="text-xs fill-muted-foreground">(mole)</text>
                  <text x="40" y="75" textAnchor="middle" className="font-bold text-lg fill-foreground">C</text>
                  <text x="37" y="90" textAnchor="middle" className="text-xs fill-muted-foreground">(mole/L)</text>
                  <text x="83" y="75" textAnchor="middle" className="font-bold text-lg fill-foreground">V</text>
                  <text x="83" y="90" textAnchor="middle" className="text-xs fill-muted-foreground">(L)</text>
                </svg>
                <p className="mt-2 text-sm font-semibold"><InlineMath math="n = C \times V" /></p>
              </div>

              {/* Triangle 2: Mass, Molar Mass, Moles */}
              <div className="flex flex-col items-center">
                <svg viewBox="0 0 120 100" className="w-48 h-auto">
                  <polygon points="60,5 115,95 5,95" className="fill-muted stroke-foreground" strokeWidth="1" />
                  <line x1="32.5" y1="50" x2="87.5" y2="50" className="stroke-foreground" strokeWidth="1" />
                  <line x1="60" y1="50" x2="60" y2="95" className="stroke-foreground" strokeWidth="1" />
                  <text x="60" y="32" textAnchor="middle" className="font-bold text-lg fill-foreground">m</text>
                  <text x="60" y="45" textAnchor="middle" className="text-xs fill-muted-foreground">(g)</text>
                  <text x="40" y="75" textAnchor="middle" className="font-bold text-lg fill-foreground">Mr</text>
                  <text x="37" y="90" textAnchor="middle" className="text-xs fill-muted-foreground">(g/mole)</text>
                  <text x="83" y="75" textAnchor="middle" className="font-bold text-lg fill-foreground">n</text>
                  <text x="83" y="90" textAnchor="middle" className="text-xs fill-muted-foreground">(mole)</text>
                </svg>
                <p className="mt-2 text-sm font-semibold"><InlineMath math="n = \frac{m}{Mr}" /></p>
              </div>

              {/* Triangle 3: Mass, Density, Volume */}
              <div className="flex flex-col items-center">
                 <svg viewBox="0 0 120 100" className="w-48 h-auto">
                  <polygon points="60,5 115,95 5,95" className="fill-muted stroke-foreground" strokeWidth="1" />
                  <line x1="32.5" y1="50" x2="87.5" y2="50" className="stroke-foreground" strokeWidth="1" />
                  <line x1="60" y1="50" x2="60" y2="95" className="stroke-foreground" strokeWidth="1" />
                  <text x="60" y="32" textAnchor="middle" className="font-bold text-lg fill-foreground">m</text>
                  <text x="60" y="45" textAnchor="middle" className="text-xs fill-muted-foreground">(g)</text>
                  <text x="40" y="75" textAnchor="middle" className="font-bold text-lg fill-foreground">d</text>
                  <text x="35" y="90" textAnchor="middle" className="text-xs fill-muted-foreground">(g/L)</text>
                  <text x="83" y="75" textAnchor="middle" className="font-bold text-lg fill-foreground">V</text>
                  <text x="85" y="90" textAnchor="middle" className="text-xs fill-muted-foreground">(L)</text>
                </svg>
                <p className="mt-2 text-sm font-semibold"><InlineMath math="d = \frac{m}{V}" /></p>
              </div>
            </CardContent>
          </Card>

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
                    question="بالون يحتوي على غاز الهيليوم ضغطه 900mmHg فإن قيمة ضغطه بوحدة atm تساوي"
                    options={[
                        "1.18",
                        "0.84",
                        "1660",
                        "140"
                    ]}
                    correctAnswerIndex={0}
                    explanation="للتحويل من mmHg إلى atm، نقوم بالقسمة على 760. المعادلة هي: 900 mmHg / 760 ≈ 1.18 atm."
                />
                 <InteractiveQuestionCard 
                    question="بالون درجة حرارته 20°C فإن حرارته المطلقة تساوي"
                    options={[
                        "13.75",
                        "253",
                        "293",
                        "0.073"
                    ]}
                    correctAnswerIndex={2}
                    explanation="للتحويل من درجة سيليزية (°C) إلى كلفن (K)، نستخدم المعادلة: T(K) = T(°C) + 273. إذن، 20 + 273 = 293 K."
                />
            </div>
          </div>

          <Card>
            <CardHeader>
                <CardTitle>اختبر فهمك</CardTitle>
                 <CardDescription>
                    بعد أن تعرفت على المتغيرات الأربعة، اختبر فهمك لها من خلال هذا الاختبار القصير.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Quiz lessonContent={lessonContent} staticQuizzes={staticQuizzes} />
            </CardContent>
          </Card>

      </main>

      <footer className="mt-12 border-t pt-6">
        <div className="flex justify-between">
            <Link href="/materials/semester-1/unit-1/lesson-1/part-1" passHref>
                <Button size="lg" variant="outline">
                <ArrowRight className="ml-2 h-5 w-5" />
                الجزء السابق
                </Button>
            </Link>
            <Link href="/materials/semester-1/unit-1/lesson-1/part-3" passHref>
                <Button size="lg">
                الجزء التالي: قانون بويل
                <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
            </Link>
        </div>
      </footer>
    </div>
  );
}