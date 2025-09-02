
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import PerformanceAnalysisForm from '@/components/performance-analysis-form';
import { useApp } from '@/context/CurriculumContext';
import { useEffect, useState } from 'react';
import type { QuizResult } from '@/components/quiz';
import { units } from '@/data/materials';
import { BarChart, BookX, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WeakestLesson {
    lessonId: string;
    lessonTitle: string;
    score: number;
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

const getLessonTitle = (lessonId: string): string => {
    for (const unit of units) {
        for (const lesson of unit.lessons) {
            for (const part of lesson.parts) {
                const path = constructPath(unit.id, lesson, part);
                if (path === lessonId) {
                    return `${lesson.title} / ${part.title}`;
                }
            }
             if (lesson.sectionNum) {
                 const path = constructPath(unit.id, lesson, {});
                 if (path === lessonId) {
                    return lesson.title;
                 }
            }
        }
    }
    return 'درس غير معروف';
};

export default function PerformanceAnalysisPage() {
    const { currentUser } = useApp();
    const [weakestLesson, setWeakestLesson] = useState<WeakestLesson | null>(null);
    const [performanceData, setPerformanceData] = useState<any[]>([]);
    const [unitProgress, setUnitProgress] = useState<any[]>([]);

    useEffect(() => {
        if (!currentUser) return;

        // --- Weakest Lesson Logic ---
        const historyJSON = localStorage.getItem('quizHistory');
        const allResults: QuizResult[] = historyJSON ? JSON.parse(historyJSON) : [];
        const studentResults = allResults.filter(r => r.studentId === currentUser.uid && r.difficulty > 0.5);

        if (studentResults.length > 0) {
            const weakest = studentResults.reduce((min, current) => current.score < min.score ? current : min, studentResults[0]);
            if (weakest.score < 0.7) { // Only show if score is below 70%
                setWeakestLesson({
                    lessonId: weakest.lessonId,
                    lessonTitle: getLessonTitle(weakest.lessonId),
                    score: Math.round(weakest.score * 100)
                });
            }

            // Format data for chart
            const chartData = studentResults.map(r => ({
                name: new Date(r.timestamp).toLocaleDateString('ar-JO'),
                score: Math.round(r.score * 100),
                lesson: getLessonTitle(r.lessonId),
            }));
            setPerformanceData(chartData);
        }

        // --- Unit Progress Logic ---
        const savedProgress = localStorage.getItem('completedLessons');
        const completedLessons = new Set(savedProgress ? JSON.parse(savedProgress) : []);

        const progress = units.map(unit => {
            const totalParts = unit.lessons.reduce((acc, lesson) => acc + lesson.parts.length, 0);
            if (totalParts === 0) return { title: unit.title, progress: 0 };
            
            const completedPartsInUnit = unit.lessons.reduce((acc, lesson) => {
                const lessonCompletedParts = lesson.parts.filter(part => {
                    const path = constructPath(unit.id, lesson, part);
                    return completedLessons.has(path);
                }).length;
                return acc + lessonCompletedParts;
            }, 0);
            
            return {
                title: unit.title,
                progress: Math.round((completedPartsInUnit / totalParts) * 100)
            };
        });
        setUnitProgress(progress);

    }, [currentUser]);

  return (
    <div className="container mx-auto p-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">لوحة معلوماتي</h1>
        <p className="text-lg text-muted-foreground">
          تابع تقدمك، وحلل أدائك، وحدد نقاط ضعفك لتحسين مستواك
        </p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
           {weakestLesson && (
            <Card className="bg-yellow-50 border-yellow-300">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-800"><Target className="h-6 w-6"/> نقطة للتركيز</CardTitle>
                    <CardDescription className="text-yellow-700">لاحظنا أن أداءك في هذا الدرس كان الأضعف. لم لا تخصص بعض الوقت لمراجعته؟</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <div>
                        <p className="font-bold">{weakestLesson.lessonTitle}</p>
                        <p className="text-sm text-muted-foreground">نتيجتك: {weakestLesson.score}%</p>
                    </div>
                    <Link href={weakestLesson.lessonId}>
                        <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                            راجع الدرس الآن
                        </Button>
                    </Link>
                </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp className="h-6 w-6 text-primary"/> تطور الأداء</CardTitle>
                <CardDescription>مخطط يوضح أداءك في الاختبارات مع مرور الوقت.</CardDescription>
            </CardHeader>
            <CardContent>
                {performanceData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={performanceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} fontSize={12} />
                            <YAxis domain={[0, 100]} unit="%" />
                            <Tooltip
                                contentStyle={{ borderRadius: '0.5rem' }}
                                labelStyle={{ fontWeight: 'bold' }}
                                formatter={(value, name, props) => [`${value}%`, `الدرس: ${props.payload.lesson}`]}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="score" name="النتيجة" stroke="hsl(var(--primary))" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
                        <BookX className="h-12 w-12 mb-4"/>
                        <p>لا توجد بيانات كافية لعرض المخطط.</p>
                        <p className="text-sm">أكمل بعض الاختبارات أولاً.</p>
                    </div>
                )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart className="h-6 w-6 text-primary"/> تحليل الذكاء الاصطناعي</CardTitle>
                <CardDescription>
                    احصل على تقرير نصي مفصل عن نقاط القوة والضعف وتوصيات مخصصة.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <PerformanceAnalysisForm />
            </CardContent>
          </Card>
          <Card>
              <CardHeader>
                <CardTitle>نسبة الإنجاز</CardTitle>
                <CardDescription>مدى تقدمك في إكمال محتوى الوحدات الدراسية.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  {unitProgress.map(unit => (
                    <div key={unit.title}>
                        <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{unit.title}</span>
                            <span className="text-sm font-mono text-muted-foreground">{unit.progress}%</span>
                        </div>
                        <Progress value={unit.progress} />
                    </div>
                  ))}
              </CardContent>
          </Card>
        </div>

      </main>
    </div>
  );
}
