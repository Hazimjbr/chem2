import { cn } from "@/lib/utils.tsx";
import type { SVGProps } from "react";

function PeriodicTableIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("w-full h-auto", className)}
      {...props}
    >
      <path d="M2 4V20H22V12H12V8H8V4H2Z" />
      <path d="M8 8H12" />
      <path d="M2 8H8" />
      <path d="M2 12H12" />
      <path d="M2 16H22" />
      <path d="M8 12V8" />
      <path d="M12 12V4" />
      <path d="M17 12V4" />
    </svg>
  );
}

export default PeriodicTableIcon;
