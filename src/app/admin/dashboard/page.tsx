'use client';

import { useApp } from '@/context/CurriculumContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Loader2, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ApproveDevicesList from '@/components/admin/approve-devices-list';
import AdminNav from '@/components/admin/admin-nav';

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
                 <Card className="max-w-md mx-auto">
                     <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2 text-destructive">
                            <ShieldAlert />
                            الوصول مرفوض
                        </CardTitle>
                        <CardDescription>
                            هذه الصفحة مخصصة للمسؤولين فقط. إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع الدعم الفني.
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

    // This is the standard view for an already-authenticated admin.
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
                        <CardTitle>طلبات الأجهزة قيد المراجعة</CardTitle>
                        <CardDescription>
                            وافق أو ارفض طلبات تسجيل الأجهزة الجديدة للطلاب
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ApproveDevicesList />
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
