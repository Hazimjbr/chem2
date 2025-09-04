
'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import p5 from 'p5';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw } from 'lucide-react';

const CANVAS_HEIGHT = 300;
const START_TEMP = 120;
const END_TEMP = -20;
const CONDENSATION_POINT = 100;
const FREEZING_POINT = 0;
const TOTAL_TIME = 1000; // Total frames for the animation

export default function CoolingCurveDiagram() {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
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
      let time = 0;
      let path: p5.Vector[] = [];
      let currentTemp = START_TEMP;
      let currentPhase = 'غاز';

      const resetAnimation = () => {
        time = 0;
        path = [];
        currentTemp = START_TEMP;
        currentPhase = 'غاز';
        p.loop();
      };

      p.setup = () => {
        p.createCanvas(width, CANVAS_HEIGHT);
        (p as any).playPause = (play: boolean) => {
          if (play) p.loop();
          else p.noLoop();
        };
        (p as any).reset = resetAnimation;
      };

      p.draw = () => {
        p.background('hsl(var(--card))');
        p.stroke(0);
        p.strokeWeight(1);
        
        // Draw Axes
        const xAxisY = CANVAS_HEIGHT - 40;
        const yAxisX = 40;
        p.line(yAxisX, 20, yAxisX, xAxisY); // Y-axis
        p.line(yAxisX, xAxisY, width - 20, xAxisY); // X-axis

        // Axes Labels
        p.noStroke();
        p.fill(0);
        p.textAlign(p.CENTER, p.CENTER);
        p.text('الزمن', width / 2, xAxisY + 15);
        p.push();
        p.translate(15, CANVAS_HEIGHT / 2);
        p.rotate(-p.HALF_PI);
        p.text('درجة الحرارة (°C)', 0, 0);
        p.pop();

        // Y-axis ticks
        for (let t = END_TEMP; t <= START_TEMP; t += 20) {
             if (t === CONDENSATION_POINT || t === FREEZING_POINT || t === START_TEMP || t === END_TEMP) {
                const y = p.map(t, END_TEMP, START_TEMP, xAxisY, 20);
                p.line(yAxisX - 5, y, yAxisX + 5, y);
                p.text(t, yAxisX - 20, y);
             }
        }
        
        // Calculate current state based on time
        if (time <= 100) { // Cooling gas
            currentTemp = p.map(time, 0, 100, START_TEMP, CONDENSATION_POINT);
            currentPhase = 'غاز';
        } else if (time <= 400) { // Condensing
            currentTemp = CONDENSATION_POINT;
            currentPhase = 'غاز + سائل';
        } else if (time <= 600) { // Cooling liquid
            currentTemp = p.map(time, 400, 600, CONDENSATION_POINT, FREEZING_POINT);
            currentPhase = 'سائل';
        } else if (time <= 900) { // Freezing
            currentTemp = FREEZING_POINT;
            currentPhase = 'سائل + صلب';
        } else { // Cooling solid
            currentTemp = p.map(time, 900, 1000, FREEZING_POINT, END_TEMP);
            currentPhase = 'صلب';
        }

        const x = p.map(time, 0, TOTAL_TIME, yAxisX, width - 20);
        const y = p.map(currentTemp, END_TEMP, START_TEMP, xAxisY, 20);
        
        if (time < TOTAL_TIME) {
            path.push(p.createVector(x, y));
        }

        // Draw path
        p.noFill();
        p.strokeWeight(2.5);
        p.stroke(0);
        p.beginShape();
        path.forEach(v => p.vertex(v.x, v.y));
        p.endShape();
        
        // Draw current point and label
        p.fill('hsl(var(--destructive))');
        p.noStroke();
        p.ellipse(x, y, 8, 8);
        p.fill(0);
        p.textAlign(p.LEFT);
        p.text(`${currentPhase}`, x + 10, y - 10);

        if (isPlaying) {
          time++;
        }

        if (time > TOTAL_TIME) {
          p.noLoop();
          setIsPlaying(false);
        }
      };
    };

    p5InstanceRef.current = new p5(sketch, sketchRef.current!);

    return () => {
      p5InstanceRef.current?.remove();
    };
  }, [width, isPlaying]);

   const handlePlayPause = () => {
        const newIsPlaying = !isPlaying;
        setIsPlaying(newIsPlaying);
        if (p5InstanceRef.current && (p5InstanceRef.current as any).playPause) {
            (p5InstanceRef.current as any).playPause(newIsPlaying);
        }
    };

    const handleReset = () => {
        setIsPlaying(true);
        if (p5InstanceRef.current && (p5InstanceRef.current as any).reset) {
            (p5InstanceRef.current as any).reset();
        }
    };


  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div
        ref={sketchRef}
        className="rounded-lg border bg-muted w-full overflow-hidden"
        style={{ height: `${CANVAS_HEIGHT}px` }}
        data-ai-hint="water cooling curve"
      >
      </div>
      <div className="flex gap-2">
         <Button onClick={handlePlayPause} variant="outline" size="icon">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
         </Button>
         <Button onClick={handleReset} variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
         </Button>
      </div>
    </div>
  );
}
