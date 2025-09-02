
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApp } from '@/context/CurriculumContext';
import MainAppContent from '@/components/main-app-content';
import AuthDialog from '@/components/auth-dialog';
import AdminLoginDialog from '@/components/admin/admin-login-dialog';

export default function HomePage() {
  const { selectCurriculum, isSelected, currentUser } = useApp();
  const [authOpen, setAuthOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);

  const handleTawjihiCardClick = () => {
    // If admin is logged in, select curriculum directly to preview it.
    if (currentUser?.role === 'admin') {
      selectCurriculum('tawjihi');
    } else {
      // Otherwise, open the standard student login dialog.
      setAuthOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    // Admin is now logged in. We just close the dialog.
    // The UI will update based on the new `currentUser` state.
    setAdminLoginOpen(false);
  };

  const handleStudentAuthSuccess = () => {
    // This is for students, automatically select curriculum after login.
    selectCurriculum('tawjihi');
    setAuthOpen(false);
  };

  // If a curriculum is selected (either by student or admin), show the main content.
  if (isSelected) {
    return <MainAppContent />;
  }

  // Default view for guests or for an admin who has just logged in but hasn't selected a course to preview.
  return (
    <>
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} onAuthSuccess={handleStudentAuthSuccess} />
      <AdminLoginDialog open={adminLoginOpen} onOpenChange={setAdminLoginOpen} onLoginSuccess={handleAdminLoginSuccess} />
      
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-accent">Chem</span>
              <span className="text-foreground">Zim</span>
            </h1>
            <button onClick={() => setAdminLoginOpen(true)} className="text-xl text-muted-foreground hover:text-primary transition-colors">
              Choose your path
            </button>
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
              <Button size="lg" className="w-full" onClick={handleTawjihiCardClick}>
                {currentUser?.role === 'admin' ? 'معاينة الدورة' : 'ابدأ رحلتك'}
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
