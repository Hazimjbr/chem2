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
        <div 
            className="w-full space-y-4"
        >
             <ElementSearch 
                searchTerm={searchTerm} 
                foundElement={foundElement}
                handleSearch={handleSearch}
            />
            {/* The container below now has permanent scrollbars */}
            <div className="w-full h-[550px] overflow-scroll border rounded-lg bg-muted/30">
                <iframe 
                    src="https://www.canva.com/design/DAGxhAWkRWM/vg7x0bxtYDqcwQM2mFL5Og/view?embed"
                    className="w-full h-full"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    )
}
