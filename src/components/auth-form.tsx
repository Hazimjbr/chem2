
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { signInUser } from '@/lib/firebase/auth';
import { Loader2 } from 'lucide-react';
import { useApp } from '@/context/CurriculumContext';

const formSchema = z.object({
  email: z.string().email({ message: "الرجاء إدخال بريد إلكتروني صالح" }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
});

type FormValues = z.infer<typeof formSchema>;

interface AuthFormProps {
    onAuthSuccess: () => void;
}

export default function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const { handleLogin } = useApp();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const user = await signInUser(values.email, values.password);
      
      const verificationResult = await handleLogin(user);

      if (verificationResult.success) {
          toast({
            title: 'تم تسجيل الدخول بنجاح',
            description: verificationResult.message,
          });
          onAuthSuccess();
      } else {
          toast({
              title: verificationResult.title,
              description: verificationResult.message,
              variant: verificationResult.variant || 'default',
              duration: 9000,
          });
      }

    } catch (error: any) {
      console.error("Firebase Auth Error:", error);
      let description = 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.';
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        description = 'البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى التحقق من بياناتك والمحاولة مرة أخرى.';
      }
      toast({
        variant: 'destructive',
        title: 'فشل تسجيل الدخول',
        description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input placeholder="أدخل بريدك الإلكتروني" {...field} />
              </FormControl>
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
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            تسجيل الدخول
        </Button>
      </form>
    </Form>
  );
}
