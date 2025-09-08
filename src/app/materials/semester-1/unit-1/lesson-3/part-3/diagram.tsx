
'use client';

import React from 'react';
import { cn } from '@/lib/utils.tsx';
import type { SVGProps } from "react";

const SvgDiagram = ({ children, className, ...props }: { children: React.ReactNode } & SVGProps<SVGSVGElement>) => (
    <div className="flex justify-center items-center my-4">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-full h-auto max-w-xs rounded-lg border p-2 bg-white", className)}
            {...props}
        >
            {children}
        </svg>
    </div>
);

export const DiamondStructure = (props: Partial<SVGProps<SVGSVGElement>>) => (
    <SvgDiagram viewBox="0 0 100 100" {...props} data-ai-hint="diamond crystal lattice">
        <title>بنية الألماس</title>
        <defs>
            <circle id="diamond-atom" r="4" fill="hsl(var(--primary))" />
        </defs>
        
        {/* Central atom */}
        <use href="#diamond-atom" x="50" y="50" />
        
        {/* Top atom */}
        <use href="#diamond-atom" x="50" y="25" />
        <line x1="50" y1="50" x2="50" y2="25" stroke="black" strokeWidth="1"/>

        {/* Bottom-left atom */}
        <use href="#diamond-atom" x="25" y="75" />
        <line x1="50" y1="50" x2="25" y2="75" stroke="black" strokeWidth="1"/>
        
        {/* Bottom-right atom */}
        <use href="#diamond-atom" x="75" y="75" />
        <line x1="50" y1="50" x2="75" y2="75" stroke="black" strokeWidth="1"/>

        {/* Front atom (simulated with slight offset and smaller size for perspective) */}
        <line x1="50" y1="50" x2="60" y2="60" stroke="black" strokeWidth="1" strokeDasharray="2,2"/>
        <use href="#diamond-atom" x="65" y="40" transform="scale(0.8) translate(10, 20)" />
         <line x1="50" y1="50" x2="62" y2="56" stroke="black" strokeWidth="1"/>
    </SvgDiagram>
);


export const GraphiteStructure = (props: Partial<SVGProps<SVGSVGElement>>) => (
    <SvgDiagram viewBox="0 0 100 100" {...props} data-ai-hint="graphite layers structure">
        <title>بنية الجرافيت</title>
         <defs>
            <path id="graphite-layer" d="M 20 50 L 35 25 L 65 25 L 80 50 L 65 75 L 35 75 Z" fill="hsl(var(--muted))" stroke="black" strokeWidth="1.5" />
        </defs>
        
        <g transform="translate(0, -20)">
            <use href="#graphite-layer" />
        </g>
        <g>
            <use href="#graphite-layer" />
        </g>
        <g transform="translate(0, 20)">
            <use href="#graphite-layer" />
        </g>

        <line x1="35" y1="5" x2="35" y2="45" stroke="black" strokeWidth="0.5" strokeDasharray="2,2" />
        <line x1="65" y1="5" x2="65" y2="45" stroke="black" strokeWidth="0.5" strokeDasharray="2,2" />
    </SvgDiagram>
);

export const SiliconDioxideStructure = (props: Partial<SVGProps<SVGSVGElement>>) => (
     <SvgDiagram viewBox="-10 -10 120 120" {...props} data-ai-hint="silicon dioxide lattice">
        <title>بنية ثاني أكسيد السيليكون (الكوارتز)</title>
         <defs>
            <circle id="si-atom" r="6" fill="hsl(var(--primary))" />
            <circle id="o-atom" r="4" fill="hsl(var(--destructive))" />
        </defs>

        {/* Center Si */}
        <use href="#si-atom" x="50" y="50" />

        {/* 4 Oxygen atoms around center */}
        <use href="#o-atom" x="50" y="25" />
        <line x1="50" y1="50" x2="50" y2="25" stroke="black" strokeWidth="1" />

        <use href="#o-atom" x="50" y="75" />
        <line x1="50" y1="50" x2="50" y2="75" stroke="black" strokeWidth="1" />

        <use href="#o-atom" x="25" y="50" />
        <line x1="50" y1="50" x2="25" y2="50" stroke="black" strokeWidth="1" />
        
        <use href="#o-atom" x="75" y="50" />
        <line x1="50" y1="50" x2="75" y2="50" stroke="black" strokeWidth="1" />

         {/* Connecting to other Si atoms */}
        <use href="#si-atom" x="50" y="-5" />
        <line x1="50" y1="25" x2="50" y2="-5" stroke="black" strokeWidth="1" />
        
        <use href="#si-atom" x="50" y="105" />
        <line x1="50" y1="75" x2="50" y2="105" stroke="black" strokeWidth="1" />
        
        <use href="#si-atom" x="-5" y="50" />
        <line x1="25" y1="50" x2="-5" y2="50" stroke="black" strokeWidth="1" />

        <use href="#si-atom" x="105" y="50" />
        <line x1="75" y1="50" x2="105" y2="50" stroke="black" strokeWidth="1" />
    </SvgDiagram>
);


    