
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
    if (typeof window !== 'undefined') {
      import('p5').then(p5Module => {
        const p5 = p5Module.default;

        if (p5InstanceRef.current) {
          p5InstanceRef.current.remove();
        }

        p5InstanceRef.current = new p5(p => {
          // Attach sketch functions
          sketch(p);

          // Attach custom props update function
          (p as any).updateWithProps = (newProps: any) => {
            for (const key in newProps) {
              if (Object.prototype.hasOwnProperty.call(newProps, key)) {
                (p as any)[key] = newProps[key];
              }
            }
          };

          (p as any).updateWithProps(props);

        }, canvasRef.current!);

      });
    }

    return () => {
      p5InstanceRef.current?.remove();
    };
  }, []); // Run only once

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
