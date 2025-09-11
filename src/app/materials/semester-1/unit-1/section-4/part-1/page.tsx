
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, FlaskConical, Stethoscope, Cloud, CookingPot } from 'lucide-react';
import LessonLayout from '@/components/lesson-layout';
import React from 'react';
import FlippableCard from '@/app/materials/semester-1/unit-1/lesson-1/part-1/flippable-card';

const lessonInfo = {
    lessonTitle: "الإثراء والتوسع",
    lessonSubtitle: "الربط مع الحياة والعلوم الأخرى",
    mainIdea: "تتداخل مفاهيم حالات المادة وقوانين الغازات مع العديد من التطبيقات العملية في حياتنا اليومية وفي مجالات علمية متنوعة مثل الأرصاد الجوية والطب",
    learningOutcomes: [
        "أربط بين قوانين الغازات وتطبيقاتها في بالونات الطقس",
        "أفسر مبدأ عمل أواني الضغط",
        "أتعرف على تطبيقات السبائك الفلزية في الطب"
    ],
    lessonContent: `<p>في هذا القسم سنرى كيف أن المفاهيم النظرية التي درسناها في هذه الوحدة لها تطبيقات عملية ومباشرة في عالمنا من التنبؤ بالطقس إلى طهي الطعام وحتى إنقاذ حياة البشر</p>`,
    lessonId: "/materials/semester-1/unit-1/section-4/part-1",
    staticQuizzes: { lvl1: [], lvl2: [], lvl3: [] }, // No quiz for this section
    previousLesson: "/materials/semester-1/unit-1/lesson-3/part-5",
    nextLesson: "/materials/semester-1/unit-1/section-4/part-2",
    previousLessonTitle: "الجزء السابق: المواد الصلبة البلورية الأيونية",
    nextLessonTitle: "الإثراء والتوسع"
};

export default function LessonPartPage() {
  return (
    <LessonLayout {...lessonInfo}>
        <div className="space-y-8">
            <FlippableCard
                cardTitle="الربط بالأرصاد الجوية"
                cardIcon={<Cloud className="h-6 w-6 text-primary" />}
            >
                <CardContent className="p-4">
                    <p>
                        تطلق دائرة الأرصاد الجوية من محطة المفرق بالونات الطقس بهدف زيادة الدقة في التنبؤ الجوي التي ترسل بيانات عناصر الطقس حرارة ورطوبة وضغط في طبقات الجو العليا إلى المحطات الأرضية قبل أن تنفجر على ارتفاع 27km بسبب انخفاض الضغط الكبير وتمدد الغاز
                    </p>
                </CardContent>
            </FlippableCard>

             <FlippableCard
                cardTitle="الربط بالحياة"
                cardIcon={<CookingPot className="h-6 w-6 text-primary" />}
            >
                <CardContent className="p-4">
                    <ul className="list-decimal mr-6 space-y-2">
                        <li>تزداد درجة غليان السائل بازدياد الضغط الواقع عليه لذلك يغلي الماء في أواني الضغط على درجات حرارة أكبر من <span dir="ltr">100°C</span> ما يرفع درجة حرارة الماء ويسرع طهي الطعام</li>
                        <li>لا تنفجر أواني الضغط بسبب وجود صمام يعمل على خروج بعض البخار ما يقلل الضغط</li>
                    </ul>
                </CardContent>
            </FlippableCard>

            <FlippableCard
                cardTitle="الربط بالطب"
                cardIcon={<Stethoscope className="h-6 w-6 text-primary" />}
            >
                <CardContent className="p-4">
                    <p>
                        تصنع الدعامات القلبية فتح الشرايين الحديثة من سبيكة التيتانيوم Ti 77% بإضافة التنتاليوم Ta 6% والنيوبيوم Nb 17% وتمتاز بالقوة والمرونة وخلوها من المواد السامة أو المسببة للحساسية والالتهابات العصبية
                    </p>
                </CardContent>
            </FlippableCard>
        </div>
    </LessonLayout>
  );
}
