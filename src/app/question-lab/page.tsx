
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { TestTube } from 'lucide-react';
import React from 'react';

const EmptyLab = () => {
    return (
        <Card className="w-full max-w-3xl mx-auto text-center border-dashed">
            <CardHeader>
                 <div className="mx-auto bg-muted rounded-full p-3 w-fit">
                    <TestTube className="h-10 w-10 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl pt-2">معمل الأسئلة فارغ</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    هذه المساحة مخصصة لصياغة ومراجعة الأسئلة الجديدة قبل إضافتها بشكل نهائي إلى بنك الأسئلة.
                </CardDescription>
            </CardContent>
        </Card>
    );
};

export default function QuestionLabPage() {
    return (
        <div className="p-4 md:p-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-primary mb-2">معمل الأسئلة</h1>
                <p className="text-lg text-muted-foreground">
                    هنا نقوم بصياغة ومناقشة الأسئلة قبل إضافتها بشكل نهائي
                </p>
            </header>
            <EmptyLab />
        </div>
    )
}
