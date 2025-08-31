
'use client';

import { Button } from '@/components/ui/button';
import { Calculator, Bot, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import PeriodicTable from './periodic-table';
import CalculatorComponent from './calculator';
import ChatAssistant from './chat-assistant';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PeriodicTableIcon from './periodic-table-icon';

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const actions = [
    {
      id: 'chat',
      icon: <Bot className="h-7 w-7" />,
      label: 'المساعد الذكي',
      component: <ChatAssistant />,
      dialogClassName: 'max-w-2xl p-0',
    },
    {
      id: 'periodic-table',
      icon: <PeriodicTableIcon className="h-7 w-7" />,
      label: 'الجدول الدوري',
      component: <PeriodicTable />,
      dialogTitle: 'الجدول الدوري',
      dialogClassName: 'max-w-4xl',
    },
    {
      id: 'calculator',
      icon: <Calculator className="h-7 w-7" />,
      label: 'آلة حاسبة',
      component: <CalculatorComponent />,
      dialogTitle: 'آلة حاسبة علمية',
      dialogClassName: 'max-w-sm mobile-landscape:gap-0',
    },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-0 flex flex-row-reverse items-center gap-3 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="flex flex-row-reverse items-center gap-3 p-2 bg-background/80 backdrop-blur-sm rounded-l-full"
          >
            {actions.map((action) => (
              <Dialog key={action.id}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-12 w-12 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg border-none"
                    aria-label={action.label}
                  >
                    {action.icon}
                  </Button>
                </DialogTrigger>
                <DialogContent className={action.dialogClassName}>
                  {action.dialogTitle ? (
                    <DialogHeader>
                      <DialogTitle>{action.dialogTitle}</DialogTitle>
                    </DialogHeader>
                  ) : (
                    <DialogHeader className="sr-only">
                      <DialogTitle>{action.label}</DialogTitle>
                    </DialogHeader>
                  )}
                  {action.component}
                </DialogContent>
              </Dialog>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ x: isOpen ? 0 : '65%' }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <Button
          size="icon"
          className="rounded-l-full rounded-r-none h-14 w-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isOpen ? 'close' : 'open'}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
            </motion.div>
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  );
}
