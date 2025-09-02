
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { signInUser, signOutUser } from '@/lib/firebase/auth';
import { Loader2 } from 'lucide-react';
import { useApp } from '@/context/CurriculumContext';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email({ message: "الرجاء إدخال بريد إلكتروني صالح" }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
});

type LoginValues = z.infer<typeof loginSchema>;

interface AdminLoginDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AdminLoginDialog({ open, onOpenChange }: AdminLoginDialogProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const { handleLogin } = useApp(); // We'll use handleLogin to verify user role

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async (values: LoginValues) => {
        setIsLoading(true);
        try {
            const user = await signInUser(values.email, values.password);
            const verificationResult = await handleLogin(user);

            if (verificationResult.success && user?.email?.endsWith('@chemzim.com') === false) {
                 router.push('/admin/dashboard');
                 toast({ title: 'أهلاً بك أيها المدير', description: 'تم تسجيل دخولك بنجاح.' });
                 onOpenChange(false);
            } else {
                // If the user is a student or verification failed, sign them out and show an error.
                await signOutUser();
                toast({
                    variant: 'destructive',
                    title: 'الوصول مرفوض',
                    description: 'هذا المدخل مخصص للمسؤولين فقط.',
                });
            }
        } catch (error: any) {
            console.error("Admin Login Error:", error);
            toast({
                variant: 'destructive',
                title: 'فشل تسجيل الدخول',
                description: 'بيانات اعتماد المسؤول غير صحيحة.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>دخول المسؤول</DialogTitle>
                    <DialogDescription>
                        هذه الواجهة مخصصة لدخول المسؤول فقط.
                    </DialogDescription>
                </DialogHeader>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>البريد الإلكتروني</FormLabel>
                            <FormControl><Input placeholder="admin@example.com" {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>كلمة المرور</FormLabel>
                            <FormControl><Input type="password" placeholder="********" {...field} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                            دخول
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
