
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, BarChart, Zap, Target } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useApp } from '@/context/CurriculumContext';
import { calculateNextStep } from '@/lib/utils';
import type { NextStep } from '@/lib/utils';
import ProgressCard from '@/components/progress-card';
import { getUserProgress } from '@/lib/firebase/progress.actions';

export default function MainAppContent() {
  const [lastVisitedLesson, setLastVisitedLesson] = useState('/materials/semester-1');
  const [nextStep, setNextStep] = useState<NextStep | null>(null);
  const { currentUser } = useApp();

  useEffect(() => {
    const fetchProgress = async () => {
        if (!currentUser) return;
        
        const progressData = await getUserProgress(currentUser.uid);
        const completedLessons = new Set(progressData?.completedLessons || []);
        
        const nextStepInfo = calculateNextStep(completedLessons);
        setNextStep(nextStepInfo);
    };

    fetchProgress();
    const savedLesson = localStorage.getItem('lastVisitedLesson');
    if (savedLesson) {
      setLastVisitedLesson(savedLesson);
    }
  }, [currentUser]);
  
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
          
          {currentUser && <ProgressCard lastVisitedLesson={lastVisitedLesson} />}

          {nextStep && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {nextStep.totalParts - nextStep.completedParts === 1 ? <Zap /> : <Target />}
                  خطوتك التالية
                </CardTitle>
              </CardHeader>
              <CardContent>
                {nextStep.totalParts - nextStep.completedParts === 1 ? (
                  <p className="text-muted-foreground mb-4">
                    رائع! تبقى لك جزء واحد فقط لإتمام درس <strong className="text-foreground">{nextStep.lessonTitle}</strong>.
                  </p>
                ) : (
                  <p className="text-muted-foreground mb-4">
                    أكملت <strong className="text-foreground">{nextStep.completedParts}</strong> من <strong className="text-foreground">{nextStep.totalParts}</strong> أجزاء في درس <strong className="text-foreground">{nextStep.lessonTitle}</strong>.
                  </p>
                )}
                <Link href={nextStep.nextPartPath} passHref>
                  <Button>
                    {nextStep.totalParts - nextStep.completedParts === 1 ? 'إنجاز المهمة' : 'أكمل الدرس'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

        </div>
      </section>
    </div>
  );
}
