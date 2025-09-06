
'use client';

import React from 'react';
import Image from 'next/image';

export const BoilingCurve = () => (
    <div className="flex justify-center items-center p-2" data-ai-hint="water heating curve">
        <Image
            src="https://i.ibb.co/spPLvD7b/4.png" 
            alt="منحنى تسخين الماء"
            width={300}
            height={200}
            className="rounded-lg border bg-white"
        />
    </div>
);

export const BoilingPointTrends = () => (
    <div className="flex justify-center items-center p-2" data-ai-hint="boiling point periodic trend">
        <Image
            src="https://i.ibb.co/hF9Fm0hw/22.png"
            alt="اتجاهات درجة الغليان في الجدول الدوري"
            width={400}
            height={300}
            className="rounded-lg border bg-white"
        />
    </div>
);
