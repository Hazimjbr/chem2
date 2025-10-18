
'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import p5 from 'p5';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
type Temperature = 'low' | 'high';
type Pressure = 'low' | 'high';

// --- Constants ---
const CANVAS_HEIGHT = 250;
const NUM_PARTICLES = 15;
const PARTICLE_RADIUS = 4;
const BASE_SPEED = 1.0;
const PISTON_THICKNESS = 20;

const explanations: Record<Pressure, Record<Temperature, { title: string; text: string }>> = {
  low: {
    low: {
      title: 'سلوك مثالي تقريبًا',
      text: 'في الضغط المنخفض والحرارة المنخفضة، تكون الجسيمات متباعدة وطاقتها الحركية قليلة. قوى التجاذب ضعيفة جدًا.'
    },
    high: {
      title: 'أقرب ما يمكن للسلوك المثالي',
      text: 'في الضغط المنخفض والحرارة المرتفعة، تكون الجسيمات متباعدة جدًا وتتحرك بسرعة هائلة، مما يتغلب على أي قوى تجاذب بينها.'
    }
  },
  high: {
    low: {
      title: 'أقصى انحراف عن السلوك المثالي',
      text: 'في الضغط المرتفع والحرارة المنخفضة، تكون الجسيمات متقاربة جدًا وطاقتها الحركية منخفضة، مما يسمح لقوى التجاذب بأن تصبح مؤثرة.'
    },
    high: {
      title: 'انحراف عن السلوك المثالي',
      text: 'الحرارة المرتفعة تزيد من طاقة الجسيمات، ولكن الضغط العالي يبقيها متقاربة، مما يسبب انحرافًا عن السلوك المثالي.'
    }
  }
};

// --- React Component ---
export default function Diagram() {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  const [temperature, setTemperature] = useState<Temperature>('low');
  const [pressure, setPressure] = useState<Pressure>('low');
  const [width, setWidth] = useState(0);

  const explanation = explanations[pressure][temperature];
  const explanationKey = `${pressure}-${temperature}`;

  useLayoutEffect(() => {
    if (sketchRef.current) {
      setWidth(sketchRef.current.clientWidth);
    }
  }, []);

  useEffect(() => {
    if (width <= 0) return;

    p5InstanceRef.current?.remove();

    const sketch = (p: p5) => {
      let particles: Particle[] = [];
      
      const boxHeight = CANVAS_HEIGHT;
      const speedMultiplier = temperature === 'low' ? BASE_SPEED : BASE_SPEED * 3;
      const particleColor = temperature === 'low' ? p.color(128, 128, 128) : p.color(255, 0, 0);
      
      // Calculate piston position based on pressure
      // High pressure -> piston moves down -> smaller volume
      // Low pressure -> piston at the top -> larger volume
      const pistonY = pressure === 'low' ? 0 : (boxHeight * (7/8)) - PISTON_THICKNESS;
      const topBoundary = pistonY + PISTON_THICKNESS;
      const bottomBoundary = boxHeight;

      class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        radius: number = PARTICLE_RADIUS;

        constructor() {
          this.pos = p.createVector(
            p.random(this.radius, width - this.radius),
            p.random(topBoundary + this.radius, bottomBoundary - this.radius)
          );
          this.vel = p5.Vector.random2D().mult(speedMultiplier);
        }

        update() {
          this.pos.add(this.vel);
          this.checkBoundaries();
        }

        checkBoundaries() {
          if (this.pos.x <= this.radius || this.pos.x >= width - this.radius) {
            this.vel.x *= -1;
            this.pos.x = p.constrain(this.pos.x, this.radius, width - this.radius);
          }
          if (this.pos.y <= topBoundary + this.radius || this.pos.y >= bottomBoundary - this.radius) {
            this.vel.y *= -1;
            // Prevent particles from getting stuck in the piston
            this.pos.y = p.constrain(this.pos.y, topBoundary + this.radius, bottomBoundary - this.radius);
          }
        }

        show() {
          p.noStroke();
          p.fill(particleColor);
          p.ellipse(this.pos.x, this.pos.y, this.radius * 2);
        }
      }

      p.setup = () => {
        p.createCanvas(width, CANVAS_HEIGHT);
        particles = []; // Clear particles on setup
        for (let i = 0; i < NUM_PARTICLES; i++) {
          particles.push(new Particle());
        }
      };

      p.draw = () => {
        p.background('hsl(var(--card))');

        // Draw dashed border for the container
        p.stroke('hsl(var(--border))');
        p.strokeWeight(2);
        p.drawingContext.setLineDash([5, 5]);
        p.noFill();
        p.rect(1, 1, width-2, CANVAS_HEIGHT-2);
        p.drawingContext.setLineDash([]); // Reset line dash

        // Draw particles
        for (const particle of particles) {
          particle.update();
          particle.show();
        }

        // Draw piston
        p.fill(200);
        p.noStroke();
        p.rect(1, pistonY, width-2, PISTON_THICKNESS);
        // Piston handle
        p.fill(150);
        p.rect(width/2 - 20, pistonY - 5, 40, 5);
      };
      
      // A custom function to be called when props change
      (p as any).customPropsChange = (props: { temp: Temperature, press: Pressure }) => {
          // Re-initialize particles when conditions change to avoid them getting stuck
          particles = [];
          for (let i = 0; i < NUM_PARTICLES; i++) {
            particles.push(new Particle());
          }
          p.loop();
      };
    };

    p5InstanceRef.current = new p5(sketch, sketchRef.current!);

    // This part is a bit of a hack to force re-creation of particles
    // when the state changes, addressing the "stuck particles" issue.
    if (p5InstanceRef.current && (p5InstanceRef.current as any).customPropsChange) {
        (p5InstanceRef.current as any).customPropsChange({ temp: temperature, press: pressure });
    }

    return () => {
      p5InstanceRef.current?.remove();
    };
  }, [temperature, pressure, width]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div
        ref={sketchRef}
        className="rounded-lg border bg-muted w-full overflow-hidden"
        style={{ height: `${CANVAS_HEIGHT}px` }}
        data-ai-hint="gas particles piston simulation"
      >
        {/* p5 canvas is injected here */}
      </div>

      <div className="w-full grid grid-cols-2 gap-4">
        <Card className="p-3">
          <Label className="font-semibold text-sm">درجة الحرارة</Label>
          <RadioGroup
            dir="rtl"
            value={temperature}
            onValueChange={(value: string) => setTemperature(value as Temperature)}
            className="mt-2"
          >
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="low" id="t-low" />
              <Label htmlFor="t-low">منخفضة</Label>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="high" id="t-high" />
              <Label htmlFor="t-high">مرتفعة</Label>
            </div>
          </RadioGroup>
        </Card>
        <Card className="p-3">
          <Label className="font-semibold text-sm">الضغط</Label>
          <RadioGroup
            dir="rtl"
            value={pressure}
            onValueChange={(value: string) => setPressure(value as Pressure)}
            className="mt-2"
          >
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="low" id="p-low" />
              <Label htmlFor="p-low">منخفض</Label>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <RadioGroupItem value="high" id="p-high" />
              <Label htmlFor="p-high">مرتفع</Label>
            </div>
          </RadioGroup>
        </Card>
      </div>
      
      <Card className="w-full bg-accent/10 border-accent/20 h-[100px]">
        <AnimatePresence mode="wait">
            <motion.div
                key={explanationKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
            >
                <CardHeader className="p-3">
                    <CardTitle className="text-base text-accent">{explanation.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <p className="text-sm text-muted-foreground">{explanation.text}</p>
                </CardContent>
            </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
}
