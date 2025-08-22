
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils.tsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

type AnswerStatus = 'unanswered' | 'correct' | 'incorrect';

const experimentQuiz: QuizQuestion[] = [
    {
        question: "وفقًا لقانون بويل إذا تضاعف الضغط على كمية معينة من الغاز عند درجة حرارة ثابتة فماذا يحدث لحجمه؟",
        options: [
            "يتضاعف",
            "يبقى ثابتًا",
            "يقل إلى النصف",
            "يقل إلى الربع"
        ],
        correctAnswerIndex: 2,
        explanation: "قانون بويل ينص على وجود علاقة عكسية بين الضغط والحجم إذا تضاعف الضغط (P -> 2P) فإن الحجم يجب أن يقل إلى النصف (V -> V/2) للحفاظ على حاصل الضرب ثابتًا (P₁V₁ = P₂V₂)"
    },
    {
        question: "في المحاكاة عندما تقوم بزيادة الضغط من 1 atm إلى 3 atm ماذا تلاحظ على حجم الغاز (V)؟",
        options: [
            "يقل حجمه إلى الثلث تقريبًا",
            "يزداد حجمه ثلاثة أضعاف",
            "لا يتغير الحجم لأن الحرارة ثابتة",
            "يقل حجمه بشكل طفيف فقط"
        ],
        correctAnswerIndex: 0,
        explanation: "العلاقة عكسية ومباشرة زيادة الضغط ثلاث مرات (من 1 إلى 3) تؤدي إلى انخفاض الحجم إلى الثلث (V -> V/3) تمامًا كما هو موضح في قانون بويل"
    },
    {
        question: "أي من العلاقات الرياضية التالية تمثل قانون بويل بشكل صحيح؟ (حيث k ثابت)",
        options: [
            "V = k * P",
            "P / V = k",
            "P * V = k",
            "P + V = k"
        ],
        correctAnswerIndex: 2,
        explanation: "قانون بويل ينص على أن حاصل ضرب الضغط (P) في الحجم (V) لكمية ثابتة من الغاز عند درجة حرارة ثابتة يساوي قيمة ثابتة (k) لذلك المعادلة الصحيحة هي P * V = k أو P₁V₁ = P₂V₂"
    }
];

export default function Quiz() {
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(experimentQuiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('unanswered');
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

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
    if (currentQuestionIndex < quiz!.length - 1) {
       setAnswerStatus('unanswered');
       setSelectedAnswer(null);
       setCurrentQuestionIndex((prev) => prev + 1);
    } else {
       setIsFinished(true);
    }
  };
  
  const handleRestartQuiz = () => {
    setQuiz(experimentQuiz);
    setIsFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswerStatus('unanswered');
    setSelectedAnswer(null);
  }

  if (isFinished) {
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
                <Progress value={(score / (quiz?.length || 1)) * 100} className="w-1/2" />
                <span>{Math.round((score / (quiz?.length || 1)) * 100)}%</span>
            </div>
        </CardContent>
        <CardFooter className="justify-center">
             <Button onClick={handleRestartQuiz}>
                 <RefreshCw className="ml-2 h-4 w-4" />
                إعادة الاختبار
            </Button>
        </CardFooter>
      </Card>
    )
  }

  if (!quiz) {
    return null;
  }

  const currentQuestion = quiz[currentQuestionIndex];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-lg">
            السؤال {currentQuestionIndex + 1} من {quiz.length}
          </CardTitle>
        </div>
        <Progress value={((currentQuestionIndex + 1) / quiz.length) * 100} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg font-semibold pt-2">{currentQuestion.question}</p>

        <div className="grid grid-cols-1 gap-2">
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
                    {answerStatus === 'correct' ? 'إجابة صحيحة' : 'إجابة خاطئة'}
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
