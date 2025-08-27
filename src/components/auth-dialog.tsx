
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import React from 'react';

interface AuthDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAuthSuccess: () => void;
}

export default function AuthDialog({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) {
    // This component will later hold the AuthForm for login/signup
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>تسجيل الدخول</DialogTitle>
                    <DialogDescription>
                       للمتابعة يرجى تسجيل الدخول إلى حسابك
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {/* The AuthForm component will go here in the next step */}
                    <p className="text-center p-8 text-muted-foreground">نموذج تسجيل الدخول سيظهر هنا قريباً</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
