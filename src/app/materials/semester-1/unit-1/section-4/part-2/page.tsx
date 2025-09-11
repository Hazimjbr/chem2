
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookCopy, Lightbulb, FlaskConical, Stethoscope, Cloud, CookingPot, Zap, Recycle, Building, Star } from 'lucide-react';
import LessonLayout from '@/components/lesson-layout';
import React from 'react';

const lessonInfo = {
    lessonTitle: "الإثراء والتوسع",
    lessonSubtitle: "البلازما: الحالة الرابعة للمادة",
    mainIdea: "البلازما هي حالة متميزة من المادة تتكون من خليط من الأيونات والإلكترونات، وتمتلك خصائص فريدة وتطبيقات واعدة مثل تحويل النفايات إلى طاقة.",
    learningOutcomes: [
        "أتعرف على مفهوم البلازما وخصائصها.",
        "أصف كيفية عمل محول النفايات البلازمي وميزاته.",
    ],
    lessonContent: `<p>إلى جانب الحالات الثلاث التي درسناها، توجد حالة رابعة ومثيرة للمادة تسمى البلازما. على الرغم من أنها قد تبدو غريبة، إلا أنها الحالة الأكثر شيوعًا في الكون، حيث تشكل النجوم والشمس.</p>`,
    lessonId: "/materials/semester-1/unit-1/section-4/part-2",
    staticQuizzes: { lvl1: [], lvl2: [], lvl3: [] }, // No quiz for this section
    previousLesson: "/materials/semester-1/unit-1/section-4/part-1",
    nextLesson: "/materials/semester-1/unit-1/section-5",
    previousLessonTitle: "الجزء السابق: الربط بالعلوم",
    nextLessonTitle: "مراجعة الوحدة"
};

export default function LessonPartPage() {
  return (
    <LessonLayout {...lessonInfo}>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Star className="h-6 w-6 text-primary" /> ما هي البلازما (الحالة الرابعة للمادة)؟</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>
                        هي خليط غازي لأيونات الغاز الموجبة وإلكتروناتها حرة الحركة المنفصلة عنها. تتكون بسبب درجات الحرارة العالية جدًا في النجوم، أو بفعل البرق في الهواء الجوي، أو صناعيًا في المختبرات.
                    </p>
                    <div>
                        <h4 className="font-semibold text-accent mb-2">تمتاز البلازما بالآتي:</h4>
                         <ul className="list-disc mr-6 space-y-2">
                            <li>حجم وشكل متغيران (مثل الغازات).</li>
                            <li>تختزن طاقة هائلة.</li>
                            <li>توصل التيار الكهربائي بسبب وجود الإلكترونات حرة الحركة.</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Recycle className="h-6 w-6 text-primary" /> تطبيق: محول النفايات البلازمي</CardTitle>
                    <CardDescription>أحد الاستخدامات الواعدة للبلازما هو معالجة النفايات.</CardDescription>
                </CardHeader>
                <CardContent>
                    <h4 className="font-semibold text-accent mb-2">آلية العمل:</h4>
                    <ul className="list-decimal mr-6 space-y-3">
                        <li>
                            <strong>تكسير الروابط:</strong> تعمل الطاقة الهائلة المختزنة في البلازما على تكسير روابط جميع أنواع النفايات وتفكيكها إلى عناصرها الأولية.
                        </li>
                         <li>
                            <strong>النواتج النهائية (تعتمد على نوع النفايات):</strong>
                            <ul className="list-disc mr-6 mt-2 space-y-1 text-sm">
                                <li><strong>النفايات العضوية:</strong> تخرج على شكل غاز غني بالهيدروجين (غاز التصنيع)، والذي يمكن استخدامه كوقود نظيف.</li>
                                <li><strong>النفايات غير العضوية:</strong> تخرج على شكل مادة صلبة زجاجية (خبث)، والتي يمكن استخدامها في صناعة الأسفلت والإسمنت (الكونكريت).</li>
                            </ul>
                        </li>
                         <li>
                            <strong>الميزات والسلبيات:</strong>
                             <ul className="list-disc mr-6 mt-2 space-y-1 text-sm">
                                <li><strong className="text-green-600">الميزات:</strong> لا تحتاج إلى مساحات واسعة (مكبات) لطمر النفايات، وكمية غازات الدفيئة والملوثات الناتجة عنها أقل بكثير من طرق الحرق التقليدية.</li>
                                <li><strong className="text-destructive">السلبيات:</strong> أهم سلبياتها هي ارتفاع تكلفة الإنشاء الأولية للمحولات.</li>
                            </ul>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    </LessonLayout>
  );
}
