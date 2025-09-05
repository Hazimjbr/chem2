
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
import { getUserProgress } from '@/lib/firebase/progress.actions';

interface WeakestLesson {
    lessonId: string;
    lessonTitle: string;
    score: number;
}

const getLessonTitle = (lessonId: string): string => {
    const pathParts = lessonId.split('/').filter(p => p); // remove empty parts
    const unitIdentifier = pathParts.find(p => p.startsWith('unit-'));
    if (!unitIdentifier) return lessonId; 

    const unit = units.find(u => u.id === unitIdentifier);
    if (!unit) return lessonId;

    const lessonIdentifier = pathParts.find(p => p.startsWith('lesson-'));
    const sectionIdentifier = pathParts.find(p => p.startsWith('section-'));

    if (lessonIdentifier) {
        const lessonNum = parseInt(lessonIdentifier.replace('lesson-', ''), 10);
        const lesson = unit.lessons.find(l => l.lessonNum === lessonNum);
        if (!lesson) return unit.title;

        const partIdentifier = pathParts.find(p => p.startsWith('part-'));
        if (partIdentifier) {
            const partNum = parseInt(partIdentifier.replace('part-', ''), 10);
            const part = lesson.parts.find(p => p.partNum === partNum);
            return part ? `${lesson.title} / ${part.title}` : lesson.title;
        }
        return lesson.title;
    }

    if (sectionIdentifier) {
         const sectionNum = parseInt(sectionIdentifier.replace('section-', ''), 10);
         const section = unit.lessons.find(l => l.sectionNum === sectionNum);
         if (section) {
            return `${unit.title} / ${section.title}`;
         }
    }

    return unit.title; // Fallback to unit title
};

export default function PerformanceAnalysisPage() {
    const { currentUser } = useApp();
    const [weakestLesson, setWeakestLesson] = useState<WeakestLesson | null>(null);
    const [performanceData, setPerformanceData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!currentUser) return;

            const progressData = await getUserProgress(currentUser.uid);
            if (!progressData) return;

            // --- Weakest Lesson Logic ---
            const allResults: QuizResult[] = progressData.quizHistory || [];
            // Filter for actual quiz results (difficulty > 0.5)
            const studentResults = allResults.filter(r => r.difficulty > 0.5);

            if (studentResults.length > 0) {
                // Find the weakest score among quizzes
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
        }
        fetchData();
    }, [currentUser]);

  return (
    <div className="p-4 md:p-8">
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
        </div>

      </main>
    </div>
  );
}
