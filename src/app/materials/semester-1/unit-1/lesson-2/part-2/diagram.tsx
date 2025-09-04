'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import p5 from 'p5';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Thermometer } from 'lucide-react';

const CANVAS_HEIGHT = 250;
const EVAPORATION_ENERGY = 70; // Represents Ea, the activation energy for evaporation
const LEFT_PADDING = 30; // Increased padding for Y-axis label

export default function MaxwellBoltzmannDiagram() {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const [temperature, setTemperature] = useState(30); // Represents the 'T' parameter in the distribution
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
      // A function that resembles Maxwell-Boltzmann distribution
      // x is energy, t is temperature parameter
      const distribution = (x: number, t: number) => {
        if (x < 0) return 0;
        // This is a simplified mathematical function (Gamma distribution) that looks like a Maxwell-Boltzmann curve.
        // It's chosen for visual accuracy and stability.
        const a = 2.5; // Shape parameter
        const b = t / a; // Scale parameter
        return (Math.pow(x, a - 1) * Math.exp(-x / b)) / (Math.pow(b, a) * 6.5); // 6.5 is a normalization factor
      };

      p.setup = () => {
        p.createCanvas(width, CANVAS_HEIGHT);
      };
      
      p.draw = () => {
        p.background('hsl(var(--card))');
        
        const maxEnergy = 150;
        const temp = temperature; // Use the current temperature from the component's state
        let maxCount = 0;
        const energyPoints = [];
        let totalParticles = 0;
        let particlesAboveEa = 0;
        
        // 1. Calculate points and find the peak for normalization
        for (let i = 0; i <= maxEnergy; i++) {
            const val = distribution(i, temp);
            energyPoints.push(val);
            if (val > maxCount) maxCount = val;
            totalParticles += val;
            if (i >= EVAPORATION_ENERGY) {
              particlesAboveEa += val;
            }
        }

        // 2. Draw the distribution curve
        p.beginShape();
        p.noFill();
        p.stroke(0); // Changed to black color for visibility
        p.strokeWeight(2.5);
        for (let i = 0; i < energyPoints.length; i++) {
          const x = p.map(i, 0, maxEnergy, LEFT_PADDING, width - 10);
          const y = p.map(energyPoints[i], 0, maxCount, CANVAS_HEIGHT - 20, 40);
          p.vertex(x, y);
        }
        p.endShape();
        
        // 3. Fill the area for particles that can evaporate
        const startX_Ea = p.map(EVAPORATION_ENERGY, 0, maxEnergy, LEFT_PADDING, width - 10);
        p.beginShape();
        p.stroke('hsl(var(--destructive))');
        p.fill('hsla(var(--destructive), 0.3)');
        p.vertex(startX_Ea, p.map(energyPoints[EVAPORATION_ENERGY], 0, maxCount, CANVAS_HEIGHT - 20, 40));
        for (let i = EVAPORATION_ENERGY + 1; i < energyPoints.length; i++) {
          const x = p.map(i, 0, maxEnergy, LEFT_PADDING, width - 10);
          const y = p.map(energyPoints[i], 0, maxCount, CANVAS_HEIGHT - 20, 40);
          p.vertex(x, y);
        }
        p.vertex(width - 10, CANVAS_HEIGHT - 20);
        p.vertex(startX_Ea, CANVAS_HEIGHT - 20);
        p.endShape(p.CLOSE);

        // 4. Draw Axes and Labels
        p.stroke(0);
        p.strokeWeight(1);
        p.line(LEFT_PADDING, CANVAS_HEIGHT - 20, width - 10, CANVAS_HEIGHT - 20); // X-axis
        p.line(LEFT_PADDING, CANVAS_HEIGHT - 20, LEFT_PADDING, 10); // Y-axis
        
        p.noStroke();
        p.fill(0);
        p.textAlign(p.CENTER);
        p.text('الطاقة الحركية', width / 2, CANVAS_HEIGHT - 5);
        
        p.push();
        p.translate(15, CANVAS_HEIGHT / 2); // Adjusted translate for Y label
        p.rotate(-p.HALF_PI);
        p.textAlign(p.CENTER);
        p.text('عدد الجزيئات', 0, 0);
        p.pop();
        
        // 5. Draw Ea line and label
        p.stroke('hsl(var(--destructive))');
        p.strokeWeight(1.5);
        p.line(startX_Ea, CANVAS_HEIGHT - 20, startX_Ea, 20);
        p.noStroke();
        p.fill('hsl(var(--destructive))');
        p.textAlign(p.RIGHT);
        p.text('Ea', startX_Ea - 5, 30);
        
        // 6. Display percentage of particles that can evaporate
        const percentage = ((particlesAboveEa / totalParticles) * 100).toFixed(1);
        p.fill(0);
        p.textAlign(p.LEFT);
        p.text(`جزيئات قادرة على التبخر: ${percentage}%`, LEFT_PADDING + 5, 20);
      };
      
      // A custom function to be called when props change
      (p as any).updateWithNewProps = (props: { temp: number }) => {
          if (props.temp) {
              setTemperature(props.temp);
              p.redraw();
          }
      };
    };
    
    p5InstanceRef.current = new p5(sketch, sketchRef.current!);

    // Cleanup function to remove the p5 instance when the component unmounts or dependencies change
    return () => {
      p5InstanceRef.current?.remove();
    };
  }, [width, temperature]); // Re-create sketch if width or temperature changes
  

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
