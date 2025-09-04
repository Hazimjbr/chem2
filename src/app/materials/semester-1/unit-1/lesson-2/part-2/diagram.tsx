'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import p5 from 'p5';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Thermometer } from 'lucide-react';

const CANVAS_HEIGHT = 250;
const NUM_PARTICLES = 2000;
const EVAPORATION_ENERGY = 70; // Represents Ea

export default function MaxwellBoltzmannDiagram() {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const [temperature, setTemperature] = useState(30);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (sketchRef.current) {
      setWidth(sketchRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    if (width <= 0 || !sketchRef.current) return;

    // Remove any previous instance before creating a new one
    p5InstanceRef.current?.remove();

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(width, CANVAS_HEIGHT);
      };

      p.draw = () => {
        let energyCounts = new Array(150).fill(0);
        // Maxwell-Boltzmann distribution logic
        for (let i = 0; i < NUM_PARTICLES; i++) {
            const r1 = p.random();
            const r2 = p.random();
            const energy = -temperature * Math.log(r1 * r2);
            const bin = p.floor(energy);
            if (bin < energyCounts.length) {
              energyCounts[bin]++;
            }
        }
        
        p.background('hsl(var(--card))');
        p.strokeWeight(2);

        let maxCount = 0;
        for (let count of energyCounts) {
            if (count > maxCount) maxCount = count;
        }
        
        let particlesAboveEa = 0;

        // Draw the distribution curve
        p.beginShape();
        p.noFill();
        p.stroke('hsl(var(--primary))');
        for (let i = 0; i < energyCounts.length; i++) {
          const x = p.map(i, 0, energyCounts.length, 10, width - 10);
          const y = p.map(energyCounts[i], 0, maxCount, CANVAS_HEIGHT - 20, 20);
          p.vertex(x, y);

          if (i >= EVAPORATION_ENERGY) {
              particlesAboveEa += energyCounts[i];
          }
        }
        p.endShape();
        
        // Fill the area for particles that can evaporate
        const startX = p.map(EVAPORATION_ENERGY, 0, energyCounts.length, 10, width - 10);
        p.beginShape();
        p.stroke('hsl(var(--destructive))');
        p.fill('hsla(var(--destructive), 0.3)');
        p.vertex(startX, p.map(energyCounts[EVAPORATION_ENERGY] || 0, 0, maxCount, CANVAS_HEIGHT - 20, 20));
        for (let i = EVAPORATION_ENERGY + 1; i < energyCounts.length; i++) {
          const x = p.map(i, 0, energyCounts.length, 10, width - 10);
          const y = p.map(energyCounts[i], 0, maxCount, CANVAS_HEIGHT - 20, 20);
          p.vertex(x, y);
        }
        p.vertex(width - 10, CANVAS_HEIGHT - 20);
        p.vertex(startX, CANVAS_HEIGHT - 20);
        p.endShape(p.CLOSE);

        // Draw Axes and Labels
        p.stroke(0);
        p.strokeWeight(1);
        p.line(10, CANVAS_HEIGHT - 20, width - 10, CANVAS_HEIGHT - 20); // X-axis
        p.line(10, CANVAS_HEIGHT - 20, 10, 10); // Y-axis
        
        p.noStroke();
        p.fill(0);
        p.textAlign(p.CENTER);
        p.text('الطاقة الحركية', width / 2, CANVAS_HEIGHT - 5);
        
        p.push();
        p.translate(5, CANVAS_HEIGHT / 2);
        p.rotate(-p.HALF_PI);
        p.textAlign(p.CENTER);
        p.text('عدد الجزيئات', 0, 0);
        p.pop();
        
        // Draw Ea line
        p.stroke('hsl(var(--destructive))');
        p.strokeWeight(1.5);
        p.line(startX, CANVAS_HEIGHT - 20, startX, 20);
        p.noStroke();
        p.fill('hsl(var(--destructive))');
        p.textAlign(p.RIGHT);
        p.text('Ea', startX + 10, 30);
        
        // Display percentage of particles that can evaporate
        const percentage = ((particlesAboveEa / NUM_PARTICLES) * 100).toFixed(1);
        p.fill(0);
        p.textAlign(p.LEFT);
        p.text(`جزيئات قادرة على التبخر: ${percentage}%`, 15, 20);
      };
    };
    
    p5InstanceRef.current = new p5(sketch, sketchRef.current!);

    // Cleanup function to remove the p5 instance when the component unmounts or dependencies change
    return () => {
      p5InstanceRef.current?.remove();
    };
  }, [width, temperature]); // Re-create the sketch when width OR temperature changes


  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div
        ref={sketchRef}
        className="rounded-lg border bg-muted w-full overflow-hidden"
        style={{ height: `${CANVAS_HEIGHT}px` }}
        data-ai-hint="Maxwell-Boltzmann distribution curve"
      ></div>

      <Card className="p-4 w-full">
        <Label htmlFor="temp-slider" className="mb-2 block text-center">
          درجة الحرارة (كلما زادت، زاد متوسط الطاقة الحركية)
        </Label>
        <div className="flex items-center gap-4">
          <Thermometer className="text-blue-500" />
          <Slider
            id="temp-slider"
            min={20} // Low temp
            max={50} // High temp
            step={1}
            value={[temperature]}
            onValueChange={(value) => setTemperature(value[0])}
            dir="ltr"
          />
          <Thermometer className="text-red-500" />
        </div>
      </Card>
    </div>
  );
}
