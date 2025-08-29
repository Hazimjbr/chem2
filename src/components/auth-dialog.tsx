
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import React from 'react';
import AuthForm from './auth-form';

interface AuthDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAuthSuccess: () => void;
}

export default function AuthDialog({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>تسجيل الدخول</DialogTitle>
                    <DialogDescription>
                       أدخل بيانات حسابك للمتابعة إلى المنصة
                    </DialogDescription>
                </DialogHeader>
                <AuthForm onAuthSuccess={onAuthSuccess} />
            </DialogContent>
        </Dialog>
    )
}
