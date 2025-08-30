
'use client';

import { cn } from "@/lib/utils.tsx";
import { elements } from '@/data/elements';
import type { Element } from '@/data/elements';

interface ElementCellProps {
    element: Element;
    isHighlighted: boolean;
}

const categoryColors: Record<string, string> = {
    'nonmetal': 'bg-green-200/50 hover:bg-green-300/80 border-green-400',
    'noble-gas': 'bg-blue-200/50 hover:bg-blue-300/80 border-blue-400',
    'alkali-metal': 'bg-red-200/50 hover:bg-red-300/80 border-red-400',
    'alkaline-earth-metal': 'bg-orange-200/50 hover:bg-orange-300/80 border-orange-400',
    'metalloid': 'bg-yellow-200/50 hover:bg-yellow-300/80 border-yellow-400',
    'halogen': 'bg-purple-200/50 hover:bg-purple-300/80 border-purple-400',
    'post-transition-metal': 'bg-indigo-200/50 hover:bg-indigo-300/80 border-indigo-400',
    'transition-metal': 'bg-pink-200/50 hover:bg-pink-300/80 border-pink-400',
    'lanthanide': 'bg-teal-200/50 hover:bg-teal-300/80 border-teal-400',
    'actinide': 'bg-cyan-200/50 hover:bg-cyan-300/80 border-cyan-400',
};

const ElementCell = ({ element, isHighlighted }: ElementCellProps) => (
    <div
        className={cn(
            "group relative p-1 rounded border-2 shadow-sm h-11 sm:h-14 flex flex-col justify-center items-center text-center cursor-pointer",
            "transition-all duration-300 ease-in-out",
            "hover:scale-150 hover:-translate-y-4 hover:z-10 hover:shadow-2xl",
            categoryColors[element.category] || 'bg-gray-200',
            isHighlighted && "ring-2 ring-offset-2 ring-destructive"
        )}
        style={{ 
            gridColumn: element.gridColumn, 
            gridRow: element.gridRow,
        }}
    >
        <div className="w-full h-full flex flex-col justify-center items-center">
             <div className="text-[0.6rem] sm:text-xs font-bold text-gray-600">
                {element.number}
            </div>

            {/* Symbol - visible by default, hidden on hover */}
            <div className="font-bold text-sm sm:text-lg group-hover:hidden">
                {element.symbol}
            </div>

            {/* Name and Mass - hidden by default, visible on hover */}
            <div className="hidden group-hover:flex group-hover:flex-col group-hover:items-center group-hover:justify-center">
                 <div className="font-extrabold text-xs truncate">{element.name}</div>
                 <div className="text-[10px] mt-0.5">
                     {typeof element.atomic_mass === 'number' ? element.atomic_mass.toFixed(1) : element.atomic_mass}
                 </div>
            </div>
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
        >
            <div 
                className="relative grid gap-1 min-w-[700px] py-4"
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
