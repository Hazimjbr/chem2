
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TestTube } from 'lucide-react';
import Image from 'next/image';

const QuestionDisplay = () => {
    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>سؤال قيد المراجعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p>اعتمادا على الرسم المجاور والمتعلق بالمواد CH3CH2OH , CH4 CH3CH3 , CH3CH3Cl فإن الرمز الذي يمثل الطاقة اللازمة لتبخر السائل CH3CH3Cl هو:</p>
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
                <div className="space-y-2">
                    <p className="font-semibold">الخيارات:</p>
                    <ul className="list-disc list-inside">
                        <li>W</li>
                        <li>M</li>
                        <li>R</li>
                        <li className="font-bold text-primary">Q (الإجابة الصحيحة)</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}


export default function QuestionLabPage() {
    return (
        <div className="p-4 md:p-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-primary mb-2">معمل الأسئلة</h1>
                <p className="text-lg text-muted-foreground">
                    هنا نقوم بصياغة ومناقشة الأسئلة قبل إضافتها بشكل نهائي
                </p>
            </header>
            <QuestionDisplay />
        </div>
    )
}
