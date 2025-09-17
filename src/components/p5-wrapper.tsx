
'use client';

import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import type p5 from 'p5';

interface P5WrapperProps {
  sketch: (p: p5) => void;
  [key: string]: any;
}

export interface P5WrapperRef {
  getInstance: () => p5 | null;
}

const P5Wrapper = forwardRef<P5WrapperRef, P5WrapperProps>(({ sketch, ...props }, ref) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).p5) {
        const p5 = (window as any).p5;

        // Cleanup previous instance if it exists
        if (p5InstanceRef.current) {
          p5InstanceRef.current.remove();
        }

        // Create new instance
        p5InstanceRef.current = new p5(p => {
          // Attach sketch functions
          sketch(p);

          // Attach a custom function to the sketch instance to handle prop updates
          (p as any).updateWithProps = (newProps: any) => {
            for (const key in newProps) {
              if (Object.prototype.hasOwnProperty.call(newProps, key)) {
                (p as any)[key] = newProps[key];
              }
            }
             if(p.isLooping()) p.redraw();
          };

          // Initial props
          (p as any).updateWithProps(props);
          
        }, canvasRef.current!);

    }

    return () => {
      p5InstanceRef.current?.remove();
    };
  }, [sketch]); // Rerun effect if sketch function itself changes

  useEffect(() => {
      if (p5InstanceRef.current && (p5InstanceRef.current as any).updateWithProps) {
        (p5InstanceRef.current as any).updateWithProps(props);
      }
  }, [props]);


  useImperativeHandle(ref, () => ({
    getInstance: () => p5InstanceRef.current,
  }));

  return <div ref={canvasRef} className="w-full h-full" />;
});

P5Wrapper.displayName = 'P5Wrapper';
export default P5Wrapper;
