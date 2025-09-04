
import AdminNav from '@/components/admin/admin-nav';
import AddStudentForm from '@/components/admin/add-student-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminAddStudentPage() {
    return (
        <div className="p-4 md:p-8">
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
                        <CardTitle>إنشاء حساب طالب جديد</CardTitle>
                        <CardDescription>
                            أدخل بيانات الطالب لإنشاء حساب له في المنصة
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AddStudentForm />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
