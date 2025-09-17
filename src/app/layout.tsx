
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import FloatingActions from '@/components/floating-actions';
import { Toaster } from '@/components/ui/toaster';
import 'katex/dist/katex.min.css';
import { AppProvider } from '@/context/CurriculumContext';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chemzim',
  description: 'Interactive Chemistry Learning Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <AppProvider>
            <Header />
            <main>{children}</main>
            <FloatingActions />
            <Toaster />
        </AppProvider>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
