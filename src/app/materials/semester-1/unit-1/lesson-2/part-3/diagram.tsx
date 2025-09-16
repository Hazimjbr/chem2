
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw } from 'lucide-react';
import type p5 from 'p5';

const CANVAS_HEIGHT = 300;
const START_TEMP = 120;
const END_TEMP = -20;
const CONDENSATION_POINT = 100;
const FREEZING_POINT = 0;
const TOTAL_TIME = 1000;

export default function CoolingCurveDiagram() {
  const sketchRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!sketchRef.current) return;
    
    let canvasWidth = sketchRef.current.offsetWidth;
    p5InstanceRef.current?.remove();

    import('p5').then(p5Module => {
      const p5 = p5Module.default;
      const sketch = (p: p5) => {
        let localTime = 0;
        let path: p5.Vector[] = [];
        let localIsPlaying = true;
        
        const internalReset = () => {
            localTime = 0;
            path = [];
            localIsPlaying = true;
            p.loop();
        };
        
        p.setup = () => {
          p.createCanvas(canvasWidth, CANVAS_HEIGHT);
          (p as any).playPause = (play: boolean) => {
            localIsPlaying = play;
            if (play) p.loop();
            else p.noLoop();
          };
          (p as any).reset = internalReset;
        };
        
        p.windowResized = () => {
          if (sketchRef.current) {
              canvasWidth = sketchRef.current.offsetWidth;
              p.resizeCanvas(canvasWidth, CANVAS_HEIGHT);
          }
        }

        p.draw = () => {
          let currentTemp = START_TEMP;
          let currentPhase = 'غاز';
          p.background('hsl(var(--card))');
          p.stroke(0);
          p.strokeWeight(1);
          
          const xAxisY = CANVAS_HEIGHT - 40;
          const yAxisX = 40;
          p.line(yAxisX, 20, yAxisX, xAxisY);
          p.line(yAxisX, xAxisY, canvasWidth - 20, xAxisY);

          p.noStroke();
          p.fill(0);
          p.textAlign(p.CENTER, p.CENTER);
          p.text('الزمن', canvasWidth / 2, xAxisY + 15);
          p.push();
          p.translate(15, CANVAS_HEIGHT / 2);
          p.rotate(-p.HALF_PI);
          p.text('درجة الحرارة (°C)', 0, 0);
          p.pop();

          for (let t = END_TEMP; t <= START_TEMP; t += 20) {
               if (t === CONDENSATION_POINT || t === FREEZING_POINT || t === START_TEMP || t === END_TEMP) {
                  const y = p.map(t, END_TEMP, START_TEMP, xAxisY, 20);
                  p.line(yAxisX - 5, y, yAxisX + 5, y);
                  p.text(t, yAxisX - 20, y);
               }
          }
          
          if (localTime <= 100) {
              currentTemp = p.map(localTime, 0, 100, START_TEMP, CONDENSATION_POINT);
              currentPhase = 'غاز';
          } else if (localTime <= 400) {
              currentTemp = CONDENSATION_POINT;
              currentPhase = 'غاز + سائل';
          } else if (localTime <= 600) {
              currentTemp = p.map(localTime, 400, 600, CONDENSATION_POINT, FREEZING_POINT);
              currentPhase = 'سائل';
          } else if (localTime <= 900) {
              currentTemp = FREEZING_POINT;
              currentPhase = 'سائل + صلب';
          } else {
              currentTemp = p.map(localTime, 900, 1000, FREEZING_POINT, END_TEMP);
              currentPhase = 'صلب';
          }

          const x = p.map(localTime, 0, TOTAL_TIME, yAxisX, canvasWidth - 20);
          const y = p.map(currentTemp, END_TEMP, START_TEMP, xAxisY, 20);
          
          if (localTime < TOTAL_TIME) {
              path.push(p.createVector(x, y));
          }

          p.noFill();
          p.strokeWeight(2.5);
          p.stroke(0);
          p.beginShape();
          path.forEach(v => p.vertex(v.x, v.y));
          p.endShape();
          
          p.fill('hsl(var(--destructive))');
          p.noStroke();
          p.ellipse(x, y, 8, 8);
          p.fill(0);
          p.textAlign(p.LEFT);
          p.text(`${currentPhase}`, x + 10, y - 10);

          if (localIsPlaying && localTime < TOTAL_TIME) {
            localTime++;
          }
        };
      };
      
      p5InstanceRef.current = new p5(sketch, sketchRef.current);
    });

    return () => {
      p5InstanceRef.current?.remove();
    };
  }, []);

   const handlePlayPause = () => {
        const newIsPlaying = !isPlaying;
        setIsPlaying(newIsPlaying);
        if (p5InstanceRef.current && (p5InstanceRef.current as any).playPause) {
            (p5InstanceRef.current as any).playPause(newIsPlaying);
        }
    };

    const resetAnimation = () => {
      setIsPlaying(true);
      if (p5InstanceRef.current) {
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
                <Button onClick={resetAnimation} variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
