
'use client';

import React from 'react';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils.tsx';

interface ProgressVesselProps {
    label: string;
    percentage: number;
}

const getProgressColor = (percentage: number): string => {
    if (percentage >= 90) return '#FFD700'; // Gold
    if (percentage >= 50) return '#C0C0C0'; // Silver
    if (percentage >= 25) return 'hsl(var(--primary))'; // Blue from theme
    return 'hsl(var(--destructive))'; // Red from theme
}

export default function ProgressVessel({ label, percentage }: ProgressVesselProps) {
    const liquidColor = getProgressColor(percentage);
    const liquidHeight = `${percentage}%`;

    return (
        <Card className="p-2 text-center aspect-[3/4] flex flex-col justify-end relative overflow-hidden bg-muted/20">
            <div className="absolute bottom-0 left-0 w-full" style={{ height: liquidHeight }}>
                <div 
                    className="absolute bottom-0 left-0 w-full h-full opacity-40"
                    style={{ backgroundColor: liquidColor, transition: 'background-color 0.5s ease, height 0.5s ease' }}
                />
                <div 
                    className="absolute bottom-0 left-0 w-full h-full opacity-10"
                    style={{ 
                        backgroundColor: liquidColor, 
                        filter: 'blur(10px)',
                        transition: 'background-color 0.5s ease, height 0.5s ease'
                    }}
                />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <span className="font-bold text-xs sm:text-sm drop-shadow-md text-foreground">{label}</span>
                <span className="text-2xl sm:text-3xl font-bold font-mono mt-2 drop-shadow-lg text-foreground">
                    {percentage}%
                </span>
            </div>
        </Card>
    );
}
