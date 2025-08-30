'use client';

import { cn } from "@/lib/utils.tsx";

export default function PeriodicTableContainer({
    children,
    className
}: {
    children: React.ReactNode,
    className?: string
}) {
    return (
        <div className={cn("w-full overflow-x-auto rounded-lg border", className)}>
            {children}
        </div>
    )
}
