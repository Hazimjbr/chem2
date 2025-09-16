'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { generateQuiz, GenerateQuizOutput } from '@/ai/flows/generate-quiz-flow';
import { Loader2, CheckCircle, XCircle, Star, Sparkles, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils.tsx';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { User as FirebaseUser } from 'firebase/auth';
import { useApp } from '@/context/CurriculumContext';
import { saveUserQuizResult, saveUserQuizState, getUserQuizState, clearUserQuizState, markLessonAsComplete } from '@/lib/firebase/progress.actions';
import { useEffect } from 'react';
import { InlineMath } from 'react-katex';


export interface QuizQuestion {
    question: React.ReactNode;
    options: (string | React.ReactNode)[];
    correctAnswerIndex: number;
    explanation: string | React.ReactNode;
}

export interface QuizResult {
    lessonId: string;
    score: number;
    difficulty: number;
    timestamp: number;
    studentId: string;
    timeTaken?: number;
    questionCount?: number;
}

interface QuizProps {
  lessonContent: string;
  staticQuizzes: {
    lvl1: QuizQuestion[];
    lvl2: QuizQuestion[];
    lvl3: QuizQuestion[];
  };
  lessonId: string;
}

type AnswerStatus = 'unanswered' | 'correct' | 'incorrect';

interface QuizState {
    quiz: QuizQuestion[] | null;
    currentQuestionIndex: number;
    selectedAnswer: number | null;
    answerStatus: AnswerStatus;
    score: number;
    isFinished: boolean;
    difficultyLevel: number;
    startTime: number | null;
}

const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};


const shuffleOptions = (question: QuizQuestion): QuizQuestion => {
    const correctAnswerValue = question.options[question.correctAnswerIndex];
    const shuffledOptions = shuffleArray(question.options);
    const newCorrectAnswerIndex = shuffledOptions.findIndex(opt => opt === correctAnswerValue);
    return { ...question, options: shuffledOptions, correctAnswerIndex: newCorrectAnswerIndex };
};


const getStaticQuestionsForLevel = (level: number, staticQuizzes: QuizProps['staticQuizzes']) => {
    let questions: QuizQuestion[] = [];
    if (level === 1) questions = staticQuizzes.lvl1;
    else if (level === 2) questions = staticQuizzes.lvl2;
    else if (level === 3) questions = staticQuizzes.lvl3;
    
    // Shuffle the array of questions first
    const shuffledQuestions = shuffleArray(questions);
    
    // Take the first 5 and shuffle their options
    return shuffledQuestions.slice(0, 5).map(q => shuffleOptions(q));
}


export default function Quiz({ lessonContent, staticQuizzes, lessonId }: QuizProps) {
  const { currentUser } = useApp();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>({
    quiz: null,
    currentQuestionIndex: 0,
    selectedAnswer: null,
    answerStatus: 'unanswered',
    score: 0,
    isFinished: false,
    difficultyLevel: 1,
    startTime: null,
  });
  
  useEffect(() => {
    if (!currentUser || !lessonId) return;

    const loadState = async () => {
        setIsLoading(true);
        const savedState = await getUserQuizState(currentUser.uid, lessonId);
        if (savedState) {
            setQuizState(savedState);
        }
        setIsLoading(false);
    };

    loadState();
  }, [currentUser, lessonId]);


  useEffect(() => {
    if (currentUser && lessonId && !isLoading) {
        saveUserQuizState(currentUser.uid, lessonId, quizState);
    }
  }, [quizState, currentUser, lessonId, isLoading]);


  const handleGenerateQuiz = async (level: number) => {
    setIsLoading(true);
    const newStartTime = Date.now();

    try {
        let questions: QuizQuestion[] = [];
        const staticQs = getStaticQuestionsForLevel(level, staticQuizzes);

        if (staticQs && staticQs.length > 0) {
            questions = staticQs;
        } else {
            const result: GenerateQuizOutput = await generateQuiz(lessonContent, level);
            questions = result.quiz.map(q => shuffleOptions(q));
        }

        setQuizState({
            quiz: questions,
            isFinished: false,
            currentQuestionIndex: 0,
            score: 0,
            answerStatus: 'unanswered',
            selectedAnswer: null,
            difficultyLevel: level,
            startTime: newStartTime,
        });

    } catch (error) {
        console.error('Failed to generate quiz:', error);
        toast({
            variant: 'destructive',
            title: 'حدث خطأ',
            description: 'لم نتمكن من إنشاء الاختبار. الرجاء المحاولة مرة أخرى.',
        });
    } finally {
        setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizState.answerStatus !== 'unanswered') return;

    const isCorrect = quizState.quiz![quizState.currentQuestionIndex].correctAnswerIndex === answerIndex;

    setQuizState(prev => ({
        ...prev,
        selectedAnswer: answerIndex,
        answerStatus: isCorrect ? 'correct' : 'incorrect',
        score: isCorrect ? prev.score + 1 : prev.score,
    }));
  };

  const handleNextQuestion = async () => {
    if (quizState.quiz && quizState.currentQuestionIndex < quizState.quiz.length - 1) {
       setQuizState(prev => ({
           ...prev,
           answerStatus: 'unanswered',
           selectedAnswer: null,
           currentQuestionIndex: prev.currentQuestionIndex + 1,
       }));
    } else {
        const finalScore = quizState.score / (quizState.quiz?.length || 1);
        
        if (currentUser) {
            const timeTaken = quizState.startTime ? (Date.now() - quizState.startTime) / 1000 : undefined;
            const result: QuizResult = {
                lessonId,
                score: finalScore,
                difficulty: quizState.difficultyLevel,
                timestamp: Date.now(),
                studentId: currentUser.uid,
                timeTaken: timeTaken,
                questionCount: quizState.quiz?.length || 0,
            };
            await saveUserQuizResult(currentUser.uid, result);
        }

        if(finalScore >= 0.8) {
            if (currentUser) {
                await markLessonAsComplete(currentUser.uid, lessonId);
            }
             toast({
                title: 'مستوى متقن!',
                description: `رائع! لقد أتقنت هذا المستوى. يمكنك الآن الانتقال للمستوى التالي أو إعادة نفس المستوى.`,
                className: 'bg-green-100 border-green-400 text-green-800'
            });
        }
       setQuizState(prev => ({ ...prev, isFinished: true }));
       if (currentUser) {
         await clearUserQuizState(currentUser.uid, lessonId);
       }
    }
  };
  
  const handleRestartQuiz = () => {
     let nextLevel = quizState.difficultyLevel;
     if (quizState.score / (quizState.quiz?.length || 1) >= 0.8 && quizState.difficultyLevel < 5) {
         nextLevel++;
     }
     handleGenerateQuiz(nextLevel);
  }

  const { quiz, isFinished, currentQuestionIndex, score, answerStatus, selectedAnswer, difficultyLevel } = quizState;

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
                {score / (quiz?.length || 1) >= 0.8 && difficultyLevel < 5 ? `تحدّ جديد (المستوى ${difficultyLevel + 1})` : `إعادة الاختبار (المستوى ${difficultyLevel})`}
            </Button>
        </CardFooter>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground p-8 min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2">جاري تحميل الاختبار...</p>
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
            انقر لإنشاء اختبار قصير. يزداد مستوى الصعوبة تلقائيًا عند تحقيق نتيجة 80% أو أعلى.
        </p>
      </div>
    );
  }

  const currentQuestion = quiz[currentQuestionIndex];

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
                  <div className="flex-1 whitespace-normal text-right">{typeof option === 'string' ? option.split(" ").map((word, i) => <span key={i} className="inline-block">{word}&nbsp;</span>) : option}</div>
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
