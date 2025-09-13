'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Zap, Target } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useApp } from '@/context/CurriculumContext';
import { calculateNextStep } from '@/lib/utils';
import type { NextStep } from '@/lib/utils';
import ProgressCard from '@/components/progress-card';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const [lastVisitedLesson, setLastVisitedLesson] = useState('/materials/semester-1');
  const [nextStep, setNextStep] = useState<NextStep | null>(null);
  const { currentUser, isLoading: isAppLoading, userProgress } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!isAppLoading && !currentUser) {
        router.push('/');
        return;
    }

    if (currentUser && userProgress) {
      const nextStepInfo = calculateNextStep(userProgress);
      setNextStep(nextStepInfo);
    }
    
    const savedLesson = localStorage.getItem('lastVisitedLesson');
    if (savedLesson) {
      setLastVisitedLesson(savedLesson);
    }
  }, [currentUser, isAppLoading, router, userProgress]);
  
  if (isAppLoading || !currentUser) {
     return (
        <div className="flex justify-center items-center min-h-screen">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
    )
  }

  const studentName = currentUser?.role === 'student'
    ? currentUser.displayName
    : currentUser?.email?.split('@')[0];

  return (
    <div className="container mx-auto p-8">
       <section className="text-center py-10">
        <h1 className="text-5xl font-bold mb-4">
          أهلاً بك{' '}
          <span className="text-accent">{studentName}</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          خططك أمامك التزامك قرارك
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/performance-analysis" passHref>
            <Button size="lg">
              <BarChart className="ml-2" />
              عرض لوحة معلوماتي
            </Button>
          </Link>
        </div>
      </section>

      <section className="pb-16">
        <h2 className="text-3xl font-bold text-center mb-8">لوحة تحكم سريعة</h2>
        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          
          <ProgressCard lastVisitedLesson={lastVisitedLesson} />

          {nextStep && (
            <Card className={nextStep.type === 'weak' ? 'bg-yellow-50 border-yellow-300' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {nextStep.type === 'weak' ? (
                        <><Target className="text-yellow-800" /> <span className="text-yellow-800">نقطة للتركيز</span></>
                    ) : (
                        <>{nextStep.totalParts! - nextStep.completedParts! === 1 ? <Zap /> : <Target />} <span>خطوتك التالية</span></>
                    )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {nextStep.type === 'weak' ? (
                    <>
                        <p className="text-yellow-700 mb-4">
                            لاحظنا أن أداءك كان ضعيفًا في درس <strong className="text-foreground">{nextStep.lessonTitle}</strong>. لم لا تراجعه؟ نتيجتك كانت <strong className="font-mono">{nextStep.score}%</strong>.
                        </p>
                         <Link href={nextStep.path} passHref>
                            <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                                راجع الدرس الآن
                            </Button>
                        </Link>
                    </>
                ) : (
                    <>
                         {nextStep.totalParts! - nextStep.completedParts! === 1 ? (
                            <p className="text-muted-foreground mb-4">
                                رائع! تبقى لك جزء واحد فقط لإتمام درس <strong className="text-foreground">{nextStep.lessonTitle}</strong>.
                            </p>
                        ) : (
                            <p className="text-muted-foreground mb-4">
                                أكملت <strong className="text-foreground">{nextStep.completedParts}</strong> من <strong className="text-foreground">{nextStep.totalParts}</strong> أجزاء في درس <strong className="text-foreground">{nextStep.lessonTitle}</strong>.
                            </p>
                        )}
                        <Link href={nextStep.path} passHref>
                            <Button>
                                {nextStep.totalParts! - nextStep.completedParts! === 1 ? 'إنجاز المهمة' : 'أكمل الدرس'}
                            </Button>
                        </Link>
                    </>
                )}
              </CardContent>
            </Card>
          )}

        </div>
      </section>
    </div>
  );
}
