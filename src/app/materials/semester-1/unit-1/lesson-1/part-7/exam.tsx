
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
        "question": "أي من العبارات التالية تصف قانون أفوجادرو بشكل صحيح",
        "options": [
            "يتناسب حجم الغاز عكسيًا مع عدد مولاته",
            "يتناسب حجم الغاز طرديًا مع درجة حرارته",
            "يتناسب حجم الغاز طرديًا مع عدد مولاته عند ثبات الضغط والحرارة",
            "تتناسب الحجوم المتساوية من الغازات مع كتلها"
        ],
        "correctAnswerIndex": 2,
        "explanation": "قانون أفوجادرو ينص على أن حجم الغاز يتناسب طرديًا مع عدد مولاته (كميته) بشرط ثبات الضغط ودرجة الحرارة"
    },
    {
        question: <>ما هو حجم <InlineMath math="1\text{mol}" /> من أي غاز مثالي في الظروف المعيارية (STP)?</>,
        "options": [
            "1L",
            "22.4L",
            "100L",
            "يعتمد على نوع الغاز"
        ],
        "correctAnswerIndex": 1,
        "explanation": "الحجم المولي لأي غاز مثالي في الظروف المعيارية (0°C و 1 atm) هو قيمة ثابتة وتساوي 22.4 لتر"
    },
    {
        "question": "أي من العينات التالية تحتوي على أكبر عدد من الجزيئات عند نفس الظروف من الضغط والحرارة",
        "options": [
            "1L من H₂",
            "1L من O₂",
            "1L من CO₂",
            "جميعها تحتوي على نفس العدد من الجزيئات"
        ],
        "correctAnswerIndex": 3,
        "explanation": "وفقًا لمبدأ أفوجادرو فإن الحجوم المتساوية من الغازات المختلفة عند نفس الظروف تحتوي على نفس العدد من الجزيئات (أو المولات)"
    }
];

export const staticQuizLvl2: QuizQuestion[] = [
    {
        question: <>عينة من غاز الميثان في الظروف المعيارية تحتوي <InlineMath math="0.1\text{mol}" /> إذا علمت أن الكتلة المولية للميثان <InlineMath math="16\text{g/mol}" /> فإن حجمها يساوي</>,
        "options": [
            "4.48L",
            "2.24L",
            "35.84L",
            "1.4L"
        ],
        "correctAnswerIndex": 1,
        "explanation": "في الظروف المعيارية حجم الغاز = عدد المولات × 22.4 إذن الحجم = 0.1mol × 22.4L/mol = 2.24L"
    },
    {
        question: <>وعاء حجمه <InlineMath math="2\text{L}" /> يحتوي على <InlineMath math="0.5\text{mol}" /> من غاز الأكسجين إذا أفرغنا نصف كمية الغاز فما هو الحجم الجديد الذي سيشغله الغاز المتبقي عند نفس الظروف</>,
        "options": [
            "2L",
            "1L",
            "0.5L",
            "4L"
        ],
        "correctAnswerIndex": 1,
        "explanation": "الكمية المتبقية من الغاز هي 0.25mol (نصف الكمية الأصلية) بما أن الحجم يتناسب طرديًا مع عدد المولات فإن الحجم سيقل إلى النصف أيضًا ليصبح 1L"
    },
    {
        question: <>عينة من غاز الميثان في الظروف المعيارية حجمها <InlineMath math="3\text{L}" /> إذا علمت أن الكتلة المولية للميثان <InlineMath math="16\text{g/mol}" /> فإن عدد مولات الميثان يساوي</>,
        "options": [
            "1.34",
            "7.47",
            "0.24",
            "0.13"
        ],
        "correctAnswerIndex": 3,
        "explanation": "في الظروف المعيارية عدد المولات = الحجم / 22.4 إذن n = 3L / 22.4L/mol ≈ 0.13mol"
    },
    {
        question: <><span className="inline-block">كمية من غاز النيتروجين</span><span className="inline-block" dir="ltr">(<InlineMath math="N_2" />)</span><span className="inline-block">حجمها</span><span className="inline-block" dir="ltr"><InlineMath math="10\text{L}" /></span><span className="inline-block">وكمية أخرى من غاز الهيليوم</span><span className="inline-block" dir="ltr">(<InlineMath math="He" />)</span><span className="inline-block">تشغل حجم</span><span className="inline-block" dir="ltr"><InlineMath math="20\text{L}" /></span><span className="inline-block">عند نفس الظروف ما هي نسبة عدد مولات الهيليوم إلى النيتروجين</span></>,
        "options": [
            "1:2",
            "2:1",
            "1:1",
            "لا يمكن تحديدها"
        ],
        "correctAnswerIndex": 1,
        "explanation": "بما أن V ∝ n فإن نسبة الأحجام تساوي نسبة عدد المولات V(He)/V(N₂) = n(He)/n(N₂) إذن 20/10 = 2/1 نسبة الهيليوم إلى النيتروجين هي 2:1"
    }
];


export const staticQuizLvl3: QuizQuestion[] = [
    {
        question: <><span className="inline-block">إذا علمت أن الكتلة المولية الذرية للأكسجين تساوي</span><span dir="ltr" className="inline-block mx-1"><InlineMath math="16\text{g/mol}"/></span><span className="inline-block">فإن حجم الأكسجين الذي تشغله</span><span dir="ltr" className="inline-block mx-1"><InlineMath math="50\text{g}"/></span><span className="inline-block">من غاز الأكسجين</span><span dir="ltr" className="inline-block mx-1">(<InlineMath math="O_2"/>)</span><span className="inline-block">يساوي</span></>,
        "options": [
            "70L",
            "14mL",
            "35L",
            "28mL"
        ],
        "correctAnswerIndex": 2,
        "explanation": "الكتلة المولية لغاز الأكسجين O₂ هي 2 * 16 = 32g/mol عدد المولات n = 50g / 32g/mol ≈ 1.56mol الحجم = 1.56mol * 22.4L/mol ≈ 35L"
    },
    {
        question: <><span className="inline-block">حجم الغاز الذي يشغله</span><span dir="ltr" className="inline-block mx-1"><InlineMath math="6.02 \times 10^{23}" /></span><span className="inline-block">ذرة من الهيليوم</span><span dir="ltr" className="inline-block mx-1">(<InlineMath math="He" />)</span><span className="inline-block">في الظروف المعيارية يساوي</span></>,
        "options": [
            "2.2L",
            "22400mL",
            "1L",
            "22.4mL"
        ],
        "correctAnswerIndex": 1,
        "explanation": "عدد أفوجادرو (6.02x10²³) من الذرات يساوي 1mol حجم 1mol في الظروف المعيارية هو 22.4 لتر بالمليلتر: 22.4L * 1000mL/L = 22400mL"
    },
    {
        question: <>عينة من غاز الميثان في الظروف المعيارية حجمها <InlineMath math="3\text{L}" /> إذا علمت أن الكتلة المولية للميثان <InlineMath math="16\text{g/mol}" /> فإن كتلتها بوحدة <InlineMath math="\text{g}" /> تساوي</>,
        "options": [
            "1.34",
            "2.1",
            "8.37",
            "119.46"
        ],
        "correctAnswerIndex": 1,
        "explanation": "أولاً نجد عدد المولات n = 3L / 22.4L/mol ≈ 0.134mol ثم نحسب الكتلة: الكتلة = n × الكتلة المولية = 0.134mol × 16g/mol ≈ 2.1g"
    },
    {
        question: <>عينة من غاز كتلة <InlineMath math="44.8\text{L}" /> منها في الظروف المعيارية يساوي <InlineMath math="4\text{g}" /> فإن الكتلة المولية للغاز بوحدة <InlineMath math="\text{g/mol}" /> تساوي</>,
        "options": [
            "2",
            "0.5",
            "1",
            "0.09"
        ],
        "correctAnswerIndex": 0,
        "explanation": "أولاً نجد عدد المولات n = الحجم / 22.4 = 44.8L / 22.4L/mol = 2mol ثم نحسب الكتلة المولية: Mr = الكتلة / n = 4g / 2mol = 2g/mol"
    },
    {
        "question": <>عينة من غاز الميثان في الظروف المعيارية كتلتها <InlineMath math="3.2\text{g}" /> إذا علمت أن الكتلة المولية للميثان <InlineMath math="16\text{g/mol}" /> فإن حجمها يساوي</>,
        "options": [
            "4.48L",
            "2.24L",
            "112L",
            "1.15L"
        ],
        "correctAnswerIndex": 0,
        "explanation": "أولاً نحسب عدد المولات n = الكتلة / الكتلة المولية = 3.2g / 16g/mol = 0.2mol ثم نحسب الحجم في الظروف المعيارية: الحجم = 0.2mol × 22.4L/mol = 4.48L"
    },
    {
        "question": <>عينة من غاز الميثان في الظروف المعيارية حجمها <InlineMath math="3\text{L}" /> إذا علمت أن الكتلة المولية للميثان <InlineMath math="16\text{g/mol}" /> فإن عدد جزيئات الميثان يساوي</>,
        "options": [
            "8.06x10²²",
            "6.02x10²³",
            "8x10²³",
            "2.4x10²²"
        ],
        "correctAnswerIndex": 0,
        "explanation": "أولاً نجد عدد المولات n = 3L / 22.4L/mol ≈ 0.134mol عدد الجزيئات = n × عدد أفوجادرو = 0.134 × (6.022 × 10²³) ≈ 8.06 × 10²² جزيء"
    },
    {
        question: <div>عينة من غاز ثنائي الذرة كتلة <span dir="ltr" className="inline-block"><InlineMath math="44.8\text{L}"/></span> منها في الظروف المعيارية يساوي <span dir="ltr" className="inline-block"><InlineMath math="4\text{g}"/></span> فإن الكتلة المولية للعنصر تساوي</div>,
        "options": [
            "1",
            "2",
            "3",
            "4"
        ],
        "correctAnswerIndex": 0,
        "explanation": "أولاً نجد عدد مولات الغاز (n) في الظروف المعيارية: n = الحجم / 22.4 = 44.8L / 22.4L/mol = 2mol ثانياً نحسب الكتلة المولية للغاز (Mr): Mr = الكتلة / n = 4g / 2mol = 2g/mol بما أن الغاز ثنائي الذرة فإن هذه هي كتلة الجزيء (مثلاً X₂) إذن الكتلة المولية للعنصر الواحد هي نصف هذه القيمة: 2g/mol / 2 = 1g/mol"
    },
    {
        "question": <>عينة من غاز الميثان في الظروف المعيارية حجمها <InlineMath math="3L" /> إذا علمت أن الكتلة المولية للميثان <InlineMath math="16\text{g/mol}" /> فإن كثافتها بوحدة <InlineMath math="\text{g/L}" /> تساوي</>,
        "options": [
            "2.1",
            "0.7",
            "1.4",
            "0.2"
        ],
        "correctAnswerIndex": 1,
        "explanation": "أولاً نحسب عدد مولات الميثان: n = 3L / 22.4 L/mol ≈ 0.134mol ثانياً نحسب كتلة الميثان: m = n × Mr = 0.134mol × 16g/mol ≈ 2.14g أخيراً نحسب الكثافة: d = m / V = 2.14g / 3L ≈ 0.71g/L الإجابة الأقرب هي 0.7"
    }
];
