
'use client';

import { InlineMath } from 'react-katex';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import React from 'react';

interface TriangleProps {
    top: string;
    topUnit: string;
    bottomLeft: string;
    bottomLeftUnit: string;
    bottomRight: string;
    bottomRightUnit: string;
    formula: string;
}

const Triangle = ({ top, topUnit, bottomLeft, bottomLeftUnit, bottomRight, bottomRightUnit, formula }: TriangleProps) => (
     <div className="flex flex-col items-center">
        <svg viewBox="0 0 120 100" className="w-48 h-auto">
            <polygon points="60,5 115,95 5,95" className="fill-muted stroke-foreground" strokeWidth="1" />
            <line x1="32.5" y1="50" x2="87.5" y2="50" className="stroke-foreground" strokeWidth="1" />
            <line x1="60" y1="50" x2="60" y2="95" className="stroke-foreground" strokeWidth="1" />
            <text x="60" y="32" textAnchor="middle" className="font-bold text-lg fill-foreground">{top}</text>
            <text x="60" y="45" textAnchor="middle" className="text-xs fill-muted-foreground">{topUnit}</text>
            <text x="38" y="75" textAnchor="middle" className="font-bold text-lg fill-foreground">{bottomLeft}</text>
            <text x="38" y="90" textAnchor="middle" className="text-xs fill-muted-foreground">{bottomLeftUnit}</text>
            <text x="83" y="75" textAnchor="middle" className="font-bold text-lg fill-foreground">{bottomRight}</text>
            <text x="83" y="90" textAnchor="middle" className="text-xs fill-muted-foreground">{bottomRightUnit}</text>
        </svg>
        <p className="mt-2 text-sm font-semibold"><InlineMath math={formula} /></p>
    </div>
);

export function CalculationTriangles() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    علاقات رياضية مساعدة
                </CardTitle>
                <CardDescription>
                    هذه المثلثات تساعدك على تذكر وحساب الكميات الأساسية بسهولة
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center" dir="ltr">
                <Triangle 
                    top="n" topUnit="(mole)" 
                    bottomLeft="C" bottomLeftUnit="(mole/L)" 
                    bottomRight="V" bottomRightUnit="(L)"
                    formula="C = n / V"
                />
                <Triangle 
                    top="m" topUnit="(g)"
                    bottomLeft="Mr" bottomLeftUnit="(g/mole)"
                    bottomRight="n" bottomRightUnit="(mole)"
                    formula="n = \frac{m}{Mr}"
                />
                <Triangle
                    top="m" topUnit="(g)"
                    bottomLeft="d" bottomLeftUnit="(g/L)"
                    bottomRight="V" bottomRightUnit="(L)"
                    formula="d = \frac{m}{V}"
                />
            </CardContent>
        </Card>
    );
}
