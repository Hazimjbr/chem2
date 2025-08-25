
'use client';

import { cn } from '@/lib/utils.tsx';
import type { SVGProps } from "react";
import React from 'react';

const SvgDiagram = ({ children, className, ...props }: { children: React.ReactNode } & SVGProps<SVGSVGElement>) => (
    <div className="flex justify-center items-center my-4">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-full h-auto bg-white rounded-lg border p-2", className)}
            {...props}
        >
            {children}
        </svg>
    </div>
);


export const GasSamplesDiagram = (props: Partial<SVGProps<SVGSVGElement>>) => (
    <SvgDiagram viewBox="0 0 400 120" {...props}>
        <title>أربع عينات من الغازات</title>
        
        {/* Sample A Box */}
        <rect x="20" y="10" width="80" height="80" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1"/>
        <g fill="hsl(var(--primary))">
            <g transform="translate(40, 30)"><circle cx="-4" cy="0" r="4" /><circle cx="4" cy="0" r="4" /></g>
            <g transform="translate(60, 50)"><circle cx="-4" cy="0" r="4" /><circle cx="4" cy="0" r="4" /></g>
            <g transform="translate(35, 65)"><circle cx="-4" cy="0" r="4" /><circle cx="4" cy="0" r="4" /></g>
            <g transform="translate(65, 25)"><circle cx="-4" cy="0" r="4" /><circle cx="4" cy="0" r="4" /></g>
        </g>
        <text x="60" y="105" textAnchor="middle" fontSize="12">A</text>

        {/* Sample B Box */}
        <rect x="110" y="10" width="80" height="80" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1"/>
         <g fill="hsl(var(--accent))">
            <g transform="translate(130, 30)"><rect x="-4" y="-4" width="8" height="8" /><circle cx="-8" cy="0" r="4" /><circle cx="8" cy="0" r="4" /></g>
            <g transform="translate(160, 60)"><rect x="-4" y="-4" width="8" height="8" /><circle cx="-8" cy="0" r="4" /><circle cx="8" cy="0" r="4" /></g>
            <g transform="translate(140, 70)"><rect x="-4" y="-4" width="8" height="8" /><circle cx="-8" cy="0" r="4" /><circle cx="8" cy="0" r="4" /></g>
        </g>
        <text x="150" y="105" textAnchor="middle" fontSize="12">B</text>

        {/* Sample C Box */}
        <rect x="200" y="10" width="80" height="80" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1"/>
        <g fill="hsl(var(--destructive))">
            <g transform="translate(225, 40)"><polygon points="0,-8 -8,8 8,8" /><circle cx="0" cy="12" r="4" /></g>
            <g transform="translate(255, 65)"><polygon points="0,-8 -8,8 8,8" /><circle cx="0" cy="12" r="4" /></g>
        </g>
        <text x="240" y="105" textAnchor="middle" fontSize="12">C</text>

        {/* Sample D Box */}
        <rect x="290" y="10" width="80" height="80" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1"/>
        <g fill="black">
            <circle cx="310" cy="30" r="3" />
            <circle cx="340" cy="25" r="3" />
            <circle cx="320" cy="50" r="3" />
            <circle cx="350" cy="60" r="3" />
            <circle cx="315" cy="70" r="3" />
        </g>
        <text x="330" y="105" textAnchor="middle" fontSize="12">D</text>

    </SvgDiagram>
);



export const DiffusionProcessDiagram = (props: Partial<SVGProps<SVGSVGElement>>) => (
    <SvgDiagram viewBox="0 0 450 360" {...props}>
        <title>أربعة عمليات غازية</title>
        
        {/* Helper definitions */}
        <defs>
            <g id="white-diatomic"><circle cx="-3" cy="0" r="3" fill="white" stroke="black" strokeWidth="0.5"/><circle cx="3" cy="0" r="3" fill="white" stroke="black" strokeWidth="0.5"/></g>
            <g id="black-diatomic"><circle cx="-3" cy="0" r="3" fill="black" /><circle cx="3" cy="0" r="3" fill="black" /></g>
             <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
            </marker>
        </defs>
        
        {/* Shared initial state for all */}
        <g id="initial-state">
            <use href="#white-diatomic" x="30" y="120" /> 
            <use href="#white-diatomic" x="70" y="150" />
            <use href="#black-diatomic" x="130" y="160" /> 
            <use href="#black-diatomic" x="170" y="110" />
        </g>


        {/* --- Row 1, Process A (Correct Diffusion) --- */}
        <text x="430" y="45" textAnchor="middle" fontSize="16">أ</text>
        <rect x="10" y="10" width="180" height="70" fill="none" stroke="black" strokeWidth="1"/>
        <rect x="230" y="10" width="180" height="70" fill="none" stroke="black" strokeWidth="1"/>
        <path d="M195,45 l 30,0" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
        {/* Initial State A */}
        <use href="#white-diatomic" x="60" y="30" /> 
        <use href="#white-diatomic" x="90" y="60" /> 
        <use href="#black-diatomic" x="120" y="20" /> 
        <use href="#black-diatomic" x="150" y="50" /> 
        {/* Final State A */}
        <use href="#white-diatomic" x="250" y="60" /> 
        <use href="#white-diatomic" x="380" y="25" /> 
        <use href="#black-diatomic" x="280" y="20" /> 
        <use href="#black-diatomic" x="350" y="55" /> 

        {/* --- Row 2, Process B (Separation) --- */}
        <text x="430" y="135" textAnchor="middle" fontSize="16">ب</text>
        <rect x="10" y="100" width="180" height="70" fill="none" stroke="black" strokeWidth="1"/>
        <rect x="230" y="100" width="180" height="70" fill="none" stroke="black" strokeWidth="1"/>
        <path d="M195,135 l 30,0" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
        {/* Initial State B - Unified */}
        <use href="#white-diatomic" x="30" y="120" /> 
        <use href="#white-diatomic" x="70" y="150" /> 
        <use href="#black-diatomic" x="130" y="110" /> 
        <use href="#black-diatomic" x="170" y="140" /> 
        {/* Final State B (White on left, Black on right) */}
        <use href="#white-diatomic" x="250" y="115" /> <use href="#white-diatomic" x="280" y="155" /> <use href="#white-diatomic" x="310" y="125" />
        <use href="#black-diatomic" x="350" y="110" /> <use href="#black-diatomic" x="380" y="160" /> <use href="#black-diatomic" x="390" y="130" />
        
        {/* --- Row 3, Process C (Reversed Separation) --- */}
        <text x="430" y="225" textAnchor="middle" fontSize="16">ج</text>
        <rect x="10" y="190" width="180" height="70" fill="none" stroke="black" strokeWidth="1"/>
        <rect x="230" y="190" width="180" height="70" fill="none" stroke="black" strokeWidth="1"/>
        <path d="M195,225 l 30,0" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
        {/* Initial State C - Unified */}
        <use href="#white-diatomic" x="30" y="210" /> 
        <use href="#white-diatomic" x="70" y="240" />
        <use href="#black-diatomic" x="130" y="200" /> 
        <use href="#black-diatomic" x="170" y="230" />
        {/* Final State C (Black on left, White on right) */}
        <use href="#black-diatomic" x="280" y="245" /> <use href="#black-diatomic" x="310" y="215" />
        <use href="#white-diatomic" x="380" y="250" /> <use href="#white-diatomic" x="390" y="220" />

        {/* --- Row 4, Process D (Reaction/Bonding) --- */}
        <text x="430" y="315" textAnchor="middle" fontSize="16">د</text>
        <rect x="10" y="280" width="180" height="70" fill="none" stroke="black" strokeWidth="1"/>
        <rect x="230" y="280" width="180" height="70" fill="none" stroke="black" strokeWidth="1"/>
        <path d="M195,315 l 30,0" stroke="black" strokeWidth="2" markerEnd="url(#arrow)" />
        {/* Initial State D - Unified */}
        <use href="#white-diatomic" x="30" y="300" /> 
        <use href="#white-diatomic" x="70" y="330" />
        <use href="#black-diatomic" x="130" y="290" /> 
        <use href="#black-diatomic" x="170" y="320" />
        {/* Final State D (Bonded pairs) */}
        <use href="#white-diatomic" x="260" y="315" />
        <use href="#black-diatomic" x="272" y="315" />
        <use href="#white-diatomic" x="340" y="300" />
        <use href="#black-diatomic" x="352" y="300" />
    </SvgDiagram>
);


export const BromineDiffusionDiagram = (props: Partial<SVGProps<SVGSVGElement>>) => (
     <SvgDiagram viewBox="0 0 200 150" {...props}>
        <title>انتشار البروم في الهواء</title>
        {/* Left Beaker (Before) */}
        <rect x="10" y="20" width="80" height="100" stroke="black" strokeWidth="1" fill="none" />
        <rect x="10" y="70" width="80" height="50" fill="rgba(165, 42, 42, 0.7)" />
        <line x1="10" y1="70" x2="90" y2="70" stroke="black" strokeWidth="1.5" />
        <text x="50" y="135" textAnchor="middle" fontSize="12">قبل (A)</text>
        <text x="50" y="50" textAnchor="middle" fontSize="10">هواء</text>
        <text x="50" y="100" textAnchor="middle" fontSize="10">غاز البروم</text>

        {/* Right Beaker (After) */}
        <rect x="110" y="20" width="80" height="100" stroke="black" strokeWidth="1" fill="rgba(165, 42, 42, 0.25)" />
        <text x="150" y="135" textAnchor="middle" fontSize="12">بعد (B)</text>
        <text x="150" y="70" textAnchor="middle" fontSize="10">خليط متجانس</text>
    </SvgDiagram>
);

export const AmmoniumChlorideDiagram = (props: Partial<SVGProps<SVGSVGElement>>) => (
     <SvgDiagram viewBox="0 0 450 100" {...props}>
        <title>تفاعل الأمونيا و كلوريد الهيدروجين</title>
        {/* Tube */}
        <rect x="20" y="40" width="410" height="20" rx="10" stroke="black" fill="hsl(var(--muted))" />

        {/* Left cotton */}
        <circle cx="25" cy="50" r="10" fill="white" stroke="black" />
        <text x="25" y="80" textAnchor="middle" fontSize="10">قطن مبلل بـ HCl</text>

        {/* Right cotton */}
        <circle cx="425" cy="50" r="10" fill="white" stroke="black" />
        <text x="425" y="80" textAnchor="middle" fontSize="10">قطن مبلل بـ NH₃</text>
        
        {/* Reaction points */}
        <text x="120" y="30" textAnchor="middle">A</text>
        <line x1="120" y1="35" x2="120" y2="40" stroke="black" />
        
        <text x="225" y="30" textAnchor="middle">B</text>
        <line x1="225" y1="35" x2="225" y2="40" stroke="black" />

        <text x="320" y="30" textAnchor="middle">C</text>
        <line x1="320" y1="35" x2="320" y2="40" stroke="black" />
        
    </SvgDiagram>
);




    