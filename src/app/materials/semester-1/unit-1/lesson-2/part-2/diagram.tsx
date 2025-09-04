'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import p5 from 'p5';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Thermometer } from 'lucide-react';

const CANVAS_HEIGHT = 250;
const MAX_ENERGY = 100;

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
    if (width <= 0) return;
    p5InstanceRef.current?.remove();

    const sketch = (p: p5) => {
      let sketchTemperature = temperature;
      
      const distribution = (x: number, t: number) => {
        if (x < 0) return 0;
        const a = 2.5;
        const b = t / a;
        return (Math.pow(x, a - 1) * Math.exp(-x / b)) / (Math.pow(b, a) * 6.9);
      };

      const drawAxesAndLabels = () => {
        p.stroke(0);
        p.strokeWeight(1);
        // X-axis
        p.line(width * 0.1, CANVAS_HEIGHT - 30, width * 0.95, CANVAS_HEIGHT - 30);
        // Y-axis
        p.line(width * 0.1, CANVAS_HEIGHT - 30, width * 0.1, 40);
        
        p.noStroke();
        p.fill(0);
        p.textAlign(p.CENTER, p.CENTER);
        
        // X-axis Label
        p.text('الطاقة الحركية', width / 2, CANVAS_HEIGHT - 15);
        
        // Y-axis Label
        p.push();
        p.translate(width * 0.05, CANVAS_HEIGHT / 2);
        p.rotate(-p.HALF_PI);
        p.text('عدد الجزيئات', 0, 0);
        p.pop();
      }

      p.setup = () => {
        p.createCanvas(width, CANVAS_HEIGHT);
        p.noLoop(); // Redraw only when temperature changes
      };

      p.draw = () => {
        p.background('hsl(var(--card))');
        drawAxesAndLabels();
        
        const temp = sketchTemperature;
        let maxCount = 0;
        const energyPoints = [];
        let totalParticles = 0;
        let particlesAboveEa = 0;

        const eaLineX = width * 0.1 + (width * 0.85) * 0.4;
        const energyAtEaLine = p.map(eaLineX, width * 0.1, width * 0.95, 0, MAX_ENERGY);

        for (let i = 0; i <= MAX_ENERGY; i++) {
            const val = distribution(i, temp);
            energyPoints.push(val);
            if (val > maxCount) maxCount = val;
            totalParticles += val;
            
            if (i >= energyAtEaLine) {
              particlesAboveEa += val;
            }
        }
        
        // Draw the shaded area for Ea
        p.fill(255, 0, 0, 50);
        p.stroke(255, 0, 0, 100);
        p.strokeWeight(1);
        p.beginShape();
        p.vertex(eaLineX, CANVAS_HEIGHT - 30);
        for (let i = Math.floor(energyAtEaLine); i < energyPoints.length; i++) {
            const x = p.map(i, 0, MAX_ENERGY, width * 0.1, width * 0.95);
            const y = p.map(energyPoints[i], 0, maxCount, CANVAS_HEIGHT - 30, 40);
            p.vertex(x, y);
        }
        p.vertex(p.map(MAX_ENERGY, 0, MAX_ENERGY, width * 0.1, width * 0.95), CANVAS_HEIGHT - 30);
        p.endShape(p.CLOSE);

        // Draw the main distribution curve
        p.noFill();
        p.stroke(0);
        p.strokeWeight(2.5);
        p.beginShape();
        for (let i = 0; i < energyPoints.length; i++) {
          const x = p.map(i, 0, MAX_ENERGY, width * 0.1, width * 0.95);
          const y = p.map(energyPoints[i], 0, maxCount, CANVAS_HEIGHT - 30, 40);
          p.vertex(x, y);
        }
        p.endShape();
        
        // Draw Ea line and label
        p.stroke('red');
        p.strokeWeight(1.5);
        p.drawingContext.setLineDash([4, 4]);
        p.line(eaLineX, CANVAS_HEIGHT * 0.25, eaLineX, CANVAS_HEIGHT - 30);
        p.drawingContext.setLineDash([]);
        p.fill('hsl(var(--destructive))');
        p.textAlign(p.CENTER);
        p.noStroke();
        p.text('Ea', eaLineX, CANVAS_HEIGHT - 15);
        
        const percentage = totalParticles > 0 ? ((particlesAboveEa / totalParticles) * 100).toFixed(1) : '0.0';
        p.noStroke();
        p.fill(0);
        p.textAlign(p.LEFT, p.TOP);
        p.text(`جزيئات قادرة على التبخر: ${percentage}%`, width * 0.1 + 5, 15);
      };

      (p as any).updateTemperature = (newTemp: number) => {
        sketchTemperature = newTemp;
        p.redraw();
      };
    };

    p5InstanceRef.current = new p5(sketch, sketchRef.current!);

    return () => {
      p5InstanceRef.current?.remove();
    };
  }, [width]);

  useEffect(() => {
     if (p5InstanceRef.current && (p5InstanceRef.current as any).updateTemperature) {
        (p5InstanceRef.current as any).updateTemperature(temperature);
     }
  }, [temperature, width]);
  
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div
        ref={sketchRef}
        className="rounded-lg border bg-muted w-full overflow-hidden"
        style={{ height: `${CANVAS_HEIGHT}px` }}
        data-ai-hint="Maxwell-Boltzmann distribution curve"
      >
      </div>

      <Card className="p-4 w-full">
        <Label htmlFor="temp-slider" className="mb-2 block text-center">
          درجة الحرارة (كلما زادت، زاد متوسط الطاقة الحركية)
        </Label>
        <div className="flex items-center gap-4">
          <Thermometer className="text-blue-500" />
          <Slider
            id="temp-slider"
            min={20}
            max={50}
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
