
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Library, Construction } from 'lucide-react';

export default function QuestionLabPage() {
    return (
        <div className="p-4 md:p-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-primary mb-2">
                    <Library className="inline-block h-10 w-10 mb-2" /> معمل الأسئلة
                </h1>
                <p className="text-lg text-muted-foreground">
                    هنا نقوم بصياغة ومناقشة الأسئلة قبل إضافتها بشكل نهائي
                </p>
            </header>
            
            <div className="space-y-6">
                 <Card className="w-full max-w-3xl mx-auto text-center">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2">
                            <Construction className="h-8 w-8 text-yellow-500" />
                            المعمل فارغ حاليًا
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            لا توجد أسئلة جديدة قيد الإنشاء في الوقت الحالي.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
