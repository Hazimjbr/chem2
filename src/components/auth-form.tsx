
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { signInUser } from '@/lib/firebase/auth';
import { Loader2 } from 'lucide-react';
import { useApp } from '@/context/CurriculumContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { signUpStudent } from '@/lib/firebase/student.actions';

const loginSchema = z.object({
  email: z.string().email({ message: "الرجاء إدخال بريد إلكتروني صالح" }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
});

const signUpSchema = z.object({
  studentName: z.string().min(3, { message: "الرجاء إدخال اسم ثلاثي على الأقل" }),
  username: z.string().min(3, { message: "اسم المستخدم مطلوب" }).regex(/^[a-zA-Z0-9_.]+$/, 'اسم المستخدم يجب أن يحتوي على أحرف إنجليزية وأرقام ونقاط فقط'),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
  phone: z.string().optional(),
});

type LoginValues = z.infer<typeof loginSchema>;
type SignUpValues = z.infer<typeof signUpSchema>;

interface AuthFormProps {
    onAuthSuccess: () => void;
}

function LoginForm({ onAuthSuccess }: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const { handleLogin } = useApp();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginValues) => {
    setIsLoading(true);
    try {
      const user = await signInUser(values.email, values.password);
      const verificationResult = await handleLogin(user);

      if (verificationResult.success) {
          toast({ title: 'تم تسجيل الدخول بنجاح', description: verificationResult.message });
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
      toast({ variant: 'destructive', title: 'فشل تسجيل الدخول', description });
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
              <FormLabel>البريد الإلكتروني (اسم المستخدم)</FormLabel>
              <FormControl><Input placeholder="example@chemzim.com" {...field} /></FormControl>
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
            تسجيل الدخول
        </Button>
      </form>
    </Form>
  );
}

function SignUpForm({ onAuthSuccess }: AuthFormProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const { handleLogin } = useApp();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { studentName: '', username: '', password: '', phone: '' },
  });

  const onSubmit = async (values: SignUpValues) => {
    setIsLoading(true);
    try {
      const result = await signUpStudent(values);
      if (result.success && result.user) {
         // After successful sign-up, perform the same device verification as login
         const verificationResult = await handleLogin(result.user);
         if (verificationResult.success) {
            toast({ title: 'تم إنشاء الحساب بنجاح', description: verificationResult.message });
            onAuthSuccess();
         } else {
             toast({
                title: verificationResult.title,
                description: verificationResult.message,
                variant: verificationResult.variant || 'default',
                duration: 9000,
            });
         }
      } else {
        toast({ variant: 'destructive', title: 'فشل إنشاء الحساب', description: result.message });
      }
    } catch (error: any) {
        toast({ variant: 'destructive', title: 'خطأ غير متوقع', description: 'حدث خطأ أثناء إنشاء الحساب.'});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="studentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الاسم الكامل</FormLabel>
              <FormControl><Input placeholder="مثال: أحمد محمد علي" {...field} /></FormControl>
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
              <FormControl><Input placeholder="مثال: ahmad.ali" {...field} /></FormControl>
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
         <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الهاتف (اختياري)</FormLabel>
              <FormControl><Input placeholder="07xxxxxxxx" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            إنشاء حساب جديد
        </Button>
      </form>
    </Form>
  );
}


export default function AuthForm({ onAuthSuccess }: AuthFormProps) {
  return (
    <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
            <TabsTrigger value="signup">إنشاء حساب</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
            <LoginForm onAuthSuccess={onAuthSuccess} />
        </TabsContent>
        <TabsContent value="signup">
            <SignUpForm onAuthSuccess={onAuthSuccess} />
        </TabsContent>
    </Tabs>
  )
}
