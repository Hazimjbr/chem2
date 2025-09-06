
'use client';

import React, { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Laptop, Loader2, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { updateStudent } from '@/lib/firebase/student.actions';
import type { Student, Device } from './view-students-list';
import { Label } from '@/components/ui/label';
import { deleteDevice } from '@/lib/firebase/device.actions';
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

const coursesList = [
    { id: 'tawjihi_2008', label: 'توجيهي 2008' },
];

const formSchema = z.object({
  studentName: z.string().min(1, { message: "اسم الطالب مطلوب" }),
  courseIds: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "يجب اختيار دورة واحدة على الأقل",
  }),
  phone1: z.string().optional(),
  phone2: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditStudentDialogProps {
    student: Student;
    onOpenChange: (open: boolean) => void;
    onUpdateSuccess: () => void;
}

export default function EditStudentDialog({ student, onOpenChange, onUpdateSuccess }: EditStudentDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeletingDevice, startDeleteTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: student.studentName,
      courseIds: student.courseIds,
      phone1: student.phone1 || '',
      phone2: student.phone2 || '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
        const dataToUpdate = {
            ...values,
            courses: values.courseIds.map(id => coursesList.find(c => c.id === id)?.label || ''),
        };
        const result = await updateStudent(student.id, dataToUpdate);

        if (result.success) {
            toast({
                title: 'نجاح',
                description: result.message,
            });
            onUpdateSuccess();
        } else {
            toast({
                variant: 'destructive',
                title: 'فشل',
                description: result.message,
            });
        }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'خطأ غير متوقع',
        description: 'حدث خطأ أثناء تحديث البيانات.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDevice = (deviceIdString: string, studentId: string) => {
    startDeleteTransition(async () => {
        const result = await deleteDevice(deviceIdString, studentId);
        if (result.success) {
            toast({ title: 'نجاح', description: result.message });
            // Instead of local update, trigger a full re-fetch to ensure data consistency
            onUpdateSuccess();
        } else {
            toast({ variant: 'destructive', title: 'فشل', description: result.message });
        }
    });
  }

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>تعديل بيانات الطالب</DialogTitle>
          <DialogDescription>تحديث معلومات الطالب {student.studentName}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>اسم الطالب الكامل</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormItem>
                  <FormLabel>اسم المستخدم</FormLabel>
                  <Input value={student.username} disabled />
                </FormItem>
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <FormField
                control={form.control}
                name="phone1"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>رقم الهاتف الأساسي</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="phone2"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>رقم الهاتف الاحتياطي</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            </div>
            
            <FormField
              control={form.control}
              name="courseIds"
              render={() => (
                <FormItem>
                  <FormLabel>الدورات المسجلة</FormLabel>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    {coursesList.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="courseIds"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2 space-x-reverse">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(field.value?.filter((value) => value !== item.id))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="!mt-0">{item.label}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
                <Label>الأجهزة المسجلة ({student.devices.length})</Label>
                <div className="space-y-2 rounded-md border p-2 bg-muted max-h-32 overflow-y-auto">
                {student.devices.length > 0 ? (
                    student.devices.map(device => (
                    <div key={device.deviceId} className="flex items-center justify-between gap-2 text-sm text-muted-foreground font-mono">
                        <div className="flex items-center gap-2 truncate">
                           <Laptop className="h-4 w-4 flex-shrink-0" />
                           <span className="truncate">{device.deviceId}</span>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive flex-shrink-0">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>هل أنت متأكد من حذف هذا الجهاز؟</AlertDialogTitle>
                                <AlertDialogDescription>
                                    سيتم حذف هذا الجهاز بشكل دائم وسيتم تسجيل خروج الطالب منه فورًا.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction
                                    disabled={isDeletingDevice}
                                    className="bg-destructive hover:bg-destructive/90"
                                    onClick={() => handleDeleteDevice(device.deviceId, student.id)}
                                >
                                    {isDeletingDevice && <Loader2 className="ml-2 h-4 w-4 animate-spin"/>}
                                    تأكيد الحذف
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    ))
                ) : (
                    <p className="text-sm text-center text-muted-foreground py-2">لا توجد أجهزة مسجلة</p>
                )}
                </div>
            </div>

             <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                    حفظ التغييرات
                </Button>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>إلغاء</Button>
             </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
