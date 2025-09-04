
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
                <div className="space-y-4">
                    <p>اعتمادا على الرسم المجاور والمتعلق بالمواد <span dir="ltr" className="font-mono inline-block">CH₃CH₂OH</span>, <span dir="ltr" className="font-mono inline-block">CH₄</span>, <span dir="ltr" className="font-mono inline-block">CH₃CH₃</span>, <span dir="ltr" className="font-mono inline-block">CH₃Cl</span> فإن الرمز الذي يمثل عدد الجسيمات التي تمتلك الطاقة اللازمة لتبخر السائل الذي له أضعف قوى تجاذب هو:</p>
                    <div className="flex justify-center">
                        <Image
                            src="https://i.ibb.co/hF9Fm0hw/22.png"
                            alt="Vapor Pressure vs Temperature for four liquids"
                            width={400}
                            height={250}
                            className="rounded-lg border bg-white"
                            data-ai-hint="vapor pressure curves"
                        />
                    </div>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start text-right h-auto py-2 px-3 text-sm flex items-center">
                <div className="flex-1 whitespace-normal">أ) W</div>
            </Button>
            <Button variant="outline" className="w-full justify-start text-right h-auto py-2 px-3 text-sm flex items-center">
                <div className="flex-1 whitespace-normal">ب) E</div>
            </Button>
            <Button variant="outline" className="w-full justify-start text-right h-auto py-2 px-3 text-sm flex items-center">
                <div className="flex-1 whitespace-normal">ج) Y</div>
            </Button>
            <Button variant="outline" className="border-green-500 bg-green-500/10 text-green-700 hover:bg-green-500/20 w-full justify-between text-right h-auto py-2 px-3 text-sm flex items-center" disabled>
                <div className="flex-1 whitespace-normal">د) M</div>
                <CheckCircle className="h-5 w-5 text-green-600" />
            </Button>
        </CardContent>
        <CardFooter>
            <Alert variant="default" className="border-blue-500 bg-blue-100/30 w-full">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <AlertTitle className="font-bold text-blue-700">الشرح</AlertTitle>
                <AlertDescription>
                    السائل الذي له أضعف قوى تجاذب هو الميثان (CH₄) لأنه غير قطبي وله أقل كتلة مولية. السائل ذو القوى الأضعف هو الأسرع تبخرًا والأعلى في الضغط البخاري، ويمثله المنحنى (C). الرمز (M) يمثل عدد الجسيمات التي تمتلك طاقة التبخر لهذا السائل، وهي أكبر كمية مقارنة بالسوائل الأخرى.
                </AlertDescription>
            </Alert>
        </CardFooter>
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
