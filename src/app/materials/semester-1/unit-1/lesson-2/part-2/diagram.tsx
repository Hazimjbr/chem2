'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import p5 from 'p5';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Thermometer } from 'lucide-react';

const CANVAS_HEIGHT = 250;
const LEFT_PADDING = 30;
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
        backgroundG.line(LEFT_PADDING, CANVAS_HEIGHT - 20, width - 10, CANVAS_HEIGHT - 20); // X-axis
        backgroundG.line(LEFT_PADDING, CANVAS_HEIGHT - 20, LEFT_PADDING, 10); // Y-axis
        
        // Draw Labels for Axes
        backgroundG.noStroke();
        backgroundG.fill(0);
        backgroundG.textAlign(p.CENTER);
        
        const kineticEnergyLabel = 'الطاقة الحركية';
        const labelX = LEFT_PADDING + (width - 10 - LEFT_PADDING) / 2;
        backgroundG.text(kineticEnergyLabel, labelX, CANVAS_HEIGHT - 5);
        
        backgroundG.push();
        backgroundG.translate(15, CANVAS_HEIGHT / 2);
        backgroundG.rotate(-p.HALF_PI);
        backgroundG.textAlign(p.CENTER);
        backgroundG.text('عدد الجزيئات', 0, 0);
        backgroundG.pop();
        
        // Draw the Ea line (Activation Energy)
        const labelWidth = backgroundG.textWidth(kineticEnergyLabel);
        const startX_Ea = labelX + (labelWidth / 2) + 5;

        backgroundG.stroke('hsl(var(--destructive))');
        backgroundG.strokeWeight(6);
        backgroundG.drawingContext.setLineDash([5, 5]);
        // Extend the line upwards significantly
        backgroundG.line(startX_Ea, CANVAS_HEIGHT - 20, startX_Ea, 10); 
        backgroundG.drawingContext.setLineDash([]);
        
        // Draw Ea label
        backgroundG.noStroke();
        backgroundG.fill('hsl(var(--destructive))');
        backgroundG.textAlign(p.RIGHT);
        backgroundG.text('Ea', startX_Ea - 5, 20);

        p.noLoop(); // Don't start drawing the curve until temperature is updated
      };

      p.draw = () => {
        // First, draw the static background image.
        p.image(backgroundG, 0, 0);

        const temp = sketchTemperature;
        let maxCount = 0;
        const energyPoints = [];
        let totalParticles = 0;
        let particlesAboveEa = 0;
        
        const labelWidth = p.textWidth('الطاقة الحركية');
        const labelX = LEFT_PADDING + (width - 10 - LEFT_PADDING) / 2;
        const startX_Ea = labelX + (labelWidth / 2) + 5;
        const energyAtEaLine = p.map(startX_Ea, LEFT_PADDING, width - 10, 0, MAX_ENERGY);

        for (let i = 0; i <= MAX_ENERGY; i++) {
            const val = distribution(i, temp);
            energyPoints.push(val);
            if (val > maxCount) maxCount = val;
            totalParticles += val;
            
            if (i >= energyAtEaLine) {
              particlesAboveEa += val;
            }
        }
        
        p.beginShape();
        p.noFill();
        p.stroke(0);
        p.strokeWeight(2.5);
        for (let i = 0; i < energyPoints.length; i++) {
          const x = p.map(i, 0, MAX_ENERGY, LEFT_PADDING, width - 10);
          const y = p.map(energyPoints[i], 0, maxCount, CANVAS_HEIGHT - 20, 40);
          p.vertex(x, y);
        }
        p.endShape();
        
        const percentage = totalParticles > 0 ? ((particlesAboveEa / totalParticles) * 100).toFixed(1) : '0.0';
        p.noStroke();
        p.fill(0);
        p.textAlign(p.LEFT);
        p.text(`جزيئات قادرة على التبخر: ${percentage}%`, LEFT_PADDING + 5, 20);
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
  }, [temperature, width]); // Added width dependency to ensure redraw on resize
  
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
