import { InlineMath } from 'react-katex';
import React from 'react';
import Image from 'next/image';


export interface QuizQuestion {
    question: React.ReactNode;
    options: React.ReactNode[];
    correctAnswerIndex: number;
    explanation: React.ReactNode;
}

export const staticQuizLvl1: QuizQuestion[] = [
    {
        question: "ما هو الشرط الأساسي لحدوث التكاثف",
        options: [
            "زيادة درجة الحرارة",
            "خفض درجة الحرارة أو زيادة الضغط",
            "تقليل الضغط فقط",
            "إضافة عامل مساعد"
        ],
        correctAnswerIndex: 1,
        explanation: "لحدوث التكاثف يجب أن تتقارب جزيئات الغاز وتقل طاقتها الحركية وهذا يتحقق عن طريق خفض درجة الحرارة أو زيادة الضغط"
    },
    {
        question: "طاقة التكاثف المولية هي كمية الطاقة",
        options: [
            "اللازمة لتبخير مول واحد من السائل",
            "المنطلقة عند تكاثف مول واحد من الغاز",
            "اللازمة لصهر مول واحد من المادة الصلبة",
            "المنطلقة عند تجمد مول واحد من السائل"
        ],
        correctAnswerIndex: 1,
        explanation: "طاقة التكاثف المولية هي الطاقة المنطلقة الطاردة عندما يتحول مول واحد من المادة من الحالة الغازية إلى السائلة"
    },
    {
        question: "ماذا يحدث لدرجة حرارة مادة نقية أثناء عملية التكاثف",
        options: [
            "تزداد",
            "تقل",
            "تبقى ثابتة",
            "تتغير بشكل عشوائي"
        ],
        correctAnswerIndex: 2,
        explanation: "أثناء تغير حالة المادة مثل التكاثف تبقى درجة الحرارة ثابتة لأن الطاقة تستخدم في تغيير حالة المادة بدلاً من تغيير درجة حرارتها وهذا ما يظهر كخط أفقي في منحنى التبريد"
    },
    {
        question: "أي العبارات التالية صحيحة عند مقارنة طاقة التبخر المولية بطاقة التكاثف المولية لنفس المادة",
        options: [
            "طاقة التبخر أكبر",
            "طاقة التكاثف أكبر",
            "متساويتان في القيمة ومختلفتان في الإشارة",
            "لا توجد علاقة بينهما"
        ],
        correctAnswerIndex: 2,
        explanation: "التبخر والتكاثف عمليتان متعاكستان الطاقة اللازمة للتبخير ماصة تساوي تمامًا الطاقة المنطلقة عند التكاثف طاردة"
    },
    {
        question: "على منحنى التبريد ماذا يمثل الجزء الأفقي من المنحنى",
        options: [
            "تبريد الغاز",
            "تبريد السائل",
            "حدوث تغير في حالة المادة",
            "تبريد المادة الصلبة"
        ],
        correctAnswerIndex: 2,
        explanation: "الجزء الأفقي حيث تكون درجة الحرارة ثابتة على منحنى التبريد يمثل النقطة التي تحدث فيها عملية تغير الحالة الفيزيائية مثل التكاثف من غاز إلى سائل أو التجمد من سائل إلى صلب"
    },
     {
        question: (
            <div className="space-y-4">
                <p>اعتمادا على الرسم المجاور والذي يمثل تبريد الغاز A من درجة حرارة <span dir="ltr" className="inline-block">100°C</span> إلى درجة حرارة الغرفة <span dir="ltr" className="inline-block">25°C</span> فإن الحالة الفيزيائية للمادة A عند درجة الحرارة B هي:</p>
                <div className="flex justify-center my-4">
                     <Image
                        src="https://i.ibb.co/GfZ5wtqG/22.png"
                        alt="منحنى تبريد المادة A"
                        width={500}
                        height={300}
                        className="rounded-lg border bg-white"
                        data-ai-hint="cooling curve"
                    />
                </div>
            </div>
        ),
        options: ["صلب", "سائل", "غاز", "غاز + سائل"],
        correctAnswerIndex: 1,
        explanation: "يوضح الرسم البياني منحنى تبريد المادة تبدأ المادة كغاز عند درجة حرارة عالية ثم تبرد الخط الأفقي الأول يمثل عملية التكاثف التحول من غاز إلى سائل عند درجة حرارة ثابتة النقطة B تقع على الخط المائل بعد انتهاء التكاثف وقبل بدء التجمد مما يعني أن المادة في هذه المرحلة تكون في الحالة السائلة ويتم تبريدها"
    },
    {
        question: (
            <div className="space-y-4">
                <p>اعتمادا على الرسم المجاور والذي يمثل تبريد الغاز A من درجة حرارة <span dir="ltr" className="inline-block">100°C</span> إلى درجة حرارة الغرفة <span dir="ltr" className="inline-block">25°C</span> فإن درجة التكاثف للمادة A تساوي:</p>
                <div className="flex justify-center my-4">
                     <Image
                        src="https://i.ibb.co/GfZ5wtqG/22.png"
                        alt="منحنى تبريد المادة A"
                        width={500}
                        height={300}
                        className="rounded-lg border bg-white"
                        data-ai-hint="cooling curve"
                    />
                </div>
            </div>
        ),
        options: ["70", "100", "25", "0"],
        correctAnswerIndex: 0,
        explanation: "درجة التكاثف هي درجة الحرارة الثابتة التي يتحول عندها الغاز إلى سائل من الرسم البياني نلاحظ أن درجة الحرارة تثبت عند 70°C أثناء عملية التكاثف الخط الأفقي الأول"
    },
    {
        question: (
            <div className="space-y-4">
                <p>اعتمادا على الرسم المجاور والذي يمثل تبريد الغاز A من درجة حرارة <span dir="ltr" className="inline-block">100°C</span> إلى درجة حرارة الغرفة <span dir="ltr" className="inline-block">25°C</span> فإن الحالة الفيزيائية للمادة A عند الزمن X هي:</p>
                <div className="flex justify-center my-4">
                     <Image
                        src="https://i.ibb.co/GfZ5wtqG/22.png"
                        alt="منحنى تبريد المادة A"
                        width={500}
                        height={300}
                        className="rounded-lg border bg-white"
                        data-ai-hint="cooling curve"
                    />
                </div>
            </div>
        ),
        options: ["صلب", "سائل", "غاز", "غاز + سائل"],
        correctAnswerIndex: 3,
        explanation: "الزمن X يقع على الجزء الأفقي من المنحنى والذي يمثل عملية التكاثف حيث تتحول المادة من غاز إلى سائل وتوجد في الحالتين معًا"
    }
];

export const staticQuizLvl2: QuizQuestion[] = [
    {
        question: "لماذا يشعر الشخص بالدفء في يوم شتوي رطب مقارنة بيوم جاف بنفس درجة الحرارة؟",
        options: [
            "لأن الرطوبة تمنع تبخر العرق",
            "لأن تكاثف بخار الماء الموجود في الهواء على الجسم يطلق طاقة (حرارة)",
            "لأن الهواء الرطب أثقل من الهواء الجاف",
            "لأن الهواء الرطب موصل أفضل للحرارة"
        ],
        correctAnswerIndex: 1,
        explanation: "في الأيام الرطبة، يتكاثف بخار الماء الموجود في الهواء عند ملامسته للأسطح الأبرد مثل الجلد. عملية التكاثف هي عملية طاردة للحرارة، مما يؤدي إلى إطلاق طاقة حرارية يشعر بها الجسم كدفء إضافي."
    },
    {
        question: (
            <div className="space-y-4">
                 <p>ادرس الرسم البياني الذي يمثل منحنى تبريد المادة A ثم قارنها بالمادة C التي درجة غليانها <span dir="ltr" className="inline-block"><InlineMath math="90^\circ C"/></span> أي العبارات التالية صحيحة</p>
                 <div className="flex justify-center my-4">
                     <Image
                        src="https://i.ibb.co/GfZ5wtqG/22.png"
                        alt="منحنى تبريد المادة A"
                        width={500}
                        height={300}
                        className="rounded-lg border bg-white"
                        data-ai-hint="cooling curve"
                    />
                </div>
            </div>
        ),
        options: [
            "قوى الترابط بين جزيئات المادة A أقوى من C",
            "قوى الترابط بين جزيئات المادة C أقوى من A",
            "المادتان لهما نفس قوى الترابط",
            "المادة A لها ضغط بخاري أعلى من C عند نفس الحرارة"
        ],
        correctAnswerIndex: 1,
        explanation: <span>من الرسم درجة غليان او تكاثف المادة A هي <span dir="ltr" className="inline-block"><InlineMath math="70^\circ C"/></span> بما أن درجة غليان المادة C وهي <span dir="ltr" className="inline-block"><InlineMath math="90^\circ C"/></span> أعلى من A فهذا يعني أن قوى الترابط بين جزيئات C أقوى من A حيث يتطلب كسرها طاقة أكبر</span>
    },
     {
        question: (
            <div className="space-y-4">
                 <p>بالاعتماد على الرسم البياني إذا علمت أن المادة A هي الإيثانول (<span dir="ltr">CH₃CH₂OH</span>) والمادة B هي الأسيتون (<span dir="ltr">CH₃COCH₃</span>) فأي العبارات التالية تفسر سبب كون درجة تكاثف المادة A وهي <span dir="ltr" className="inline-block"><InlineMath math="70^\circ C"/></span> أعلى</p>
                 <div className="flex justify-center my-4">
                     <Image
                        src="https://i.ibb.co/GfZ5wtqG/22.png"
                        alt="منحنى تبريد المادة A"
                        width={500}
                        height={300}
                        className="rounded-lg border bg-white"
                        data-ai-hint="cooling curve"
                    />
                </div>
            </div>
        ),
        options: [
            "لأن الكتلة المولية للأسيتون أكبر",
            "لأن الإيثانول يمتلك قوى لندن فقط",
            "لأن الإيثانول يكون روابط هيدروجينية تتطلب طاقة تكاثف مولية أعلى",
            "لأن الأسيتون يمتلك ضغطًا بخاريًا أقل"
        ],
        correctAnswerIndex: 2,
        explanation: "درجة التكاثف أو الغليان تعتمد على قوة الترابط والإيثانول يكون روابط هيدروجينية قوية بين جزيئاته وهي أقوى من قوى ثنائي القطب في الأسيتون وهذه الروابط القوية تتطلب فقدان أو اكتساب طاقة أكبر للتغلب عليها مما يرفع درجة التكاثف"
    },
    {
        question: "اختر الرسم الصحيح الذي يمثل منحنى تبريد بخار الماء",
        options: [
            <Image src="https://i.ibb.co/NgZfVHmn/6.png" alt="منحنى تبريد خاطئ 1" width={250} height={160} className="rounded-md mx-auto" />,
            <Image src="https://i.ibb.co/prX2QBzg/5.png" alt="منحنى تبريد خاطئ 2" width={250} height={160} className="rounded-md mx-auto" />,
            <Image src="https://i.ibb.co/spPLvD7b/4.png" alt="منحنى تبريد خاطئ 3" width={250} height={160} className="rounded-md mx-auto" />,
            <Image src="https://i.ibb.co/k65TLr3M/3.png" alt="منحنى تبريد بخار الماء الصحيح" width={250} height={160} className="rounded-md mx-auto" />,
        ],
        correctAnswerIndex: 3,
        explanation: <><span>منحنى تبريد الماء النقي يتميز بوجود منطقتين أفقيتين (ثبات في درجة الحرارة) المنطقة الأولى عند </span><span dir="ltr" className="inline-block"><InlineMath math="100^\circ C"/></span><span> وتمثل عملية التكاثف (تحول البخار إلى سائل) والمنطقة الثانية عند </span><span dir="ltr" className="inline-block"><InlineMath math="0^\circ C"/></span><span> وتمثل عملية التجمد (تحول السائل إلى صلب) الرسم الصحيح هو الوحيد الذي يوضح هاتين المرحلتين عند درجات الحرارة الصحيحة</span></>
    }
];

export const staticQuizLvl3: QuizQuestion[] = [
     {
        question: (
            <div className="space-y-4">
                <p>بالاعتماد على منحنى التبريد المجاور، إذا كانت الحرارة النوعية للمادة في الحالة السائلة أكبر منها في الحالة الغازية، فأي العبارات التالية صحيحة حول ميل المنحنى؟</p>
                <div className="flex justify-center my-4">
                     <Image
                        src="https://i.ibb.co/GfZ5wtqG/22.png"
                        alt="منحنى تبريد المادة A"
                        width={500}
                        height={300}
                        className="rounded-lg border bg-white"
                        data-ai-hint="cooling curve"
                    />
                </div>
            </div>
        ),
        options: [
            "ميل منحنى تبريد السائل (بعد الزمن Y) أكبر من ميل منحنى تبريد الغاز (قبل الزمن X)",
            "ميل منحنى تبريد السائل أقل (أكثر تسطحًا) من ميل منحنى تبريد الغاز",
            "الميلان متساويان في الحالتين",
            "لا يمكن تحديد العلاقة من الرسم"
        ],
        correctAnswerIndex: 1,
        explanation: "الحرارة النوعية هي كمية الحرارة اللازمة لتغيير درجة حرارة المادة. حرارة نوعية أكبر تعني أن المادة تحتاج لفقدان كمية أكبر من الحرارة لتنخفض درجة حرارتها، وبالتالي يكون معدل التبريد أبطأ. هذا يترجم على الرسم البياني إلى ميل أقل حدة (أكثر تسطحًا). لذا، ميل منحنى تبريد السائل سيكون أقل من ميل منحنى تبريد الغاز."
    },
    {
        question: "السائل الذي له أقل طاقة تكاثف مولية من السوائل الآتية",
        options: [
            <InlineMath math="CH_3COCH_3" />,
            <InlineMath math="CH_3CH_2Cl" />,
            <InlineMath math="CH_3CH_2OH" />,
            <InlineMath math="CH_3CH_3" />
        ],
        correctAnswerIndex: 3,
        explanation: "طاقة التكاثف الأقل تعني أضعف قوى ترابط بين الجزيئات الإيثان (CH₃CH₃) هو جزيء غير قطبي يمتلك أضعف قوى ترابط (قوى لندن فقط) بينما المركبات الأخرى تمتلك قوى ثنائي القطب أو روابط هيدروجينية وهي أقوى"
    },
    {
        question: "السائل الأسرع تكاثفا من السوائل الآتية",
        options: [
            "CH4",
            "CH3CH2Cl",
            "CH3CH2OH",
            "CH3CH3"
        ],
        correctAnswerIndex: 2,
        explanation: "التكاثف الأسرع يحدث للسائل الذي يمتلك أقوى قوى ترابط لأنه يتطلب فقدان طاقة أقل للتحول من غاز إلى سائل الإيثانول (CH₃CH₂OH) يكون روابط هيدروجينية وهي الأقوى بين الخيارات المتاحة لذا فهو الأسرع تكاثفا"
    }
];
