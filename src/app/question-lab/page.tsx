
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Eye, RefreshCw, XCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils.tsx';
import React from 'react';
import Image from 'next/image';
import { InlineMath } from 'react-katex';

// This file is intentionally left blank. It's a workspace for creating and testing questions.

const QuestionCard = () => (
    <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
            <CardTitle className="text-lg">
                معمل الأسئلة فارغ حاليًا
            </CardTitle>
             <CardDescription>
                يمكنك إضافة سؤال جديد هنا لاختباره ومراجعته قبل نقله إلى بنك الأسئلة.
            </CardDescription>
        </CardHeader>
    </Card>
);

export default function QuestionLabPage() {
    return (
        <div className="p-4 md:p-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-primary mb-2">معمل الأسئلة</h1>
                <p className="text-lg text-muted-foreground">
                    هنا نقوم بصياغة ومناقشة الأسئلة قبل إضافتها بشكل نهائي
                </p>
            </header>
            <QuestionCard />
        </div>
    )
}
