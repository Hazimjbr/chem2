
'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TestTubeDiagonal, Target, FlaskConical, AlertTriangle, ListOrdered, Beaker, CheckSquare } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Quiz from './quiz';


const Diagram = dynamic(() => import('./diagram'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center gap-4">
      <Skeleton className="h-[300px] w-full rounded-lg" />
      <Skeleton className="h-12 w-full" />
    </div>
  ),
});


export default function ExperimentPage() {
  return (
    <div className="container mx-auto p-8 relative">
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
                        كان العالم شارل مِنَ المُهتمين بالمناطيد والبالونات وهو أوَّلُ مَنِ استخدم غاز الهيدروجين لملئها وقد درس العلاقة بين حجم الغاز ودرجة حرارته عند ثبات الضغط وتوصل من تجاربه إلى أنّ "حجم كمية محددة من الغاز المحصور يتناسب تناسبًا طرديًا مع درجة حرارته عند ثبات ضغطه"
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
                        <p>بالونان قلم تخطيط متر مصنوع من القماش أو الورق حمام ثلجي حمام مائي ساخن</p>
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
                    <Diagram />
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
                    <li>**أُجَرِّبُ** أضعُ أحد البالونين في حمام ثلجي والآخر في حمام مائي ساخن مدة 10 دقائق</li>
                    <li>**أقيس** أُخرِجُ البالونين وأقيس محيط كُلِّ منهما مباشرةً ثمّ أُسَجِّل ملاحظاتي</li>
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
              <Quiz />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
