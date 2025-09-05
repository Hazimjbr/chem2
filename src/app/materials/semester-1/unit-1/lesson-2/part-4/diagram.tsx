
'use client';

import React from 'react';
import Image from 'next/image';

export const VaporPressureDiagram = () => (
    <div className="flex justify-center items-center my-4">
        <Image 
            src="https://i.ibb.co/L51J2v5/1.png"
            alt="منحنى الاتزان بين التبخر والتكاثف"
            width={400}
            height={250}
            className="rounded-lg border bg-white"
            data-ai-hint="vapor pressure equilibrium"
        />
    </div>
);

export const VaporPressureCurves = () => (
    <div className="flex justify-center items-center my-4">
        <Image 
            src="https://i.ibb.co/TB6RcQkw/22.png"
            alt="منحنيات الضغط البخاري مقابل درجة الحرارة"
            width={500}
            height={350}
            className="rounded-lg border bg-white"
            data-ai-hint="vapor pressure curves"
        />
    </div>
);

