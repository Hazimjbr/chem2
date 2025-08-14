'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, X, BookCopy, Thermometer, Box, Lightbulb, HelpCircle, ArrowRight, GitCompare, Cpu } from 'lucide-react';
import Quiz from './quiz';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';

const lessonContent = `<p>بعد أن درسنا كيف تتغير متغيرات الغاز كل على حدة، يجمع القانون الجامع للغازات قوانين بويل وشارل وجاي-لوساك في علاقة واحدة قوية تصف سلوك الغاز عندما تتغير جميع المتغيرات الثلاثة (الضغط، الحجم، والحرارة) في آن واحد.</p>`;

export default function LessonPartPage() {
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
        <p className="text-lg text-muted-foreground">القانون الجامع للغازات</p>
      </header>

      <main className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>الفكرة الرئيسة</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg">
                يصف القانون الجامع للغازات العلاقة بين ضغط كمية محددة من الغاز المحصور وحجمها ودرجة حرارتها المطلقة، ويوحد قوانين بويل وشارل وجاي-لوساك.
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
                    أستخدم القانون الجامع للغازات في حل المسائل الحسابية التي تربط بين الضغط والحجم ودرجة الحرارة.
                    </span>
                </li>
                </ul>
            </CardContent>
        </Card>

        <article 
          className="prose prose-lg max-w-none text-foreground"
          dangerouslySetInnerHTML={{ __html: lessonContent }}
        />

        <div className="space-y-8">

             <FlippableCard
                cardTitle="نص القانون الجامع للغازات"
                cardIcon={<BookCopy className="h-6 w-6" />}
            >
                 <div className="space-y-3">
                    <blockquote className="border-r-4 border-primary pr-4">
                        "لكمية ثابتة من الغاز، فإن حاصل ضرب ضغط الغاز في حجمه مقسومًا على درجة حرارته المطلقة يساوي قيمة ثابتة."
                    </blockquote>
                    <p className='text-xs mt-2 text-muted-foreground italic border-t pt-2'>
                        هذا القانون مفيد للغاية لأنه لا يتطلب ثبات أي من المتغيرات الثلاثة، مما يجعله قابلًا للتطبيق في العديد من السيناريوهات الواقعية.
                    </p>
                </div>
            </FlippableCard>

             <FlippableCard
                cardTitle="العلاقة الرياضية"
                cardIcon={<Cpu className="h-6 w-6" />}
            >
               <div className="space-y-4">
                  <p>يمكن اشتقاق القانون الجامع من دمج القوانين الثلاثة السابقة، وتكون العلاقة الرياضية له كالتالي:</p>
                  <div dir="ltr" className="text-left"><BlockMath math="\frac{P \cdot V}{T} = k" /></div>
                  <p>هذه العلاقة تسمح لنا بمقارنة حالة الغاز الابتدائية (1) بحالته النهائية (2) عندما تتغير الظروف:</p>
                  <div dir="ltr" className="text-left"><BlockMath math="\frac{P_1V_1}{T_1} = \frac{P_2V_2}{T_2}" /></div>
                  <p className="text-sm text-muted-foreground" dir="rtl">
                      حيث <InlineMath math="P, V, T" /> هي الضغط والحجم ودرجة الحرارة المطلقة (بالكلفن) على التوالي.
                  </p>
              </div>
            </FlippableCard>
            
            <Card>
                <CardHeader>
                    <CardTitle>مثال محلول</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">
                        عينة من غاز الهيليوم حجمها <InlineMath math="2.0L" /> عند ضغط <InlineMath math="1.5atm" /> ودرجة حرارة <InlineMath math="27^\circ\text{C}" />. إذا تم ضغط الغاز إلى حجم <InlineMath math="1.0L" /> وارتفعت درجة حرارته إلى <InlineMath math="127^\circ\text{C}" />، فما هو الضغط الجديد؟
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                        <p><strong className="text-accent">المعطيات</strong></p>
                        <div className='grid grid-cols-2 gap-x-4' dir="ltr">
                            <p><InlineMath math="P_1 = 1.5\text{atm}" /></p>
                            <p><InlineMath math="P_2 = ?" /></p>
                            <p><InlineMath math="V_1 = 2.0\text{L}" /></p>
                            <p><InlineMath math="V_2 = 1.0\text{L}" /></p>
                            <p><InlineMath math="T_1 = 27^\circ\text{C}" /></p>
                             <p><InlineMath math="T_2 = 127^\circ\text{C}" /></p>
                        </div>
                        <p><strong className="text-accent">الحل</strong></p>
                        <ol className="list-decimal mr-6 text-sm space-y-2">
                            <li>نحول درجات الحرارة إلى كلفن.
                                <div className="text-left" dir="ltr"><BlockMath math="T_1(K) = 27 + 273 = 300\text{K}" /></div>
                                <div className="text-left" dir="ltr"><BlockMath math="T_2(K) = 127 + 273 = 400\text{K}" /></div>
                            </li>
                            <li>نكتب القانون الجامع للغازات.
                                <div className="text-left" dir="ltr"><BlockMath math="\frac{P_1V_1}{T_1} = \frac{P_2V_2}{T_2}" /></div>
                            </li>
                            <li>نعيد ترتيب المعادلة لحل <InlineMath math="P_2" />.
                                <div className="text-left" dir="ltr"><BlockMath math="P_2 = \frac{P_1V_1T_2}{T_1V_2}" /></div>
                            </li>
                            <li>نعوض القيم.
                                <div className="text-left" dir="ltr"><BlockMath math="P_2 = \frac{(1.5\text{atm}) \cdot (2.0\text{L}) \cdot (400\text{K})}{(300\text{K}) \cdot (1.0\text{L})}" /></div>
                            </li>
                            <li>نحسب الناتج.
                                <div className="text-left" dir="ltr"><BlockMath math="P_2 = 4.0\text{atm}" /></div>
                            </li>
                        </ol>
                        <div className="border-t pt-3">
                            <p className="text-sm font-semibold">
                            الجواب: الضغط الجديد للغاز هو <InlineMath math="4.0\text{atm}" />.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
        
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
                  question="عينة من غاز حجمها 5L وضغطها 1.8atm عند درجة حرارة 25°C فإذا انخفضت درجة حرارتها بمقدار 10 درجات وأصبح ضغطها 0.8atm فإن حجمها بوحدة L يساوي"
                  options={[
                      "10.9",
                      "10.7",
                      "6.8",
                      "4.5"
                  ]}
                  correctAnswerIndex={0}
                  explanation="T₁=25+273=298K, T₂=(25-10)+273=288K, P₁=1.8atm, V₁=5L, P₂=0.8atm. نطبق القانون الجامع: V₂ = (P₁V₁T₂)/(P₂T₁) = (1.8 * 5 * 288) / (0.8 * 298) ≈ 10.9L."
              />
               <InteractiveQuestionCard 
                  question="عينة من الهواء حجمها 4L وضغطها 202.6kPa عند درجة حرارة 20°C فإذا أصبحت حرارتها 278K وحجمها 2500ml فإن ضغطها بوحدة atm يساوي"
                  options={[
                      "200",
                      "1",
                      "3",
                      "4"
                  ]}
                  correctAnswerIndex={2}
                  explanation="نوحد الوحدات: V₁=4L, P₁=202.6/101.3=2atm, T₁=20+273=293K. V₂=2.5L, T₂=278K. نطبق القانون الجامع: P₂=(P₁V₁T₂)/(T₁V₂) = (2*4*278)/(293*2.5) ≈ 3.03atm. أقرب إجابة هي 3atm."
              />
          </div>
        </div>


        <Card>
          <CardHeader>
              <CardTitle>اختبر فهمك</CardTitle>
              <CardDescription>
                  بعد أن تعرفت على القانون الجامع للغازات، اختبر فهمك له من خلال هذا الاختبار القصير.
              </CardDescription>
          </CardHeader>
          <CardContent>
              <Quiz lessonContent={lessonContent} />
          </CardContent>
        </Card>
      </main>

      <footer className="mt-12 border-t pt-6">
        <div className="flex justify-between">
            <Link href="/materials/semester-1/unit-1/lesson-1/part-5" passHref>
                <Button size="lg" variant="outline">
                <ArrowRight className="ml-2 h-5 w-5" />
                الجزء السابق
                </Button>
            </Link>
            <Link href="/materials/semester-1/unit-1/lesson-1/part-7" passHref>
                <Button size="lg">
                الجزء التالي: قانون أفوجادرو
                <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
            </Link>
        </div>
      </footer>
    </div>
  );
}
