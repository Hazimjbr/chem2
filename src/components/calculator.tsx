'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";

const buttons = [
  // Row 1
  { display: 'sin', value: 'sin' }, { display: 'cos', value: 'cos' }, { display: 'tan', value: 'tan' }, { display: 'log', value: 'log' }, { display: 'ln', value: 'ln' },
  // Row 2
  { display: 'C', value: 'C' }, { display: 'e', value: 'e' }, { display: 'π', value: 'π' }, { display: '√', value: '√' }, { display: '^', value: '^' },
  // Row 3
  { display: '7', value: '7' }, { display: '8', value: '8' }, { display: '9', value: '9' }, { display: '(', value: '(' }, { display: ')', value: ')' },
  // Row 4
  { display: '4', value: '4' }, { display: '5', value: '5' }, { display: '6', value: '6' }, { display: '*', value: '*' }, { display: '/', value: '/' },
  // Row 5
  { display: '1', value: '1' }, { display: '2', value: '2' }, { display: '3', value: '3' }, { display: '+', value: '+' }, { display: '-', value: '-' },
  // Row 6
  { display: '⌫', value: '⌫' }, { display: '0', value: '0' }, { display: '.', value: '.' }, { display: '=', value: '=' },
];


const landscapeButtons = [
    // Row 1
    { display: '7', value: '7' }, { display: '8', value: '8' }, { display: '9', value: '9' }, { display: '(', value: '(' }, { display: ')', value: ')' }, { display: 'log', value: 'log' }, { display: 'ln', value: 'ln' },
    // Row 2
    { display: '4', value: '4' }, { display: '5', value: '5' }, { display: '6', value: '6' }, { display: '*', value: '*' }, { display: '/', value: '/' }, { display: 'e', value: 'e' }, { display: 'tan', value: 'tan' },
    // Row 3
    { display: '1', value: '1' }, { display: '2', value: '2' }, { display: '3', value: '3' }, { display: '+', value: '+' }, { display: '-', value: '-' }, { display: '√', value: '√' }, { display: 'cos', value: 'cos' },
    // Row 4
    { display: '0', value: '0' }, { display: '.', value: '.' }, { display: '⌫', value: '⌫' }, { display: '=', value: '=' }, { display: '^', value: '^' }, { display: 'C', value: 'C' }, { display: 'sin', value: 'sin' },
];


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
    <div dir="ltr" className="w-full max-w-sm mx-auto space-y-2 flex flex-col h-full mobile-landscape:max-w-none mobile-landscape:p-2 mobile-landscape:h-full mobile-landscape:space-y-1">
       <div className="bg-muted text-left text-3xl font-mono p-4 rounded-lg break-all flex items-end justify-start mobile-landscape:h-16 mobile-landscape:text-2xl mobile-landscape:mb-1">
        {display}
      </div>
      <div className="grid grid-cols-5 gap-2 mobile-landscape:hidden">
        {buttons.map((btn) => {
          const isOperator = ['/', '*', '-', '+', '^'].includes(btn.value);
          const isEqual = btn.value === '=';
          const isClear = btn.value === 'C';
           const isBackspace = btn.value === '⌫';
          
          let variant: 'default' | 'secondary' | 'destructive' | 'outline' = 'secondary';
          let className = `text-lg h-12`;

          if (isOperator || ['^', '√'].includes(btn.value)) variant = 'default';
          if (isClear) variant = 'destructive';
           if (isBackspace) {
              variant = 'destructive';
          }
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
       <div className="hidden mobile-landscape:grid flex-1 gap-x-1 gap-y-[2px] grid-cols-7">
            {landscapeButtons.map((btn) => {
                 const isOperator = ['/', '*', '-', '+', '^', '='].includes(btn.value);
                 const isClear = ['C', '⌫'].includes(btn.value);

                 let variant: 'default' | 'secondary' | 'destructive' = 'secondary';
                 if (isOperator) variant = 'default';
                 if (isClear) variant = 'destructive';

                 let className = 'h-10 text-base';
                 
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
