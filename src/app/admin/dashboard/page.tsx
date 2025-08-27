
'use client';

import { useApp } from '@/context/CurriculumContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddStudentForm from '@/components/admin/add-student-form';
import ApproveDevicesList from '@/components/admin/approve-devices-list';
import ViewStudentsList from '@/components/admin/view-students-list';

export default function AdminDashboardPage() {
    const { currentUser, isLoading } = useApp();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-200px)]">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        )
    }

    if (!currentUser) {
        return (
             <div className="container mx-auto p-8 text-center">
                 <Card className="max-w-md mx-auto">
                     <CardHeader>
                        <CardTitle className="text-destructive">الوصول مرفوض</CardTitle>
                        <CardDescription>
                            يجب عليك تسجيل الدخول أولاً للوصول إلى هذه الصفحة
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                         <Link href="/" passHref>
                            <Button>العودة إلى الصفحة الرئيسية</Button>
                         </Link>
                     </CardContent>
                 </Card>
            </div>
        )
    }

    if (currentUser.role !== 'admin') {
         return (
             <div className="container mx-auto p-8 text-center">
                 <Card className="max-w-md mx-auto border-destructive">
                     <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2 text-destructive">
                            <ShieldAlert className="h-8 w-8" />
                            وصول غير مصرح به
                        </CardTitle>
                        <CardDescription>
                           عذراً هذه الصفحة مخصصة للمسؤولين فقط
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            المستخدم <span className="font-bold">{currentUser.email}</span> لا يملك الصلاحيات اللازمة
                          </p>
                         <Link href="/" passHref>
                            <Button variant="outline">العودة إلى الصفحة الرئيسية</Button>
                         </Link>
                     </CardContent>
                 </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-8">
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-primary mb-2">لوحة تحكم المسؤول</h1>
                <p className="text-lg text-muted-foreground">
                    إدارة الطلاب والأجهزة والمحتوى
                </p>
            </header>
            <main>
                <Tabs defaultValue="add-student" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="add-student">إضافة طالب</TabsTrigger>
                        <TabsTrigger value="approve-devices">الموافقة على الأجهزة</TabsTrigger>
                        <TabsTrigger value="view-students">عرض الطلاب</TabsTrigger>
                        <TabsTrigger value="registered-devices" disabled>الأجهزة المسجلة</TabsTrigger>
                    </TabsList>
                    <TabsContent value="add-student">
                        <Card>
                            <CardHeader>
                                <CardTitle>إنشاء حساب طالب جديد</CardTitle>
                                <CardDescription>
                                    أدخل بيانات الطالب لإنشاء حساب جديد في النظام
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <AddStudentForm />
                            </CardContent>
                        </Card>
                    </TabsContent>
                     <TabsContent value="approve-devices">
                        <Card>
                            <CardHeader>
                                <CardTitle>طلبات الأجهزة قيد المراجعة</CardTitle>
                                <CardDescription>
                                    وافق أو ارفض طلبات تسجيل الأجهزة الجديدة للطلاب
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ApproveDevicesList />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="view-students">
                        <Card>
                            <CardHeader>
                                <CardTitle>قائمة الطلاب المسجلين</CardTitle>
                                <CardDescription>
                                    عرض وتعديل بيانات الطلاب المسجلين في النظام
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ViewStudentsList />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
