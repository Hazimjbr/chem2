
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { generateQuiz, GenerateQuizOutput } from '@/ai/flows/generate-quiz-flow';
import { Loader2, CheckCircle, XCircle, Star, Sparkles, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils.tsx';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

// This is the universal QuizQuestion interface
export interface QuizQuestion {
    question: React.ReactNode;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

// Interface for a single quiz result to be stored
export interface QuizResult {
  lessonId: string;
  score: number; // 0 to 1
  difficulty: number;
  timestamp: number;
}

// The props for our new central quiz component
interface QuizProps {
  lessonContent: string;
  staticQuizzes: {
    lvl1: QuizQuestion[];
    lvl2: QuizQuestion[];
    lvl3: QuizQuestion[];
  };
  lessonId: string; // Unique ID for the lesson to manage localStorage
}

type AnswerStatus = 'unanswered' | 'correct' | 'incorrect';

// Helper function to shuffle an array and return the new index of the correct answer
const shuffleOptions = (question: QuizQuestion): QuizQuestion => {
    if (question.options.every(o => o.length === 1 || o.startsWith("أقرب") || o.startsWith("في منتصف"))) {
        return question;
    }
    const correctAnswerValue = question.options[question.correctAnswerIndex];
    const indices = Array.from(Array(question.options.length).keys());
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    const shuffledOptions = indices.map(i => question.options[i]);
    const newCorrectAnswerIndex = shuffledOptions.findIndex(opt => opt === correctAnswerValue);
    return { ...question, options: shuffledOptions, correctAnswerIndex: newCorrectAnswerIndex };
};

const saveQuizResult = (result: QuizResult) => {
  try {
    const historyJSON = localStorage.getItem('quizHistory');
    const history: QuizResult[] = historyJSON ? JSON.parse(historyJSON) : [];
    // Add the new result and keep the history to a reasonable size, e.g., last 50 quizzes
    history.push(result);
    if (history.length > 50) {
      history.shift();
    }
    localStorage.setItem('quizHistory', JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save quiz result:", error);
  }
};


export default function Quiz({ lessonContent, staticQuizzes, lessonId }: QuizProps) {
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('unanswered');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const { toast } = useToast();
  
  const storageKey = `quizState_${lessonId}`;

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(storageKey);
      if (savedState) {
        const { quiz, currentQuestionIndex, score, difficultyLevel, isFinished } = JSON.parse(savedState);
        setQuiz(quiz);
        setCurrentQuestionIndex(currentQuestionIndex);
        setScore(score);
        setDifficultyLevel(difficultyLevel);
        setIsFinished(isFinished);
      }
    } catch (error) {
      console.error("Failed to load quiz state:", error);
    }
  }, [storageKey]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      const stateToSave = { quiz, currentQuestionIndex, score, difficultyLevel, isFinished };
      localStorage.setItem(storageKey, JSON.stringify(stateToSave));
    } catch (error) {
      console.error("Failed to save quiz state:", error);
    }
  }, [quiz, currentQuestionIndex, score, difficultyLevel, isFinished, storageKey]);

  const handleGenerateQuiz = async (level: number) => {
    setIsLoading(true);
    setQuiz(null);
    setIsFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswerStatus('unanswered');
    setSelectedAnswer(null);
    setDifficultyLevel(level);

    try {
        let generatedQuestions: QuizQuestion[] = [];
        if (level <= 3 && staticQuizzes) {
            let staticQuestionsForLevel: QuizQuestion[] = [];
            if (level === 1) staticQuestionsForLevel = staticQuizzes.lvl1;
            if (level === 2) staticQuestionsForLevel = staticQuizzes.lvl2;
            if (level === 3) staticQuestionsForLevel = staticQuizzes.lvl3;
            generatedQuestions = staticQuestionsForLevel.map(q => shuffleOptions(q));
        } else {
            const result: GenerateQuizOutput = await generateQuiz(lessonContent, level);
            generatedQuestions = result.quiz.map(q => ({...q, question: q.question}));
        }
        setQuiz(generatedQuestions.filter(q => q && q.options && q.options.length > 0));
    } catch (error) {
        console.error('Failed to generate quiz:', error);
        toast({
            variant: 'destructive',
            title: 'حدث خطأ',
            description: 'لم نتمكن من إنشاء الاختبار. الرجاء المحاولة مرة أخرى.',
        });
        // Reset to initial state on failure
        setQuiz(null);
        localStorage.removeItem(storageKey);
    } finally {
        setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (answerStatus !== 'unanswered') return;
    setSelectedAnswer(answerIndex);
    const isCorrect = quiz![currentQuestionIndex].correctAnswerIndex === answerIndex;
    if (isCorrect) {
      setAnswerStatus('correct');
      setScore((prev) => prev + 1);
    } else {
      setAnswerStatus('incorrect');
    }
  };

  const handleNextQuestion = () => {
    const isLastQuestion = currentQuestionIndex >= quiz!.length - 1;

    if (isLastQuestion) {
        const finalScore = score / quiz!.length;
         // Save the final result
        saveQuizResult({
            lessonId: lessonId,
            score: finalScore,
            difficulty: difficultyLevel,
            timestamp: Date.now(),
        });

        if(finalScore >= 0.8 && difficultyLevel < 5) {
            setDifficultyLevel(prev => prev + 1);
             toast({
                title: 'مستوى الصعوبة ارتفع!',
                description: `رائع! لقد أتقنت هذا المستوى. الاختبار القادم سيكون أكثر تحديًا. المستوى الجديد: ${difficultyLevel + 1}`,
                className: 'bg-green-100 border-green-400 text-green-800'
            });
        }
       setIsFinished(true);
    } else {
       setAnswerStatus('unanswered');
       setSelectedAnswer(null);
       setCurrentQuestionIndex((prev) => prev + 1);
    }
  };
  
  const handleRestartQuiz = () => {
    handleGenerateQuiz(difficultyLevel);
  }

  if (isFinished) {
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle>اكتمل الاختبار!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-lg">
                نتيجتك النهائية هي: <span className="font-bold text-primary">{score}</span> من {quiz?.length}
            </p>
            <div className="flex items-center justify-center gap-2">
                <Progress value={(score / (quiz?.length || 1)) * 100} className="w-1/2" />
                <span>{Math.round((score / (quiz?.length || 1)) * 100)}%</span>
            </div>
        </CardContent>
        <CardFooter className="justify-center">
             <Button onClick={handleRestartQuiz}>
                 <RefreshCw className="ml-2 h-4 w-4" />
                {score / (quiz?.length || 1) >= 0.8 && difficultyLevel < 5 ? `تحدّ جديد (المستوى ${difficultyLevel})` : `إعادة الاختبار (المستوى ${difficultyLevel})`}
            </Button>
        </CardFooter>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground p-8 min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2">جاري إنشاء اختبار مخصص لك...</p>
        <p className="text-sm font-semibold text-accent">مستوى الصعوبة: {difficultyLevel}</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center space-y-3 p-4 rounded-lg bg-muted/50 min-h-[200px] flex flex-col justify-center items-center">
         <div className='flex justify-center items-center gap-1 font-bold text-accent'>
            <Star className='h-5 w-5' />
            <span>مستوى الصعوبة الحالي: {difficultyLevel}</span>
        </div>
        <Button onClick={() => handleGenerateQuiz(difficultyLevel)} size="lg">
          <Sparkles className="ml-2 h-4 w-4" />
          أنشئ اختباري
        </Button>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
            انقر لإنشاء اختبار قصير. تزداد الصعوبة تلقائيًا عند تحقيق نتيجة 80% أو أعلى.
        </p>
      </div>
    );
  }

  const currentQuestion = quiz[currentQuestionIndex];
  
  if (!currentQuestion) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground p-8 min-h-[200px]">
            <p>حدث خطأ في تحميل السؤال.</p>
            <Button onClick={handleRestartQuiz}>أعد المحاولة</Button>
        </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-lg">
            السؤال {currentQuestionIndex + 1} من {quiz.length}
          </CardTitle>
          <div className='flex items-center gap-1 text-sm font-semibold text-accent'>
            <Star className='h-4 w-4' />
            <span>مستوى الصعوبة: {difficultyLevel}</span>
          </div>
        </div>
        <Progress value={((currentQuestionIndex + 1) / quiz.length) * 100} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-lg font-semibold pt-2">{currentQuestion.question}</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {currentQuestion.options.map((option, index) => {
            const isCorrect = index === currentQuestion.correctAnswerIndex;
            const isSelected = selectedAnswer === index;
            
            let buttonClass = 'border-input hover:bg-accent/50';
            if (answerStatus === 'correct' && isSelected) {
              buttonClass = 'border-green-500 bg-green-500/10 text-green-700 hover:bg-green-500/20';
            } else if (answerStatus === 'incorrect' && isSelected) {
              buttonClass = 'border-red-500 bg-red-500/10 text-red-700 hover:bg-red-500/20';
            } else if (answerStatus !== 'unanswered' && isCorrect) {
              buttonClass = 'border-green-500 bg-green-500/10 text-green-700';
            }

            return (
              <Button
                key={index}
                variant="outline"
                className={cn("w-full justify-start text-right h-auto py-2 px-3 text-sm flex items-start", buttonClass)}
                onClick={() => handleAnswerSelect(index)}
                disabled={answerStatus !== 'unanswered'}
              >
                  <span className="ml-3 font-bold">{["أ", "ب", "ج", "د"][index]}</span>
                  <span className="flex-1 whitespace-normal">{option}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>

      {answerStatus !== 'unanswered' && (
         <CardFooter className="flex-col items-stretch gap-4 pt-4">
            <Alert variant={answerStatus === 'correct' ? 'default' : 'destructive'} className={cn(
              answerStatus === 'correct' 
                ? 'border-green-500 bg-green-100/30' 
                : 'border-red-500 bg-red-100/30'
            )}>
                {answerStatus === 'correct' ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                <AlertTitle className="font-bold">
                    {answerStatus === 'correct' ? 'إجابة صحيحة!' : 'إجابة خاطئة!'}
                </AlertTitle>
                <AlertDescription>
                    {currentQuestion.explanation}
                </AlertDescription>
            </Alert>
            <Button onClick={handleNextQuestion} className="w-full">
                {currentQuestionIndex < quiz.length - 1 ? 'السؤال التالي' : 'إنهاء الاختبار'}
            </Button>
         </CardFooter>
      )}
    </Card>
  );
}

    