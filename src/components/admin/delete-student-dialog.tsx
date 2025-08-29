
'use client';

import React, { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { 
    AlertDialog, 
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogDescription, 
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from '@/components/ui/alert-dialog';
import { deleteStudent } from '@/lib/firebase/student.actions';
import type { Student } from './view-students-list';

interface DeleteStudentDialogProps {
    student: Student;
    onOpenChange: (open: boolean) => void;
    onDeleteSuccess: () => void;
}

export default function DeleteStudentDialog({ student, onOpenChange, onDeleteSuccess }: DeleteStudentDialogProps) {
  const [isDeleting, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = async () => {
    startTransition(async () => {
        const result = await deleteStudent(student.id);
        if (result.success) {
            toast({
                title: 'نجاح',
                description: result.message,
            });
            onDeleteSuccess();
        } else {
            toast({
                variant: 'destructive',
                title: 'فشل',
                description: result.message,
            });
        }
    });
  };

  return (
    <AlertDialog open={true} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
          <AlertDialogDescription>
            سيتم حذف حساب الطالب <span className="font-bold text-destructive">{student.studentName}</span> وجميع بياناته المسجلة (بما في ذلك الأجهزة) بشكل نهائي من نظام المصادقة وقاعدة البيانات.
             <strong className="mt-2 block">هذا الإجراء لا يمكن التراجع عنه.</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete} 
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isDeleting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            تأكيد الحذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
