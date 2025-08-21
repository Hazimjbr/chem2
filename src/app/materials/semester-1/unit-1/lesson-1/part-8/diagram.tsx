'use client';

import { cn } from '@/lib/utils.tsx';
import type { SVGProps } from 'react';

const GasLawsGraph = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="450"
    height="350"
    viewBox="0 0 450 350"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('mx-auto my-2 bg-background p-4 rounded-lg border', props.className)}
    {...props}
  >
    <line x1="50" y1="300" x2="400" y2="300" stroke="black" strokeWidth="2" />
    <text x="410" y="305" dominantBaseline="middle">
      P(atm)
    </text>

    <line x1="50" y1="300" x2="50" y2="50" stroke="black" strokeWidth="2" />
    <text x="50" y="40" textAnchor="middle">
      PV/nRT
    </text>

    <path
      d="M50,175 L400,175"
      stroke="gray"
      strokeWidth="1"
      strokeDasharray="5,5"
    />
    <text x="30" y="175" dominantBaseline="middle" fontSize="12">
      1
    </text>

    <path
      d="M60,160 C150,100 250,110 400,140"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      fill="none"
    />
    <text x="380" y="130" fill="hsl(var(--primary))" fontSize="12">
      1000 K
    </text>

    <path
      d="M60,180 C150,150 250,160 400,170"
      stroke="hsl(var(--accent))"
      strokeWidth="2"
      fill="none"
    />
    <text x="380" y="180" fill="hsl(var(--accent))" fontSize="12">
      500 K
    </text>

    <path
      d="M60,250 C150,220 250,230 400,220"
      stroke="hsl(var(--destructive))"
      strokeWidth="2"
      fill="none"
    />
    <text x="380" y="230" fill="hsl(var(--destructive))" fontSize="12">
      200 K
    </text>

    <text x="225" y="190" textAnchor="middle" fontSize="10" fill="gray">
      الغاز المثالي
    </text>
  </svg>
);

export default GasLawsGraph;
