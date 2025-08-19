
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Map, SlidersHorizontal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils.tsx';
import { units } from '@/data/materials';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

/**
 * منطقة الاختبار المؤقتة - معمل الأسئلة
 * ------------------------------------
 * الغرض: هذه الصفحة هي بيئة معزولة لتصميم ومراجعة الأسئلة بسرعة.
 * آلية العمل:
 * 1.  عندما تطلب سؤالاً جديداً، سأقوم بوضعه هنا في الكائن `sampleQuestion`.
 * 2.  يمكنك مراجعة السؤال بصريًا في هذه الصفحة.
 * 3.  اطلب أي تعديلات (نص، خيارات، شرح). سأقوم بتحديثها هنا فورًا.
 * 4.  عندما توافق على السؤال، سأقوم بنقله من هنا إلى ملف `exam.tsx` النهائي الخاص بالدرس.
 */

// ====================================================================================
// ===================              مكان وضع السؤال للمعاينة              ===================
// ====================================================================================
const sampleQuestion = {
    question: "العبارة الصحيحة فيما يلي:",
    options: [
        "يعتبر تصادم الهيدروجين مع الكلور لتكوين كلوريد الهيدروجين تصادما مرنا",
        "تتحرك جسيمات الغاز عشوائيا وباستمرار في جميع الاتجاهات في مسارات منحنية",
        "يزداد سلوك الغازات الحقيقية شبها بالغاز المثالي كلما قل الضغط والحرارة",
        "ينشأ ضغط الغاز من تصادم جسيمات الغاز مع جدار الوعاء المحصور فيه"
    ],
    correctAnswerIndex: 3,
    explanation: "العبارة (د) صحيحة لأن ضغط الغاز هو نتيجة مباشرة للقوة الناتجة عن تصادمات جسيماته المستمرة بجدران الوعاء. العبارات الأخرى خاطئة: (أ) التفاعلات الكيميائية ليست تصادمات مرنة، (ب) الجسيمات تتحرك في خطوط مستقيمة، (ج) الغاز الحقيقي يقترب من المثالي عند ضغط منخفض وحرارة مرتفعة."
};
// ====================================================================================
// ====================================================================================


// مكون بسيط لعرض السؤال للمراجعة
export default function QuestionLabPage() {
    const [selectedUnit, setSelectedUnit] = useState<typeof units[0] | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
    const [selectedPart, setSelectedPart] = useState<any | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    const availableLessons = useMemo(() => {
        return selectedUnit ? selectedUnit.lessons : [];
    }, [selectedUnit]);

    const availableParts = useMemo(() => {
        return selectedLesson ? selectedLesson.parts : [];
    }, [selectedLesson]);

    const handleUnitChange = (unitId: string) => {
        const unit = units.find(u => u.id === unitId) || null;
        setSelectedUnit(unit);
        setSelectedLesson(null);
        setSelectedPart(null);
    };

    const handleLessonChange = (lessonIdentifier: string) => {
        const lesson = availableLessons.find(l => (l.lessonNum && `lesson-${l.lessonNum}`) === lessonIdentifier || (l.sectionNum && `section-${l.sectionNum}`) === lessonIdentifier) || null;
        setSelectedLesson(lesson);
        setSelectedPart(null);
    };

    const handlePartChange = (partNum: string) => {
        const part = availableParts.find(p => String(p.partNum) === partNum) || null;
        setSelectedPart(part);
    };

    const finalPath = useMemo(() => {
        if (!selectedUnit || !selectedLesson || !selectedPart) return "الرجاء تحديد الوجهة...";
        const unitNum = selectedUnit.id.split('-')[1];
        let lessonPath = selectedLesson.lessonNum ? `lesson-${selectedLesson.lessonNum}` : `section-${selectedLesson.sectionNum}`;
        return `src/app/materials/semester-1/unit-${unitNum}/${lessonPath}/part-${selectedPart.partNum}/exam.tsx`;
    }, [selectedUnit, selectedLesson, selectedPart]);

    return (
        <div className="container mx-auto p-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-primary mb-2">معمل الأسئلة</h1>
                <p className="text-lg text-muted-foreground">
                    هذه منطقة اختبار لمراجعة الأسئلة قبل إضافتها إلى بنك الأسئلة الدائم.
                </p>
            </header>
            
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-lg">
                                معاينة السؤال
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="text-lg font-semibold pt-2">{sampleQuestion.question}</div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {sampleQuestion.options.map((option, index) => {
                                    const isCorrect = index === sampleQuestion.correctAnswerIndex;
                                    return (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-right h-auto py-2 px-3 text-sm flex items-start",
                                                isCorrect && "border-green-500 bg-green-500/10 text-green-700 hover:bg-green-500/20"
                                            )}
                                        >
                                            <span className="ml-3 font-bold">{["أ", "ب", "ج", "د"][index]}</span>
                                            <span className="flex-1 whitespace-normal">{option}</span>
                                        </Button>
                                    );
                                })}
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col items-stretch gap-4 pt-4">
                            <Alert variant="default" className="border-blue-500 bg-blue-100/30">
                                <CheckCircle className="h-4 w-4 text-blue-500" />
                                <AlertTitle className="font-bold text-blue-700">
                                    الشرح (للتحقق من الدقة)
                                </AlertTitle>
                                <AlertDescription>
                                    {sampleQuestion.explanation}
                                </AlertDescription>
                            </Alert>
                        </CardFooter>
                    </Card>
                </div>
                
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Map className="h-5 w-5 text-primary"/> وجهة السؤال</CardTitle>
                            <CardDescription>اختر المكان الذي سينتقل إليه السؤال بعد اعتماده.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="unit-select">الوحدة</Label>
                                <Select onValueChange={handleUnitChange} value={selectedUnit?.id}>
                                    <SelectTrigger id="unit-select"><SelectValue placeholder="اختر الوحدة..." /></SelectTrigger>
                                    <SelectContent>
                                        {units.map(unit => <SelectItem key={unit.id} value={unit.id}>{unit.title}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                             <div>
                                <Label htmlFor="lesson-select">الدرس</Label>
                                <Select onValueChange={handleLessonChange} value={selectedLesson ? (selectedLesson.lessonNum ? `lesson-${selectedLesson.lessonNum}` : `section-${selectedLesson.sectionNum}`) : undefined} disabled={!selectedUnit}>
                                    <SelectTrigger id="lesson-select"><SelectValue placeholder="اختر الدرس..." /></SelectTrigger>
                                    <SelectContent>
                                        {availableLessons.map(lesson => <SelectItem key={lesson.lessonNum || lesson.sectionNum} value={lesson.lessonNum ? `lesson-${lesson.lessonNum}` : `section-${lesson.sectionNum}`}>{lesson.title}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                             <div>
                                <Label htmlFor="part-select">الجزء</Label>
                                <Select onValueChange={handlePartChange} value={selectedPart ? String(selectedPart.partNum) : undefined} disabled={!selectedLesson}>
                                    <SelectTrigger id="part-select"><SelectValue placeholder="اختر الجزء..." /></SelectTrigger>
                                    <SelectContent>
                                        {availableParts.map(part => <SelectItem key={part.partNum} value={String(part.partNum)}>{part.title}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                             <CardTitle className="flex items-center gap-2"><SlidersHorizontal className="h-5 w-5 text-primary"/> مستوى الصعوبة</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <Select onValueChange={setSelectedLevel} value={selectedLevel || undefined}>
                                <SelectTrigger id="level-select"><SelectValue placeholder="اختر المستوى..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">المستوى 1 (سهل)</SelectItem>
                                    <SelectItem value="2">المستوى 2 (متوسط)</SelectItem>
                                    <SelectItem value="3">المستوى 3 (متقدم)</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    <Card className="bg-muted">
                        <CardHeader>
                            <CardTitle className="text-sm">مسار النقل النهائي</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <code className="text-xs break-all text-muted-foreground">{finalPath}</code>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

    