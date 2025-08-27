
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
import { signInUser, signOutUser } from '@/lib/firebase/auth';
import { Loader2 } from 'lucide-react';
import { getOrCreateDeviceId } from '@/lib/device-id';
import { registerDevice } from '@/lib/firebase/device.actions';

const formSchema = z.object({
  username: z.string().min(1, { message: "اسم المستخدم مطلوب" }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
});

type FormValues = z.infer<typeof formSchema>;

interface AuthFormProps {
    onAuthSuccess: () => void;
}

export default function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    const email = `${values.username}@gmail.com`;
    try {
      // Step 1: Firebase Authentication
      const user = await signInUser(email, values.password);
      
      // Step 2: Device Verification
      const deviceId = getOrCreateDeviceId();
      const verificationResult = await registerDevice({ studentId: user.uid, deviceId });

      if (verificationResult.status === 'registered' || verificationResult.status === 'already-exists') {
          // Device is approved, let the user in.
          toast({
            title: 'تم تسجيل الدخول بنجاح',
            description: 'أهلاً بك مجددًا!',
          });
          onAuthSuccess();
      } else {
          // Device is pending or an error occurred
          toast({
              title: verificationResult.status === 'pending' ? 'جهازك قيد المراجعة' : 'خطأ في التحقق',
              description: verificationResult.message,
              variant: verificationResult.status === 'error' ? 'destructive' : 'default',
              duration: 9000,
          });
          // CRITICAL: Sign the user out immediately
          await signOutUser();
      }

    } catch (error: any) {
      console.error("Firebase Auth Error:", error);
      let description = 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.';
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        description = 'اسم المستخدم أو كلمة المرور غير صحيحة. يرجى التحقق من بياناتك والمحاولة مرة أخرى.';
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم المستخدم</FormLabel>
              <FormControl>
                <Input placeholder="أدخل اسم المستخدم" {...field} />
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
