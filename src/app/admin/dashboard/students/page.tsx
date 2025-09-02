
import AdminNav from '@/components/admin/admin-nav';
import ViewStudentsList from '@/components/admin/view-students-list';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminStudentsPage() {
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
                        <CardTitle>عرض الطلاب</CardTitle>
                        <CardDescription>
                            عرض وإدارة جميع الطلاب المسجلين في النظام
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ViewStudentsList />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
