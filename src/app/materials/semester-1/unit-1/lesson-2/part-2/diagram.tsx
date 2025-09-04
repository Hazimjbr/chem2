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
      let backgroundG: p5.Graphics;
      let sketchTemperature = temperature;
      
      // Make left padding responsive to canvas width
      const leftPadding = p.max(30, width * 0.1);
      const rightPadding = 10;
      const plotWidth = width - leftPadding - rightPadding;

      const distribution = (x: number, t: number) => {
        if (x < 0) return 0;
        const a = 2.5;
        const b = t / a;
        return (Math.pow(x, a - 1) * Math.exp(-x / b)) / (Math.pow(b, a) * 6.5);
      };

      p.setup = () => {
        p.createCanvas(width, CANVAS_HEIGHT);
        backgroundG = p.createGraphics(width, CANVAS_HEIGHT);
        
        // --- Draw all static elements on the background buffer ---
        backgroundG.background('hsl(var(--card))');
        
        // Draw Axes
        backgroundG.stroke(0);
        backgroundG.strokeWeight(1);
        backgroundG.line(leftPadding, CANVAS_HEIGHT - 20, width - rightPadding, CANVAS_HEIGHT - 20); // X-axis
        backgroundG.line(leftPadding, CANVAS_HEIGHT - 20, leftPadding, 10); // Y-axis
        
        // Draw Labels for Axes
        backgroundG.noStroke();
        backgroundG.fill(0);
        backgroundG.textAlign(p.CENTER);
        
        const kineticEnergyLabel = 'الطاقة الحركية';
        const labelX = leftPadding + plotWidth / 2;
        backgroundG.text(kineticEnergyLabel, labelX, CANVAS_HEIGHT - 5);
        
        backgroundG.push();
        backgroundG.translate(15, CANVAS_HEIGHT / 2);
        backgroundG.rotate(-p.HALF_PI);
        backgroundG.textAlign(p.CENTER);
        backgroundG.text('عدد الجزيئات', 0, 0);
        backgroundG.pop();
        
        const eaLineX = leftPadding + plotWidth * 0.7;

        backgroundG.stroke('red');
        backgroundG.strokeWeight(1.5);
        backgroundG.drawingContext.setLineDash([4, 4]);
        backgroundG.line(eaLineX, 10, eaLineX, CANVAS_HEIGHT - 20);
        backgroundG.drawingContext.setLineDash([]);
        
        backgroundG.fill('hsl(var(--destructive))');
        backgroundG.textAlign(p.CENTER);
        backgroundG.noStroke();
        backgroundG.text('Ea', eaLineX, CANVAS_HEIGHT - 5);
        
        backgroundG.fill(0);

        p.noLoop();
      };

      p.draw = () => {
        p.image(backgroundG, 0, 0);

        const temp = sketchTemperature;
        let maxCount = 0;
        const energyPoints = [];
        let totalParticles = 0;
        let particlesAboveEa = 0;
        
        const eaLineX = leftPadding + plotWidth * 0.7;
        const energyAtEaLine = p.map(eaLineX, leftPadding, width - rightPadding, 0, MAX_ENERGY);

        for (let i = 0; i <= MAX_ENERGY; i++) {
            const val = distribution(i, temp);
            energyPoints.push(val);
            if (val > maxCount) maxCount = val;
            totalParticles += val;
            
            if (i >= energyAtEaLine) {
              particlesAboveEa += val;
            }
        }
        
        // Draw the shaded area first
        p.fill(255, 0, 0, 50); // Transparent red
        p.stroke(255, 0, 0, 100);
        p.strokeWeight(1);
        p.beginShape();
        
        // First point on the axis at Ea
        p.vertex(eaLineX, CANVAS_HEIGHT - 20);

        for (let i = Math.floor(energyAtEaLine); i < energyPoints.length; i++) {
            const x = p.map(i, 0, MAX_ENERGY, leftPadding, width - rightPadding);
            const y = p.map(energyPoints[i], 0, maxCount, CANVAS_HEIGHT - 20, 40);
            p.vertex(x, y);
        }
        // Last point on the axis at max energy
        p.vertex(p.map(MAX_ENERGY, 0, MAX_ENERGY, leftPadding, width - rightPadding), CANVAS_HEIGHT - 20);
        p.endShape(p.CLOSE);

        // Draw the main curve
        p.beginShape();
        p.noFill();
        p.stroke(0);
        p.strokeWeight(2.5);
        for (let i = 0; i < energyPoints.length; i++) {
          const x = p.map(i, 0, MAX_ENERGY, leftPadding, width - rightPadding);
          const y = p.map(energyPoints[i], 0, maxCount, CANVAS_HEIGHT - 20, 40);
          p.vertex(x, y);
        }
        p.endShape();
        
        const percentage = totalParticles > 0 ? ((particlesAboveEa / totalParticles) * 100).toFixed(1) : '0.0';
        p.noStroke();
        p.fill(0);
        p.textAlign(p.LEFT);
        p.text(`جزيئات قادرة على التبخر: ${percentage}%`, leftPadding + 5, 20);
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
