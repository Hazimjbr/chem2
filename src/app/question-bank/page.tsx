

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Library, Loader2, ShieldAlert, BarChart3 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils.tsx';
import type { QuizQuestion as BaseQuizQuestion } from '@/components/quiz';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { units } from '@/data/materials';
import { useApp } from '@/context/CurriculumContext';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

export interface LevelStats {
  lvl1: number;
  lvl2: number;
  lvl3: number;
}

export interface PartStats {
  title: string;
  stats: LevelStats;
}

export interface LessonStats {
  title: string;
  parts: PartStats[];
}

export interface UnitStats {
  title: string;
  lessons: LessonStats[];
}

// Helper function to construct a unique ID for a lesson or section
const getLessonId = (lesson: any) => lesson.lessonNum ? `lesson-${lesson.lessonNum}` : `section-${lesson.sectionNum}`;


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


const StatisticsDialog = ({ stats }: { stats: UnitStats[] }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline"><BarChart3 className="ml-2 h-4 w-4" /> عرض إحصائيات الأسئلة</Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>إحصائيات بنك الأسئلة</DialogTitle>
                <DialogDescription>
                    نظرة شاملة على توزيع الأسئلة حسب الوحدة والدرس ومستوى الصعوبة.
                </DialogDescription>
            </DialogHeader>
            <Accordion type="single" collapsible className="w-full">
                {stats.map((unit, unitIndex) => (
                    <AccordionItem key={`unit-${unitIndex}`} value={`unit-${unitIndex}`}>
                        <AccordionTrigger>{unit.title}</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4">
                                {unit.lessons.map((lesson, lessonIndex) => (
                                     <Card key={`lesson-${lessonIndex}`} className="bg-muted/50">
                                         <CardHeader className="p-3">
                                             <CardTitle className="text-base">{lesson.title}</CardTitle>
                                         </CardHeader>
                                         <CardContent className="p-3">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>الجزء</TableHead>
                                                        <TableHead className="text-center">المستوى 1</TableHead>
                                                        <TableHead className="text-center">المستوى 2</TableHead>
                                                        <TableHead className="text-center">المستوى 3</TableHead>
                                                        <TableHead className="text-center font-bold">المجموع</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {lesson.parts.map((part, partIndex) => {
                                                        const total = part.stats.lvl1 + part.stats.lvl2 + part.stats.lvl3;
                                                        return (
                                                            <TableRow key={`part-${partIndex}`}>
                                                                <TableCell className="font-medium">{part.title}</TableCell>
                                                                <TableCell className="text-center">{part.stats.lvl1}</TableCell>
                                                                <TableCell className="text-center">{part.stats.lvl2}</TableCell>
                                                                <TableCell className="text-center">{part.stats.lvl3}</TableCell>
                                                                <TableCell className="text-center font-bold">{total}</TableCell>
                                                            </TableRow>
                                                        )
                                                    })}
                                                </TableBody>
                                            </Table>
                                         </CardContent>
                                     </Card>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </DialogContent>
    </Dialog>
);


export default function QuestionBankPage() {
    const { currentUser, isLoading } = useApp();
    const [allQuestions, setAllQuestions] = useState<SourcedQuizQuestion[]>([]);
    const [questionsLoading, setQuestionsLoading] = useState(true);
    const [selectedUnit, setSelectedUnit] = useState(() => getInitialState('questionBank_unit', 'all'));
    const [selectedLesson, setSelectedLesson] = useState(() => getInitialState('questionBank_lesson', 'all'));
    const [selectedPart, setSelectedPart] = useState(() => getInitialState('questionBank_part', 'all'));


    useEffect(() => {
        const loadQuestions = async () => {
            setQuestionsLoading(true);

            const examModulesMap = {
                '/materials/semester-1/unit-1/lesson-1/part-1': () => import('@/app/materials/semester-1/unit-1/lesson-1/part-1/exam'),
                '/materials/semester-1/unit-1/lesson-1/part-2': () => import('@/app/materials/semester-1/unit-1/lesson-1/part-2/exam'),
                '/materials/semester-1/unit-1/lesson-1/part-3': () => import('@/app/materials/semester-1/unit-1/lesson-1/part-3/exam'),
                '/materials/semester-1/unit-1/lesson-1/part-4': () => import('@/app/materials/semester-1/unit-1/lesson-1/part-4/exam'),
                '/materials/semester-1/unit-1/lesson-1/part-5': () => import('@/app/materials/semester-1/unit-1/lesson-1/part-5/exam'),
                '/materials/semester-1/unit-1/lesson-1/part-6': () => import('@/app/materials/semester-1/unit-1/lesson-1/part-6/exam'),
                '/materials/semester-1/unit-1/lesson-1/part-7': () => import('@/app/materials/semester-1/unit-1/lesson-1/part-7/exam'),
                '/materials/semester-1/unit-1/lesson-1/part-8': () => import('@/app/materials/semester-1/unit-1/lesson-1/part-8/exam'),
                '/materials/semester-1/unit-1/lesson-1/part-9': () => import('@/app/materials/semester-1/unit-1/lesson-1/part-9/exam'),
                '/materials/semester-1/unit-1/lesson-1/part-10': () => import('@/app/materials/semester-1/unit-1/lesson-1/part-10/exam'),
                '/materials/semester-1/unit-1/lesson-2/part-1': () => import('@/app/materials/semester-1/unit-1/lesson-2/part-1/exam'),
                '/materials/semester-1/unit-1/lesson-2/part-2': () => import('@/app/materials/semester-1/unit-1/lesson-2/part-2/exam'),
                '/materials/semester-1/unit-1/lesson-2/part-3': () => import('@/app/materials/semester-1/unit-1/lesson-2/part-3/exam'),
                '/materials/semester-1/unit-1/lesson-2/part-4': () => import('@/app/materials/semester-1/unit-1/lesson-2/part-4/exam'),
                '/materials/semester-1/unit-1/lesson-2/part-5': () => import('@/app/materials/semester-1/unit-1/lesson-2/part-5/exam'),
                '/materials/semester-1/unit-1/lesson-3/part-1': () => import('@/app/materials/semester-1/unit-1/lesson-3/part-1/exam'),
                '/materials/semester-1/unit-1/lesson-3/part-2': () => import('@/app/materials/semester-1/unit-1/lesson-3/part-2/exam'),
                '/materials/semester-1/unit-1/lesson-3/part-3': () => import('@/app/materials/semester-1/unit-1/lesson-3/part-3/exam'),
                '/materials/semester-1/unit-1/lesson-3/part-4': () => import('@/app/materials/semester-1/unit-1/lesson-3/part-4/exam'),
                '/materials/semester-1/unit-1/lesson-3/part-5': () => import('@/app/materials/semester-1/unit-1/lesson-3/part-5/exam'),
                '/materials/semester-1/unit-1/section-4/part-1': () => import('@/app/materials/semester-1/unit-1/section-4/part-1/exam'),
                '/materials/semester-1/unit-1/section-4/part-2': () => import('@/app/materials/semester-1/unit-1/section-4/part-2/exam'),
                '/materials/semester-1/unit-1/section-5': () => import('@/app/materials/semester-1/unit-1/section-5/exam'),
                '/materials/semester-1/unit-2/lesson-1/part-1': () => import('@/app/materials/semester-1/unit-2/lesson-1/part-1/exam'),
                '/materials/semester-1/unit-2/lesson-1/part-2': () => import('@/app/materials/semester-1/unit-2/lesson-1/part-2/exam'),
                '/materials/semester-1/unit-2/lesson-1/part-3': () => import('@/app/materials/semester-1/unit-2/lesson-1/part-3/exam'),
            };

            const loadedQuestions: SourcedQuizQuestion[] = [];
            
            for (const unit of units) {
                for (const lesson of unit.lessons) {
                    const lessonId = getLessonId(lesson);
                    if (lesson.parts.length > 0) {
                        for (const part of lesson.parts) {
                            const path = `/materials/semester-1/${unit.id}/${lessonId}${part.partNum ? `/part-${part.partNum}` : ''}`;
                            // @ts-ignore
                            const moduleLoader = examModulesMap[path];
                            if (moduleLoader) {
                                const module = await moduleLoader();
                                const sourceInfo = {
                                    unitId: unit.id, unitTitle: unit.title,
                                    lessonId: lessonId, lessonTitle: lesson.title,
                                    partId: part.partNum ? `part-${part.partNum}` : undefined, partTitle: part.title,
                                };
                                if (module.staticQuizLvl1) loadedQuestions.push(...module.staticQuizLvl1.map((q: any, i: number) => ({ ...q, id: `${path}-lvl1-${i}`, source: sourceInfo, level: 1 })));
                                if (module.staticQuizLvl2) loadedQuestions.push(...module.staticQuizLvl2.map((q: any, i: number) => ({ ...q, id: `${path}-lvl2-${i}`, source: sourceInfo, level: 2 })));
                                if (module.staticQuizLvl3) loadedQuestions.push(...module.staticQuizLvl3.map((q: any, i: number) => ({ ...q, id: `${path}-lvl3-${i}`, source: sourceInfo, level: 3 })));
                            }
                        }
                    } else {
                        const path = `/materials/semester-1/${unit.id}/${lessonId}`;
                        // @ts-ignore
                        const moduleLoader = examModulesMap[path];
                        if (moduleLoader) {
                            const module = await moduleLoader();
                            const sourceInfo = { unitId: unit.id, unitTitle: unit.title, lessonId: lessonId, lessonTitle: lesson.title };
                            if (module.staticQuizLvl1) loadedQuestions.push(...module.staticQuizLvl1.map((q: any, i: number) => ({ ...q, id: `${path}-lvl1-${i}`, source: sourceInfo, level: 1 })));
                            if (module.staticQuizLvl2) loadedQuestions.push(...module.staticQuizLvl2.map((q: any, i: number) => ({ ...q, id: `${path}-lvl2-${i}`, source: sourceInfo, level: 2 })));
                            if (module.staticQuizLvl3) loadedQuestions.push(...module.staticQuizLvl3.map((q: any, i: number) => ({ ...q, id: `${path}-lvl3-${i}`, source: sourceInfo, level: 3 })));
                        }
                    }
                }
            }
            setAllQuestions(loadedQuestions);
            setQuestionsLoading(false);
        };

        if (currentUser?.role === 'admin') {
            loadQuestions();
        } else {
            setQuestionsLoading(false);
        }
    }, [currentUser]);


    // Save filter state to localStorage whenever it changes
    useEffect(() => { localStorage.setItem('questionBank_unit', selectedUnit); }, [selectedUnit]);
    useEffect(() => { localStorage.setItem('questionBank_lesson', selectedLesson); }, [selectedLesson]);
    useEffect(() => { localStorage.setItem('questionBank_part', selectedPart); }, [selectedPart]);
    
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
    }, [allQuestions, selectedUnit, selectedLesson, selectedPart]);

    const quizStatistics = useMemo((): UnitStats[] => {
        if (allQuestions.length === 0) return [];
        return units.map(unit => ({
            title: unit.title,
            lessons: unit.lessons.map(lesson => ({
                title: lesson.title,
                parts: lesson.parts.map(part => {
                    const partId = part.partNum ? `part-${part.partNum}` : undefined;
                    const lessonId = getLessonId(lesson);
                    
                    const getCount = (level: number) => allQuestions.filter(q => 
                        q.source.unitId === unit.id && q.source.lessonId === lessonId && q.source.partId === partId && q.level === level
                    ).length;
                    
                    const getCountForLessonWithoutParts = (level: number) => allQuestions.filter(q =>
                        q.source.unitId === unit.id && q.source.lessonId === lessonId && !q.source.partId && q.level === level
                    ).length;

                    if (lesson.parts.length === 1 && !part.partNum) {
                         return {
                            title: part.title,
                            stats: {
                                lvl1: getCountForLessonWithoutParts(1),
                                lvl2: getCountForLessonWithoutParts(2),
                                lvl3: getCountForLessonWithoutParts(3),
                            }
                        }
                    }

                    return {
                        title: part.title,
                        stats: { lvl1: getCount(1), lvl2: getCount(2), lvl3: getCount(3) }
                    };
                }),
            })),
        }));
    }, [allQuestions]);


    if (isLoading || (currentUser?.role === 'admin' && questionsLoading)) {
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
            
            <div className="mb-6 space-y-2 max-w-4xl mx-auto" dir="rtl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <div className="flex justify-center">
                    {quizStatistics.length > 0 && <StatisticsDialog stats={quizStatistics} />}
                </div>
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
