
'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Thermometer } from 'lucide-react';
import type p5 from 'p5';
import P5Wrapper from '@/components/p5-wrapper';

const CANVAS_HEIGHT = 250;
const MAX_ENERGY = 100;

const sketch = (p: p5) => {
    let canvasWidth = 400;

    const distribution = (x: number, t: number) => {
        if (x < 0) return 0;
        const a = 2.5;
        const b = t / a;
        return (Math.pow(x, a - 1) * Math.exp(-x / b)) / (Math.pow(b, a) * 6.9);
    };

    const drawAxesAndLabels = () => {
        p.stroke(0);
        p.strokeWeight(1);
        p.line(canvasWidth * 0.1, CANVAS_HEIGHT - 30, canvasWidth * 0.95, CANVAS_HEIGHT - 30);
        p.line(canvasWidth * 0.1, CANVAS_HEIGHT - 30, canvasWidth * 0.1, 45);
        p.noStroke();
        p.fill(0);
        p.textAlign(p.CENTER, p.CENTER);
        p.text('الطاقة الحركية', canvasWidth / 2 + 10, CANVAS_HEIGHT - 15);
        p.push();
        p.translate(canvasWidth * 0.05, CANVAS_HEIGHT / 2);
        p.rotate(-p.HALF_PI);
        p.text('عدد الجزيئات', 0, 0);
        p.pop();
    }

    p.setup = () => {
      const parent = p.canvas.parentElement;
      canvasWidth = parent?.clientWidth || 400;
      p.createCanvas(canvasWidth, CANVAS_HEIGHT);
      p.noLoop();
    };

    p.updateWithProps = (props: any) => {
        if (props.width) {
            canvasWidth = props.width;
            p.resizeCanvas(props.width, CANVAS_HEIGHT);
        }
        p.redraw();
    };

    p.draw = () => {
        const temperature = (p as any).temperature || 30;
        p.background('hsl(var(--card))');
        drawAxesAndLabels();
        
        let maxCount = 0;
        const energyPoints = [];
        let totalParticles = 0;
        let particlesAboveEa = 0;

        const eaLineX = canvasWidth * 0.1 + (canvasWidth * 0.85) * 0.4;
        const energyAtEaLine = p.map(eaLineX, canvasWidth * 0.1, canvasWidth * 0.95, 0, MAX_ENERGY);

        for (let i = 0; i <= MAX_ENERGY; i++) {
            const val = distribution(i, temperature);
            energyPoints.push(val);
            if (val > maxCount) maxCount = val;
            totalParticles += val;
            if (i >= energyAtEaLine) {
                particlesAboveEa += val;
            }
        }
        
        p.fill(255, 0, 0, 50);
        p.stroke(255, 0, 0, 100);
        p.strokeWeight(1);
        p.beginShape();
        p.vertex(eaLineX, CANVAS_HEIGHT - 30);
        for (let i = Math.floor(energyAtEaLine); i < energyPoints.length; i++) {
            const x = p.map(i, 0, MAX_ENERGY, canvasWidth * 0.1, canvasWidth * 0.95);
            const y = p.map(energyPoints[i], 0, maxCount, CANVAS_HEIGHT - 30, 55);
            p.vertex(x, y);
        }
        p.vertex(p.map(MAX_ENERGY, 0, MAX_ENERGY, canvasWidth * 0.1, canvasWidth * 0.95), CANVAS_HEIGHT - 30);
        p.endShape(p.CLOSE);

        p.noFill();
        p.stroke(0);
        p.strokeWeight(2.5);
        p.beginShape();
        for (let i = 0; i < energyPoints.length; i++) {
            const x = p.map(i, 0, MAX_ENERGY, canvasWidth * 0.1, canvasWidth * 0.95);
            const y = p.map(energyPoints[i], 0, maxCount, CANVAS_HEIGHT - 30, 55);
            p.vertex(x, y);
        }
        p.endShape();
        
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
        p.text(`جزيئات قادرة على التبخر: ${percentage}%`, canvasWidth * 0.1 + 5, 15);
    };
};

export default function MaxwellBoltzmannDiagram() {
  const [temperature, setTemperature] = useState(30);
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
    }
     const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div
        ref={containerRef}
        className="rounded-lg border bg-muted w-full overflow-hidden"
        style={{ height: `${CANVAS_HEIGHT}px` }}
        data-ai-hint="Maxwell-Boltzmann distribution curve"
      >
        <P5Wrapper sketch={sketch} temperature={temperature} width={width} />
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
