import React from 'react';
import Image from 'next/image';

export interface QuizQuestion {
    question: React.ReactNode;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

export const staticQuizLvl1: QuizQuestion[] = [];
export const staticQuizLvl2: QuizQuestion[] = [
    {
        question: (
            <div className="space-y-4">
                <p>اعتمادا على الرسم المجاور فإن الرمز الذي يمثل السائل الذي له أضعف قوى تجاذب هو:</p>
                 <div className="flex justify-center">
                    <Image
                        src="https://i.ibb.co/TB6RcQkw/22.png"
                        alt="Vapor Pressure vs Temperature"
                        width={400}
                        height={250}
                        className="rounded-lg border bg-white"
                        data-ai-hint="vapor pressure curve"
                    />
                </div>
            </div>
        ),
        options: ["A", "M", "B", "Q"],
        correctAnswerIndex: 0,
        explanation: "أضعف قوى تجاذب تعني أن السائل يتبخر بسهولة أكبر، وبالتالي يمتلك أعلى ضغط بخاري عند درجة حرارة معينة. المنحنى A يمثل السائل الذي له أعلى ضغط بخاري، لذا قوى التجاذب بين جزيئاته هي الأضعف."
    }
];
export const staticQuizLvl3: QuizQuestion[] = [];
