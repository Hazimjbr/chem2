
'use client';

import React from 'react';
import Header from '@/components/header';
import FloatingActions from '@/components/floating-actions';
import { Toaster } from '@/components/ui/toaster';
import { useCurriculum } from '@/context/CurriculumContext';

export default function AppContent({ children }: { children: React.ReactNode }) {
    const { isSelected } = useCurriculum();

    return (
        <>
            <Header />
            <main>{children}</main>
            {isSelected && <FloatingActions />}
            <Toaster />
        </>
    );
}
