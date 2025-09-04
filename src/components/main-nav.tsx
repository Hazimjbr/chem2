
'use client';

import Link from 'next/link';
import { Beaker, ChevronDown, FlaskConical, Library, Menu, LogOut, ShieldCheck, FileQuestion, TestTube } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useApp } from '@/context/CurriculumContext';
import { signOutUser } from '@/lib/firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from './ui/avatar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


function AuthSection() {
    const { currentUser, clearCurriculum } = useApp();
    const { toast } = useToast();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOutUser();
            clearCurriculum();
            router.push('/');
            toast({
                title: 'تم تسجيل الخروج بنجاح',
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: 'destructive',
                title: 'حدث خطأ أثناء تسجيل الخروج',
            });
        }
    }

    if (!currentUser) return null;

    return (
        <div className="flex items-center gap-2">
             <Avatar className="h-8 w-8">
                <AvatarFallback>{currentUser.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
                {currentUser.role === 'admin' ? 'Admin' : currentUser.displayName}
            </span>
             <Button onClick={handleSignOut} variant="ghost" size="icon" aria-label="تسجيل الخروج">
                <LogOut className="h-5 w-5" />
            </Button>
        </div>
    )
}


function Logo() {
    const { isSelected, clearCurriculum, currentUser } = useApp();
    const router = useRouter();

    const handleTextClick = () => {
        if (isSelected) {
            router.push('/materials/semester-1');
        } else {
            router.push('/');
        }
    };
    
    const handleIconClick = () => {
        if (currentUser?.role === 'admin') {
            clearCurriculum();
        }
        router.push('/');
    };
    
    return (
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
             <Button
                onClick={handleIconClick}
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                aria-label={'العودة إلى الواجهة الرئيسية'}
            >
                <Image src="https://i.ibb.co/ccxLc5NK/2.png" alt="ChemZim Logo" width={28} height={28} data-ai-hint="chemistry logo" />
            </Button>
            <button onClick={handleTextClick} className="flex items-baseline">
                <span className="text-xl font-bold">
                    <span className="text-accent">Chem</span>
                    <span className="text-foreground">Zim</span>
                </span>
            </button>
        </div>
    )
}

function DesktopNav() {
    const { isSelected, currentUser } = useApp();
    if (!currentUser) return null;

    return (
        <nav className="hidden md:flex items-center gap-2 text-sm">
           {currentUser.role === 'admin' && (
             <>
                <Link href="/admin/dashboard" passHref>
                    <Button variant="ghost" className="font-medium text-destructive transition-colors hover:text-destructive/80">
                        <ShieldCheck className="ml-2 h-4 w-4" />
                        لوحة التحكم
                    </Button>
                </Link>
                 <Link href="/question-bank" passHref>
                    <Button variant="ghost" className="font-medium">
                       <Library className="ml-2 h-4 w-4" />
                        بنك الأسئلة
                    </Button>
                </Link>
                 <Link href="/question-lab" passHref>
                    <Button variant="ghost" className="font-medium">
                       <TestTube className="ml-2 h-4 w-4" />
                        معمل الأسئلة
                    </Button>
                </Link>
            </>
            )}
            {isSelected && (
              <>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:ring-0">
                        المواد التعليمية
                        <ChevronDown className="relative top-[1px] mr-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <Link href="/materials/semester-1">
                        <DropdownMenuItem>الفصل الأول</DropdownMenuItem>
                        </Link>
                        <Link href="/materials/semester-2">
                        <DropdownMenuItem disabled>الفصل الثاني (قريبا)</DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Link
                    href="/experiments"
                    className="font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    التجارب
                </Link>
             </>
           )}
        </nav>
    );
}

function MobileNav() {
    const { isSelected, currentUser } = useApp();
    if (!currentUser) return null;

    return (
        <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">فتح القائمة</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <SheetHeader>
                        <SheetTitle>
                            <Logo />
                        </SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col gap-4 mt-8">
                       {currentUser.role === 'admin' && (
                            <>
                                <SheetClose asChild>
                                <Link href="/admin/dashboard" className="text-lg font-medium text-destructive transition-colors hover:text-destructive/80 flex items-center gap-2">
                                    <ShieldCheck /> لوحة التحكم
                                </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                <Link href="/question-bank" className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-2">
                                   <Library /> بنك الأسئلة
                                </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                <Link href="/question-lab" className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-2">
                                   <TestTube /> معمل الأسئلة
                                </Link>
                                </SheetClose>
                            </>
                        )}
                        {isSelected && (
                         <>
                            <SheetClose asChild>
                            <Link href="/materials/semester-1" className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary">
                                المواد التعليمية
                            </Link>
                            </SheetClose>
                            <SheetClose asChild>
                            <Link href="/experiments" className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary">
                                التجارب
                            </Link>
                            </SheetClose>
                         </>
                        )}
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default function MainNav() {
  const isMobile = useIsMobile();
  const { currentUser } = useApp();

  return (
    <div className="flex w-full items-center">
      <div className="flex-1 flex justify-start items-center gap-4">
        <Logo />
        {isMobile ? null : <DesktopNav />}
      </div>
      <div className="flex-none flex items-center gap-2">
        <AuthSection />
        {isMobile && <MobileNav />}
      </div>
    </div>
  );
}
