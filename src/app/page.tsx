
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '@/context/CurriculumContext';
import MainAppContent from '@/components/main-app-content';
import AuthDialog from '@/components/auth-dialog';

export default function HomePage() {
  const { curriculum, selectCurriculum, isSelected, currentUser } = useApp();
  const [authOpen, setAuthOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'tawjihi' | 'igcse' | null>(null);

  const handleCardClick = (provider: 'tawjihi' | 'igcse') => {
    setSelectedProvider(provider);
    setAuthOpen(true);
  }

  const handleAuthSuccess = () => {
    if (selectedProvider) {
      selectCurriculum(selectedProvider);
    }
    setAuthOpen(false);
  }

  if (!currentUser) {
     return (
      <>
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} onAuthSuccess={handleAuthSuccess} />
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
                شرح شامل للمادة تجارب تفاعلية أسئلة وامتحانات متنوعة
              </p>
              <Button size="lg" className="w-full" onClick={() => handleCardClick('tawjihi')}>
                ابدأ رحلتك
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
          <Card>
             <CardHeader className="items-center text-center">
              <CardTitle className="text-3xl">IGCSE 0620</CardTitle>
               <CardDescription>Cambridge Curriculum</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                This section is currently under development and will be available soon
              </p>
              <Button size="lg" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      </>
    );
  }
  
  if (currentUser && !isSelected) {
     // This state occurs after login but before curriculum selection
      selectCurriculum('tawjihi'); // Default to tawjihi for now
  }

  return <MainAppContent />;
}
