
'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BookCheck } from 'lucide-react';
import { useState } from 'react';
import { analyzeStudentPerformance } from '@/ai/flows/analyze-student-performance';
import type { QuizResult } from '@/components/quiz';
import { useApp } from '@/context/CurriculumContext';

export default function PerformanceAnalysisForm() {
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { currentUser } = useApp();

  const handleAnalysis = async () => {
    if (!currentUser) {
        toast({
            title: 'الوصول مرفوض',
            description: 'يجب عليك تسجيل الدخول أولاً لتحليل أدائك.',
            variant: 'destructive',
        });
        return;
    }

    setIsLoading(true);
    setAnalysis('');
    try {
      const historyJSON = localStorage.getItem('quizHistory');
      const allResults: QuizResult[] = historyJSON ? JSON.parse(historyJSON) : [];
      
      const studentResults = allResults.filter(r => r.studentId === currentUser.uid);
      
      // Filter results include all interactive questions (diff 0.5) and quizzes up to level 3
      const relevantResults = studentResults.filter(r => r.difficulty === 0.5 || r.difficulty <= 3);

      const studentName = currentUser.displayName || 'الطالب';

      // Calculate average time per question from timed quizzes
      const timedQuizzes = relevantResults.filter(r => r.timeTaken !== undefined && r.questionCount !== undefined);
      let averageTimePerQuestion: number | undefined = undefined;
      if (timedQuizzes.length > 0) {
        const totalTime = timedQuizzes.reduce((acc, r) => acc + r.timeTaken!, 0);
        const totalQuestions = timedQuizzes.reduce((acc, r) => acc + r.questionCount!, 0);
        if (totalQuestions > 0) {
          averageTimePerQuestion = totalTime / totalQuestions;
        }
      }

      if (relevantResults.length === 0) {
        toast({
            title: 'لا توجد بيانات كافية',
            description: 'مرحباً يا ' + studentName + '، يجب عليك إكمال بعض الاختبارات وأسئلة التحقق من الفهم أولاً. سنقوم بإنشاء تحليل تجريبي لك.',
            variant: 'default',
            duration: 7000,
        });
        // Generate analysis with mock data if no real data is available but pass the student name
        const result = await analyzeStudentPerformance({ studentName: studentName, quizResults: [], averageTimePerQuestion });
        setAnalysis(result);
        setIsLoading(false);
        return;
      }

      const studentDataForAnalysis = {
        studentName: studentName,
        quizResults: relevantResults.map(r => ({ lessonId: r.lessonId, score: r.score, difficulty: r.difficulty })),
        averageTimePerQuestion,
      };

      const result = await analyzeStudentPerformance(studentDataForAnalysis);
      setAnalysis(result);
    } catch (error) {
      console.error('Failed to analyze performance:', error);
      toast({
        variant: 'destructive',
        title: 'خطأ في تحليل الأداء',
        description:
          'حدث خطأ أثناء محاولة تحليل البيانات الرجاء المحاولة مرة أخرى',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
         <Button onClick={handleAnalysis} disabled={isLoading} size="lg">
          {isLoading ? (
            <Loader2 className="ml-2 h-5 w-5 animate-spin" />
          ) : (
             <BookCheck className="ml-2 h-5 w-5" />
          )}
          {isLoading ? 'جاري التحليل' : 'ابدأ تحليل أدائي'}
        </Button>
        <p className="text-xs text-muted-foreground">
            سيقوم الذكاء الاصطناعي بتحليل جميع نتائج اختباراتك وأسئلة التحقق من الفهم
        </p>
      </div>

      {analysis && (
        <div className="space-y-4">
            <h3 className='font-bold text-lg text-primary'>تقرير الأداء والتوصيات</h3>
            <Textarea
                value={analysis}
                readOnly
                className="w-full h-96 bg-muted/50"
                placeholder="نتائج التحليل"
            />
        </div>
      )}
    </div>
  );
}
