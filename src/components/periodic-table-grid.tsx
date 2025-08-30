
'use client';

import { cn } from "@/lib/utils.tsx";
import { elements } from '@/data/elements';
import type { Element } from '@/data/elements';

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
            "group relative p-1 rounded border-2 shadow-sm h-11 sm:h-14 flex flex-col justify-center items-center text-center",
            "transition-transform duration-300 ease-in-out",
            "hover:scale-200 hover:z-10",
            categoryColors[element.category] || 'bg-gray-200/50 border-gray-400',
            isHighlighted && "ring-2 ring-offset-2 ring-primary z-10"
        )}
        style={{ 
            gridColumn: element.gridColumn, 
            gridRow: element.gridRow,
            transformStyle: 'preserve-3d'
        }}
    >
        <div className="text-[0.6rem] sm:text-xs font-bold">{element.number}</div>
        <div className="font-bold text-sm sm:text-lg">{element.symbol}</div>
        <div className="hidden group-hover:block text-[0.6rem] sm:text-[10px] truncate">{element.name}</div>
        <div className="hidden group-hover:block text-[0.6rem] sm:text-[10px] mt-1">
             {typeof element.atomic_mass === 'number' ? element.atomic_mass.toFixed(1) : element.atomic_mass}
        </div>
    </div>
);

interface PeriodicTableGridProps {
    foundElement: Element | null;
}

export default function PeriodicTableGrid({ foundElement }: PeriodicTableGridProps) {
    return (
        <div 
            className="w-full rounded-lg border bg-muted/30 p-1" 
            dir="ltr"
            style={{ perspective: '1000px' }}
        >
            <div 
                className="relative grid gap-1 min-w-[700px]"
                style={{
                    gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
                }}
            >
                {elements.map(el => (
                    <ElementCell key={el.number} element={el} isHighlighted={foundElement?.number === el.number} />
                ))}
            </div>
        </div>
    );
}
