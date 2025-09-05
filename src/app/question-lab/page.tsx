
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

const options = [
    { src: "https://i.ibb.co/NgZfVHmn/6.png", alt: "منحنى تبريد خاطئ 1", isCorrect: false },
    { src: "https://i.ibb.co/prX2QBzg/5.png", alt: "منحنى تبريد خاطئ 2", isCorrect: false },
    { src: "https://i.ibb.co/spPLvD7b/4.png", alt: "منحنى تبريد خاطئ 3", isCorrect: false },
    { src: "https://i.ibb.co/k65TLr3M/3.png", alt: "منحنى تبريد بخار الماء الصحيح", isCorrect: true },
]

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
                 <Card className="w-full max-w-3xl mx-auto">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">
                                اختر الرسم الصحيح الذي يمثل منحنى تبريد بخار الماء
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {options.map((option, index) => (
                             <Button
                                key={index}
                                variant="outline"
                                className={cn(
                                    "h-auto p-2 border-2 flex flex-col items-center justify-center",
                                    option.isCorrect && "border-green-500 bg-green-500/10"
                                )}
                                disabled
                            >
                                <Image
                                    src={option.src}
                                    alt={option.alt}
                                    width={300}
                                    height={200}
                                    className="rounded-md"
                                    data-ai-hint="cooling curve water"
                                />
                                {option.isCorrect && (
                                    <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                                        <CheckCircle className="h-5 w-5 text-white" />
                                    </div>
                                )}
                            </Button>
                        ))}
                    </CardContent>
                    <CardFooter>
                        <Alert variant="default" className="border-blue-500 bg-blue-100/30 w-full">
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                            <AlertTitle className="font-bold text-blue-700">الشرح</AlertTitle>
                            <AlertDescription>منحنى تبريد الماء النقي يتميز بوجود منطقتين أفقيتين (ثبات في درجة الحرارة). المنطقة الأولى عند 100°C وتمثل عملية التكاثف (تحول البخار إلى سائل)، والمنطقة الثانية عند 0°C وتمثل عملية التجمد (تحول السائل إلى صلب). الرسم الصحيح هو الوحيد الذي يوضح هاتين المرحلتين عند درجات الحرارة الصحيحة.</AlertDescription>
                        </Alert>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
