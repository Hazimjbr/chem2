'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, CheckSquare, Clock, ShieldCheck, BarChart, Library, Zap, Target } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useApp } from '@/context/CurriculumContext';
import { units } from '@/data/materials';

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
  const [lastVisitedLesson, setLastVisitedLesson] = useState('/materials/semester-1');
  const [nextStep, setNextStep] = useState<NextStep | null>(null);
  const { currentUser } = useApp();

  useEffect(() => {
    const savedLesson = localStorage.getItem('lastVisitedLesson');
    if (savedLesson) {
      setLastVisitedLesson(savedLesson);
    }
    
    // Logic to find the next step
    try {
        const savedProgress = localStorage.getItem('completedLessons');
        const completedLessons = new Set(savedProgress ? JSON.parse(savedProgress) : []);
        
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
                    break; // Exit inner loop
                 }
            }
            if (firstUncompletedPart) break; // Exit outer loop
        }
        setNextStep(firstUncompletedPart);
    } catch(e) {
        console.error("Failed to calculate next step", e);
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
