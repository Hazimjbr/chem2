
import AdminNav from '@/components/admin/admin-nav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';

export default function RegisteredDevicesPage() {
    return (
        <div className="container mx-auto p-8">
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-primary mb-2">لوحة تحكم المسؤول</h1>
                <p className="text-lg text-muted-foreground">
                    إدارة الطلاب والأجهزة والمحتوى
                </p>
            </header>
            <main className="space-y-6">
                <AdminNav />
                <Card>
                    <CardHeader>
                        <CardTitle>الأجهزة المسجلة</CardTitle>
                        <CardDescription>
                            عرض جميع الأجهزة المعتمدة للطلاب في النظام
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                       <Smartphone className="h-10 w-10 mb-4" />
                        <p>هذه الميزة قيد التطوير حاليًا</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
