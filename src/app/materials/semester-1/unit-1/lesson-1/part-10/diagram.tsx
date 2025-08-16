
'use client';

import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils.tsx';

// Helper component for diagrams to reduce repetition
const ImageDiagram = ({ src, alt, width, height, className, ...props }: Omit<ImageProps, 'alt'> & { alt: string }) => (
  <div className={cn("flex justify-center items-center my-4 p-2 bg-muted/50 rounded-lg border", className)}>
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="object-contain"
      {...props}
    />
  </div>
);

export const GasSamplesDiagram = (props: Partial<ImageProps>) => (
  <ImageDiagram 
    src="/images/graham-law-q1.png" 
    alt="Four gas samples in equal volumes" 
    width={400} 
    height={150} 
    {...props} 
  />
);

export const DiffusionProcessDiagram = (props: Partial<ImageProps>) => (
  <ImageDiagram 
    src="/images/graham-law-q2.png" 
    alt="Diffusion process of two gases" 
    width={450} 
    height={100} 
    {...props} 
  />
);

export const BromineDiffusionDiagram = (props: Partial<ImageProps>) => (
  <ImageDiagram 
    src="/images/graham-law-q3.png" 
    alt="Bromine and air diffusion experiment" 
    width={250} 
    height={200} 
    {...props} 
  />
);

export const AmmoniumChlorideDiagram = (props: Partial<ImageProps>) => (
  <ImageDiagram 
    src="/images/graham-law-q4.png" 
    alt="Ammonia and HCl reaction in a tube" 
    width={450} 
    height={150} 
    {...props} 
  />
);
