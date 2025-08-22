import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookCheck } from 'lucide-react';
import Link from 'next/link';

const quizzes = [
    {
        id: 'unit-1-comprehensive',
        title: 'اختبار شامل الوحدة الأولى حالات المادة',
        description: 'اختبار شامل يغطي جميع مفاهيم الحالة الغازية والسائلة والصلبة',
        tags: ['حالات المادة', 'غازات', 'سوائل', 'مواد صلبة']
    },
    {
        id: 'unit-2-comprehensive',
        title: 'اختبار شامل الوحدة الثانية المحاليل',
        description: 'اختبر فهمك لتصنيف وخصائص المحاليل المختلفة',
        tags: ['المحاليل', 'الخصائص الجامعة', 'تركيز']
    }
];

export default function QuizzesPage() {
  return (
    <div className="container mx-auto p-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">بنك الاختبارات</h1>
        <p className="text-lg text-muted-foreground">
          اختر اختبارًا من القائمة لتقييم فهمك للمادة بشكل شامل
        </p>
      </header>

      <main className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookCheck className="h-5 w-5 text-primary" />
                {quiz.title}
              </CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end">
                <div className="flex flex-wrap gap-2 mb-4">
                    {quiz.tags.map(tag => (
                        <span key={tag} className="text-xs bg-secondary text-secondary-foreground py-1 px-2 rounded-full">{tag}</span>
                    ))}
                </div>
              <Link href={`/quizzes/${quiz.id}`} passHref>
                <Button className="w-full" disabled>
                  ابدأ الاختبار (قريبا)
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
         <Card className="flex flex-col items-center justify-center border-dashed">
            <CardHeader className="text-center">
              <CardTitle>قريبا</CardTitle>
              <CardDescription>المزيد من الاختبارات الشاملة قادمة</CardDescription>
            </CardHeader>
          </Card>
      </main>
    </div>
  );
}
