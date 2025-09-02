'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils.tsx';
import { Smartphone, CheckCircle, UserPlus, Users, RefreshCw } from 'lucide-react';
import React from 'react';

const navLinks = [
    { href: '/admin/dashboard', label: 'الموافقة', icon: <CheckCircle className="ml-2 h-4 w-4" /> },
    { href: '/admin/dashboard/students', label: 'الطلاب', icon: <Users className="ml-2 h-4 w-4" /> },
    { href: '/admin/dashboard/add-student', label: 'إنشاء حساب', icon: <UserPlus className="ml-2 h-4 w-4" /> },
    { href: '/admin/dashboard/registered-devices', label: 'الأجهزة المسجلة', icon: <Smartphone className="ml-2 h-4 w-4" /> },
];

export default function AdminNav() {
    const pathname = usePathname();

    return (
        <div className="p-2 bg-muted rounded-lg flex items-center justify-between flex-wrap gap-2">
            <nav className="flex items-center gap-2 flex-wrap">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link key={link.href} href={link.href} passHref>
                            <Button variant={isActive ? 'default' : 'ghost'} size="sm">
                                {link.icon}
                                {link.label}
                            </Button>
                        </Link>
                    );
                })}
            </nav>
            <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.reload()}
            >
                <RefreshCw className="ml-2 h-4 w-4" />
                تحديث البيانات
            </Button>
        </div>
    );
}
