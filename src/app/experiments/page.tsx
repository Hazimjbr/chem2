
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const experiments = [
    {
        id: 'charles-law',
        title: 'العلاقة بين حجم الغاز ودرجة حرارته (قانون شارل)',
        description: 'تجربة استهلالية تفاعلية توضح قانون شارل للغازات',
        tags: ['غازات', 'قانون شارل', 'ديناميكا حرارية']
    },
    {
        id: 'boyles-law',
        title: 'العلاقة بين حجم الغاز وضغطه (قانون بويل)',
        description: 'استكشف كيف يتغير حجم الغاز بتغير الضغط عند ثبات درجة الحرارة',
        tags: ['غازات', 'قانون بويل', 'ضغط']
    }
];

export default function ExperimentsPage() {
  return (
    <div className="container mx-auto p-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">مختبر التجارب التفاعلية</h1>
        <p className="text-lg text-muted-foreground">
          استكشف المفاهيم الكيميائية من خلال تجارب عملية ومحاكاة تفاعلية
        </p>
      </header>

      <main className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiments.map((exp) => (
          <Card key={exp.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{exp.title}</CardTitle>
              <CardDescription>{exp.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end">
                <div className="flex flex-wrap gap-2 mb-4">
                    {exp.tags.map(tag => (
                        <span key={tag} className="text-xs bg-secondary text-secondary-foreground py-1 px-2 rounded-full">{tag}</span>
                    ))}
                </div>
              <Link href={`/experiments/${exp.id}`} passHref>
                <Button className="w-full">
                  ابدأ التجربة
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
         <Card className="flex flex-col items-center justify-center border-dashed">
            <CardHeader className="text-center">
              <CardTitle>قريبا</CardTitle>
              <CardDescription>المزيد من التجارب التفاعلية المثيرة قادمة</CardDescription>
            </CardHeader>
          </Card>
      </main>
    </div>
  );
}
