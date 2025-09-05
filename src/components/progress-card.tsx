'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ProgressCard() {
    return (
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>بطاقة التقدم</CardTitle>
                <CardDescription>هذه بطاقة فارغة مؤقتة.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>سيتم عرض محتوى التقدم هنا قريبًا.</p>
            </CardContent>
        </Card>
    );
}
