
'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TestTubeDiagonal, Target, FlaskConical, AlertTriangle, ListOrdered, Beaker, CheckSquare, Wind } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import CharlesLawQuiz from '@/app/experiments/charles-law/quiz';
import BoylesLawQuiz from '../boyles-law/quiz';
import DiverBubbleDiagram from '@/components/illustrations/diver-bubble-diagram';

const CharlesLawDiagram = dynamic(() => import('@/app/experiments/charles-law/diagram'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="h-[300px] w-full rounded-lg" />
      <Skeleton className="h-12 w-full" />
    </div>
  ),
});

const BoylesLawDiagram = dynamic(() => import('../boyles-law/diagram'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="h-[350px] w-full rounded-lg" />
      <Skeleton className="h-12 w-full" />
    </div>
  ),
});


export default function ExperimentPage({ params }: { params: { id: string } }) {
  const { id } = params;

  if (id === 'boyles-law') {
    return (
     <div className="p-4 md:p-8 relative">
       <Link href="/experiments" passHref>
          <Button variant="ghost" size="icon" className="absolute top-4 left-4">
            <X className="h-6 w-6" />
            <span className="sr-only">إغلاق</span>
          </Button>
        </Link>
      <header className="mb-10 text-center">
        <p className="text-lg text-muted-foreground">التجربة 1</p>
        <h1 className="text-4xl font-bold text-primary mb-2">
            قانون بويل
        </h1>
        <CardDescription>العلاقة بين حجم الغاز وضغطه عند ثبات درجة الحرارة</CardDescription>
      </header>

      <main className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><TestTubeDiagonal className="h-6 w-6 text-primary" /> الخلفية العلمية</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                        يُعَدُّ العالم بويل من أوائل العلماء الذين بحثوا في خصائص الغازات إذ درس العلاقة بين حجم كمية محددة من الغاز المحصور والضغط المؤثر فيه عند ثبات درجة حرارته توصَّل من ذلك إلى العلاقة التي سُمِّيت قانون بويل وينص على أن "حجم كميّة محدّدة من الغاز المحصور يتناسب تناسبًا عكسيًا مع الضغط المؤثر فيه عند ثبات درجة حرارته"
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Target className="h-6 w-6 text-primary" /> الهدف</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                        أستقصي العلاقة بين حجم الغاز وضغطه عند ثبات درجة حرارته
                        </p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-6 w-6 text-destructive" /> إرشادات السلامة</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2">
                            <li>توضح هذه المحاكاة استخدام الزئبق وهو مادة سامة يجب التعامل معه بحذر شديد في المختبر الحقيقي</li>
                            <li>أرتدي معطف المختبر والنظارات الواقية والقفازات عند التعامل مع المواد الكيميائية</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Beaker className="h-6 w-6 text-primary" /> محاكاة التجربة</CardTitle>
                    <CardDescription>حرّك المنزلق لتغيير الضغط ولاحظ ما يحدث لحجم الغاز</CardDescription>
                </CardHeader>
                <CardContent>
                    <BoylesLawDiagram />
                </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wind className="h-6 w-6 text-primary" /> مثال من عالمنا فقاعة الغواص</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <DiverBubbleDiagram />
                    <div className="w-full md:w-1/2 space-y-3">
                        <p>
                            تخيل غواصًا يطلق فقاعة هواء في أعماق البحر
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-sm">
                            <li><strong className="text-accent">في الأعماق</strong> يكون ضغط الماء هائلاً مما يجبر فقاعة الهواء على أن تكون صغيرة الحجم</li>
                            <li><strong className="text-primary">أثناء الصعود</strong> كلما ارتفعت الفقاعة نحو السطح يقل ضغط الماء عليها</li>
                            <li><strong className="text-foreground">النتيجة</strong> يتمدد الغاز داخل الفقاعة ويزداد حجمها بشكل كبير تمامًا كما ينص قانون بويل</li>
                        </ul>
                         <p className="text-xs text-muted-foreground pt-2 border-t">هذا المثال يوضح أن العلاقة بين الضغط والحجم عكسية عندما يقل أحدهما يزداد الآخر</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-2"><CheckSquare className="h-6 w-6 text-primary" /> اختبر استنتاجك</CardTitle>
               <CardDescription>
                  أجب عن الأسئلة التالية للتأكد من فهمك لنتائج التجربة
                </CardDescription>
          </CardHeader>
          <CardContent>
              <BoylesLawQuiz />
          </CardContent>
        </Card>
      </main>
    </div>
    );
  }

  return (
    <div className="p-4 md:p-8 relative">
       <Link href="/experiments" passHref>
          <Button variant="ghost" size="icon" className="absolute top-4 left-4">
            <X className="h-6 w-6" />
            <span className="sr-only">إغلاق</span>
          </Button>
        </Link>
      <header className="mb-10 text-center">
        <p className="text-lg text-muted-foreground">تجربة استهلالية</p>
        <h1 className="text-4xl font-bold text-primary mb-2">
            العلاقة بين حجم الغاز ودرجة حرارته عند ثبات الضغط
        </h1>
      </header>

      <main className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><TestTubeDiagonal className="h-6 w-6 text-primary" /> الخلفية العلمية</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                        كان العالم شارل مِنَ المُهتمين بالمناطيد والبالونات وهو أوَّلُ مَنِ استخدم غاز الهيدروجين لملئها وقد درس العلاقة بين حجم الغاز ودرجة حرارته عند ثبات الضغط وتوصل من تجاربه إلى أنّ: "حجم كمية محددة من الغاز المحصور يتناسب تناسبًا طرديًا مع درجة حرارته عند ثبات ضغطه"
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Target className="h-6 w-6 text-primary" /> الهدف</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                        أستكشف العلاقة بين حجم الغاز ودرجة حرارته عند ثبات الضغط
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><FlaskConical className="h-6 w-6 text-primary" /> المواد والأدوات</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>بالونان وقلم تخطيط ومتر مصنوع من القماش أو الورق وحمام ثلجي وحمام مائي ساخن</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-6 w-6 text-destructive" /> إرشادات السلامة</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2">
                            <li>أتَّبع إرشادات السلامة العامة في المختبر</li>
                            <li>أرتدي معطف المختبر والنظارات الواقية والقفازات</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Beaker className="h-6 w-6 text-primary" /> محاكاة التجربة</CardTitle>
                </CardHeader>
                <CardContent>
                    <CharlesLawDiagram />
                </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><ListOrdered className="h-6 w-6 text-primary" /> خطوات العمل</CardTitle>
            </CardHeader>
            <CardContent>
                <ol className="list-decimal list-inside space-y-4">
                    <li>أحضر بالونين وأنفخهما وأربط فوّهة كل منهما جيّدًا ثم أرسم باستخدام القلم دائرة على كل منهما</li>
                    <li>أقيس محيط كل منهما ثم أُسَجِّله</li>
                    <li>**أُجَرِّبُ:** أضعُ أحد البالونين في حمام ثلجي والآخر في حمام مائي ساخن مدة 10 دقائق</li>
                    <li>**أقيس:** أُخرِجُ البالونين وأقيس محيط كُلِّ منهما مباشرةً ثمّ أُسَجِّل ملاحظاتي</li>
                </ol>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-2"><CheckSquare className="h-6 w-6 text-primary" /> اختبر استنتاجك</CardTitle>
               <CardDescription>
                  أجب عن الأسئلة التالية للتأكد من فهمك لنتائج التجربة
                </CardDescription>
          </CardHeader>
          <CardContent>
              <CharlesLawQuiz />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
