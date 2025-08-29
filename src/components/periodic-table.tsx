
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
            "flex flex-col items-center justify-center p-0.5 rounded border-2 text-center shadow-sm text-[0.5rem] sm:text-xs h-12 sm:h-auto",
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
             <div className="w-full rounded-lg border bg-muted/30 p-1" dir="ltr">
                <div 
                    className="relative grid gap-1"
                    style={{
                        gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 p-2" style={{ gridColumn: '3 / span 10', gridRow: '2 / span 2' }}>
                        <Input 
                            placeholder="ابحث..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="md:col-span-1 h-9"
                        />
                        <Card className="md:col-span-2">
                            <CardContent className="p-2">
                                {foundElement ? (
                                    <div className="flex justify-around items-center text-center text-xs sm:text-sm">
                                        <div>
                                            <p className="text-muted-foreground text-[0.6rem]">الاسم</p>
                                            <p className="font-bold">{foundElement.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-[0.6rem]">الرمز</p>
                                            <p className="text-lg font-mono">{foundElement.symbol}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-[0.6rem]">العدد</p>
                                            <p className="font-bold">{foundElement.number}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-[0.6rem]">الكتلة</p>
                                            <p className="font-bold">{typeof foundElement.atomic_mass === 'number' ? foundElement.atomic_mass.toFixed(1) : foundElement.atomic_mass}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-center text-muted-foreground text-xs p-2">
                                        ابحث عن عنصر لعرض معلوماته
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {elements.map(el => (
                        <ElementCell key={el.number} element={el} isHighlighted={foundElement?.number === el.number} />
                    ))}
                </div>
            </div>
        </div>
    )
}
