'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TestTube } from 'lucide-react';

export default function QuestionLabPage() {
    return (
        <div className="p-4 md:p-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-primary mb-2">
                    <TestTube className="inline-block h-10 w-10 mb-2" /> معمل الأسئلة
                </h1>
                <p className="text-lg text-muted-foreground">
                    هنا نقوم بصياغة ومناقشة الأسئلة قبل إضافتها بشكل نهائي.
                </p>
            </header>
            <div className="flex justify-center items-center h-64">
                <Card className="w-full max-w-xl text-center border-dashed">
                    <CardHeader>
                        <CardTitle>المعمل فارغ حاليًا</CardTitle>
                        <CardDescription>
                            يمكنك إضافة سؤال جديد للمراجعة والمناقشة.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}
