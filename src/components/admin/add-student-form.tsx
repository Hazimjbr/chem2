
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { addStudent } from '@/lib/firebase/student.actions';

const courses = [
    { id: 'tawjihi_2007_sem1', label: 'تكميلي 2007 - فصل أول' },
    { id: 'tawjihi_2007_sem2', label: 'تكميلي 2007 - فصل ثاني' },
    { id: 'tawjihi_2008_sem1', label: 'توجيهي 2008 - فصل أول' },
    { id: 'tawjihi_2008_sem2', label: 'توجيهي 2008 - فصل ثاني' },
];

const formSchema = z.object({
  studentName: z.string().min(1, { message: "اسم الطالب مطلوب" }),
  username: z.string().min(3, { message: "اسم المستخدم مطلوب" }).regex(/^[a-zA-Z0-9_]+$/, 'اسم المستخدم يجب أن يحتوي على أحرف إنجليزية وأرقام فقط'),
  password_clear: z.string().min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
  courseIds: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "يجب اختيار دورة واحدة على الأقل",
  }),
  phone1: z.string().optional(),
  phone2: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddStudentForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: '',
      username: '',
      password_clear: '',
      courseIds: [],
      phone1: '',
      phone2: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
        const studentData = {
            ...values,
            courses: values.courseIds.map(id => courses.find(c => c.id === id)?.label || ''),
        };
        const result = await addStudent(studentData);
        if (result.success) {
            toast({
                title: 'نجاح',
                description: result.message,
            });
            form.reset();
        } else {
            toast({
                variant: 'destructive',
                title: 'فشل',
                description: result.message,
            });
        }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        variant: 'destructive',
        title: 'خطأ غير متوقع',
        description: 'حدث خطأ أثناء إرسال البيانات.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>اسم الطالب الكامل</FormLabel>
                <FormControl>
                    <Input placeholder="مثال: أحمد محمد" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
             <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                <FormLabel>اسم المستخدم (إنجليزية)</FormLabel>
                <FormControl>
                    <Input placeholder="مثال: ahmad_mohammad" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
             <FormField
            control={form.control}
            name="password_clear"
            render={({ field }) => (
                <FormItem>
                <FormLabel>كلمة المرور</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
             <FormField
                control={form.control}
                name="phone1"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>رقم الهاتف الأساسي</FormLabel>
                    <FormControl>
                        <Input placeholder="اختياري" {...field} />
                    </FormControl>
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
                    <FormControl>
                        <Input placeholder="اختياري" {...field} />
                    </FormControl>
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
              <div className="mb-4">
                <FormLabel className="text-base">الدورات المسجلة</FormLabel>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {courses.map((item) => (
                    <FormField
                    key={item.id}
                    control={form.control}
                    name="courseIds"
                    render={({ field }) => {
                        return (
                        <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0 space-x-reverse"
                        >
                            <FormControl>
                            <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                        (value) => value !== item.id
                                        )
                                    )
                                }}
                            />
                            </FormControl>
                            <FormLabel className="font-normal">
                            {item.label}
                            </FormLabel>
                        </FormItem>
                        )
                    }}
                    />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            إنشاء حساب الطالب
        </Button>
      </form>
    </Form>
  );
}
