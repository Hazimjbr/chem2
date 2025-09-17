
'use client';

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw } from 'lucide-react';
import type p5 from 'p5';
import P5Wrapper from '@/components/p5-wrapper';

const CANVAS_HEIGHT = 300;
const START_TEMP = 120;
const END_TEMP = -20;
const CONDENSATION_POINT = 100;
const FREEZING_POINT = 0;
const TOTAL_TIME = 1000;

const sketch = (p: p5) => {
    let localTime = 0;
    let path: p5.Vector[] = [];
    let localIsPlaying = true;
    let canvasWidth = 400;

    p.setup = () => {
        const parent = p.canvas.parentElement;
        canvasWidth = parent?.clientWidth || 400;
        p.createCanvas(canvasWidth, CANVAS_HEIGHT);
    };

    (p as any).updateWithProps = (props: any) => {
        if(props.width) {
            canvasWidth = props.width;
            p.resizeCanvas(props.width, CANVAS_HEIGHT);
        }
        if (props.isPlaying !== undefined && props.isPlaying !== localIsPlaying) {
          localIsPlaying = props.isPlaying;
          if (localIsPlaying) p.loop(); else p.noLoop();
        }
        if (props.reset) {
            localTime = 0;
            path = [];
            p.loop();
        }
    };

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
      } else if (localTime >= TOTAL_TIME) {
          p.noLoop();
      }
    };
};

export default function CoolingCurveDiagram() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [reset, setReset] = useState(0);
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

    const resetAnimation = () => {
        setIsPlaying(true);
        setReset(prev => prev + 1);
    };

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <div
                ref={containerRef}
                className="rounded-lg border bg-muted w-full overflow-hidden"
                style={{ height: `${CANVAS_HEIGHT}px` }}
                data-ai-hint="water cooling curve"
            >
                <P5Wrapper sketch={sketch} isPlaying={isPlaying} reset={reset} width={width} />
            </div>
            <div className="flex gap-2">
                <Button onClick={() => setIsPlaying(!isPlaying)} variant="outline" size="icon">
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button onClick={resetAnimation} variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
