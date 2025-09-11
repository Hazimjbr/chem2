
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, FlaskConical, Stethoscope, Cloud, CookingPot } from 'lucide-react';
import LessonLayout from '@/components/lesson-layout';
import React from 'react';

const lessonInfo = {
    lessonTitle: "الإثراء والتوسع",
    lessonSubtitle: "الربط مع الحياة والعلوم الأخرى",
    mainIdea: "تتداخل مفاهيم حالات المادة وقوانين الغازات مع العديد من التطبيقات العملية في حياتنا اليومية وفي مجالات علمية متنوعة مثل الأرصاد الجوية والطب.",
    learningOutcomes: [
        "أربط بين قوانين الغازات وتطبيقاتها في بالونات الطقس.",
        "أفسر مبدأ عمل أواني الضغط.",
        "أتعرف على تطبيقات السبائك الفلزية في الطب."
    ],
    lessonContent: `<p>في هذا القسم، سنرى كيف أن المفاهيم النظرية التي درسناها في هذه الوحدة لها تطبيقات عملية ومباشرة في عالمنا، من التنبؤ بالطقس إلى طهي الطعام وحتى إنقاذ حياة البشر.</p>`,
    lessonId: "/materials/semester-1/unit-1/section-4/part-1",
    staticQuizzes: { lvl1: [], lvl2: [], lvl3: [] }, // No quiz for this section
    previousLesson: "/materials/semester-1/unit-1/lesson-3/part-5",
    nextLesson: "/materials/semester-1/unit-1/section-5",
    previousLessonTitle: "الجزء السابق: المواد الصلبة الأيونية",
    nextLessonTitle: "مراجعة الوحدة"
};

export default function LessonPartPage() {
  return (
    <LessonLayout {...lessonInfo}>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Cloud className="h-6 w-6 text-primary" /> الربط بالأرصاد الجوية</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        تطلق دائرة الأرصاد الجوية من محطة المفرق بالونات الطقس (بهدف زيادة الدقة في التنبؤ الجوي) التي ترسل بيانات عناصر الطقس (حرارة، رطوبة وضغط) في طبقات الجو العليا إلى المحطات الأرضية قبل أن تنفجر على ارتفاع 27 km بسبب انخفاض الضغط الكبير وتمدد الغاز.
                    </p>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CookingPot className="h-6 w-6 text-primary" /> الربط بالحياة</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-decimal mr-6 space-y-2">
                        <li>تزداد درجة غليان السائل بازدياد الضغط الواقع عليه، لذلك يغلي الماء في أواني الضغط على درجات حرارة أكبر من 100 °C، ما يرفع درجة حرارة الماء ويسرع طهي الطعام.</li>
                        <li>لا تنفجر أواني الضغط بسبب وجود صمام يعمل على خروج بعض البخار، ما يقلل الضغط.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Stethoscope className="h-6 w-6 text-primary" /> الربط بالطب</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                        تصنع الدعامات القلبية (لفتح الشرايين) الحديثة من سبيكة التيتانيوم (Ti) بإضافة التنتاليوم (Ta) والنيوبيوم (Nb) بنسب (77 : 6 : 17)، وتمتاز بالقوة والمرونة وخلوها من المواد السامة أو المسببة للحساسية والالتهابات العصبية.
                    </p>
                </CardContent>
            </Card>
        </div>
    </LessonLayout>
  );
}
