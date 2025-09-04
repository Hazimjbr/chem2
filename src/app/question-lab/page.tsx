
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Library } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { InlineMath } from 'react-katex';
import { cn } from '@/lib/utils.tsx';

export default function QuestionLabPage() {
    return (
        <div className="p-4 md:p-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-primary mb-2">
                    <Library className="inline-block h-10 w-10 mb-2" /> معمل الأسئلة
                </h1>
                <p className="text-lg text-muted-foreground">
                    هنا نقوم بصياغة ومناقشة الأسئلة قبل إضافتها بشكل نهائي.
                </p>
            </header>
            
            <div className="space-y-6">
                <Card className="text-center p-8 text-muted-foreground min-h-[300px] flex items-center justify-center">
                    <CardHeader>
                        <CardTitle>معمل الأسئلة فارغ</CardTitle>
                        <CardDescription>لا توجد أسئلة قيد المراجعة حاليًا</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}
