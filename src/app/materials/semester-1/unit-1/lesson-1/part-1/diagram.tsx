
'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import type p5 from 'p5';
import P5Wrapper from '@/components/p5-wrapper';

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
      text: 'في الضغط المنخفض والحرارة المنخفضة تكون الجسيمات متباعدة وطاقتها الحركية قليلة. قوى التجاذب ضعيفة جدًا.'
    },
    high: {
      title: 'أقرب ما يمكن للسلوك المثالي',
      text: 'في الضغط المنخفض والحرارة المرتفعة تكون الجسيمات متباعدة جدًا وتتحرك بسرعة هائلة، مما يتغلب على أي قوى تجاذب بينها.'
    }
  },
  high: {
    low: {
      title: 'أقصى انحراف عن السلوك المثالي',
      text: 'في الضغط المرتفع والحرارة المنخفضة تكون الجسيمات متقاربة جدًا وطاقتها الحركية منخفضة، مما يسمح لقوى التجاذب بأن تصبح مؤثرة.'
    },
    high: {
      title: 'انحراف عن السلوك المثالي',
      text: 'الحرارة المرتفعة تزيد من طاقة الجسيمات، ولكن الضغط العالي يبقيها متقاربة، مما يسبب انحرافًا عن السلوك المثالي.'
    }
  }
};


const sketch = (p: p5) => {
    let particles: any[] = [];
    let canvasWidth = 400;
    
    class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        radius: number = PARTICLE_RADIUS;
        particleColor: p5.Color;

        constructor() {
          const pistonY = ((p as any).press || 'low') === 'low' ? 0 : (CANVAS_HEIGHT * (1/3));
          const topBoundary = pistonY + PISTON_THICKNESS;
          this.pos = p.createVector(
            p.random(this.radius, canvasWidth - this.radius),
            p.random(topBoundary + this.radius, CANVAS_HEIGHT - this.radius)
          );
          this.updateSpeedAndColor();
        }

        updateSpeedAndColor() {
            const temp = (p as any).temp || 'low';
            const speedMultiplier = temp === 'low' ? BASE_SPEED : BASE_SPEED * 3;
            this.vel = p5.Vector.random2D().mult(speedMultiplier);
            this.particleColor = temp === 'low' ? p.color(128, 128, 128) : p.color(255, 0, 0);
        }

        update(topBoundary: number) {
          this.pos.add(this.vel);
          this.checkBoundaries(topBoundary);
        }

        checkBoundaries(topBoundary: number) {
          if (this.pos.x <= this.radius || this.pos.x >= canvasWidth - this.radius) {
            this.vel.x *= -1;
            this.pos.x = p.constrain(this.pos.x, this.radius, canvasWidth - this.radius);
          }
          if (this.pos.y <= topBoundary + this.radius || this.pos.y >= CANVAS_HEIGHT - this.radius) {
            this.vel.y *= -1;
            this.pos.y = p.constrain(this.pos.y, topBoundary + this.radius, CANVAS_HEIGHT - this.radius);
          }
        }

        show() {
          p.noStroke();
          p.fill(this.particleColor);
          p.ellipse(this.pos.x, this.pos.y, this.radius * 2);
        }
    }

    p.setup = () => {
      const parent = p.canvas.parentElement;
      canvasWidth = parent?.clientWidth || 400;
      p.createCanvas(canvasWidth, CANVAS_HEIGHT);
      particles = Array.from({ length: NUM_PARTICLES }, () => new Particle());
    };
    
    (p as any).updateWithProps = (props: any) => {
        if(props.width && props.width !== canvasWidth) {
            canvasWidth = props.width;
            p.resizeCanvas(props.width, CANVAS_HEIGHT);
        }
        if (props.press || props.temp) {
            (p as any).press = props.press;
            (p as any).temp = props.temp;
            if (particles.length > 0) {
              particles.forEach(particle => {
                  particle.updateSpeedAndColor();
              });
            }
            if (p.isLooping()) {
                p.redraw();
            } else {
                p.loop();
            }
        }
    };

    p.draw = () => {
        const press = (p as any).press || 'low';
        p.background(255);
        
        const pistonY = press === 'low' ? 0 : (CANVAS_HEIGHT * (1/3));
        const topBoundary = pistonY + PISTON_THICKNESS;
        
        p.stroke('hsl(var(--border))');
        p.strokeWeight(2);
        p.drawingContext.setLineDash([5, 5]);
        p.noFill();
        p.rect(1, 1, canvasWidth-2, CANVAS_HEIGHT-2);
        p.drawingContext.setLineDash([]);

        for (const particle of particles) {
          particle.update(topBoundary);
          particle.show();
        }

        p.fill(200);
        p.noStroke();
        p.rect(1, pistonY, canvasWidth-2, PISTON_THICKNESS);
        p.fill(150);
        p.rect(canvasWidth/2 - 20, pistonY - 5, 40, 5);
    };
};

export default function Diagram() {
  const [temp, setTemp] = useState<Temperature>('low');
  const [press, setPress] = useState<Pressure>('low');
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const explanation = explanations[press][temp];
  const explanationKey = `${press}-${temp}`;

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
        data-ai-hint="gas particles piston simulation"
      >
        <P5Wrapper sketch={sketch} temp={temp} press={press} width={width} />
      </div>

      <div className="w-full grid grid-cols-2 gap-4">
        <Card className="p-3">
          <Label className="font-semibold text-sm">درجة الحرارة</Label>
          <RadioGroup dir="rtl" value={temp} onValueChange={(v) => setTemp(v as Temperature)} className="mt-2">
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
          <RadioGroup dir="rtl" value={press} onValueChange={(v) => setPress(v as Pressure)} className="mt-2">
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
