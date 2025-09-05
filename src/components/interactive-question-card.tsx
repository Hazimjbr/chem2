
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, HelpCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils.tsx';
import type { QuizResult } from '@/components/quiz';
import { useApp } from '@/context/CurriculumContext';
import { saveInteractiveResult } from '@/lib/firebase/progress.actions';


interface InteractiveQuestionCardProps {
  question: React.ReactNode; 
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  questionId: string;
  lessonId: string;
  onCorrect: (questionId: string) => void;
}

type AnswerStatus = 'unanswered' | 'correct' | 'incorrect';


export default function InteractiveQuestionCard({ question, options, correctAnswerIndex, explanation, questionId, lessonId, onCorrect }: InteractiveQuestionCardProps) {
  const { currentUser } = useApp();
  const [isFlipped, setIsFlipped] = useState(false);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('unanswered');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  
  const cardHeight = 'h-[380px]';

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    if (index === correctAnswerIndex) {
      setAnswerStatus('correct');
      onCorrect(questionId); // Notify parent component on correct answer
      if (currentUser) {
        const result: QuizResult = {
            lessonId: lessonId,
            score: 1,
            difficulty: 0.5,
            timestamp: Date.now(),
            studentId: currentUser.uid,
        };
        saveInteractiveResult(currentUser.uid, result);
      }
    } else {
      setAnswerStatus('incorrect');
    }
    // Flip the card to show explanation
    setIsFlipped(true);
  };
  
  const handleMouseLeave = () => {
    // Reset the card state when mouse leaves
    setIsFlipped(false);
    // Add a small delay to allow the flip-back animation to finish before resetting content
    setTimeout(() => {
        setAnswerStatus('unanswered');
        setSelectedAnswer(null);
    }, 300)
  }

  return (
    <div className={cn("perspective-1000", cardHeight)} onMouseLeave={handleMouseLeave}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front of the Card (Question) */}
        <div className="absolute w-full h-full backface-hidden">
          <Card className="flex flex-col w-full h-full border-primary/20 shadow-lg bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-accent text-xl">
                 <HelpCircle className="h-6 w-6"/>
                 سؤال سريع
              </CardTitle>
              <CardDescription className="text-base pt-2">{question}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end">
               <div className="grid grid-cols-1 gap-2">
                {options.map((option, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start text-right h-auto py-2 px-3 text-sm flex items-start"
                        onClick={() => handleAnswerSelect(index)}
                    >
                         <span className="ml-3 font-bold">{["أ", "ب", "ج", "د"][index]}</span>
                         <span className="flex-1 whitespace-normal">{option}</span>
                    </Button>
                ))}
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Back of the Card (Explanation) */}
        <div
          className="absolute w-full h-full backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <Card className={cn(
            "w-full h-full flex flex-col items-center justify-center text-center",
             answerStatus === 'correct' ? 'bg-green-100/50 border-green-500' : 'bg-red-100/50 border-red-500'
          )}>
            <CardContent className="p-6">
              {answerStatus === 'correct' ? (
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              )}
              <h3 className="text-2xl font-bold mb-2">
                {answerStatus === 'correct' ? 'إجابة صحيحة!' : 'إجابة خاطئة!'}
              </h3>
              <p className="text-muted-foreground font-semibold">الشرح:</p>
              <p className="mt-1">{explanation}</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
      `}</style>
    </div>
  );
}
