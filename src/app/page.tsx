
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApp } from '@/context/CurriculumContext';
import MainAppContent from '@/components/main-app-content';
import AuthDialog from '@/components/auth-dialog';

export default function HomePage() {
  const { selectCurriculum, isSelected, currentUser } = useApp();
  const [authOpen, setAuthOpen] = useState(false);

  const handleCardClick = () => {
    setAuthOpen(true);
  };

  const handleAuthSuccess = () => {
    selectCurriculum('tawjihi');
    setAuthOpen(false);
  };

  // This effect runs only when the user logs in and no curriculum is selected.
  useEffect(() => {
    // Automatically select the curriculum only for students, not for admins.
    if (currentUser && currentUser.role === 'student' && !isSelected) {
      selectCurriculum('tawjihi');
    }
  }, [currentUser, isSelected, selectCurriculum]);


  // If there's no user, always show the initial landing/selection page.
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
              <Button size="lg" className="w-full" onClick={handleCardClick}>
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
  
  // If user is logged in, and a curriculum is selected, show the main content.
  if (currentUser && isSelected) {
    return <MainAppContent />;
  }
  
  // This is the state where the admin has logged in but has cleared the curriculum.
  // This will now correctly show the curriculum selection page.
  if (currentUser && !isSelected) {
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
              <Button size="lg" className="w-full" onClick={() => selectCurriculum('tawjihi')}>
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
  
  // Otherwise, show nothing (or a loader) while the effect runs.
  return null;
}
