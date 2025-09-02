
'use client';

import Link from 'next/link';
import { Beaker, ChevronDown, FlaskConical, Library, Menu, LogOut } from 'lucide-react';
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


function AuthSection() {
    const { currentUser, clearCurriculum } = useApp();
    const { toast } = useToast();

    const handleSignOut = async () => {
        try {
            await signOutUser();
            clearCurriculum();
            // The onAuthStateChanged listener in context will handle user state.
            // Clearing curriculum ensures we go back to the selection screen.
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
                {currentUser.email}
            </span>
             <Button onClick={handleSignOut} variant="ghost" size="icon" aria-label="تسجيل الخروج">
                <LogOut className="h-5 w-5" />
            </Button>
        </div>
    )
}


function Logo() {
    const { clearCurriculum, currentUser } = useApp();

    const handleClick = (e: React.MouseEvent) => {
        // If a user is NOT logged in, clicking the logo should reset the curriculum choice
        // and take them back to the selection screen.
        if (!currentUser) {
            e.preventDefault();
            clearCurriculum();
        }
        // If a user IS logged in, the link will just navigate to the homepage as normal.
    };
    
    return (
        <Link href="/" onClick={handleClick} className="flex items-center space-x-2">
            <Image src="https://i.ibb.co/ccxLc5NK/2.png" alt="ChemZim Logo" width={28} height={28} data-ai-hint="chemistry logo" />
            <span className="inline-block font-bold text-xl">
                <span className="text-accent">Chem</span>
                <span className="text-foreground">Zim</span>
            </span>
        </Link>
    )
}

function DesktopNav() {
    const { isSelected, currentUser } = useApp();
    if (!isSelected || !currentUser) return null;

    return (
        <nav className="hidden md:flex items-center gap-6 text-sm">
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
             {currentUser.role === 'admin' && (
                <Link
                    href="/question-bank"
                    className="font-medium text-destructive transition-colors hover:text-destructive/80 flex items-center gap-1"
                >
                    <Library className="h-4 w-4" />
                    بنك الأسئلة
                </Link>
            )}
        </nav>
    );
}

function MobileNav() {
    const { isSelected, currentUser } = useApp();
    if (!isSelected || !currentUser) return null;

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
                        {currentUser.role === 'admin' && (
                            <SheetClose asChild>
                            <Link href="/question-bank" className="text-lg font-medium text-destructive transition-colors hover:text-destructive/80">
                                بنك الأسئلة
                            </Link>
                            </SheetClose>
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
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-4">
        <Logo />
        {isMobile ? null : <DesktopNav />}
      </div>
      <div className="flex items-center gap-4">
        <AuthSection />
        {isMobile && <MobileNav />}
      </div>
    </div>
  );
}
