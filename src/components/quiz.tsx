
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { generateQuiz } from '@/ai/flows/generate-quiz-flow';
import { Loader2, CheckCircle, XCircle, Star, Sparkles, RefreshCw, Clock, Eye } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils.tsx';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { useApp } from '@/context/CurriculumContext';
import { saveUserQuizResult, getUserQuizState, saveUserQuizState, clearUserQuizState } from '@/lib/firebase/progress.actions';

// This is the universal QuizQuestion interface
export interface QuizQuestion {
    question: React.ReactNode;
    options: React.ReactNode[];
    correctAnswerIndex: number;
    explanation: string;
}

// Interface for a single quiz result to be stored
export interface QuizResult {
  lessonId: string;
  score: number; // 0 to 1
  difficulty: number;
  timestamp: number;
  studentId: string;
  timeTaken?: number; // Optional: total time in seconds
  questionCount?: number; // Optional: number of questions in the quiz
}

// The props for our new central quiz component
interface QuizProps {
  lessonContent: string;
  staticQuizzes: {
    lvl1: QuizQuestion[];
    lvl2: QuizQuestion[];
    lvl3: QuizQuestion[];
  };
  lessonId: string; // Unique ID for the lesson to manage state
}

type AnswerStatus = 'unanswered' | 'correct' | 'incorrect';

// Helper function to shuffle an array (Fisher-Yates shuffle)
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};


// Helper function to shuffle an array and return the new index of the correct answer
const shuffleOptions = (question: QuizQuestion): QuizQuestion => {
    // Avoid shuffling for specific simple option types that depend on order
    if (question.options.every(opt => typeof opt === 'string' && (opt.length <= 3 || opt.startsWith("أقرب") || opt.startsWith("في منتصف")))) {
        return question;
    }
    const correctAnswerValue = question.options[question.correctAnswerIndex];
    const shuffledOptions = shuffleArray(question.options);
    const newCorrectAnswerIndex = shuffledOptions.findIndex(opt => opt === correctAnswerValue);
    return { ...question, options: shuffledOptions, correctAnswerIndex: newCorrectAnswerIndex };
};

export default function Quiz({ lessonContent, staticQuizzes, lessonId }: QuizProps) {
  const { currentUser } = useApp();
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('unanswered');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const { toast } = useToast();
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [isReviewing, setIsReviewing] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [initialTime, setInitialTime] = useState<number | null>(null);
  
  // Load state from Firestore on mount
  useEffect(() => {
    const loadState = async () => {
        if (!currentUser) return;
        try {
            const savedState = await getUserQuizState(currentUser.uid, lessonId);
            if (savedState && savedState.quiz && savedState.quiz[savedState.currentQuestionIndex]) {
                const { quiz, currentQuestionIndex, score, difficultyLevel, isFinished, answerStatus, selectedAnswer, userAnswers, timeLeft, initialTime } = savedState;
                setQuiz(quiz);
                setCurrentQuestionIndex(currentQuestionIndex);
                setScore(score);
                setDifficultyLevel(difficultyLevel);
                setIsFinished(isFinished);
                setAnswerStatus(answerStatus || 'unanswered');
                setSelectedAnswer(selectedAnswer || null);
                setUserAnswers(userAnswers || []);
                setTimeLeft(timeLeft !== undefined ? timeLeft : null);
                setInitialTime(initialTime !== undefined ? initialTime : null);
            } else if (savedState) {
                // If state exists but is invalid (e.g., question out of bounds), clear it.
                console.warn("Corrupted quiz state detected. Resetting quiz.", { lessonId });
                await clearUserQuizState(currentUser.uid, lessonId);
            }
        } catch (error) {
            console.error("Error loading quiz state, resetting.", error);
            if(currentUser) {
                await clearUserQuizState(currentUser.uid, lessonId);
            }
        }
    };
    loadState();
  }, [currentUser, lessonId]);

  // Save state to Firestore whenever it changes
  useEffect(() => {
    const saveState = async () => {
        if (!currentUser || !quiz || isLoading) return;
        const stateToSave = { quiz, currentQuestionIndex, score, difficultyLevel, isFinished, answerStatus, selectedAnswer, userAnswers, timeLeft, initialTime };
        await saveUserQuizState(currentUser.uid, lessonId, stateToSave);
    };
    saveState();
  }, [quiz, currentQuestionIndex, score, difficultyLevel, isFinished, lessonId, answerStatus, selectedAnswer, isLoading, userAnswers, timeLeft, initialTime, currentUser]);
  
  // Timer effect
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || isFinished) {
      if (timeLeft === 0) {
        handleNextQuestion(true); // Force finish when time is up
      }
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, isFinished]);


  const handleGenerateQuiz = async (level: number) => {
    setIsLoading(true);
    // Clear all state before generating a new one
    setQuiz(null);
    setIsFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswerStatus('unanswered');
    setSelectedAnswer(null);
    setDifficultyLevel(level);
    setUserAnswers([]);
    setIsReviewing(false);
    setTimeLeft(null);
    setInitialTime(null);

    // Immediately clear Firestore state for the new quiz
    if (currentUser) {
        await clearUserQuizState(currentUser.uid, lessonId);
    }
    
    try {
        let generatedQuestions: QuizQuestion[] = [];
        if (level <= 3 && staticQuizzes) {
            let questionPool: QuizQuestion[] = [];
            if (level === 1) questionPool = staticQuizzes.lvl1;
            if (level === 2) questionPool = staticQuizzes.lvl2;
            if (level === 3) questionPool = staticQuizzes.lvl3;
            
            const shuffledPool = shuffleArray(questionPool);
            // If pool has fewer than 5 questions, use all of them. Otherwise, take 5.
            const questionsToTake = Math.min(shuffledPool.length, 5);
            const selectedQuestions = shuffledPool.slice(0, questionsToTake);

            // Shuffle options for each selected question
            generatedQuestions = selectedQuestions.map(q => shuffleOptions(q));
            
            const quizTime = generatedQuestions.length * 60; // 1 minute per question
            setTimeLeft(quizTime);
            setInitialTime(quizTime);

        } else {
            // This case should no longer be reached from the UI
            toast({
                variant: 'destructive',
                title: 'خطأ',
                description: 'مستوى الصعوبة المطلوب غير متوفر.',
            });
            setIsLoading(false);
            return;
        }
        setQuiz(generatedQuestions.filter(q => q && q.options && q.options.length > 0));
    } catch (error) {
        console.error('Failed to generate quiz:', error);
        toast({
            variant: 'destructive',
            title: 'حدث خطأ',
            description: 'لم نتمكن من إنشاء الاختبار الرجاء المحاولة مرة أخرى',
        });
        // Reset to initial state on failure
        setQuiz(null);
    } finally {
        setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (answerStatus !== 'unanswered') return;
    
    // Record the user's answer
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);

    setSelectedAnswer(answerIndex);
    const isCorrect = quiz![currentQuestionIndex].correctAnswerIndex === answerIndex;
    if (isCorrect) {
      setAnswerStatus('correct');
      setScore((prev) => prev + 1);
    } else {
      setAnswerStatus('incorrect');
    }
  };

  const handleNextQuestion = async (forceFinish = false) => {
    const isLastQuestion = currentQuestionIndex >= quiz!.length - 1;

    if (isLastQuestion || forceFinish) {
        setIsFinished(true);
        setTimeLeft(null); // Stop the timer

        // Attempt to save the result, but don't let it block the UI
        try {
            const finalScore = score / quiz!.length;
            if (currentUser) {
                const timeTaken = initialTime !== null && timeLeft !== null ? initialTime - timeLeft : undefined;
                const resultToSave: QuizResult = {
                    lessonId: lessonId,
                    score: finalScore,
                    difficulty: difficultyLevel,
                    timestamp: Date.now(),
                    studentId: currentUser.uid,
                    timeTaken: timeTaken,
                    questionCount: quiz?.length,
                };
                await saveUserQuizResult(currentUser.uid, resultToSave);
            }
        } catch (error) {
            console.error("Failed to save quiz result:", error);
            // Optionally, show a non-blocking toast to the user
            toast({
                variant: 'destructive',
                title: 'فشل المزامنة',
                description: 'لم نتمكن من حفظ نتيجتك، ولكن يمكنك رؤيتها الآن.'
            });
        }
    } else {
       setAnswerStatus('unanswered');
       setSelectedAnswer(null);
       setCurrentQuestionIndex((prev) => prev + 1);
    }
  };
  
  const handleRestartQuiz = () => {
    const finalScore = score / (quiz?.length || 1);
    const passed = finalScore >= 0.8;
    
    let nextLevel = difficultyLevel;
    if (passed && difficultyLevel < 3) { // Cap level at 3
      nextLevel = difficultyLevel + 1;
      toast({
          title: 'مستوى الصعوبة ارتفع',
          description: `رائع لقد أتقنت هذا المستوى الاختبار القادم سيكون أكثر تحديًا المستوى الجديد ${nextLevel}`,
          className: 'bg-green-100 border-green-400 text-green-800'
      });
    }

    handleGenerateQuiz(nextLevel);
  }
  
  const handleStartOver = async () => {
      // Completely reset state and clear storage
      if (currentUser) {
        await clearUserQuizState(currentUser.uid, lessonId);
      }
      setQuiz(null);
      setIsFinished(false);
      setCurrentQuestionIndex(0);
      setScore(0);
      setAnswerStatus('unanswered');
      setSelectedAnswer(null);
      setDifficultyLevel(1);
      setTimeLeft(null);
      setInitialTime(null);
      setIsReviewing(false);
  }

  const formatTime = (seconds: number | null) => {
      if (seconds === null) return "00:00";
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (isReviewing) {
    return (
      <Card>
        <CardHeader>
            <CardTitle>مراجعة الإجابات</CardTitle>
            <CardDescription>هنا يمكنك مراجعة أدائك في الاختبار الأخير.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {quiz?.map((q, qIndex) => (
            <div key={qIndex} className="p-4 border rounded-lg">
              <p className="font-bold mb-2">السؤال {qIndex + 1}: {q.question}</p>
              <div className="space-y-2">
                {q.options.map((option, oIndex) => {
                  const isCorrect = oIndex === q.correctAnswerIndex;
                  const isUserAnswer = userAnswers[qIndex] === oIndex;
                  return (
                    <div
                      key={oIndex}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded text-sm",
                        isCorrect ? "bg-green-100/60" : isUserAnswer ? "bg-red-100/60" : "bg-muted/50"
                      )}
                    >
                      {isCorrect ? <CheckCircle className="h-4 w-4 text-green-600" /> : isUserAnswer ? <XCircle className="h-4 w-4 text-red-600" /> : <div className="h-4 w-4" />}
                      <span>{option}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-2 border-t pt-2">
                <span className="font-bold">الشرح:</span> {q.explanation}
              </p>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsReviewing(false)}>العودة لنتيجة الاختبار</Button>
        </CardFooter>
      </Card>
    );
  }

  if (isFinished) {
    const finalScoreRatio = score / (quiz?.length || 1);
    const passed = finalScoreRatio >= 0.8;
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle>اكتمل الاختبار</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-lg">
                نتيجتك النهائية هي <span className="font-bold text-primary">{score}</span> من {quiz?.length}
            </p>
            <div className="flex items-center justify-center gap-2">
                <Progress value={finalScoreRatio * 100} className="w-1/2" />
                <span>{Math.round(finalScoreRatio * 100)}%</span>
            </div>
        </CardContent>
        <CardFooter className="justify-center flex-wrap gap-2">
             <Button onClick={handleRestartQuiz}>
                 <RefreshCw className="ml-2 h-4 w-4" />
                {passed && difficultyLevel < 3 ? `تحدّ جديد (المستوى ${difficultyLevel + 1})` : `إعادة الاختبار (المستوى ${difficultyLevel})`}
            </Button>
            <Button onClick={() => setIsReviewing(true)} variant="secondary">
              <Eye className="ml-2 h-4 w-4" />
              مراجعة الإجابات
            </Button>
            <Button onClick={handleStartOver} variant="outline">
                البدء من جديد
            </Button>
        </CardFooter>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground p-8 min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2">جاري إنشاء اختبار مخصص لك</p>
        <p className="text-sm font-semibold text-accent">مستوى الصعوبة {difficultyLevel}</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center space-y-3 p-4 rounded-lg bg-muted/50 min-h-[200px] flex flex-col justify-center items-center">
         <div className='flex justify-center items-center gap-1 font-bold text-accent'>
            <Star className='h-5 w-5' />
            <span>مستوى الصعوبة الحالي {difficultyLevel}</span>
        </div>
        <Button onClick={() => handleGenerateQuiz(difficultyLevel)} size="lg">
          <Sparkles className="ml-2 h-4 w-4" />
          أنشئ اختباري
        </Button>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
            انقر لإنشاء اختبار قصير تزداد الصعوبة تلقائيًا عند تحقيق نتيجة 80% أو أعلى
        </p>
      </div>
    );
  }

  const currentQuestion = quiz[currentQuestionIndex];
  
  if (!currentQuestion) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground p-8 min-h-[200px]">
            <p>حدث خطأ في تحميل السؤال</p>
            <Button onClick={handleRestartQuiz}>أعد المحاولة</Button>
        </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <CardTitle className="text-lg">
            السؤال {currentQuestionIndex + 1} من {quiz.length}
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className='flex items-center gap-1 text-sm font-semibold text-accent'>
              <Star className='h-4 w-4' />
              <span>مستوى {difficultyLevel}</span>
            </div>
             {timeLeft !== null && (
              <div className={cn("flex items-center gap-1 text-sm font-semibold font-mono", timeLeft <= 30 && "text-destructive")}>
                <Clock className="h-4 w-4" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
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
              // Highlight the correct answer if a wrong one was chosen
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
                  <div className="flex-1 whitespace-normal">{option}</div>
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
                    {answerStatus === 'correct' ? 'إجابة صحيحة' : 'إجابة خاطئة'}
                </AlertTitle>
                <AlertDescription>
                    {currentQuestion.explanation}
                </AlertDescription>
            </Alert>
            <div className="flex gap-2">
                <Button onClick={() => handleNextQuestion()} className="w-full">
                    {currentQuestionIndex < quiz.length - 1 ? 'السؤال التالي' : 'إنهاء الاختبار'}
                </Button>
            </div>
         </CardFooter>
      )}
    </Card>
  );
}
