
import PerformanceAnalysisForm from '@/components/performance-analysis-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function PerformanceAnalysisPage() {
  return (
    <div className="container mx-auto p-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">تحليل الأداء الشامل</h1>
        <p className="text-lg text-muted-foreground">
          احصل على تقرير مفصل عن أدائك في الاختبارات وتوصيات مخصصة
        </p>
      </header>

      <main className="max-w-2xl mx-auto">
        <Card>
            <CardHeader>
                <CardTitle>تحليل أداء الطالب</CardTitle>
                <CardDescription>
                    يقوم هذا النموذج بتحليل نتائج اختبارات الطالب السابقة لتقديم تقرير مفصل عن نقاط القوة والضعف بالإضافة إلى توصيات مخصصة لتحسين المستوى
                </CardDescription>
            </CardHeader>
            <CardContent>
                <PerformanceAnalysisForm />
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
