'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";

const buttons = [
  // Row 1
  'sin', 'cos', 'tan', 'log', 'ln',
  // Row 2
  '^', '√', 'π', 'e', 'C',
  // Row 3
  '(', ')', '7', '8', '9', '/',
  // Row 4
  '*', '4', '5', '6', '-',
  // Row 5
  '+', '1', '2', '3', '=',
  // Row 6
  '.', '0', '⌫',
].map(btn => (typeof btn === 'string' ? { display: btn, value: btn } : btn));


const landscapeButtons = [
  'sin', 'cos', 'tan', 'log', 'ln', '(', ')',
  'e', '^', '7', '8', '9', '/', 'C',
  '√', '4', '5', '6', '*', '⌫',
  '1', '2', '3', '-', '=',
  '0', '.',
].map(btn => (typeof btn === 'string' ? { display: btn, value: btn } : btn));


const safeEval = (expr: string): number => {
    const safeExpr = expr
        .replace(/√/g, 'Math.sqrt')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, 'Math.sin(Math.PI/180 * ')
        .replace(/cos\(/g, 'Math.cos(Math.PI/180 * ')
        .replace(/tan\(/g, 'Math.tan(Math.PI/180 * ')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log');
    
    const validPattern = /^[0-9\s\(\)\+\-\*\/\.\*eE,Math\s\w\d\.]+$/;

    if (!validPattern.test(safeExpr)) {
        throw new Error("Invalid characters in expression");
    }

    return new Function('return ' + safeExpr)();
}

export default function Calculator() {
  const [display, setDisplay] = useState('0');

  const handleButtonClick = (btnValue: string) => {
    if (display.length > 24 && !['C', '=', '⌫'].includes(btnValue)) return;

    if (display === 'Error') {
        setDisplay('0');
        return;
    }

    switch (btnValue) {
      case 'C':
        setDisplay('0');
        break;
      
      case '⌫':
        setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
        break;

      case '=':
        try {
            const result = safeEval(display);
            setDisplay(String(parseFloat(result.toPrecision(15))));
        } catch (error) {
            console.error(error);
            setDisplay('Error');
        }
        break;

      case 'sin':
      case 'cos':
      case 'tan':
      case 'log':
      case 'ln':
      case '√':
         setDisplay(prev => (prev === '0' ? btnValue + '(' : prev + btnValue + '('));
         break;

      default:
        setDisplay(prev => (prev === '0' && btnValue !== '.') ? btnValue : prev + btnValue);
        break;
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-2 flex flex-col h-full mobile-landscape:max-w-none mobile-landscape:p-2 mobile-landscape:h-screen">
       <div dir="ltr" className="bg-muted text-left text-3xl font-mono p-4 rounded-lg break-all flex items-end justify-start mobile-landscape:h-16 mobile-landscape:text-2xl mobile-landscape:mb-2">
        {display}
      </div>
      <div className="grid grid-cols-5 gap-2 mobile-landscape:hidden">
        {buttons.map((btn) => {
          const isOperator = ['/', '*', '-', '+', '^'].includes(btn.value);
          const isEqual = btn.value === '=';
          const isClear = btn.value === 'C';
          
          let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'secondary';
          let className = `text-lg h-14`;

          if (isOperator) variant = 'default';
          if (isClear || btn.value === '⌫') variant = 'destructive';
          if (isEqual) {
              variant = 'default';
              className += ' col-span-2';
          }

          return (
            <Button
              key={btn.display}
              variant={variant}
              className={className}
              size="lg"
              onClick={() => handleButtonClick(btn.value)}
            >
              {btn.display}
            </Button>
          );
        })}
      </div>
      
      {/* Landscape layout */}
       <div className="hidden mobile-landscape:grid flex-1 gap-1 grid-cols-7">
            {landscapeButtons.map((btn) => {
                 const isOperator = ['/', '*', '-', '+', '^'].includes(btn.value);
                 const isClear = ['C', '⌫'].includes(btn.value);
                 const isEqual = btn.value === '=';

                 let variant: 'default' | 'secondary' | 'destructive' = 'secondary';
                 if (isOperator) variant = 'default';
                 if (isClear) variant = 'destructive';
                 if (isEqual) variant = 'default';

                 let className = 'h-10 text-base';
                 if (isEqual) {
                     className += ' row-span-2';
                 }
                  if (btn.value === '0') {
                     className += ' col-span-2';
                 }


                 return(
                      <Button 
                        key={btn.display} 
                        variant={variant}
                        className={className}
                        onClick={() => handleButtonClick(btn.value)}
                      >
                          {btn.display}
                      </Button>
                   )
            })}
        </div>
    </div>
  );
}
