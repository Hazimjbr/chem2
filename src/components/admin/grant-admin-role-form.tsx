
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { manageUser } from '@/lib/firebase/functions';

const formSchema = z.object({
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function GrantAdminRoleForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const result: any = await manageUser({ action: 'grantAdmin', email: values.email });
      toast({
        title: 'نجاح',
        description: result.data.message,
      });
      form.reset();
    } catch (error: any) {
      console.error("Function call error:", error);
      toast({
        variant: 'destructive',
        title: 'فشل',
        description: error.message || 'حدث خطأ أثناء منح الصلاحيات',
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
              <FormLabel>بريد المستخدم الإلكتروني</FormLabel>
              <FormControl>
                <Input placeholder="user@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          منح صلاحيات المسؤول
        </Button>
      </form>
    </Form>
  );
}
