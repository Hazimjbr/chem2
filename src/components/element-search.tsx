
'use client';

import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import type { Element } from '@/data/elements';

interface ElementSearchProps {
    searchTerm: string;
    foundElement: Element | null;
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ElementSearch({ searchTerm, foundElement, handleSearch }: ElementSearchProps) {
    const termIsName = foundElement && searchTerm.toLowerCase() === foundElement.name.toLowerCase();
    const termIsSymbol = foundElement && searchTerm.toLowerCase() === foundElement.symbol.toLowerCase();

    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 p-2"
        >
            <Input
                placeholder="ابحث بالاسم، الرمز، أو العدد الذري"
                value={searchTerm}
                onChange={handleSearch}
                className="md:col-span-1 h-9"
            />
            <Card className="md:col-span-1">
                <CardContent className="p-2">
                    {foundElement ? (
                        <div className="flex flex-row flex-wrap justify-around items-center text-center text-xs sm:text-sm">
                            {!termIsName && (
                                <div className="flex items-center gap-2 p-1">
                                    <span className="text-muted-foreground text-[0.6rem] sm:text-xs">الاسم:</span>
                                    <span className="font-bold">{foundElement.name}</span>
                                </div>
                            )}
                            {!termIsSymbol && (
                                <div className="flex items-center gap-2 p-1">
                                    <span className="text-muted-foreground text-[0.6rem] sm:text-xs">الرمز:</span>
                                    <span className="font-mono font-bold">{foundElement.symbol}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2 p-1">
                                <span className="text-muted-foreground text-[0.6rem] sm:text-xs">العدد:</span>
                                <span className="font-bold">{foundElement.number}</span>
                            </div>
                            <div className="flex items-center gap-2 p-1">
                                <span className="text-muted-foreground text-[0.6rem] sm:text-xs">الكتلة:</span>
                                <span className="font-bold">{typeof foundElement.atomic_mass === 'number' ? foundElement.atomic_mass.toFixed(1) : foundElement.atomic_mass}</span>
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
    );
}
