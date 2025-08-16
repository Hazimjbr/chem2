
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, X, BookCopy, Cpu, Lightbulb, ArrowRight, Wind, Waves } from 'lucide-react';
import Quiz from './quiz';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';
import InteractiveQuestionCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/interactive-question-card';
import { InlineMath, BlockMath } from 'react-katex';

const lessonContent = `<p>آخر قانون في رحلتنا مع الغازات هو قانون جراهام، الذي يصف ظاهرة مهمة جدًا وهي سرعة حركة الغازات. هل تساءلت يومًا لماذا نشم رائحة عطر في أحد أركان الغرفة بعد فترة قصيرة من رشه في الركن الآخر؟ قانون جراهام يجيب على هذا السؤال.</p>`;

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
        <p className="text-lg text-muted-foreground">قانون جراهام للانتشار والتدفق</p>
      </header>

      <main className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>الفكرة الرئيسة</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg">
                عند نفس الظروف من الحرارة والضغط، يتناسب معدل سرعة انتشار أو تدفق الغاز تناسبًا عكسيًا مع الجذر التربيعي لكتلته المولية. ببساطة: الغازات الأخف هي الأسرع.
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
                        <span>أقارن بين معدل سرعة تدفق غازين مختلفين.</span>
                    </li>
                     <li className="flex items-start">
                        <Check className="h-6 w-6 text-green-500 ml-2 flex-shrink-0" />
                        <span>أحل مسائل حسابية على قانون جراهام.</span>
                    </li>
                </ul>
            </CardContent>
        </Card>

        <article 
          className="prose prose-lg max-w-none text-foreground"
          dangerouslySetInnerHTML={{ __html: lessonContent }}
        />

        <div className="space-y-8">
             <div className="grid md:grid-cols-2 gap-6">
                <FlippableCard
                    cardTitle="الانتشار (Diffusion)"
                    cardIcon={<Waves className="h-6 w-6" />}
                >
                    <div className="space-y-3 text-sm">
                        <p className="font-semibold">هو الاختلاط التدريجي لجسيمات غاز مع جسيمات غاز آخر.</p>
                        <ul className="list-disc mr-4 space-y-2">
                            <li>تنتقل الجسيمات من منطقة التركيز المرتفع إلى منطقة التركيز المنخفض.</li>
                            <li>تستمر الحركة حتى يتوزع الغاز بشكل متساوٍ في الوعاء.</li>
                            <li>مثال: انتشار رائحة الطعام في المنزل.</li>
                        </ul>
                    </div>
                </FlippableCard>

                <FlippableCard
                    cardTitle="التدفق (Effusion)"
                    cardIcon={<Wind className="h-6 w-6" />}
                >
                    <div className="space-y-3 text-sm">
                        <p className="font-semibold">هو عملية تسرب غاز مضغوط من خلال فتحة صغيرة جدًا.</p>
                         <ul className="list-disc mr-4 space-y-2">
                            <li>يحدث عندما يكون ضغط الغاز داخل الوعاء أعلى من الضغط خارجه.</li>
                            <li>مثال: تسرب الهواء من ثقب صغير في إطار سيارة.</li>
                        </ul>
                    </div>
                </FlippableCard>
            </div>
            
            <FlippableCard
                cardTitle="نص قانون جراهام"
                cardIcon={<BookCopy className="h-6 w-6" />}
            >
                 <div className="space-y-3">
                    <blockquote className="border-r-4 border-primary pr-4">
                        "يتناسب معدل سرعة انتشار (أو تدفق) الغاز عكسيًا مع الجذر التربيعي لكتلته المولية عند ثبات درجة الحرارة والضغط."
                    </blockquote>
                </div>
            </FlippableCard>

             <FlippableCard
                cardTitle="العلاقة الرياضية"
                cardIcon={<Cpu className="h-6 w-6" />}
            >
               <div className="space-y-4 text-center">
                  <p>يمكن التعبير عن العلاقة بين معدل سرعة الانتشار (<span dir="ltr"><InlineMath math="r"/></span>) والكتلة المولية (<span dir="ltr"><InlineMath math="Mr"/></span>) كالتالي:</p>
                  <div dir="ltr"><BlockMath String.raw`r \propto \frac{1}{\sqrt{Mr}}` /></div>
                  <p>لمقارنة معدل انتشار غازين (A و B)، نستخدم النسبة التالية:</p>
                   <div dir="ltr"><BlockMath String.raw`\frac{r_A}{r_B} = \sqrt{\frac{Mr_B}{Mr_A}}` /></div>
                    <p className="text-sm text-muted-foreground">لاحظ أن النسبة مقلوبة تحت الجذر بسبب العلاقة العكسية.</p>
              </div>
            </FlippableCard>

             <Card>
                <CardHeader>
                    <CardTitle>مثال محلول</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">
                        <span>قارن بين معدل سرعة انتشار غازي الهيدروجين (<span dir="ltr" className="inline-block"><InlineMath math="H_2"/></span>) والأكسجين (<span dir="ltr" className="inline-block"><InlineMath math="O_2"/></span>) عند نفس الظروف. (الكتل المولية: H=1, O=16)</span>
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                         <div>
                            <p><strong className="text-accent">الحل:</strong></p>
                            <ol className="list-decimal mr-6 text-sm space-y-2">
                                <li>
                                    <span>نحسب الكتل المولية للغازين:</span>
                                    <div className="text-left" dir="ltr"><BlockMath String.raw`Mr(H_2) = 2 \times 1 = 2 \, g/mol` /></div>
                                    <div className="text-left" dir="ltr"><BlockMath String.raw`Mr(O_2) = 2 \times 16 = 32 \, g/mol` /></div>
                                </li>
                                <li>
                                    <span>نكتب قانون جراهام للمقارنة:</span>
                                    <div className="text-left" dir="ltr"><BlockMath String.raw`\frac{r_{H_2}}{r_{O_2}} = \sqrt{\frac{Mr_{O_2}}{Mr_{H_2}}}` /></div>
                                </li>
                                <li>
                                    <span>نعوض القيم:</span>
                                    <div className="text-left" dir="ltr"><BlockMath String.raw`\frac{r_{H_2}}{r_{O_2}} = \sqrt{\frac{32}{2}} = \sqrt{16} = 4` /></div>
                                </li>
                                <li>
                                    <span>الاستنتاج: <BlockMath String.raw`r_{H_2} = 4 \times r_{O_2}` /></span></li>
                            </ol>
                        </div>
                         <div className="border-t pt-3">
                            <p className="text-sm font-semibold">
                            الجواب: معدل سرعة انتشار غاز الهيدروجين أسرع بـ 4 مرات من معدل سرعة انتشار غاز الأكسجين لأنه أخف بكثير.
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
                  question={<><span>أي الغازين أسرع انتشارًا: الأمونيا (<span dir="ltr"><InlineMath math="NH_3"/></span>) أم كلوريد الهيدروجين (<span dir="ltr"><InlineMath math="HCl"/></span>)؟ (الكتل المولية: N=14, H=1, Cl=35.5)</span></>}
                  options={[
                      "الأمونيا أسرع",
                      "كلوريد الهيدروجين أسرع",
                      "لهما نفس السرعة",
                      "لا يمكن التحديد"
                  ]}
                  correctAnswerIndex={0}
                  explanation="الكتلة المولية لـ NH₃ ≈ 17g/mol، بينما لـ HCl ≈ 36.5g/mol. بما أن الأمونيا أخف (كتلتها المولية أقل)، فهي الأسرع انتشارًا وفقًا لقانون جراهام."
              />
               <InteractiveQuestionCard 
                  question={<><span>إذا كان معدل انتشار غاز مجهول هو نصف معدل انتشار غاز الميثان (<span dir="ltr"><InlineMath math="CH_4"/></span>، كتلته المولية 16g/mol)، فما هي الكتلة المولية للغاز المجهول؟</span></>}
                  options={[
                      "8g/mol",
                      "32g/mol",
                      "64g/mol",
                      "4g/mol"
                  ]}
                  correctAnswerIndex={2}
                  explanation="(r_X / r_CH4)² = Mr_CH4 / Mr_X. لدينا r_X = 0.5 * r_CH4. إذن (0.5)² = 16 / Mr_X. ومنها 0.25 = 16 / Mr_X. وبالتالي Mr_X = 16 / 0.25 = 64g/mol."
              />
          </div>
        </div>


        <Card>
          <CardHeader>
              <CardTitle>اختبر فهمك</CardTitle>
              <CardDescription>
                  بعد أن تعرفت على قانون جراهام، اختبر فهمك له من خلال هذا الاختبار القصير.
              </CardDescription>
          </CardHeader>
          <CardContent>
              <Quiz lessonContent={lessonContent} />
          </CardContent>
        </Card>
      </main>

      <footer className="mt-12 border-t pt-6">
        <div className="flex justify-between">
            <Link href="/materials/semester-1/unit-1/lesson-1/part-9" passHref>
                <Button size="lg" variant="outline">
                <ArrowRight className="ml-2 h-5 w-5" />
                الجزء السابق
                </Button>
            </Link>
            <Link href="/materials/semester-1/unit-1/lesson-2/part-1" passHref>
                <Button size="lg">
                الدرس التالي: الحالة السائلة
                <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
            </Link>
        </div>
      </footer>
    </div>
  );
}
