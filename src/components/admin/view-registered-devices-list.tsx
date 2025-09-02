
'use client';

import React, { useState, useEffect, useCallback, useTransition } from 'react';
import { getRegisteredDevices, deleteDevice } from '@/lib/firebase/device.actions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ServerCrash, UserSearch, Trash2, Smartphone, KeyRound, Calendar } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
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

interface RegisteredDevice {
    id: string;
    studentId: string;
    studentName: string;
    deviceId: string;
    registeredAt: string;
}

export default function ViewRegisteredDevicesList() {
    const [devices, setDevices] = useState<RegisteredDevice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDeleting, startDeleteTransition] = useTransition();
    const { toast } = useToast();

    const fetchDevices = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await getRegisteredDevices();
            if (result.success && result.data) {
                setDevices(result.data);
            } else {
                setError(result.message || 'فشل في تحميل البيانات');
            }
        } catch (e) {
            setError('حدث خطأ غير متوقع');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDevices();
    }, [fetchDevices]);

    const handleDelete = (device: RegisteredDevice) => {
        startDeleteTransition(async () => {
            const result = await deleteDevice(device.deviceId, device.studentId);
            if (result.success) {
                toast({ title: 'نجاح', description: result.message });
                fetchDevices(); // Refresh list
            } else {
                toast({ variant: 'destructive', title: 'فشل', description: result.message });
            }
        });
    }

    const filteredDevices = devices.filter(device => 
        device.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.deviceId.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

    if (devices.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-40 text-muted-foreground">
                <UserSearch className="h-8 w-8 mb-2" />
                <p>لا توجد أجهزة مسجلة حاليًا</p>
            </div>
        );
    }

    return (
        <>
            <div className="mb-4">
                <Input 
                    placeholder="ابحث باسم الطالب أو معرف الجهاز..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead><Smartphone className="inline ml-2 h-4 w-4" /> اسم الطالب</TableHead>
                            <TableHead><KeyRound className="inline ml-2 h-4 w-4" /> معرّف الجهاز</TableHead>
                            <TableHead><Calendar className="inline ml-2 h-4 w-4" /> تاريخ التسجيل</TableHead>
                            <TableHead className="text-left">إجراء</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredDevices.map((device) => (
                            <TableRow key={device.id}>
                                <TableCell className="font-medium">{device.studentName}</TableCell>
                                <TableCell className="font-mono text-xs text-muted-foreground">{device.deviceId}</TableCell>
                                <TableCell>{device.registeredAt}</TableCell>
                                <TableCell className="text-left">
                                     <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>هل أنت متأكد من حذف هذا الجهاز؟</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                سيتم حذف هذا الجهاز بشكل دائم للطالب <strong className="text-primary">{device.studentName}</strong> وسيتم تسجيل خروجه من جميع الجلسات.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                            <AlertDialogAction
                                                disabled={isDeleting}
                                                className="bg-destructive hover:bg-destructive/90"
                                                onClick={() => handleDelete(device)}
                                            >
                                                {isDeleting && <Loader2 className="ml-2 h-4 w-4 animate-spin"/>}
                                                تأكيد الحذف
                                            </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                 {filteredDevices.length === 0 && (
                    <div className="text-center p-8 text-muted-foreground">
                        لا توجد نتائج مطابقة للبحث.
                    </div>
                )}
            </div>
        </>
    );
}
