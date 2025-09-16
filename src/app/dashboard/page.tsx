
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Zap, Target } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useApp } from '@/context/CurriculumContext';
import ProgressCard from '@/components/progress-card';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const [lastVisitedLesson, setLastVisitedLesson] = useState('/materials/semester-1');
  const { currentUser, isLoading: isAppLoading } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!isAppLoading && !currentUser) {
        router.push('/');
        return;
    }
    
    const savedLesson = localStorage.getItem('lastVisitedLesson');
    if (savedLesson) {
      setLastVisitedLesson(savedLesson);
    }
  }, [currentUser, isAppLoading, router]);
  
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

      <section className="pb-16 pt-8">
        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          
          <ProgressCard lastVisitedLesson={lastVisitedLesson} />

        </div>
      </section>
    </div>
  );
}
