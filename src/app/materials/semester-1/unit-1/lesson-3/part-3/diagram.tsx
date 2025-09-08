
'use client';

import React from 'react';
import { cn } from '@/lib/utils.tsx';
import type { SVGProps } from "react";
import Image from 'next/image';

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
    <div className="flex justify-center items-center my-4">
        <Image
            src="https://i.ibb.co/68B1w2t/4.png"
            alt="بنية الألماس"
            width={100}
            height={100}
            className="rounded-lg border bg-white object-contain"
            data-ai-hint="diamond crystal lattice"
        />
    </div>
);


export const GraphiteStructure = (props: Partial<SVGProps<SVGSVGElement>>) => (
    <div className="flex justify-center items-center my-4">
        <Image
            src="https://i.ibb.co/VMy4Yh3/graphite.png"
            alt="بنية الجرافيت"
            width={100}
            height={100}
            className="rounded-lg border bg-white object-contain"
            data-ai-hint="graphite layers structure"
        />
    </div>
);

export const SiliconDioxideStructure = (props: Partial<SVGProps<SVGSVGElement>>) => (
    <div className="flex justify-center items-center my-4">
         <Image
            src="https://i.ibb.co/XzCHd71/silicon-dioxide.png"
            alt="بنية ثاني أكسيد السيليكون"
            width={100}
            height={100}
            className="rounded-lg border bg-white object-contain"
            data-ai-hint="silicon dioxide lattice"
        />
    </div>
);
