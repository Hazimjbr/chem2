
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, CheckSquare, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';
import { useCurriculum } from '@/context/CurriculumContext';
import MainAppContent from '@/components/main-app-content';

export default function HomePage() {
  const { curriculum, selectCurriculum, isSelected } = useCurriculum();

  if (!isSelected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-accent">Chem</span>
              <span className="text-foreground">Zim</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose your path
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="items-center text-center">
              <CardTitle className="text-3xl">توجيهي 2008</CardTitle>
              <CardDescription>المنهاج الأردني الجديد</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                شرح شامل للمادة، تجارب تفاعلية، أسئلة وامتحانات متنوعة.
              </p>
              <Button size="lg" className="w-full" onClick={() => selectCurriculum('tawjihi')}>
                ابدأ رحلتك
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
          <Card className="border-dashed bg-muted/50">
             <CardHeader className="items-center text-center">
              <CardTitle className="text-3xl text-muted-foreground">IGCSE 0620</CardTitle>
               <CardDescription>Cambridge Curriculum</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                هذا القسم قيد التطوير حاليًا وسيكون متاحًا قريبًا.
              </p>
              <Button size="lg" className="w-full" disabled>
                قريبًا
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <MainAppContent />;
}
