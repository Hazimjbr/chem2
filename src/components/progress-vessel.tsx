'use client';

import React from 'react';
import { cn } from '@/lib/utils.tsx';

interface ProgressVesselProps {
    label: string;
    percentage: number;
}

// Colors from the reference image
const bannerIncompleteColor = '#d9534f'; // Red
const bannerCompleteColor = 'hsl(var(--primary))'; // Blue from the theme
const castleBaseColor = '#A98E71';
const castleMidColor = '#D4B996';
const castleTopColor = '#E6D2B8';

export default function ProgressVessel({ label, percentage }: ProgressVesselProps) {
    const isComplete = percentage >= 100;
    const bannerColor = isComplete ? bannerCompleteColor : bannerIncompleteColor;

    return (
        <div className="relative w-full aspect-[3/4] text-center flex flex-col justify-end items-center" data-ai-hint="game castle progress">
            <svg viewBox="0 0 100 120" className="absolute inset-0 w-full h-full drop-shadow-md">
                 {/* Base */}
                <path d="M10 120 L10 110 L90 110 L90 120 L10 120 Z" fill={castleBaseColor} />
                <path d="M15 110 L15 90 L85 90 L85 110 Z" fill={castleBaseColor} />

                {/* Main Body */}
                <rect x="20" y="40" width="60" height="50" fill={castleMidColor} />
                
                {/* Arches */}
                <path d="M30 90 L30 70 L40 70 L40 90 Z" fill={castleBaseColor} />
                <path d="M60 90 L60 70 L70 70 L70 90 Z" fill={castleBaseColor} />

                {/* Top Section */}
                <rect x="15" y="20" width="70" height="20" fill={castleTopColor} />
                <rect x="25" y="10" width="50" height="10" fill={castleBaseColor} />

                {/* Battlements */}
                <rect x="15" y="15" width="8" height="5" fill={castleBaseColor} />
                <rect x="30" y="15" width="8" height="5" fill={castleBaseColor} />
                <rect x="45" y="15" width="8" height="5" fill={castleBaseColor} />
                <rect x="60" y="15" width="8" height="5" fill={castleBaseColor} />
                <rect x="77" y="15" width="8" height="5" fill={castleBaseColor} />

                {/* Banners */}
                <polygon points="30,25 30,55 40,50 50,55 50,25" fill={bannerColor} stroke="white" strokeWidth="0.5" />
                <polygon points="55,25 55,55 65,50 75,55 75,25" fill={bannerColor} stroke="white" strokeWidth="0.5" />

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
