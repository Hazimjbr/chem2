
'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BookCheck } from 'lucide-react';
import { useState } from 'react';
import { analyzeStudentPerformance } from '@/ai/flows/analyze-student-performance';
import type { QuizResult } from '@/components/quiz';

export default function PerformanceAnalysisForm() {
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalysis = async () => {
    setIsLoading(true);
    setAnalysis('');
    try {
      const historyJSON = localStorage.getItem('quizHistory');
      const allResults: QuizResult[] = historyJSON ? JSON.parse(historyJSON) : [];
      
      // Filter results include all interactive questions (diff 0.5) and quizzes up to level 3
      const relevantResults = allResults.filter(r => r.difficulty === 0.5 || r.difficulty <= 3);

      if (relevantResults.length === 0) {
        toast({
            title: 'لا توجد بيانات كافية',
            description: 'يجب عليك إكمال بعض الاختبارات وأسئلة التحقق من الفهم أولاً',
            variant: 'default',
        });
        // Generate analysis with mock data if no real data is available
        const result = await analyzeStudentPerformance([]);
        setAnalysis(result);
        setIsLoading(false);
        return;
      }

      const studentData = relevantResults.map(r => ({ lessonId: r.lessonId, score: r.score, difficulty: r.difficulty }));

      const result = await analyzeStudentPerformance(studentData);
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
