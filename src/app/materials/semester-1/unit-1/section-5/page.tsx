
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, X } from 'lucide-react';
import Link from 'next/link';
import Quiz from '@/components/quiz';
import { staticQuizLvl1, staticQuizLvl2, staticQuizLvl3 } from './exam';
import React, { useEffect } from 'react';


export default function Unit1ReviewPage() {
    
    // We can use this effect to mark the unit as "completed" if the user scores well.
    useEffect(() => {
        // Future logic for completion tracking
    }, []);

    const lessonContentForQuiz = "تم تصميم هذا الاختبار ليغطي جميع المفاهيم الأساسية في وحدة حالات المادة بما في ذلك قوانين الغازات المختلفة وخصائص السوائل والمواد الصلبة";

    return (
        <div className="container mx-auto p-8 relative">
            <Link href="/materials/semester-1" passHref>
                <Button variant="ghost" size="icon" className="absolute top-4 left-4">
                    <X className="h-6 w-6" />
                    <span className="sr-only">إغلاق</span>
                </Button>
            </Link>
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-primary mb-2">مراجعة الوحدة الأولى حالات المادة</h1>
                <p className="text-lg text-muted-foreground">اختبر فهمك الشامل لجميع دروس الوحدة</p>
            </header>

            <main className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>اختبار شامل</CardTitle>
                        <CardDescription>
                            هذا الاختبار الشامل سيقيم مدى استيعابك للمفاهيم التي تمت دراستها في هذه الوحدة يمكنك إنشاء اختبار بمستويات صعوبة مختلفة بالتوفيق
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Quiz 
                            lessonContent={lessonContentForQuiz} 
                            staticQuizzes={{
                                lvl1: staticQuizLvl1, 
                                lvl2: staticQuizLvl2, 
                                lvl3: staticQuizLvl3
                            }} 
                            lessonId="/materials/semester-1/unit-1/section-5" 
                        />
                    </CardContent>
                </Card>
            </main>

             <footer className="mt-12 border-t pt-6">
                <div className="flex justify-between">
                     <Link href="/materials/semester-1/unit-1/lesson-1/part-10" passHref>
                        <Button size="lg" variant="outline">
                            <ArrowLeft className="ml-2 h-5 w-5" />
                            العودة إلى آخر درس
                        </Button>
                    </Link>
                    <Link href="/materials/semester-1/unit-2/lesson-1/part-1" passHref>
                        <Button size="lg" variant="default" disabled>
                            الوحدة التالية المحاليل (قريبا)
                        </Button>
                    </Link>
                </div>
            </footer>
        </div>
    );
}
