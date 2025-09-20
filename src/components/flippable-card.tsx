
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils.tsx';
import Image from 'next/image';

interface FlippableCardProps {
  cardTitle: string;
  cardIcon: React.ReactNode;
  children: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  hasImage?: boolean;
}

export default function FlippableCard({ cardTitle, cardIcon, children, imageSrc, imageAlt, hasImage }: FlippableCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Set a dynamic height for the container to prevent layout shifts during flipping
  const cardHeight = hasImage ? 'h-80' : 'h-[280px]';

  return (
    <div className={cn("perspective-1000", cardHeight)} onMouseEnter={() => setIsFlipped(true)} onMouseLeave={() => setIsFlipped(false)}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front of the Card */}
        <div
          className="absolute w-full h-full backface-hidden"
        >
          <Card className="flex items-center justify-center w-full h-full border-primary/20 shadow-xl bg-card">
             {imageSrc && imageAlt ? (
                <div className="relative w-full h-full">
                    <Image
                        src={imageSrc}
                        alt={imageAlt}
                        layout="fill"
                        className="rounded-lg object-contain p-4"
                        data-ai-hint="chemistry diagram"
                    />
                </div>
             ) : (
                <CardHeader>
                <CardTitle className="flex items-center gap-3 text-accent text-2xl">
                    {cardIcon}
                    {cardTitle}
                </CardTitle>
                </CardHeader>
             )}
          </Card>
        </div>

        {/* Back of the Card */}
        <div
          className="absolute w-full h-full backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <Card className="w-full h-full border-primary/20 shadow-xl overflow-y-auto bg-card">
             <CardHeader>
              <CardTitle className="flex items-center gap-3 text-accent text-lg">
                {cardIcon}
                {cardTitle}
              </CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
          </Card>
        </div>
      </motion.div>
       {/* Simple CSS to handle backface visibility, as it's not directly in Tailwind */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
