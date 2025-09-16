
'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import p5 from 'p5';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Thermometer } from 'lucide-react';

const CANVAS_HEIGHT = 300;
const NUM_PARTICLES = 30;
const PARTICLE_RADIUS = 3;

export default function Diagram() {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const [temperature, setTemperature] = useState(298);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (sketchRef.current) {
      setWidth(sketchRef.current.offsetWidth);
    }
     const handleResize = () => {
      if (sketchRef.current) {
        setWidth(sketchRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (width <= 0 || !sketchRef.current) return;
    p5InstanceRef.current?.remove();

    const sketch = (p: p5) => {
      let particles: Particle[] = [];
      let localTemperature = temperature;
      
      class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        radius: number = PARTICLE_RADIUS;
        color: p5.Color;
        baseSpeed: number;

        constructor() {
          this.pos = p.createVector(p.random(this.radius, width - this.radius), p.random(this.radius, CANVAS_HEIGHT - this.radius));
          this.baseSpeed = localTemperature / 298;
          this.vel = p5.Vector.random2D().mult(this.baseSpeed * 2);
          this.color = p.lerpColor(p.color(0, 0, 255), p.color(255, 0, 0), (localTemperature - 273) / (673 - 273));
        }

        update() {
          this.pos.add(this.vel);
          this.checkBoundaries();
        }

        checkBoundaries() {
          if (this.pos.x <= this.radius || this.pos.x >= width - this.radius) { this.vel.x *= -1; }
          if (this.pos.y <= this.radius || this.pos.y >= CANVAS_HEIGHT - this.radius) { this.vel.y *= -1; }
        }

        show() {
          p.noStroke();
          p.fill(this.color);
          p.ellipse(this.pos.x, this.pos.y, this.radius * 2);
        }

        updateSpeed(newTemp: number) {
            this.baseSpeed = newTemp / 298;
            this.vel.setMag(this.baseSpeed * 2);
            this.color = p.lerpColor(p.color(0, 0, 255), p.color(255, 0, 0), (newTemp - 273) / (673 - 273));
        }
      }

      p.setup = () => {
        p.createCanvas(width, CANVAS_HEIGHT);
        for (let i = 0; i < NUM_PARTICLES; i++) {
          particles.push(new Particle());
        }
      };

      p.windowResized = () => {
          if (sketchRef.current) {
            setWidth(sketchRef.current.offsetWidth);
            p.resizeCanvas(sketchRef.current.offsetWidth, CANVAS_HEIGHT);
          }
      }

      p.draw = () => {
        const pressure = (localTemperature / 298).toFixed(2);
        p.background('hsl(var(--card))');
        p.stroke('hsl(var(--border))');
        p.strokeWeight(4);
        p.noFill();
        p.rect(2, 2, width - 4, CANVAS_HEIGHT - 4, 8);

        particles.forEach(particle => {
          particle.update();
          particle.show();
        });

        p.noStroke();
        p.fill('hsl(var(--foreground))');
        p.textSize(16);
        p.textAlign(p.CENTER, p.CENTER);
        p.text(`الضغط: ${pressure} atm`, width / 2, 20);
      };

      (p as any).updateTemperature = (newTemp: number) => {
        localTemperature = newTemp;
        particles.forEach(particle => {
           particle.updateSpeed(newTemp);
        });
        p.loop();
      };
    };

    p5InstanceRef.current = new p5(sketch, sketchRef.current);

    return () => {
      p5InstanceRef.current?.remove();
    };
  }, [width]);

  useEffect(() => {
    if (p5InstanceRef.current && (p5InstanceRef.current as any).updateTemperature) {
      (p5InstanceRef.current as any).updateTemperature(temperature);
    }
  }, [temperature]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div
        ref={sketchRef}
        className="rounded-lg border bg-muted w-full overflow-hidden"
        style={{ height: `${CANVAS_HEIGHT}px` }}
        data-ai-hint="Gas pressure temperature simulation"
      ></div>

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
