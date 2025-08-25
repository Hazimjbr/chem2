
'use client';

import Link from 'next/link';
import { Beaker, ChevronDown, FlaskConical, Library, Menu } from 'lucide-react';
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
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

function Logo() {
    return (
        <Link href="/" className="flex items-center space-x-2">
            <Beaker className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold">Chemzim</span>
        </Link>
    )
}

function DesktopNav() {
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
            <Link
                href="/quizzes"
                className="font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                الاختبارات
            </Link>
            <Link
                href="/performance-analysis"
                className="font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                تحليل الأداء
            </Link>
            <Link
                href="/question-bank"
                className="font-medium text-destructive transition-colors hover:text-destructive/80 flex items-center gap-1"
            >
                <Library className="h-4 w-4" />
                بنك الأسئلة
            </Link>
            <Link
                href="/question-lab"
                className="font-medium text-destructive/50 transition-colors hover:text-destructive/80 flex items-center gap-1"
            >
                <FlaskConical className="h-4 w-4" />
                مختبر الأسئلة
            </Link>
        </nav>
    );
}

function MobileNav() {
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
                         <Link href="/materials/semester-1" className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary">
                            المواد التعليمية
                        </Link>
                        <Link href="/experiments" className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary">
                            التجارب
                        </Link>
                        <Link href="/quizzes" className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary">
                            الاختبارات
                        </Link>
                        <Link href="/performance-analysis" className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary">
                            تحليل الأداء
                        </Link>
                        <Link href="/question-bank" className="text-lg font-medium text-destructive transition-colors hover:text-destructive/80">
                            بنك الأسئلة
                        </Link>
                        <Link href="/question-lab" className="text-lg font-medium text-destructive/50 transition-colors hover:text-destructive/80">
                            مختبر الأسئلة
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default function MainNav() {
  const isMobile = useIsMobile();

  return (
    <div className="flex w-full items-center justify-between">
      <Logo />
       {isMobile ? <MobileNav /> : <DesktopNav />}
    </div>
  );
}
