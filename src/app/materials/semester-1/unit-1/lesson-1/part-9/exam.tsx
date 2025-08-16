
import { InlineMath } from 'react-katex';
import React from 'react';


export interface QuizQuestion {
    question: React.ReactNode;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

export const staticQuizLvl1: QuizQuestion[] = [
    {
        "question": "تتفق العبارة \"يمكن حساب الضغط الكلي لخليط من الغازات باستخدام العدد الكلي لمولات غازات الخليط\" مع:",
        "options": [
            "قانون جراهام",
            "قانون جاي لوساك",
            "القانون الجامع",
            "قانون دالتون"
        ],
        "correctAnswerIndex": 3,
        "explanation": "قانون دالتون والغاز المثالي يوضحان أن الضغط الكلي يعتمد على العدد الكلي للمولات (P_total = n_total * RT/V)، بغض النظر عن أنواع الغازات."
    },
    {
        question: <span>الضغط الجزئي لغاز في خليط يعتمد على:</span>,
        "options": [
            "حجمه فقط",
            "الكسر المولي له والضغط الكلي",
            "نوع الغاز فقط",
            "درجة حرارته فقط"
        ],
        "correctAnswerIndex": 1,
        "explanation": "الضغط الجزئي لغاز (P_A) يساوي حاصل ضرب الكسر المولي له (X_A) في الضغط الكلي للخليط (P_Total). P_A = X_A * P_Total."
    },
    {
        question: <span>في خليط من غازي النيتروجين والأكسجين، إذا كان الضغط الجزئي للنيتروجين <InlineMath math="0.8\text{atm}" /> والضغط الجزئي للأكسجين <InlineMath math="0.2\text{atm}" />، فما هو الضغط الكلي للخليط؟</span>,
        "options": [
            "0.6atm",
            "1.0atm",
            "0.16atm",
            "لا يمكن تحديده"
        ],
        "correctAnswerIndex": 1,
        "explanation": "وفقًا لقانون دالتون، الضغط الكلي هو مجموع الضغوط الجزئية. P_Total = P_Nitrogen + P_Oxygen = 0.8 + 0.2 = 1.0atm."
    },
     {
        question: <span>إذا خلط <InlineMath math="1.5\text{L}" /> من غاز A ضغطه <InlineMath math="0.5\text{atm}" /> مع <InlineMath math="3\text{L}" /> من غاز B ضغطه <InlineMath math="0.25\text{atm}" /> في وعاء حجمه <InlineMath math="1\text{L}" /> فإن الضغط الكلي للخليط بوحدة atm عند نفس درجة الحرارة يساوي:</span>,
        "options": [
            "0.75atm",
            "1.5atm",
            "0.3atm",
            "3.0atm"
        ],
        "correctAnswerIndex": 1,
        "explanation": "أولاً، نحسب الضغط الجزئي لكل غاز في الوعاء الجديد (1L) باستخدام قانون بويل. P_A = (0.5*1.5)/1 = 0.75atm. P_B = (0.25*3)/1 = 0.75atm. الضغط الكلي P_total = P_A + P_B = 0.75 + 0.75 = 1.5atm."
    },
    {
        question: <span>من السؤال السابق، فإن الضغط الكلي للخليط عند نفس درجة الحرارة يساوي:</span>,
        "options": [
            "1.5kPa",
            "1atm",
            "100kPa",
            "1140mmHg"
        ],
        "correctAnswerIndex": 3,
        "explanation": "الضغط الكلي هو 1.5atm. للتحويل إلى mmHg نضرب في 760: 1.5 * 760 = 1140mmHg."
    }
];
export const staticQuizLvl2: QuizQuestion[] = [
    {
        question: <span>يحتوي وعاء حجمه <InlineMath math="1.5\text{L}" /> غازين A, B عند حرارة <InlineMath math="10^\circ \text{C}" /> حيث يشكل الغاز B 70%. إذا كان ضغط الوعاء يساوي <InlineMath math="2.5\text{atm}" /> فإن عدد مولات الغاز A تساوي:</span>,
        "options": [
            "1.4",
            "0.11",
            "0.16",
            "0.05"
        ],
        "correctAnswerIndex": 3,
        "explanation": "الضغط الجزئي لـ A هو P_A = (1-0.7) * 2.5 = 0.75atm. الحرارة T = 10+273=283K. عدد مولات A هو n_A = (P_A*V)/(R*T) = (0.75*1.5)/(0.082*283) ≈ 0.05mol."
    },
    {
        question: <span>من السؤال السابق، إذا كانت كتلة الغاز B تساوي <InlineMath math="3.4\text{g}" /> فإن الكتلة المولية للغاز B تساوي:</span>,
        "options": [
            "70",
            "30",
            "35",
            "21"
        ],
        "correctAnswerIndex": 1,
        "explanation": "P_B = 0.7 * 2.5 = 1.75atm. n_B = (P_B*V)/(R*T) = (1.75*1.5)/(0.082*283) ≈ 0.113mol. الكتلة المولية Mr = m/n = 3.4g / 0.113mol ≈ 30 g/mol."
    },
     {
        question: <span>إذا خلط <InlineMath math="1\text{mol}" /> من الغاز A ضغطه <InlineMath math="1\text{atm}" /> وحجمه <InlineMath math="1\text{L}" /> مع <InlineMath math="1\text{mol}" /> من الغاز B ضغطه <InlineMath math="1\text{atm}" /> وحجمه <InlineMath math="1\text{L}" /> في وعاء حجمه <InlineMath math="1\text{L}" /> فحدث التفاعل <span dir="ltr" className="inline-block"><InlineMath math="A(g) + B(g) \rightarrow C(g)" /></span> فإن الضغط الكلي بعد انتهاء التفاعل:</span>,
        "options": [
            "2atm",
            "4atm",
            "3atm",
            "1atm"
        ],
        "correctAnswerIndex": 3,
        "explanation": "النسبة المولية للمتفاعلات هي 1:1 والكميات متساوية (1mol لكل منهما)، لذا يتفاعلان تمامًا. يتكون 1mol من الناتج C. بما أن الظروف لم تتغير والضغط يعتمد على عدد المولات، والعدد الكلي للمولات الناتجة هو 1، فسيكون الضغط النهائي هو ضغط 1mol من الغاز في الظروف نفسها، وهو 1atm. (بافتراض أن درجة الحرارة ثابتة)."
    },
    {
        question: <span>إذا خلط <InlineMath math="1\text{mol}" /> من الغاز A ضغطه <InlineMath math="1\text{atm}" /> وحجمه <InlineMath math="1\text{L}" /> مع <InlineMath math="1\text{mol}" /> من الغاز B ضغطه <InlineMath math="1\text{atm}" /> وحجمه <InlineMath math="1\text{L}" /> في وعاء حجمه <InlineMath math="1\text{L}" /> فحدث التفاعل <span dir="ltr" className="inline-block"><InlineMath math="A(g) + B(g) \rightarrow 3C(g)" /></span> فإن الضغط الكلي بعد انتهاء التفاعل:</span>,
        "options": [
            "2atm",
            "4atm",
            "3atm",
            "1atm"
        ],
        "correctAnswerIndex": 2,
        "explanation": "يتفاعل 1mol من A مع 1mol من B لإنتاج 3mol من C. بما أن الضغط يتناسب طرديًا مع عدد المولات، والعدد الكلي للمولات أصبح 3، فإن الضغط الكلي سيصبح 3atm."
    },
    {
        question: <span>إذا خلط <InlineMath math="1\text{mol}" /> من الغاز A ضغطه <InlineMath math="1\text{atm}" /> وحجمه <InlineMath math="1\text{L}" /> مع <InlineMath math="1\text{mol}" /> من الغاز B ضغطه <InlineMath math="1\text{atm}" /> وحجمه <InlineMath math="1\text{L}" /> في وعاء حجمه <InlineMath math="1\text{L}" /> فحدث التفاعل <span dir="ltr" className="inline-block"><InlineMath math="A(g) + 2B(g) \rightarrow 3C(g)" /></span> فإن الضغط الكلي بعد انتهاء التفاعل:</span>,
        "options": [
            "2atm",
            "4atm",
            "3atm",
            "1atm"
        ],
        "correctAnswerIndex": 0,
        "explanation": "المادة المحددة للتفاعل هي B (نحتاج 2mol ولدينا 1mol فقط). سيتفاعل 0.5mol من A مع 1mol من B، وينتج 1.5mol من C. سيتبقى 0.5mol من A. العدد الكلي للمولات النهائية = 1.5(C) + 0.5(A) = 2mol. إذن الضغط النهائي سيكون 2atm."
    }
];

export const staticQuizLvl3: QuizQuestion[] = [
    {
        question: <span>إذا خلط <InlineMath math="0.5\text{L}" /> من غاز A ضغطه <InlineMath math="300\text{mmHg}" /> درجة حرارته <InlineMath math="300\text{K}" /> مع <InlineMath math="0.43\text{L}" /> من غاز B له نفس الحرارة ضغطه <InlineMath math="350\text{mmHg}" /> فكان الضغط الكلي للخليط داخل الوعاء W يساوي <InlineMath math="500\text{mmHg}" /> عند نفس درجة الحرارة. أجب عن الأسئلة الخمسة الآتية: <br/> 1) عدد مولات الغاز A:</span>,
        "options": [
            "0.016mol",
            "0.008mol",
            "0.004mol",
            "0.032mol"
        ],
        "correctAnswerIndex": 1,
        "explanation": "P_A = 300/760 atm. n_A = PV/RT = ((300/760) * 0.5) / (0.082 * 300) ≈ 0.008mol."
    },
    {
        question: <span>إذا خلط <InlineMath math="0.5\text{L}" /> من غاز A ضغطه <InlineMath math="300\text{mmHg}" /> درجة حرارته <InlineMath math="300\text{K}" /> مع <InlineMath math="0.43\text{L}" /> من غاز B له نفس الحرارة ضغطه <InlineMath math="350\text{mmHg}" /> فكان الضغط الكلي للخليط داخل الوعاء W يساوي <InlineMath math="500\text{mmHg}" /> عند نفس درجة الحرارة. <br/> 2) عدد مولات الغاز B:</span>,
        "options": [
            "0.008mol",
            "0.016mol",
            "0.004mol",
            "0.032mol"
        ],
        "correctAnswerIndex": 0,
        "explanation": "P_B = 350/760 atm. n_B = PV/RT = ((350/760) * 0.43) / (0.082 * 300) ≈ 0.008mol."
    },
    {
        question: <span>إذا خلط <InlineMath math="0.5\text{L}" /> من غاز A ضغطه <InlineMath math="300\text{mmHg}" /> درجة حرارته <InlineMath math="300\text{K}" /> مع <InlineMath math="0.43\text{L}" /> من غاز B له نفس الحرارة ضغطه <InlineMath math="350\text{mmHg}" /> فكان الضغط الكلي للخليط داخل الوعاء W يساوي <InlineMath math="500\text{mmHg}" /> عند نفس درجة الحرارة. <br/> 3) حجم الوعاء W بوحدة L:</span>,
        "options": [
            "0.004L",
            "0.1L",
            "0.6L",
            "0.032L"
        ],
        "correctAnswerIndex": 2,
        "explanation": "n_total = n_A + n_B = 0.008 + 0.008 = 0.016mol. P_total = 500/760 atm. V = nRT/P = (0.016 * 0.082 * 300) / (500/760) ≈ 0.6L."
    },
     {
        question: <span>إذا خلط <InlineMath math="0.5\text{L}" /> من غاز A ضغطه <InlineMath math="300\text{mmHg}" /> درجة حرارته <InlineMath math="300\text{K}" /> مع <InlineMath math="0.43\text{L}" /> من غاز B له نفس الحرارة ضغطه <InlineMath math="350\text{mmHg}" /> فكان الضغط الكلي للخليط داخل الوعاء W يساوي <InlineMath math="500\text{mmHg}" /> عند نفس درجة الحرارة. <br/> 4) ضغط الغاز B في الوعاء W بوحدة mmHg:</span>,
        "options": [
            "500mmHg",
            "350mmHg",
            "300mmHg",
            "250mmHg"
        ],
        "correctAnswerIndex": 3,
        "explanation": "الكسر المولي لـ B هو X_B = n_B / n_total = 0.008 / 0.016 = 0.5. الضغط الجزئي لـ B هو P_B = X_B * P_total = 0.5 * 500mmHg = 250mmHg."
    },
     {
        question: <span>إذا خلط <InlineMath math="0.5\text{L}" /> من غاز A ضغطه <InlineMath math="300\text{mmHg}" /> درجة حرارته <InlineMath math="300\text{K}" /> مع <InlineMath math="0.43\text{L}" /> من غاز B له نفس الحرارة ضغطه <InlineMath math="350\text{mmHg}" /> فكان الضغط الكلي للخليط داخل الوعاء W يساوي <InlineMath math="500\text{mmHg}" /> عند نفس درجة الحرارة. <br/> 5) الضغط الكلي للخليط عند درجة حرارة <InlineMath math='100^\circ C' /> بوحدة atm:</span>,
        "options": [
            "620atm",
            "0.82atm",
            "2.6atm",
            "6.2atm"
        ],
        "correctAnswerIndex": 1,
        "explanation": "نستخدم القانون الجامع. P₁=500mmHg, T₁=300K, T₂=100+273=373K. P₂ = P₁T₂/T₁ = (500 * 373) / 300 ≈ 621.7 mmHg. نحول إلى atm: 621.7 / 760 ≈ 0.82atm."
    }
];
