
import { cn } from "@/lib/utils.tsx";
import type { SVGProps } from "react";

const SvgWrapper = ({ path, className }: { path: string; className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={cn("w-28 h-28 inline-block mx-auto", className)}
  >
    <path
      d="M 20 80 L 20 10 L 15 15 M 20 10 L 25 15"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M 20 80 L 90 80 L 85 75 M 90 80 L 85 85"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path d={path} stroke="hsl(var(--primary))" strokeWidth="2.5" fill="none" />
  </svg>
);

export const GraphLineUp = (props: Partial<SVGProps<SVGSVGElement>>) => (
  <SvgWrapper path="M 20 80 L 85 15" {...props} />
);

export const GraphLineDown = (props: Partial<SVGProps<SVGSVGElement>>) => (
  <SvgWrapper path="M 30 20 L 80 70" {...props} />
);

export const GraphCurveUp = (props: Partial<SVGProps<SVGSVGElement>>) => (
  <SvgWrapper path="M 30 70 C 40 40, 60 25, 80 20" {...props} />
);

export const GraphCurveDown = (props: Partial<SVGProps<SVGSVGElement>>) => (
  <SvgWrapper path="M 30 20 C 40 70, 70 70, 85 75" {...props} />
);
