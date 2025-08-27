
'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { getPendingDevices, approveDevice, rejectDevice } from '@/lib/firebase/device.actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Check, X, ShieldQuestion, ServerCrash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface PendingDevice {
    id: string;
    studentId: string;
    deviceId: string;
    studentName: string;
    requestedAt: string;
}

export default function ApproveDevicesList() {
    const [pendingDevices, setPendingDevices] = useState<PendingDevice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const fetchDevices = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await getPendingDevices();
            if (result.success) {
                setPendingDevices(result.data || []);
            } else {
                setError(result.message || 'فشل في تحميل البيانات');
            }
        } catch (e) {
            setError('حدث خطأ غير متوقع');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    const handleApprove = (device: PendingDevice) => {
        startTransition(async () => {
            const result = await approveDevice(device.id, device.studentId, device.deviceId);
            if (result.success) {
                toast({ title: 'نجاح', description: result.message });
                fetchDevices(); // Refresh the list
            } else {
                toast({ variant: 'destructive', title: 'فشل', description: result.message });
            }
        });
    };

    const handleReject = (deviceId: string) => {
        startTransition(async () => {
            const result = await rejectDevice(deviceId);
             if (result.success) {
                toast({ title: 'نجاح', description: result.message });
                fetchDevices(); // Refresh the list
            } else {
                toast({ variant: 'destructive', title: 'فشل', description: result.message });
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-40 text-destructive">
                <ServerCrash className="h-8 w-8 mb-2" />
                <p>{error}</p>
                <Button onClick={fetchDevices} variant="outline" className="mt-4">
                    إعادة المحاولة
                </Button>
            </div>
        );
    }

    if (pendingDevices.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-40 text-muted-foreground">
                <ShieldQuestion className="h-8 w-8 mb-2" />
                <p>لا توجد طلبات موافقة على أجهزة جديدة حاليًا</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {pendingDevices.map((device) => (
                <Card key={device.id} className="bg-muted/50">
                    <CardHeader>
                        <CardTitle className="text-lg">الطالب: {device.studentName}</CardTitle>
                        <CardDescription>
                            طلب تسجيل جهاز جديد في {device.requestedAt}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm font-mono break-all bg-background p-2 rounded-md">
                            Device ID: {device.deviceId}
                        </p>
                    </CardContent>
                    <CardFooter className="gap-2">
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size="sm" disabled={isPending}>
                                    <Check className="ml-2 h-4 w-4" />
                                    موافقة
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>هل أنت متأكد من الموافقة على هذا الجهاز؟</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        بالضغط على "موافقة" سيتمكن الطالب {device.studentName} من استخدام هذا الجهاز للوصول إلى حسابه
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleApprove(device)} disabled={isPending}>
                                        {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                                        موافقة
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size="sm" variant="destructive" disabled={isPending}>
                                    <X className="ml-2 h-4 w-4" />
                                    رفض
                                </Button>
                            </AlertDialogTrigger>
                             <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>هل أنت متأكد من رفض هذا الطلب؟</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        سيتم حذف هذا الطلب بشكل نهائي ولن يتمكن الطالب من استخدام هذا الجهاز
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleReject(device.id)} className="bg-destructive hover:bg-destructive/90" disabled={isPending}>
                                       {isPending && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                                        تأكيد الرفض
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
