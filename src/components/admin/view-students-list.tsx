
'use client';

import React, { useState, useEffect, useCallback, useTransition } from 'react';
import { getStudents, revokeStudentSessions } from '@/lib/firebase/student.actions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ServerCrash, UserSearch, Pencil, Trash2, Copy, Smartphone, LogOut } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import EditStudentDialog from './edit-student-dialog';
import DeleteStudentDialog from './delete-student-dialog';
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
} from "@/components/ui/alert-dialog"

export interface Device {
    id: string;
    deviceId: string;
}
export interface Student {
    id: string;
    studentName: string;
    username: string;
    email: string;
    password_clear: string; // Add password to the interface
    courses: string[];
    courseIds: string[];
    phone1?: string;
    phone2?: string;
    activeDeviceId?: string;
    createdAt: string;
    devices: Device[];
}

export default function ViewStudentsList() {
    const [allStudents, setAllStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
    const [revokingStudent, setRevokingStudent] = useState<Student | null>(null);
    const [isProcessing, startTransition] = useTransition();
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();

    const fetchStudents = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await getStudents();
            if (result.success && result.data) {
                setAllStudents(result.data);
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
        fetchStudents();
    }, [fetchStudents]);
    
    const handleUpdateSuccess = useCallback(() => {
        setEditingStudent(null);
        fetchStudents(); // Refresh the list
    }, [fetchStudents]);
    
    const handleDeleteSuccess = useCallback(() => {
        setDeletingStudent(null);
        fetchStudents(); // Refresh the list
    }, [fetchStudents]);

    const handleCopyCredentials = (student: Student) => {
        const credentialsText = `اسم المستخدم: ${student.username}\nكلمة المرور: ${student.password_clear}`;
        navigator.clipboard.writeText(credentialsText).then(() => {
            toast({
                title: 'تم النسخ بنجاح',
                description: 'تم نسخ بيانات دخول الطالب إلى الحافظة',
            });
        }, (err) => {
            console.error('Could not copy text: ', err);
            toast({
                variant: 'destructive',
                title: 'فشل النسخ',
                description: 'لم نتمكن من نسخ البيانات',
            });
        });
    };
    
    const handleRevokeSession = (student: Student) => {
        startTransition(async () => {
            const result = await revokeStudentSessions(student.id);
            if (result.success) {
                toast({ title: 'نجاح', description: result.message });
            } else {
                toast({ variant: 'destructive', title: 'فشل', description: result.message });
            }
            setRevokingStudent(null);
        });
    }

    const filteredStudents = allStudents.filter(student => 
        student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.username.toLowerCase().includes(searchTerm.toLowerCase())
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
                <Button onClick={fetchStudents} variant="outline" className="mt-4">
                    إعادة المحاولة
                </Button>
            </div>
        );
    }

    if (allStudents.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-40 text-muted-foreground">
                <UserSearch className="h-8 w-8 mb-2" />
                <p>لم يتم إضافة أي طلاب بعد</p>
            </div>
        );
    }

    return (
        <>
            {editingStudent && (
                <EditStudentDialog 
                    student={editingStudent}
                    onOpenChange={() => setEditingStudent(null)}
                    onUpdateSuccess={handleUpdateSuccess}
                />
            )}
            {deletingStudent && (
                 <DeleteStudentDialog
                    student={deletingStudent}
                    onOpenChange={() => setDeletingStudent(null)}
                    onDeleteSuccess={handleDeleteSuccess}
                />
            )}
             {revokingStudent && (
                 <AlertDialog open={revokingStudent !== null} onOpenChange={() => setRevokingStudent(null)}>
                     <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>إبطال جميع الجلسات؟</AlertDialogTitle>
                            <AlertDialogDescription>
                                سيؤدي هذا الإجراء إلى تسجيل خروج الطالب <strong className="text-primary">{revokingStudent.studentName}</strong> من جميع الأجهزة التي سجل الدخول إليها. لن يتمكن من استخدام التطبيق حتى يقوم بتسجيل الدخول مرة أخرى.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleRevokeSession(revokingStudent)} disabled={isProcessing}>
                                {isProcessing && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                                تأكيد الإبطال
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                 </AlertDialog>
            )}

            <div className="mb-4">
                <Input 
                    placeholder="ابحث عن اسم طالب أو اسم مستخدم..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>اسم الطالب</TableHead>
                            <TableHead>اسم المستخدم</TableHead>
                            <TableHead>كلمة المرور</TableHead>
                            <TableHead>الأجهزة</TableHead>
                            <TableHead>الدورات</TableHead>
                            <TableHead>الهواتف</TableHead>
                            <TableHead className="text-left">إجراءات</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStudents.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell className="font-medium">{student.studentName}</TableCell>
                                <TableCell>{student.username}</TableCell>
                                <TableCell className="font-mono text-muted-foreground">{student.password_clear}</TableCell>
                                <TableCell>
                                    <Badge variant={student.activeDeviceId ? "default" : "secondary"}>
                                       {student.activeDeviceId ? <Smartphone className="h-3 w-3 ml-1" /> : null}
                                       {student.devices.length}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                    {student.courses.map(course => <Badge key={course} variant="secondary">{course}</Badge>)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {student.phone1 && <p className="text-sm">{student.phone1}</p>}
                                    {student.phone2 && <p className="text-sm text-muted-foreground">{student.phone2}</p>}
                                </TableCell>
                                <TableCell className="text-left">
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" onClick={() => setEditingStudent(student)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => setDeletingStudent(student)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                         <Button variant="ghost" size="icon" onClick={() => handleCopyCredentials(student)}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                         <Button variant="ghost" size="icon" onClick={() => setRevokingStudent(student)}>
                                            <LogOut className="h-4 w-4 text-amber-600" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                 {filteredStudents.length === 0 && (
                    <div className="text-center p-8 text-muted-foreground">
                        لا توجد نتائج مطابقة للبحث.
                    </div>
                )}
            </div>
        </>
    );
}
