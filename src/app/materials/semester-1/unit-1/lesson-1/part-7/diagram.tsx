
'use client';

import { cn } from "@/lib/utils.tsx";
import type { SVGProps } from "react";

function Diagram({ className, ...props }: SVGProps<SVGSVGElement>) {
     return (
        <div className="flex justify-center items-center p-4">
            <svg width="250" height="200" viewBox="0 0 150 120" xmlns="http://www.w3.org/2000/svg" className={cn("w-full max-w-xs h-auto", className)} {...props}>
                <defs>
                    <marker id="arrowhead-avogadro" markerWidth="5" markerHeight="3.5" refX="0" refY="1.75" orient="auto">
                        <polygon points="0 0, 5 1.75, 0 3.5" fill="hsl(var(--muted-foreground))" />
                    </marker>
                </defs>
                <g transform="translate(0, -9)">
                    <line x1="20" y1="110" x2="20" y2="10" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrowhead-avogadro)" />
                    <text x="10" y="15" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">V</text>
                    
                    <line x1="20" y1="110" x2="140" y2="110" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrowhead-avogadro)" />
                    <text x="140" y="120" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">n</text>
                    
                    <line x1="20" y1="110" x2="120" y2="20" stroke="hsl(var(--primary))" strokeWidth="2.5" />
                </g>
            </svg>
        </div>
    )
}

export default Diagram;
