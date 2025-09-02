
import AdminNav from '@/components/admin/admin-nav';
import ViewRegisteredDevicesList from '@/components/admin/view-registered-devices-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
                            عرض وإدارة جميع الأجهزة المعتمدة للطلاب في النظام
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                       <ViewRegisteredDevicesList />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
