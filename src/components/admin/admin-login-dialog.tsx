
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

const loginSchema = z.object({
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
});

type LoginValues = z.infer<typeof loginSchema>;

interface AdminLoginDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onLoginSuccess: () => void;
}

const ADMIN_EMAIL = 'h75jbr@gmail.com';

export default function AdminLoginDialog({ open, onOpenChange, onLoginSuccess }: AdminLoginDialogProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const { toast } = useToast();
    const { handleLogin } = useApp();

    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { password: '' },
    });

    const onSubmit = async (values: LoginValues) => {
        setIsLoading(true);
        try {
            // Attempt to sign in with the hardcoded admin email
            const user = await signInUser(ADMIN_EMAIL, values.password);
            const verificationResult = await handleLogin(user);

            if (verificationResult.success && user?.email === ADMIN_EMAIL) {
                 toast({ title: 'أهلاً بك أيها المدير', description: 'تم تسجيل دخولك بنجاح.' });
                 onLoginSuccess(); // Notify parent component of success
                 onOpenChange(false);
            } else {
                await signOutUser(); // Sign out if not the admin
                toast({
                    variant: 'destructive',
                    title: 'فشل تسجيل الدخول',
                    description: 'كلمة المرور غير صحيحة.',
                });
            }
        } catch (error: any) {
            console.error("Admin Login Error:", error);
            toast({
                variant: 'destructive',
                title: 'فشل تسجيل الدخول',
                description: 'كلمة المرور غير صحيحة.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>دخول المسؤول</DialogTitle>
                    <DialogDescription>
                        الرجاء إدخال كلمة مرور المسؤول للوصول.
                    </DialogDescription>
                </DialogHeader>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
