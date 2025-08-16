
'use client';

import { cn } from '@/lib/utils.tsx';
import type { SVGProps } from "react";
import React from 'react';

const SvgDiagram = ({ children, className, ...props }: { children: React.ReactNode } & SVGProps<SVGSVGElement>) => (
    <div className="flex justify-center items-center my-4">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cn("w-full h-auto bg-muted/50 rounded-lg border p-2", className)}
            {...props}
        >
            {children}
        </svg>
    </div>
);


export const GasSamplesDiagram = (props: Partial<SVGProps<SVGSVGElement>>) => (
    <SvgDiagram viewBox="0 0 400 100" {...props}>
        <title>أربع عينات من الغازات</title>
        
        {/* Sample A: Diatomic Element */}
        <g fill="hsl(var(--primary))">
            <circle cx="45" cy="30" r="4" /><circle cx="53" cy="30" r="4" />
            <circle cx="25" cy="50" r="4" /><circle cx="33" cy="50" r="4" />
            <circle cx="65" cy="60" r="4" /><circle cx="73" cy="60" r="4" />
            <circle cx="35" cy="75" r="4" /><circle cx="43" cy="75" r="4" />
        </g>
        <text x="50" y="95" textAnchor="middle" fontSize="12">A (4 جسيمات)</text>

        {/* Sample B: Compound 1 */}
        <g fill="hsl(var(--accent))">
            <rect x="120" y="30" width="8" height="8" /><rect x="128" y="38" width="8" height="8" />
            <rect x="145" y="55" width="8" height="8" /><rect x="153" y="63" width="8" height="8" />
            <rect x="165" y="25" width="8" height="8" /><rect x="173" y="33" width="8" height="8" />
            <rect x="135" y="70" width="8" height="8" /><rect x="143" y="78" width="8" height="8" />
        </g>
        <text x="150" y="95" textAnchor="middle" fontSize="12">B (4 جسيمات)</text>

        {/* Sample C: Compound 2 */}
        <g fill="hsl(var(--destructive))">
            <polygon points="230,20 220,40 240,40" /><circle cx="230" cy="45" r="5" />
            <polygon points="255,50 245,70 265,70" /><circle cx="255" cy="75" r="5" />
            <polygon points="215,60 205,80 225,80" /><circle cx="215" cy="85" r="5" />
            <polygon points="265,30 255,50 275,50" /><circle cx="265" cy="55" r="5" />
        </g>
        <text x="240" y="95" textAnchor="middle" fontSize="12">C (4 جسيمات)</text>

        {/* Sample D: More clustered particles */}
        <g fill="black">
            <circle cx="320" cy="35" r="3" />
            <circle cx="340" cy="30" r="3" />
            <circle cx="360" y="40" r="3" />
            <circle cx="315" cy="55" r="3" />
            <circle cx="335" cy="60" r="3" />
            <circle cx="355" y="70" r="3" />
            <circle cx="370" y="55" r="3" />
            <circle cx="305" y="45" r="3" />
        </g>
        <text x="340" y="95" textAnchor="middle" fontSize="12">D (8 جسيمات)</text>
    </SvgDiagram>
);


export const DiffusionProcessDiagram = (props: Partial<SVGProps<SVGSVGElement>>) => (
    <SvgDiagram viewBox="0 0 450 80" {...props}>
         <title>عملية الانتشار</title>
         <text x="225" y="15" textAnchor="middle" fontSize="12">الانتشار هو الاختلاط التدريجي للغازات</text>
        {/* Left side initial */}
        <rect x="10" y="30" width="200" height="40" stroke="black" strokeWidth="1" fill="none" />
        <circle cx="40" cy="50" r="5" fill="hsl(var(--primary))"/>
        <circle cx="60" cy="40" r="5" fill="hsl(var(--primary))"/>
        <circle cx="80" cy="60" r="5" fill="hsl(var(--primary))"/>
        
        <path d="M215 30 L 235 70" stroke="hsl(var(--accent))" strokeWidth="2" />
        <path d="M218 25 L 228 35" stroke="hsl(var(--accent))" strokeWidth="2" />


        {/* Right side final */}
        <rect x="240" y="30" width="200" height="40" stroke="black" strokeWidth="1" fill="none" />
        <circle cx="270" cy="50" r="5" fill="hsl(var(--primary))"/>
        <circle cx="350" cy="40" r="5" fill="hsl(var(--primary))"/>
        <circle cx="400" cy="60" r="5" fill="hsl(var(--primary))"/>
        <rect x="290" y="40" width="10" height="10" fill="hsl(var(--destructive))" />
        <rect x="320" y="60" width="10" height="10" fill="hsl(var(--destructive))" />
        <rect x="380" y="45" width="10" height="10" fill="hsl(var(--destructive))" />
    </SvgDiagram>
);

export const BromineDiffusionDiagram = (props: Partial<SVGProps<SVGSVGElement>>) => (
    <SvgDiagram viewBox="0 0 200 150" {...props}>
        <title>انتشار البروم في الهواء</title>
        {/* Left Beaker (Before) */}
        <rect x="10" y="20" width="80" height="100" stroke="black" strokeWidth="1" fill="none" />
        <rect x="10" y="70" width="80" height="50" fill="hsl(var(--destructive), 0.5)" />
        <line x1="10" y1="70" x2="90" y2="70" stroke="black" strokeWidth="1.5" />
        <text x="50" y="135" textAnchor="middle" fontSize="12">قبل (A)</text>
        <text x="50" y="50" textAnchor="middle" fontSize="10">هواء</text>
        <text x="50" y="100" textAnchor="middle" fontSize="10">غاز البروم</text>

        {/* Right Beaker (After) */}
        <rect x="110" y="20" width="80" height="100" stroke="black" strokeWidth="1" fill="hsl(var(--destructive), 0.2)" />
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

        <text x="330" y="30" textAnchor="middle">C</text>
        <line x1="330" y1="35" x2="330" y2="40" stroke="black" />
        
        {/* NH4Cl ring */}
        <rect x="325" y="42" width="10" height="16" fill="white" stroke="black" strokeDasharray="2" />
        <text x="330" y="20" textAnchor="middle" fontSize="10">حلقة بيضاء</text>
    </SvgDiagram>
);
