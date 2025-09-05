'use client';

import React from 'react';
import { cn } from '@/lib/utils.tsx';

interface ProgressVesselProps {
    label: string;
    percentage: number;
}

const incompleteColor = 'hsl(var(--destructive))'; // Red
const completeColor = 'hsl(var(--primary))'; // Blue

export default function ProgressVessel({ label, percentage }: ProgressVesselProps) {
    const fillHeight = `${percentage}%`;

    return (
        <div className="relative w-full aspect-[3/4] text-center flex flex-col justify-end items-center">
            <svg viewBox="0 0 100 120" className="absolute inset-0 w-full h-full drop-shadow-md">
                <defs>
                    <clipPath id="castleClip">
                        {/* A simple castle shape path */}
                        <path d="M 20 110 L 20 50 L 10 50 L 10 30 L 30 30 L 30 10 L 45 10 L 45 30 L 55 30 L 55 10 L 70 10 L 70 30 L 90 30 L 90 50 L 80 50 L 80 110 Z" />
                    </clipPath>
                </defs>

                {/* The castle shapes */}
                <g clipPath="url(#castleClip)">
                    {/* Background (Incomplete color - Red) */}
                    <rect 
                        x="0" 
                        y="0" 
                        width="100" 
                        height="120" 
                        style={{ fill: incompleteColor }}
                        className="opacity-40"
                    />
                    {/* Foreground fill (Complete color - Blue) */}
                    <rect 
                        x="0" 
                        y="120" 
                        width="100" 
                        height="120" 
                        style={{ 
                            fill: completeColor, 
                            transform: `translateY(-${fillHeight})`, 
                            transition: 'transform 0.5s ease-out' 
                        }} 
                        className="opacity-60"
                    />
                </g>
                
                {/* Castle outline */}
                <path 
                    d="M 20 110 L 20 50 L 10 50 L 10 30 L 30 30 L 30 10 L 45 10 L 45 30 L 55 30 L 55 10 L 70 10 L 70 30 L 90 30 L 90 50 L 80 50 L 80 110 Z" 
                    className="stroke-foreground/50 fill-transparent" 
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
