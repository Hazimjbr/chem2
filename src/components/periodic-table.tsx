'use client';

import { useState } from 'react';
import { elements } from '@/data/elements';
import type { Element } from '@/data/elements';
import ElementSearch from './element-search';
import PeriodicTableGrid from './periodic-table-grid';

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
             <ElementSearch 
                searchTerm={searchTerm} 
                foundElement={foundElement}
                handleSearch={handleSearch}
            />
            <div className="w-full overflow-x-auto rounded-lg border bg-muted/30">
                <PeriodicTableGrid foundElement={foundElement} />
            </div>
        </div>
    )
}
