
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Library, Loader2, ShieldAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils.tsx';
import type { QuizQuestion as BaseQuizQuestion } from '@/components/quiz';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { units } from '@/data/materials';
import { useApp } from '@/context/CurriculumContext';
import Link from 'next/link';

// Import all exam files
import * as part1Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-1/exam';
import * as part2Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-2/exam';
import * as part3Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-3/exam';
import * as part4Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-4/exam';
import * as part5Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-5/exam';
import * as part6Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-6/exam';
import * as part7Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-7/exam';
import * as part8Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-8/exam';
import * as part9Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-9/exam';
import * as part10Exam from '@/app/materials/semester-1/unit-1/lesson-1/part-10/exam';
import * as unit1Lesson2Part1Exam from '@/app/materials/semester-1/unit-1/lesson-2/part-1/exam';
import * as unit1Lesson2Part2Exam from '@/app/materials/semester-1/unit-1/lesson-2/part-2/exam';
import * as unit1Lesson2Part3Exam from '@/app/materials/semester-1/unit-1/lesson-2/part-3/exam';
import * as unit1Lesson2Part4Exam from '@/app/materials/semester-1/unit-1/lesson-2/part-4/exam';
import * as unit1Lesson2Part5Exam from '@/app/materials/semester-1/unit-1/lesson-2/part-5/exam';
import * as unit1ReviewExam from '@/app/materials/semester-1/unit-1/section-5/exam';

interface SourcedQuizQuestion extends BaseQuizQuestion {
    id: string; // Unique ID for each question
    source: {
        unitId: string;
        unitTitle: string;
        lessonId: string;
        lessonTitle: string;
        partId?: string;
        partTitle?: string;
    };
    level: number;
}

const allQuestions: SourcedQuizQuestion[] = [];

// A map to associate path parts with exam modules
const examModules = {
    '/materials/semester-1/unit-1/lesson-1/part-1': part1Exam,
    '/materials/semester-1/unit-1/lesson-1/part-2': part2Exam,
    '/materials/semester-1/unit-1/lesson-1/part-3': part3Exam,
    '/materials/semester-1/unit-1/lesson-1/part-4': part4Exam,
    '/materials/semester-1/unit-1/lesson-1/part-5': part5Exam,
    '/materials/semester-1/unit-1/lesson-1/part-6': part6Exam,
    '/materials/semester-1/unit-1/lesson-1/part-7': part7Exam,
    '/materials/semester-1/unit-1/lesson-1/part-8': part8Exam,
    '/materials/semester-1/unit-1/lesson-1/part-9': part9Exam,
    '/materials/semester-1/unit-1/lesson-1/part-10': part10Exam,
    '/materials/semester-1/unit-1/lesson-2/part-1': unit1Lesson2Part1Exam,
    '/materials/semester-1/unit-1/lesson-2/part-2': unit1Lesson2Part2Exam,
    '/materials/semester-1/unit-1/lesson-2/part-3': unit1Lesson2Part3Exam,
    '/materials/semester-1/unit-1/lesson-2/part-4': unit1Lesson2Part4Exam,
    '/materials/semester-1/unit-1/lesson-2/part-5': unit1Lesson2Part5Exam,
    '/materials/semester-1/unit-1/section-5': unit1ReviewExam,
};

// Helper function to construct a unique ID for a lesson or section
const getLessonId = (lesson: any) => lesson.lessonNum ? `lesson-${lesson.lessonNum}` : `section-${lesson.sectionNum}`;

// Populate allQuestions from imported modules based on the materials structure
units.forEach(unit => {
    unit.lessons.forEach(lesson => {
        if (lesson.parts.length > 0) {
            lesson.parts.forEach(part => {
                const path = `/materials/semester-1/${unit.id}/${getLessonId(lesson)}${part.partNum ? `/part-${part.partNum}` : ''}`;
                // @ts-ignore
                const module = examModules[path];
                if (module) {
                    const sourceInfo = {
                        unitId: unit.id,
                        unitTitle: unit.title,
                        lessonId: getLessonId(lesson),
                        lessonTitle: lesson.title,
                        partId: part.partNum ? `part-${part.partNum}` : undefined,
                        partTitle: part.title,
                    };
                    if (module.staticQuizLvl1) {
                        allQuestions.push(...module.staticQuizLvl1.map((q: any, i: number) => ({ ...q, id: `${path}-lvl1-${i}`, source: sourceInfo, level: 1 })));
                    }
                    if (module.staticQuizLvl2) {
                        allQuestions.push(...module.staticQuizLvl2.map((q: any, i: number) => ({ ...q, id: `${path}-lvl2-${i}`, source: sourceInfo, level: 2 })));
                    }
                    if (module.staticQuizLvl3) {
                        allQuestions.push(...module.staticQuizLvl3.map((q: any, i: number) => ({ ...q, id: `${path}-lvl3-${i}`, source: sourceInfo, level: 3 })));
                    }
                }
            });
        } else {
             // Handle lessons without parts (like reviews)
            const path = `/materials/semester-1/${unit.id}/${getLessonId(lesson)}`;
             // @ts-ignore
            const module = examModules[path];
            if (module) {
                 const sourceInfo = {
                    unitId: unit.id,
                    unitTitle: unit.title,
                    lessonId: getLessonId(lesson),
                    lessonTitle: lesson.title,
                };
                 if (module.staticQuizLvl1) {
                    allQuestions.push(...module.staticQuizLvl1.map((q: any, i: number) => ({ ...q, id: `${path}-lvl1-${i}`, source: sourceInfo, level: 1 })));
                }
                 if (module.staticQuizLvl2) {
                    allQuestions.push(...module.staticQuizLvl2.map((q: any, i: number) => ({ ...q, id: `${path}-lvl2-${i}`, source: sourceInfo, level: 2 })));
                }
                 if (module.staticQuizLvl3) {
                    allQuestions.push(...module.staticQuizLvl3.map((q: any, i: number) => ({ ...q, id: `${path}-lvl3-${i}`, source: sourceInfo, level: 3 })));
                }
            }
        }
    });
});

const getSourceString = (source: SourcedQuizQuestion['source']) => {
    let str = `${source.unitTitle} / ${source.lessonTitle}`;
    if(source.partTitle) {
        str += ` / ${source.partTitle}`;
    }
    return str;
}


const QuestionCard = ({ question }: { question: SourcedQuizQuestion }) => (
    <Card className="w-full">
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="text-lg">
                    {question.question}
                </CardTitle>
                <Badge variant={question.level === 3 ? "destructive" : question.level === 2 ? "secondary" : "default"}>
                    المستوى {question.level}
                </Badge>
            </div>
            <CardDescription className="text-xs pt-2">
                المصدر {getSourceString(question.source)}
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            {question.options.map((option, index) => {
                const isCorrect = index === question.correctAnswerIndex;
                return (
                    <Button
                        key={index}
                        variant="outline"
                        className={cn(
                            "w-full justify-between text-right h-auto py-2 px-3 text-sm flex items-center",
                            isCorrect && "border-green-500 bg-green-500/10 text-green-700 hover:bg-green-500/20"
                        )}
                        disabled
                    >
                        <div className="flex-1 whitespace-normal" dir="ltr">{option}</div>
                        {isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </Button>
                );
            })}
        </CardContent>
        <CardFooter>
             <Alert variant="default" className="border-blue-500 bg-blue-100/30 w-full">
                <CheckCircle className="h-4 w-4 text-blue-500" />
                <AlertTitle className="font-bold text-blue-700">الشرح</AlertTitle>
                <AlertDescription>{question.explanation}</AlertDescription>
            </Alert>
        </CardFooter>
    </Card>
);

const getInitialState = (key: string, defaultValue: string): string => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
};

export default function QuestionBankPage() {
    const { currentUser, isLoading } = useApp();
    const [selectedUnit, setSelectedUnit] = useState(() => getInitialState('questionBank_unit', 'all'));
    const [selectedLesson, setSelectedLesson] = useState(() => getInitialState('questionBank_lesson', 'all'));
    const [selectedPart, setSelectedPart] = useState(() => getInitialState('questionBank_part', 'all'));

    // Save filter state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('questionBank_unit', selectedUnit);
    }, [selectedUnit]);

    useEffect(() => {
        localStorage.setItem('questionBank_lesson', selectedLesson);
    }, [selectedLesson]);

    useEffect(() => {
        localStorage.setItem('questionBank_part', selectedPart);
    }, [selectedPart]);
    
    const availableLessons = useMemo(() => {
        if (selectedUnit === 'all') return [];
        return units.find(u => u.id === selectedUnit)?.lessons || [];
    }, [selectedUnit]);
    
    const availableParts = useMemo(() => {
        if (selectedLesson === 'all' || !availableLessons.length) return [];
        return availableLessons.find(l => getLessonId(l) === selectedLesson)?.parts || [];
    }, [selectedLesson, availableLessons]);
    
    const handleUnitChange = (unitId: string) => {
        setSelectedUnit(unitId);
        setSelectedLesson('all');
        setSelectedPart('all');
    };
    
    const handleLessonChange = (lessonId: string) => {
        setSelectedLesson(lessonId);
        setSelectedPart('all');
    };

    const filteredQuestions = useMemo(() => {
        return allQuestions.filter(q => {
            const unitMatch = selectedUnit === 'all' || q.source.unitId === selectedUnit;
            const lessonMatch = selectedLesson === 'all' || q.source.lessonId === selectedLesson;
            const partMatch = selectedPart === 'all' || q.source.partId === selectedPart;
            return unitMatch && lessonMatch && partMatch;
        });
    }, [selectedUnit, selectedLesson, selectedPart]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-200px)]">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        )
    }

    if (!currentUser || currentUser.role !== 'admin') {
         return (
             <div className="p-4 md:p-8 text-center">
                 <Card className="max-w-md mx-auto">
                     <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2 text-destructive">
                            <ShieldAlert />
                            الوصول مرفوض
                        </CardTitle>
                        <CardDescription>
                            هذه الصفحة مخصصة للمسؤولين فقط.
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                         <Link href="/" passHref>
                            <Button>العودة إلى الصفحة الرئيسية</Button>
                         </Link>
                     </CardContent>
                 </Card>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-8">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-primary mb-2">
                    <Library className="inline-block h-10 w-10 mb-2" /> بنك الأسئلة
                </h1>
                <p className="text-lg text-muted-foreground">
                    مراجعة شاملة لجميع أسئلة الاختبارات في المشروع
                </p>
            </header>
            
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto" dir="rtl">
                <Select onValueChange={handleUnitChange} value={selectedUnit}>
                    <SelectTrigger><SelectValue placeholder="اختر الوحدة" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">كل الوحدات</SelectItem>
                        {units.map(unit => (
                            <SelectItem key={unit.id} value={unit.id}>{unit.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select onValueChange={handleLessonChange} value={selectedLesson} disabled={selectedUnit === 'all'}>
                    <SelectTrigger><SelectValue placeholder="اختر الدرس" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">كل الدروس</SelectItem>
                        {availableLessons.map(lesson => (
                            <SelectItem key={getLessonId(lesson)} value={getLessonId(lesson)}>{lesson.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                
                <Select onValueChange={setSelectedPart} value={selectedPart} disabled={selectedLesson === 'all'}>
                    <SelectTrigger><SelectValue placeholder="اختر الجزء" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">كل الأجزاء</SelectItem>
                        {availableParts.map(part => (
                           part.partNum && <SelectItem key={part.partNum} value={`part-${part.partNum}`}>{part.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-6">
                 {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((q) => (
                        <QuestionCard key={q.id} question={q} />
                    ))
                ) : (
                    <Card className="text-center p-8 text-muted-foreground">
                        <CardHeader>
                            <CardTitle>لا توجد أسئلة تطابق هذا الفلتر</CardTitle>
                            <CardDescription>جرب تغيير خيارات الفلترة لعرض الأسئلة</CardDescription>
                        </CardHeader>
                    </Card>
                )}
            </div>
        </div>
    );
}
