
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Library } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

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
                            <div className="space-y-4 flex-1">
                                <CardTitle className="text-lg">
                                    <p>اعتمادا على الرسم المجاور والمتعلق بالمواد CH3CH2OH , CH4 CH3CH3 , CH3CH3Cl فإن الرمز الذي يمثل الطاقة اللازمة لتبخر السائل CH3CH3Cl هو:</p>
                                </CardTitle>
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
                            <Badge variant="secondary" className="mr-4">
                                المستوى 2
                            </Badge>
                        </div>
                        <CardDescription className="text-xs pt-2">
                            المصدر: الوحدة 1: حالات المادة / الدرس 2: الحالة السائلة / درجة الغليان
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button variant="outline" className="w-full justify-between text-right h-auto py-2 px-3 text-sm flex items-center" disabled>
                            <div className="flex-1 whitespace-normal">M</div>
                        </Button>
                        <Button variant="outline" className="w-full justify-between text-right h-auto py-2 px-3 text-sm flex items-center" disabled>
                            <div className="flex-1 whitespace-normal">W</div>
                        </Button>
                        <Button variant="outline" className="w-full justify-between text-right h-auto py-2 px-3 text-sm flex items-center" disabled>
                            <div className="flex-1 whitespace-normal">R</div>
                        </Button>
                        <Button variant="outline" className="border-green-500 bg-green-500/10 text-green-700 hover:bg-green-500/20 w-full justify-between text-right h-auto py-2 px-3 text-sm flex items-center" disabled>
                            <div className="flex-1 whitespace-normal">Q</div>
                            <CheckCircle className="h-5 w-5 text-green-600" />
                        </Button>
                    </CardContent>
                    <CardFooter>
                         <Alert variant="default" className="border-blue-500 bg-blue-100/30 w-full">
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                            <AlertTitle className="font-bold text-blue-700">الشرح</AlertTitle>
                            <AlertDescription>
                                بترتيب قوى الترابط: الإيثانول (الأقوى، روابط هيدروجينية) > كلوروميثان (قوى ثنائي قطب) > إيثان (قوى لندن) > ميثان (الأضعف، قوى لندن أقل). طاقة التبخر الأعلى (Q) تمثل أقوى ترابط، وهي للإيثانول.
                            </AlertDescription>
                        </Alert>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
