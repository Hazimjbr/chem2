
'use client';

import { useState } from 'react';
import { cn } from "@/lib/utils.tsx";
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { elements } from '@/data/elements';
import type { Element } from '@/data/elements';

const categoryColors: Record<string, string> = {
    'nonmetal': 'bg-green-200/50 border-green-400',
    'noble-gas': 'bg-blue-200/50 border-blue-400',
    'alkali-metal': 'bg-red-200/50 border-red-400',
    'alkaline-earth-metal': 'bg-orange-200/50 border-orange-400',
    'metalloid': 'bg-yellow-200/50 border-yellow-400',
    'halogen': 'bg-purple-200/50 border-purple-400',
    'post-transition-metal': 'bg-indigo-200/50 border-indigo-400',
    'transition-metal': 'bg-pink-200/50 border-pink-400',
    'lanthanide': 'bg-teal-200/50 border-teal-400',
    'actinide': 'bg-cyan-200/50 border-cyan-400',
};


interface ElementCellProps {
    element: Element;
    isHighlighted: boolean;
}

const ElementCell = ({ element, isHighlighted }: ElementCellProps) => (
    <div
        className={cn(
            "flex flex-col items-center justify-center p-0.5 rounded border-2 text-center shadow-sm text-[0.5rem] sm:text-xs h-14 sm:h-auto", // Further reduced height
            categoryColors[element.category] || 'bg-gray-200/50 border-gray-400',
            isHighlighted && "ring-2 ring-offset-2 ring-primary scale-110 z-10",
            "transition-transform duration-200"
        )}
        style={{ 
            gridColumnStart: element.gridColumn, 
            gridRowStart: element.gridRow 
        }}
    >
        <div className="font-bold">{element.number}</div>
        <div className="text-sm sm:text-base font-bold">{element.symbol}</div>
        <div className="hidden sm:block truncate">{element.name}</div>
        <div className="hidden sm:block">{typeof element.atomic_mass === 'number' ? element.atomic_mass.toFixed(1) : element.atomic_mass}</div>
    </div>
);

export default function PeriodicTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [foundElement, setFoundElement] = useState<Element | null>(null);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        if (!term) {
            setFoundElement(null);
            return;
        }
        const found = elements.find(
            el => el.symbol.toLowerCase() === term || el.name.toLowerCase() === term || el.number.toString() === term
        );
        setFoundElement(found || null);
    };

    return (
        <div className="w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 md:flex-row-reverse md:items-center gap-4">
                <Input 
                    placeholder="ابحث بالاسم، الرمز، أو العدد الذري"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="md:col-span-1"
                />
                <Card className="md:col-span-2">
                    <CardContent className="p-4">
                        {foundElement ? (
                            <div className="flex justify-around items-center text-center">
                                <div>
                                    <p className="text-sm text-muted-foreground">الاسم</p>
                                    <p className="text-lg font-bold">{foundElement.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">الرمز</p>
                                    <p className="text-2xl font-mono">{foundElement.symbol}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">العدد الذري</p>
                                    <p className="text-lg font-bold">{foundElement.number}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">الكتلة الذرية</p>
                                    <p className="text-lg font-bold">{typeof foundElement.atomic_mass === 'number' ? foundElement.atomic_mass.toFixed(1) : foundElement.atomic_mass}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-muted-foreground p-2">
                                ابدأ البحث لعرض معلومات العنصر هنا
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
             <div className="w-full rounded-lg border bg-muted/30 p-1" dir="ltr">
                <div 
                    className="relative grid gap-1"
                    style={{
                        gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
                    }}
                >
                    {elements.map(el => (
                        <ElementCell key={el.number} element={el} isHighlighted={foundElement?.number === el.number} />
                    ))}
                </div>
            </div>
        </div>
    )
}
