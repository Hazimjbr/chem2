
'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
import EditStudentDialog from './edit-student-dialog';
import DeleteStudentDialog from './delete-student-dialog';

export interface Student {
    id: string;
    studentName: string;
    username: string;
    email: string;
    courses: string[];
    courseIds: string[];
    phone1: string;
    phone2: string;
    createdAt: string;
}

export default function ViewStudentsList() {
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);

    const fetchStudents = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);
    
    const handleUpdateSuccess = () => {
        setEditingStudent(null);
        fetchStudents(); // Refresh the list
    }
    
    const handleDeleteSuccess = () => {
        setDeletingStudent(null);
        fetchStudents(); // Refresh the list
    }

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
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => setEditingStudent(student)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeletingStudent(student)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
