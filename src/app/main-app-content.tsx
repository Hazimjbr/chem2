
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, CheckSquare, Clock, ShieldCheck, BarChart, Library, Zap, Target, Award, Percent, BookCheck as BookCheckIcon } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useApp } from '@/context/CurriculumContext';
import { units } from '@/data/materials';
import type { QuizResult } from '@/components/quiz';
import { getUserProgress } from '@/lib/firebase/progress.actions';
import ProgressCard from '@/components/progress-card';

interface NextStep {
    lessonTitle: string;
    nextPartPath: string;
    completedParts: number;
    totalParts: number;
}

const constructPath = (unitId: string, lesson: any, part: any) => {
    const unitNum = unitId.replace('unit-', '');
    let path = `/materials/semester-1/unit-${unitNum}`;
    if (lesson.lessonNum) {
        path += `/lesson-${lesson.lessonNum}`;
    } else if (lesson.sectionNum) {
        path += `/section-${lesson.sectionNum}`;
    }
    if (part.partNum) {
        path += `/part-${part.partNum}`;
    }
    return path;
}


export default function MainAppContent() {
  const [lastVisitedLesson, setLastVisitedLesson] = useState('/materials/semester-1/unit-1/lesson-1/part-1');
  const [nextStep, setNextStep] = useState<NextStep | null>(null);
  const { currentUser } = useApp();

  useEffect(() => {
    const fetchProgress = async () => {
        if (!currentUser) return;
        
        const progressData = await getUserProgress(currentUser.uid);
        const completedLessons = new Set(progressData?.completedLessons || []);
        
        // --- Next Step Logic ---
        let firstUncompletedPart: NextStep | null = null;
        for (const unit of units) {
            for (const lesson of unit.lessons) {
                 if (lesson.parts.length === 0) continue;
                 let completedInThisLesson = 0;
                 let firstUncompletedPathInThisLesson = '';
                 for (const part of lesson.parts) {
                    const path = constructPath(unit.id, lesson, part);
                    if (completedLessons.has(path)) {
                        completedInThisLesson++;
                    } else if (!firstUncompletedPathInThisLesson) {
                        firstUncompletedPathInThisLesson = path;
                    }
                 }
                 if (firstUncompletedPathInThisLesson) {
                    firstUncompletedPart = {
                        lessonTitle: lesson.title,
                        nextPartPath: firstUncompletedPathInThisLesson,
                        completedParts: completedInThisLesson,
                        totalParts: lesson.parts.length,
                    };
                    break;
                 }
            }
            if (firstUncompletedPart) break;
        }
        setNextStep(firstUncompletedPart);
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
              عرض لوحة معلوماتي
            </Button>
          </Link>
        </div>
      </section>

      <section className="pb-16">
        <h2 className="text-3xl font-bold text-center mb-8">لوحة تحكم سريعة</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          <div className="lg:col-span-1">
             {currentUser && <ProgressCard lastVisitedLesson={lastVisitedLesson} />}
          </div>

          <div className="lg:col-span-1">
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

        </div>
      </section>
    </div>
  );
}
