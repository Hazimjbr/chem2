
'use client';

import React from 'react';
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
        <div className="relative w-full aspect-[3/4] text-center flex flex-col justify-end items-center">
            {/* SVG for the beaker shape */}
            <svg viewBox="0 0 100 120" className="absolute inset-0 w-full h-full drop-shadow-md">
                {/* Liquid fill */}
                <defs>
                    <clipPath id="beakerClip">
                        <path d="M 10 10 H 90 L 80 110 H 20 L 10 10 Z" />
                    </clipPath>
                </defs>

                {/* The liquid itself */}
                <g clipPath="url(#beakerClip)">
                    <rect 
                        x="0" 
                        y="0" 
                        width="100" 
                        height="120" 
                        className="fill-muted/20" 
                    />
                    <rect 
                        x="0" 
                        y="120" 
                        width="100" 
                        height="120" 
                        style={{ 
                            fill: liquidColor, 
                            transform: `translateY(-${liquidHeight})`, 
                            transition: 'transform 0.5s ease-out, fill 0.5s ease-out' 
                        }} 
                        className="opacity-40"
                    />
                    {/* Optional: Add a wave effect later if needed */}
                </g>
                
                {/* Beaker outline */}
                <path 
                    d="M 10 10 H 90 L 80 110 H 20 L 10 10 Z" 
                    className="stroke-border fill-transparent" 
                    strokeWidth="2"
                />
            </svg>

            {/* Content on top */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full pb-2">
                <span className="font-bold text-xs sm:text-sm drop-shadow-sm text-foreground px-1">{label}</span>
                <span className="text-2xl sm:text-3xl font-bold font-mono mt-2 drop-shadow-sm text-foreground">
                    {percentage}%
                </span>
            </div>
        </div>
    );
}
