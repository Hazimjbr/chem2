
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useApp } from '@/context/CurriculumContext';
import AuthDialog from '@/components/auth-dialog';
import AdminLoginDialog from '@/components/admin/admin-login-dialog';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { isSelected, selectCurriculum, currentUser, isLoading } = useApp();
  const [authOpen, setAuthOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isSelected) {
      router.push('/dashboard');
    }
  }, [isSelected, isLoading, router]);

  const handleTawjihiCardClick = () => {
    if (currentUser?.role === 'admin') {
      selectCurriculum('tawjihi');
      router.push('/dashboard');
    } else {
      setAuthOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setAdminLoginOpen(false);
  };

  const handleStudentAuthSuccess = () => {
    selectCurriculum('tawjihi');
    setAuthOpen(false);
  };
  
  if (isLoading || isSelected) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
             {isSelected && <p className="mr-4">جاري التوجيه...</p>}
        </div>
    )
  }

  return (
    <>
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} onAuthSuccess={handleStudentAuthSuccess} />
      <AdminLoginDialog open={adminLoginOpen} onOpenChange={setAdminLoginOpen} onLoginSuccess={handleAdminLoginSuccess} />
      
      <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-accent">Chem</span>
              <span className="text-foreground">Zim</span>
            </h1>
            <button onClick={() => setAdminLoginOpen(true)} className="text-xl text-muted-foreground hover:text-primary transition-colors">
              Choose your path
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
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
