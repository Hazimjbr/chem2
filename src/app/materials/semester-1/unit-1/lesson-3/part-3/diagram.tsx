
'use client';

import React from 'react';
import { cn } from '@/lib/utils.tsx';
import Image from 'next/image';

export const DiamondStructure = () => (
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


export const GraphiteStructure = () => (
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

export const SiliconDioxideStructure = () => (
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
