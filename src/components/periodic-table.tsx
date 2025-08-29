
'use client';

import { useState } from 'react';
import { cn } from "@/lib/utils.tsx";
import { elements } from '@/data/elements';
import type { Element } from '@/data/elements';
import ElementSearch from './element-search';

interface ElementCellProps {
    element: Element;
    isHighlighted: boolean;
}

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

const ElementCell = ({ element, isHighlighted }: ElementCellProps) => (
    <div
        className={cn(
            "relative p-1 rounded border-2 shadow-sm h-16 sm:h-20 flex flex-col justify-center text-center",
            categoryColors[element.category] || 'bg-gray-200/50 border-gray-400',
            isHighlighted && "ring-2 ring-offset-2 ring-primary scale-110 z-10",
            "transition-transform duration-200"
        )}
        style={{ 
            gridColumn: element.gridColumn, 
            gridRow: element.gridRow 
        }}
    >
        <div className="absolute top-0.5 left-1 text-[0.6rem] sm:text-xs font-bold">{element.number}</div>
        <div className="font-bold text-sm sm:text-xl">{element.symbol}</div>
        <div className="hidden sm:block text-[0.6rem] sm:text-xs truncate">{element.name}</div>
        <div className="text-[0.6rem] sm:text-[10px] mt-1">
             {typeof element.atomic_mass === 'number' ? element.atomic_mass.toFixed(1) : element.atomic_mass}
        </div>
    </div>
);

export default function PeriodicTable() {
    const [searchTerm, setSearchTerm] = useState('');
    const [foundElement, setFoundElement] = useState<Element | null>(null);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(event.target.value);
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
                <div className="relative overflow-auto h-[75vh]">
                    <div 
                        className="relative grid gap-1 min-w-[700px]"
                        style={{
                            gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
                        }}
                    >
                        <ElementSearch 
                            searchTerm={searchTerm} 
                            foundElement={foundElement}
                            handleSearch={handleSearch}
                        />

                        {elements.map(el => (
                            <ElementCell key={el.number} element={el} isHighlighted={foundElement?.number === el.number} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
