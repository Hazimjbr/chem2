
'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import p5 from 'p5';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// --- Types ---
type Environment = 'ice' | 'hot';

// --- Constants ---
const CANVAS_HEIGHT = 300;
const INITIAL_RADIUS = 50;

// --- React Component ---
export default function Diagram() {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const [environment, setEnvironment] = useState<Environment>('ice');
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (sketchRef.current) {
      setWidth(sketchRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (width <= 0 || !sketchRef.current) return;

    p5InstanceRef.current?.remove();

    const sketch = (p: p5) => {
      let currentRadius = INITIAL_RADIUS;
      let targetRadius: number;

      p.setup = () => {
        p.createCanvas(width, CANVAS_HEIGHT);
        p.noStroke();
      };
      
      p.windowResized = () => {
        p.resizeCanvas(sketchRef.current!.offsetWidth, CANVAS_HEIGHT);
        setWidth(sketchRef.current!.offsetWidth);
      };

      p.draw = () => {
        if (environment === 'ice') {
            targetRadius = INITIAL_RADIUS * 0.75;
        } else {
            targetRadius = INITIAL_RADIUS * 1.25;
        }
        
        p.background('hsl(var(--card))');

        currentRadius = p.lerp(currentRadius, targetRadius, 0.05);

        const beakerWidth = width * 0.6;
        const beakerHeight = CANVAS_HEIGHT * 0.8;
        const beakerX = (width - beakerWidth) / 2;
        const beakerY = CANVAS_HEIGHT - beakerHeight;
        
        p.stroke('hsl(var(--border))');
        p.strokeWeight(3);
        p.noFill();
        p.beginShape();
        p.vertex(beakerX, beakerY);
        p.vertex(beakerX, beakerY + beakerHeight);
        p.vertex(beakerX + beakerWidth, beakerY + beakerHeight);
        p.vertex(beakerX + beakerWidth, beakerY);
        p.endShape();
        
        const waterColor = environment === 'ice' ? p.color(173, 216, 230) : p.color(255, 165, 0);
        p.fill(waterColor);
        p.noStroke();
        p.rect(beakerX + 2, beakerY + beakerHeight * 0.2, beakerWidth - 4, beakerHeight * 0.8 - 2);

        const balloonY = CANVAS_HEIGHT - currentRadius - 20;
        p.fill(220, 50, 50);
        p.stroke(150, 0, 0);
        p.strokeWeight(2);
        p.ellipse(width / 2, balloonY, currentRadius * 2, currentRadius * 2.2);
        
        p.noStroke();
        p.fill(220, 50, 50);
        p.triangle(
            width/2 - 10, balloonY + currentRadius * 1.1,
            width/2 + 10, balloonY + currentRadius * 1.1,
            width/2, balloonY + currentRadius * 1.1 + 15
        )
      };
    };

    p5InstanceRef.current = new p5(sketch, sketchRef.current!);

    return () => {
      p5InstanceRef.current?.remove();
    };
  }, [environment, width]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div
        ref={sketchRef}
        className="rounded-lg border bg-muted w-full overflow-hidden"
        style={{ height: `${CANVAS_HEIGHT}px` }}
        data-ai-hint="balloon temperature experiment"
      >
      </div>

      <RadioGroup
        dir="rtl"
        value={environment}
        onValueChange={(value: string) => setEnvironment(value as Environment)}
        className="mt-2 grid grid-cols-2 gap-4 w-full"
      >
        <Label 
            htmlFor="env-ice" 
            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <RadioGroupItem value="ice" id="env-ice" className="sr-only" />
          حمام ثلجي
        </Label>
        <Label 
            htmlFor="env-hot"
            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <RadioGroupItem value="hot" id="env-hot" className="sr-only" />
          حمام مائي ساخن
        </Label>
      </RadioGroup>
    </div>
  );
}
