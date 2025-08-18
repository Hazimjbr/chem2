
'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, X, BookCopy, Thermometer, Box, Lightbulb, HelpCircle, ArrowRight, GitCompare, Cpu, Pipette, LineChart, Sigma } from 'lucide-react';
import Quiz from '@/components/quiz';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import { useEffect } from 'react';

const lessonContent = `<p>يُعتبر قانون الغاز المثالي تتويجًا لقوانين الغازات التي درسناها (بويل، شارل، أفوجادرو)، حيث يربط جميع المتغيرات الأربعة (الضغط، الحجم، الحرارة، وكمية الغاز) في معادلة واحدة شاملة.</p>`;
const lessonPath = "/materials/semester-1/unit-1/lesson-1/part-8";

export default function LessonPartPage() {
  const staticQuizzes = { lvl1: staticQuizLvl1, lvl2: staticQuizLvl2, lvl3: staticQuizLvl3 };

  useEffect(() => {
    localStorage.setItem('lastVisitedLesson', lessonPath);
  }, []);

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
        <p className="text-lg text-muted-foreground">قانون الغاز المثالي</p>
      </header>

      <main className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>الفكرة الرئيسة</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg">
                    يمكن ربط المتغيرات الأربعة التي تصف حالة الغاز (الضغط، الحجم، درجة الحرارة، وعدد المولات) من خلال علاقة رياضية واحدة تُعرف بمعادلة الغاز المثالي.
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
                        <span>أشتق قانون الغاز المثالي من قوانين الغازات الأخرى.</span>
                    </li>
                    <li className="flex items-start">
                        <Check className="h-6 w-6 text-green-500 ml-2 flex-shrink-0" />
                        <span>أحل مسائل حسابية باستخدام قانون الغاز المثالي.</span>
                    </li>
                </ul>
            </CardContent>
        </Card>

        <article 
          className="prose prose-lg max-w-none text-foreground"
          dangerouslySetInnerHTML={{ __html: lessonContent }}
        />

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookCopy className="h-6 w-6 text-primary" /> الخلفية العلمية</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        بعد أن درسنا كل متغير من متغيرات الغازات على حدة، يجمع قانون الغاز المثالي بين القوانين السابقة في علاقة واحدة شاملة، تربط بين الحجم (V) والضغط (P) ودرجة الحرارة (T) وعدد المولات (n). هذا القانون هو حجر الزاوية في كيمياء الغازات، حيث يسمح بحساب أي متغير من المتغيرات الأربعة إذا عُرفت المتغيرات الثلاثة الأخرى.
                    </p>
                </CardContent>
            </Card>

             <FlippableCard
                cardTitle="قانون الغاز المثالي"
                cardIcon={<BookCopy className="h-6 w-6" />}
            >
                 <div className="space-y-3">
                    <p className='text-sm'>يطبق على الغاز المثالي، وعلى الغاز الحقيقي بفرض أنه يسلك سلوك الغاز المثالي.</p>
                    <p className='text-sm'>العلاقة الرياضية تربط المتغيرات الأربعة بثابت يسمى ثابت الغاز العام (R).</p>
                    <div className='text-center p-2 bg-muted/50 rounded-lg'>
                        <p className="font-bold text-accent">قيمة ثابت الغاز العام (R)</p>
                        <p dir="ltr" className="font-mono text-lg">R = 0.082 L·atm/mol·K</p>
                    </div>
                </div>
            </FlippableCard>

             <FlippableCard
                cardTitle="العلاقة الرياضية والصيغ المشتقة"
                cardIcon={<Cpu className="h-6 w-6" />}
            >
               <div className="space-y-4 text-center">
                  <p>الصيغة الأساسية لقانون الغاز المثالي:</p>
                  <div dir="ltr"><BlockMath math="PV = nRT" /></div>
                  <p>يمكن اشتقاق صيغ أخرى من هذه العلاقة:</p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" dir="ltr">
                        <div className="p-2 bg-background rounded">
                            <p>بدلالة الكتلة (m) والكتلة المولية (Mr)</p>
                            <BlockMath math="PV = \frac{m}{Mr}RT" />
                        </div>
                        <div className="p-2 bg-background rounded">
                             <p>بدلالة الكثافة (d)</p>
                             <BlockMath math="P \cdot Mr = dRT" />
                        </div>
                   </div>
              </div>
            </FlippableCard>
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
                  question={<><span>عينة من غاز تحتوي </span><span dir="ltr" className='inline-block mx-1'><InlineMath math="2\text{mol}"/></span><span> حجمها </span><span dir="ltr" className='inline-block mx-1'><InlineMath math="2000\text{ml}"/></span><span> حرارتها </span><span dir="ltr" className='inline-block mx-1'><InlineMath math="20^\circ\text{C}"/></span><span> فإن ضغطها يساوي:</span></>}
                  options={[
                      "24atm",
                      "96atm",
                      "2433atm",
                      "1.62atm"
                  ]}
                  correctAnswerIndex={0}
                  explanation="V=2L, T=293K, n=2mol. P = nRT/V = (2 * 0.082 * 293) / 2 ≈ 24atm"
              />
               <InteractiveQuestionCard 
                  question={<><span>عينة من غاز الهيليوم كتلتها </span><span dir="ltr" className='inline-block mx-1'><InlineMath math="20\text{g}"/></span><span> حجمها </span><span dir="ltr" className='inline-block mx-1'><InlineMath math="3\text{L}"/></span><span> حرارتها </span><span dir="ltr" className='inline-block mx-1'><InlineMath math="27^\circ\text{C}"/></span><span> فإن ضغطها يساوي:</span></>}
                  options={[
                      "41atm",
                      "20.5atm",
                      "3.7atm",
                      "82atm"
                  ]}
                  correctAnswerIndex={0}
                  explanation="Mr(He)=4g/mol. n=m/Mr=20/4=5mol. V=3L, T=300K. P = nRT/V = (5 * 0.082 * 300) / 3 = 41atm"
              />
          </div>
        </div>


        <Card>
          <CardHeader>
              <CardTitle>اختبر فهمك</CardTitle>
              <CardDescription>
                  بعد أن تعرفت على قانون الغاز المثالي، اختبر فهمك له من خلال هذا الاختبار القصير
              </CardDescription>
          </CardHeader>
          <CardContent>
              <Quiz lessonContent={lessonContent} staticQuizzes={staticQuizzes} lessonId={lessonPath} />
          </CardContent>
        </Card>
      </main>

      <footer className="mt-12 border-t pt-6">
        <div className="flex justify-between">
            <Link href="/materials/semester-1/unit-1/lesson-1/part-7" passHref>
                <Button size="lg" variant="outline">
                <ArrowRight className="ml-2 h-5 w-5" />
                الجزء السابق
                </Button>
            </Link>
            <Link href="/materials/semester-1/unit-1/lesson-1/part-9" passHref>
                <Button size="lg">
                الجزء التالي: قانون دالتون
                <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
            </Link>
        </div>
      </footer>
    </div>
  );
}
