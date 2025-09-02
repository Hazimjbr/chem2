
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
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);


  const handleCardClick = () => {
    setAuthOpen(true);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
  };

  const handleAuthSuccess = () => {
    // This is for students, automatically select curriculum
    selectCurriculum('tawjihi');
    setAuthOpen(false);
  };
  
  // This effect checks if the currently logged-in user is an admin
  // and keeps the admin view persistent across reloads.
  useEffect(() => {
    if (currentUser?.role === 'admin') {
      setIsAdminLoggedIn(true);
    } else {
      setIsAdminLoggedIn(false);
    }
  }, [currentUser]);

  // This effect runs for students to auto-select curriculum
  useEffect(() => {
    if (currentUser && currentUser.role === 'student' && !isSelected) {
      selectCurriculum('tawjihi');
    }
  }, [currentUser, isSelected, selectCurriculum]);


  // If an admin is logged in, show the special admin view
  if (isAdminLoggedIn) {
     return (
        <div className="flex flex-col min-h-screen bg-background">
            <div className="text-center pt-12">
                 <h1 className="text-5xl font-bold mb-4">
                    <span className="text-accent">Chem</span>
                    <span className="text-foreground">Zim</span>
                </h1>
                {/* Admin does not see the "Choose your path" text */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
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
                        الدخول كمسؤول
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
            {/* The main dashboard is rendered below for the admin */}
            <div className="mt-8">
                <MainAppContent />
            </div>
        </div>
     );
  }

  // If a regular user is logged in and curriculum is selected, show dashboard
  if (currentUser && isSelected) {
    return <MainAppContent />;
  }

  // Default initial view for guests or logged-out users
  return (
    <>
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} onAuthSuccess={handleAuthSuccess} />
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
