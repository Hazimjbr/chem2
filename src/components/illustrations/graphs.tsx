
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
    <SvgWrapper path="M 30 75 C 40 25, 70 10, 85 10" {...props} />
);

export const GraphCurveDown = (props: Partial<SVGProps<SVGSVGElement>>) => (
    <SvgWrapper path="M 30 15 C 40 40, 70 75, 85 75" {...props} />
);

export const GraphLineHorizontal = (props: Partial<SVGProps<SVGSVGElement>>) => (
  <SvgWrapper path="M 25 50 L 85 50" {...props} />
);

export const GraphLineVertical = (props: Partial<SVGProps<SVGSVGElement>>) => (
    <SvgWrapper path="M 55 80 L 55 15" {...props} />
);

    