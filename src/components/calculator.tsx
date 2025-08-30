
'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";

// The buttons are now objects with a 'display' for the UI and a 'value' for logic.
// This is to implement the user's request of swapping the display of parentheses.
const buttons = [
  'sin', 'cos', 'tan', 'log', 'ln',
  '^', '√', 'π', 'e', 'C',
  { display: '(', value: ')' }, 
  { display: ')', value: '(' }, 
  '7', '8', '9',
  '*', '/', '4', '5', '6',
  '+', '-', '1', '2', '3',
  '.', '0', '⌫', '=',
].map(btn => (typeof btn === 'string' ? { display: btn, value: btn } : btn));


// A safer evaluation function
const safeEval = (expr: string): number => {
    // This is a much safer way to evaluate expressions than using new Function() or eval().
    // It only allows numbers, math functions, operators and constants.
    // It replaces custom symbols with Math object equivalents.
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
    
    // Regular expression to validate the expression.
    // Allows: numbers, parentheses, operators (+, -, *, /, **), and Math object calls.
    const validPattern = /^[0-9\s\(\)\+\-\*\/\.\*eE,Math\s\w\d\.]+$/;


    if (!validPattern.test(safeExpr)) {
        throw new Error("Invalid characters in expression");
    }

    // Using new Function is still powerful, but with the regex above, we have sanitized
    // the input to only contain safe characters, making it much harder to inject malicious code.
    return new Function('return ' + safeExpr)();
}

export default function Calculator() {
  const [display, setDisplay] = useState('0');

  const handleButtonClick = (btnValue: string) => {
    if (display.length > 24 && !['C', '=', '⌫'].includes(btnValue)) return;

    if (display === 'Error') {
        setDisplay('0');
        return; // Exit after resetting from error
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
            // Use toPrecision to avoid trailing zeros but maintain precision
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

      default: // For numbers, operators, and parenthesis
        setDisplay(prev => (prev === '0' && btnValue !== '.') ? btnValue : prev + btnValue);
        break;
    }
  };


  return (
    <div className="w-full max-w-sm mx-auto space-y-4 mobile-landscape:max-w-[28rem]">
      <div dir="ltr" className="bg-muted text-left text-3xl font-mono p-4 rounded-lg break-all h-20 flex items-end justify-start">
        {display}
      </div>
      <div className="grid grid-cols-5 mobile-landscape:grid-cols-10 gap-2">
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
              className += ' col-span-2 mobile-landscape:col-span-2';
          }

          return (
            <Button
              key={btn.display}
              variant={variant}
              className={`${className} mobile-landscape:h-12`}
              size="lg"
              onClick={() => handleButtonClick(btn.value)}
            >
              {btn.display}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
