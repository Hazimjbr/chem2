'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, CheckSquare, Clock, ShieldCheck, BarChart, Library } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useApp } from '@/context/CurriculumContext';

export default function MainAppContent() {
  const [lastVisitedLesson, setLastVisitedLesson] = useState('/materials/semester-1');
  const { currentUser } = useApp();

  useEffect(() => {
    const savedLesson = localStorage.getItem('lastVisitedLesson');
    if (savedLesson) {
      setLastVisitedLesson(savedLesson);
    }
  }, []);
  
  const studentName = currentUser?.role === 'student'
    ? currentUser.displayName
    : currentUser?.email?.split('@')[0];

  return (
    <div className="container mx-auto p-8">
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4">
          أهلاً بك يا{' '}
          <span className="text-accent">{studentName}</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          منصتك التفاعلية لإتقان الكيمياء بأقوى الطرق التعلمية
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/materials/semester-1" passHref>
            <Button size="lg" variant="default">
              <BookOpen className="ml-2" />
              ابدأ التعلم
            </Button>
          </Link>
           <Link href="/performance-analysis" passHref>
            <Button size="lg" variant="outline">
              <BarChart className="ml-2" />
              حلل أدائي
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-8">لوحة تحكم سريعة</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock />
                أكمل من حيث توقفت
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                الاستمرار في آخر درس قمت بزيارته
              </p>
              <Link href={lastVisitedLesson} passHref>
                <Button>متابعة الدرس</Button>
              </Link>
            </CardContent>
          </Card>
          {currentUser?.role === 'admin' && (
             <Card className="col-span-1 md:col-span-2 lg:col-span-1 border-primary">
                <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                    <ShieldCheck />
                    لوحة تحكم المسؤول
                </CardTitle>
                <CardDescription>
                    إدارة الطلاب والأجهزة والمحتوى
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/admin/dashboard" passHref>
                        <Button variant="default">الانتقال إلى لوحة التحكم</Button>
                    </Link>
                </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
