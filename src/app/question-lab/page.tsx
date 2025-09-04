
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
                 <Card className="w-full">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">
                                <p>اعتمادا على الرسم المجاور والذي يمثل تبريد الغاز A من درجة حرارة <span dir="ltr" className="inline-block">100°C</span> إلى درجة حرارة الغرفة <span dir="ltr" className="inline-block">25°C</span> فإن الحالة الفيزيائية للمادة A عند الزمن Y هي:</p>
                                <div className="flex justify-center my-4">
                                     <Image
                                        src="https://i.ibb.co/GfZ5wtqG/22.png"
                                        alt="منحنى تبريد المادة A"
                                        width={500}
                                        height={300}
                                        className="rounded-lg border bg-white"
                                        data-ai-hint="cooling curve"
                                    />
                                </div>
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button variant="outline" className="w-full justify-between text-right h-auto py-2 px-3 text-sm flex items-center" disabled>
                            <div className="flex-1 whitespace-normal">صلب</div>
                        </Button>
                         <Button variant="outline" className="w-full justify-between text-right h-auto py-2 px-3 text-sm flex items-center border-green-500 bg-green-500/10 text-green-700 hover:bg-green-500/20" disabled>
                            <div className="flex-1 whitespace-normal">سائل</div>
                            <CheckCircle className="h-5 w-5 text-green-600" />
                        </Button>
                        <Button variant="outline" className="w-full justify-between text-right h-auto py-2 px-3 text-sm flex items-center" disabled>
                            <div className="flex-1 whitespace-normal">غاز</div>
                        </Button>
                        <Button variant="outline" className="w-full justify-between text-right h-auto py-2 px-3 text-sm flex items-center" disabled>
                            <div className="flex-1 whitespace-normal">غاز + سائل</div>
                        </Button>
                    </CardContent>
                    <CardFooter>
                        <Alert variant="default" className="border-blue-500 bg-blue-100/30 w-full">
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                            <AlertTitle className="font-bold text-blue-700">الشرح</AlertTitle>
                            <AlertDescription>الزمن Y يقع على الجزء المائل بعد انتهاء عملية التكاثف (الخط الأفقي الأول) وقبل بدء التجمد (الخط الأفقي الثاني). في هذه المرحلة تكون المادة قد تحولت بالكامل إلى الحالة السائلة ويتم تبريدها.</AlertDescription>
                        </Alert>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
