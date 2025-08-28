
'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { getStudents } from '@/lib/firebase/student.actions';
import { Button } from '@/components/ui/button';
import { Loader2, ServerCrash, UserSearch, Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Student {
    id: string;
    studentName: string;
    username: string;
    email: string;
    courses: string[];
    phone1: string;
    phone2: string;
    createdAt: string;
}

export default function ViewStudentsList() {
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStudents = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await getStudents();
            if (result.success && result.data) {
                setStudents(result.data);
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
        fetchStudents();
    }, []);

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

    if (students.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-40 text-muted-foreground">
                <UserSearch className="h-8 w-8 mb-2" />
                <p>لم يتم إضافة أي طلاب بعد</p>
            </div>
        );
    }

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>اسم الطالب</TableHead>
                        <TableHead>اسم المستخدم</TableHead>
                        <TableHead>الدورات</TableHead>
                        <TableHead>الهواتف</TableHead>
                        <TableHead className="text-left">إجراءات</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {students.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.studentName}</TableCell>
                            <TableCell>{student.username}</TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                {student.courses.map(course => <Badge key={course} variant="secondary">{course}</Badge>)}
                                </div>
                            </TableCell>
                            <TableCell>
                                {student.phone1 && <p>{student.phone1}</p>}
                                {student.phone2 && <p>{student.phone2}</p>}
                            </TableCell>
                            <TableCell className="text-left">
                                <TooltipProvider>
                                    <div className="flex gap-2">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" disabled>
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent><p>تعديل (قيد التطوير)</p></TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                 <Button variant="ghost" size="icon" className="text-destructive" disabled>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent><p>حذف (قيد التطوير)</p></TooltipContent>
                                        </Tooltip>
                                    </div>
                                </TooltipProvider>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
