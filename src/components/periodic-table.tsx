
'use client';

import { useState } from 'react';
import { cn } from "@/lib/utils.tsx";
import type { SVGProps } from "react";
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const elements = [
    // Row 1
    { x: 51.6, y: 30.1, number: 1, symbol: 'H', name: 'هيدروجين', mass: '1.0', category: 'nonmetal' },
    { x: 896.5, y: 30.1, number: 2, symbol: 'He', name: 'هيليوم', mass: '4.0', category: 'noble-gas' },
    // Row 2
    { x: 51.6, y: 85.9, number: 3, symbol: 'Li', name: 'ليثيوم', mass: '6.9', category: 'alkali-metal' },
    { x: 101.3, y: 85.9, number: 4, symbol: 'Be', name: 'بيريليوم', mass: '9.0', category: 'alkaline-earth-metal' },
    { x: 648, y: 85.9, number: 5, symbol: 'B', name: 'بورون', mass: '10.8', category: 'metalloid' },
    { x: 697.7, y: 85.9, number: 6, symbol: 'C', name: 'كربون', mass: '12.0', category: 'nonmetal' },
    { x: 747.4, y: 85.9, number: 7, symbol: 'N', name: 'نيتروجين', mass: '14.0', category: 'nonmetal' },
    { x: 797.1, y: 85.9, number: 8, symbol: 'O', name: 'أكسجين', mass: '16.0', category: 'nonmetal' },
    { x: 846.8, y: 85.9, number: 9, symbol: 'F', name: 'فلور', mass: '19.0', category: 'halogen' },
    { x: 896.5, y: 85.9, number: 10, symbol: 'Ne', name: 'نيون', mass: '20.2', category: 'noble-gas' },
    // Row 3
    { x: 51.6, y: 141.7, number: 11, symbol: 'Na', name: 'صوديوم', mass: '23.0', category: 'alkali-metal' },
    { x: 101.3, y: 141.7, number: 12, symbol: 'Mg', name: 'ماغنسيوم', mass: '24.3', category: 'alkaline-earth-metal' },
    { x: 648, y: 141.7, number: 13, symbol: 'Al', name: 'ألومنيوم', mass: '27.0', category: 'post-transition-metal' },
    { x: 697.7, y: 141.7, number: 14, symbol: 'Si', name: 'سيليكون', mass: '28.1', category: 'metalloid' },
    { x: 747.4, y: 141.7, number: 15, symbol: 'P', name: 'فسفور', mass: '31.0', category: 'nonmetal' },
    { x: 797.1, y: 141.7, number: 16, symbol: 'S', name: 'كبريت', mass: '32.1', category: 'nonmetal' },
    { x: 846.8, y: 141.7, number: 17, symbol: 'Cl', name: 'كلور', mass: '35.5', category: 'halogen' },
    { x: 896.5, y: 141.7, number: 18, symbol: 'Ar', name: 'أرجون', mass: '39.9', category: 'noble-gas' },
    // Row 4
    { x: 51.6, y: 197.5, number: 19, symbol: 'K', name: 'بوتاسيوم', mass: '39.1', category: 'alkali-metal' },
    { x: 101.3, y: 197.5, number: 20, symbol: 'Ca', name: 'كالسيوم', mass: '40.1', category: 'alkaline-earth-metal' },
    { x: 151, y: 197.5, number: 21, symbol: 'Sc', name: 'سكانديوم', mass: '45.0', category: 'transition-metal' },
    { x: 200.7, y: 197.5, number: 22, symbol: 'Ti', name: 'تيتانيوم', mass: '47.9', category: 'transition-metal' },
    { x: 250.4, y: 197.5, number: 23, symbol: 'V', name: 'فاناديوم', mass: '50.9', category: 'transition-metal' },
    { x: 300.1, y: 197.5, number: 24, symbol: 'Cr', name: 'كروم', mass: '52.0', category: 'transition-metal' },
    { x: 349.8, y: 197.5, number: 25, symbol: 'Mn', name: 'منغنيز', mass: '54.9', category: 'transition-metal' },
    { x: 399.5, y: 197.5, number: 26, symbol: 'Fe', name: 'حديد', mass: '55.8', category: 'transition-metal' },
    { x: 449.2, y: 197.5, number: 27, symbol: 'Co', name: 'كوبالت', mass: '58.9', category: 'transition-metal' },
    { x: 498.9, y: 197.5, number: 28, symbol: 'Ni', name: 'نيكل', mass: '58.7', category: 'transition-metal' },
    { x: 548.6, y: 197.5, number: 29, symbol: 'Cu', name: 'نحاس', mass: '63.5', category: 'transition-metal' },
    { x: 598.3, y: 197.5, number: 30, symbol: 'Zn', name: 'خارصين', mass: '65.4', category: 'transition-metal' },
    { x: 648, y: 197.5, number: 31, symbol: 'Ga', name: 'جاليوم', mass: '69.7', category: 'post-transition-metal' },
    { x: 697.7, y: 197.5, number: 32, symbol: 'Ge', name: 'جرمانيوم', mass: '72.6', category: 'metalloid' },
    { x: 747.4, y: 197.5, number: 33, symbol: 'As', name: 'زرنيخ', mass: '74.9', category: 'metalloid' },
    { x: 797.1, y: 197.5, number: 34, symbol: 'Se', name: 'سيلينيوم', mass: '79.0', category: 'nonmetal' },
    { x: 846.8, y: 197.5, number: 35, symbol: 'Br', name: 'بروم', mass: '79.9', category: 'halogen' },
    { x: 896.5, y: 197.5, number: 36, symbol: 'Kr', name: 'كريبتون', mass: '83.8', category: 'noble-gas' },
    // Row 5
    { x: 51.6, y: 253.3, number: 37, symbol: 'Rb', name: 'روبيديوم', mass: '85.5', category: 'alkali-metal' },
    { x: 101.3, y: 253.3, number: 38, symbol: 'Sr', name: 'سترونشيوم', mass: '87.6', category: 'alkaline-earth-metal' },
    { x: 151, y: 253.3, number: 39, symbol: 'Y', name: 'إتريوم', mass: '88.9', category: 'transition-metal' },
    { x: 200.7, y: 253.3, number: 40, symbol: 'Zr', name: 'زركونيوم', mass: '91.2', category: 'transition-metal' },
    { x: 250.4, y: 253.3, number: 41, symbol: 'Nb', name: 'نيوبيوم', mass: '92.9', category: 'transition-metal' },
    { x: 300.1, y: 253.3, number: 42, symbol: 'Mo', name: 'موليبدنوم', mass: '95.9', category: 'transition-metal' },
    { x: 349.8, y: 253.3, number: 43, symbol: 'Tc', name: 'تكنيشيوم', mass: '(98)', category: 'transition-metal' },
    { x: 399.5, y: 253.3, number: 44, symbol: 'Ru', name: 'روثينيوم', mass: '101.1', category: 'transition-metal' },
    { x: 449.2, y: 253.3, number: 45, symbol: 'Rh', name: 'روديوم', mass: '102.9', category: 'transition-metal' },
    { x: 498.9, y: 253.3, number: 46, symbol: 'Pd', name: 'بالاديوم', mass: '106.4', category: 'transition-metal' },
    { x: 548.6, y: 253.3, number: 47, symbol: 'Ag', name: 'فضة', mass: '107.9', category: 'transition-metal' },
    { x: 598.3, y: 253.3, number: 48, symbol: 'Cd', name: 'كادميوم', mass: '112.4', category: 'transition-metal' },
    { x: 648, y: 253.3, number: 49, symbol: 'In', name: 'إنديوم', mass: '114.8', category: 'post-transition-metal' },
    { x: 697.7, y: 253.3, number: 50, symbol: 'Sn', name: 'قصدير', mass: '118.7', category: 'post-transition-metal' },
    { x: 747.4, y: 253.3, number: 51, symbol: 'Sb', name: 'إثمد', mass: '121.8', category: 'metalloid' },
    { x: 797.1, y: 253.3, number: 52, symbol: 'Te', name: 'تيلوريوم', mass: '127.6', category: 'metalloid' },
    { x: 846.8, y: 253.3, number: 53, symbol: 'I', name: 'يود', mass: '126.9', category: 'halogen' },
    { x: 896.5, y: 253.3, number: 54, symbol: 'Xe', name: 'زينون', mass: '131.3', category: 'noble-gas' },
];

type Element = typeof elements[0];

interface ElementCellProps extends Element {
    isHighlighted: boolean;
}

const ElementCell = ({ x, y, number, symbol, name, mass, isHighlighted }: ElementCellProps) => (
    <>
        <rect 
            x={x} 
            y={y} 
            width="49.7" 
            height="55.8" 
            stroke={isHighlighted ? "hsl(var(--primary))" : "#000"} 
            strokeWidth={isHighlighted ? "2" : "0.59"} 
            fill={isHighlighted ? "hsl(var(--primary)/.20)" : "#fff"}
            strokeMiterlimit={10} 
        />
        <text x={x + 16} y={y + 11.9} fontFamily="Arial-BoldMT, Arial" fontWeight={700} fontSize="12px" textAnchor="start">{number}</text>
        <text x={x + 24.85} y={y + 24.9} fontFamily="Arial-BoldMT, Arial" fontWeight={700} fontSize="14px" textAnchor="middle">{symbol}</text>
        <text x={x + 24.85} y={y + 39.9} fontFamily="ArialMT, Arial" fontSize="12px" textAnchor="middle">{name}</text>
        <text x={x + 24.85} y={y + 51.9} fontFamily="ArialMT, Arial" fontSize="12px" textAnchor="middle">{mass}</text>
    </>
);

function PeriodicTable({ className, ...props }: SVGProps<SVGSVGElement>) {
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
            el => el.symbol.toLowerCase() === term || el.name.toLowerCase() === term
        );

        setFoundElement(found || null);
    };

    return (
        <div className="w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 md:flex-row-reverse md:items-center gap-4">
                <Input 
                    placeholder="ابحث بالاسم أو الرمز (مثال Fe أو حديد)"
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
                                    <p className="text-lg font-bold">{foundElement.mass}</p>
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
             <ScrollArea className="w-full whitespace-nowrap rounded-lg border">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 950 350"
                    className={cn("w-full min-w-[950px] h-auto bg-card", className)}
                    {...props}
                >
                    {elements.map(el => (
                        <ElementCell key={el.number} {...el} isHighlighted={foundElement?.number === el.number} />
                    ))}
                    {/* Group Ruler */}
                     <g fontFamily="Arial-BoldMT, Arial" fontWeight={700} fontSize="14px" textAnchor="middle" fill="hsl(var(--muted-foreground))">
                        <text x={51.6 + 24.85} y={335}>1</text>
                        <text x={101.3 + 24.85} y={335}>2</text>
                        <text x={151 + 24.85} y={335}>3</text>
                        <text x={200.7 + 24.85} y={335}>4</text>
                        <text x={250.4 + 24.85} y={335}>5</text>
                        <text x={300.1 + 24.85} y={335}>6</text>
                        <text x={349.8 + 24.85} y={335}>7</text>
                        <text x={399.5 + 24.85} y={335}>8</text>
                        <text x={449.2 + 24.85} y={335}>9</text>
                        <text x={498.9 + 24.85} y={335}>10</text>
                        <text x={548.6 + 24.85} y={335}>11</text>
                        <text x={598.3 + 24.85} y={335}>12</text>
                        <text x={648 + 24.85} y={335}>13</text>
                        <text x={697.7 + 24.85} y={335}>14</text>
                        <text x={747.4 + 24.85} y={335}>15</text>
                        <text x={797.1 + 24.85} y={335}>16</text>
                        <text x={846.8 + 24.85} y={335}>17</text>
                        <text x={896.5 + 24.85} y={335}>18</text>
                    </g>
                </svg>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}

export default PeriodicTable;
