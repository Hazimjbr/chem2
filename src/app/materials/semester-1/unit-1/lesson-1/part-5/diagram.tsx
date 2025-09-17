
'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Thermometer } from 'lucide-react';
import type p5 from 'p5';
import P5Wrapper from '@/components/p5-wrapper';

const CANVAS_HEIGHT = 300;
const NUM_PARTICLES = 30;
const PARTICLE_RADIUS = 3;

const sketch = (p: p5) => {
    let particles: any[] = [];
    let canvasWidth = 400;

    class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        radius: number = PARTICLE_RADIUS;
        color: p5.Color;

        constructor() {
          this.pos = p.createVector(
            p.random(this.radius, canvasWidth - this.radius),
            p.random(this.radius, CANVAS_HEIGHT - this.radius)
          );
          const baseSpeed = ((p as any).temperature || 298) / 298;
          this.vel = p5.Vector.random2D().mult(baseSpeed * 2);
          this.color = p.lerpColor(p.color(0, 0, 255), p.color(255, 0, 0), (((p as any).temperature || 298) - 273) / (673 - 273));
        }

        updateSpeed() {
          const baseSpeed = ((p as any).temperature || 298) / 298;
          this.vel.setMag(baseSpeed * 2);
          this.color = p.lerpColor(p.color(0, 0, 255), p.color(255, 0, 0), (((p as any).temperature || 298) - 273) / (673 - 273));
        }
        
        update() {
          this.pos.add(this.vel);
          this.checkBoundaries();
        }

        checkBoundaries() {
          if (this.pos.x <= this.radius || this.pos.x >= canvasWidth - this.radius) { this.vel.x *= -1; }
          if (this.pos.y <= this.radius || this.pos.y >= CANVAS_HEIGHT - this.radius) { this.vel.y *= -1; }
        }

        show() {
          p.noStroke();
          p.fill(this.color);
          p.ellipse(this.pos.x, this.pos.y, this.radius * 2);
        }
    }

    p.setup = () => {
        const parent = p.canvas.parentElement;
        canvasWidth = parent?.clientWidth || 400;
        p.createCanvas(canvasWidth, CANVAS_HEIGHT);
        for (let i = 0; i < NUM_PARTICLES; i++) {
            particles.push(new Particle());
        }
    };
    
    p.updateWithProps = (props: any) => {
        if(props.width) {
            canvasWidth = props.width;
            p.resizeCanvas(props.width, CANVAS_HEIGHT);
        }
        particles.forEach(particle => particle.updateSpeed());
    };
    

    p.draw = () => {
      const pressure = (((p as any).temperature || 298) / 298).toFixed(2);
      p.background('hsl(var(--card))');
      p.stroke('hsl(var(--border))');
      p.strokeWeight(4);
      p.noFill();
      p.rect(2, 2, canvasWidth - 4, CANVAS_HEIGHT - 4, 8);

      particles.forEach(particle => {
        particle.update();
        particle.show();
      });

      p.noStroke();
      p.fill('hsl(var(--foreground))');
      p.textSize(16);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(`الضغط: ${pressure} atm`, canvasWidth / 2, 20);
    };
};

export default function Diagram() {
  const [temperature, setTemperature] = useState(298);
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
        data-ai-hint="Gas pressure temperature simulation"
      >
        <P5Wrapper sketch={sketch} temperature={temperature} width={width} />
      </div>

      <Card className="p-4 w-full">
        <Label htmlFor="temp-slider" className="mb-2 block text-center">
            درجة الحرارة ({temperature} K / {(temperature - 273).toFixed(0)} °C)
        </Label>
        <div className="flex items-center gap-4">
          <Thermometer className="text-blue-500" />
          <Slider
            id="temp-slider"
            min={273}
            max={673}
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
