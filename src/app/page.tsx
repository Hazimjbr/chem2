
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckSquare, Clock } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [lastVisitedLesson, setLastVisitedLesson] = useState('/materials/semester-1');

  useEffect(() => {
    const savedLesson = localStorage.getItem('lastVisitedLesson');
    if (savedLesson) {
      setLastVisitedLesson(savedLesson);
    }
  }, []);

  return (
    <div className="container mx-auto p-8">
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4">
          أهلاً بك في ChemInteractive
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          منصتك التفاعلية لإتقان كيمياء التوجيهي الأردني بأحدث الطرق التعليمية
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/materials/semester-1" passHref>
            <Button size="lg" variant="default">
              <BookOpen className="ml-2" />
              ابدأ التعلم
            </Button>
          </Link>
          <Link href="/quizzes" passHref>
            <Button size="lg" variant="outline">
              <CheckSquare className="ml-2" />
              اختبر نفسك
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">لوحة تحكم سريعة</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock />
                أكمل من حيث توقفت
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                الحالة الغازية نظرية الحركة الجزيئية
              </p>
              <Link href={lastVisitedLesson} passHref>
                <Button>متابعة الدرس</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                 <CheckSquare />
                امتحان مقترح
              </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-muted-foreground mb-4">
                اختبر فهمك في وحدة حالات المادة
              </p>
              <Link href="/quizzes" passHref>
                <Button variant="outline">بدء الامتحان</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

       <section className="py-16 border-t">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">مثال على التصميم المتجاوب</h2>
            <p className="text-muted-foreground mt-2">
                قم بتغيير حجم نافذة المتصفح لترى كيف تتكيف هذه الصناديق مع عرض الشاشة
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="h-40 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                (هاتف) عمود 1
            </div>
            <div className="h-40 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center text-lg font-bold">
                (جهاز لوحي) عمود 2
            </div>
            <div className="h-40 rounded-lg bg-accent text-accent-foreground flex items-center justify-center text-lg font-bold lg:col-span-1 md:col-span-2">
                (لابتوب) عمود 3
            </div>
        </div>
        <div className="text-center mt-6 p-4 bg-muted rounded-lg text-sm text-muted-foreground" dir="ltr">
            <p className="font-mono">{`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">`}</p>
            <p className="mt-2 text-right" dir="rtl">
                هذا الكود يخبر المتصفح: استخدم عمودًا واحدًا افتراضيًا (للهواتف)، ثم استخدم عمودين للشاشات المتوسطة (`md`) فما فوق، ثم ثلاثة أعمدة للشاشات الكبيرة (`lg`) فما فوق.
            </p>
        </div>
      </section>
    </div>
  );
}
