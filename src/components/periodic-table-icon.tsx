import { cn } from "@/lib/utils.tsx";
import type { SVGProps } from "react";

function PeriodicTableIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-full h-auto", className)}
      {...props}
    >
      {/* Main block */}
      <rect x="2" y="6" width="20" height="14" rx="1" />
      
      {/* Top row lines */}
      <line x1="2" y1="10" x2="22" y2="10" />
      <line x1="2" y1="13" x2="22" y2="13" />
      <line x1="2" y1="17" x2="22" y2="17" />

      {/* Vertical lines */}
      <line x1="6" y1="6" x2="6" y2="20" />
      <line x1="10" y1="6" x2="10" y2="20" />
      <line x1="14" y1="6" x2="14" y2="20" />
      <line x1="18" y1="6" x2="18" y2="20" />

      {/* Top left element (Hydrogen) */}
      <rect x="2" y="2" width="4" height="4" rx="0.5" />
      
      {/* Top right element (Helium) */}
      <rect x="18" y="2" width="4" height="4" rx="0.5" />
    </svg>
  );
}

export default PeriodicTableIcon;
