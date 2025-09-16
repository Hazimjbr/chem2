
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import React from "react";
import { units } from "@/data/materials";
import type { DocumentData } from 'firebase/firestore';
import type { QuizResult } from "@/components/quiz";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to map lessonId (which is a URL path) to a human-readable title
export const getLessonTitle = (lessonId: string): string => {
    if (!lessonId) return "درس غير معروف";
    
    const pathParts = lessonId.split('/').filter(p => p); 

    const unitIdentifier = pathParts.find(p => p.startsWith('unit-'));
    if (!unitIdentifier) return lessonId; 

    const unit = units.find(u => u.id === unitIdentifier);
    if (!unit) return lessonId;

    const lessonIdentifier = pathParts.find(p => p.startsWith('lesson-'));
    const sectionIdentifier = pathParts.find(p => p.startsWith('section-'));

    if (lessonIdentifier) {
        const lessonNum = parseInt(lessonIdentifier.replace('lesson-', ''), 10);
        const lesson = unit.lessons.find(l => l.lessonNum === lessonNum);
        if (!lesson) return unit.title;

        const partIdentifier = pathParts.find(p => p.startsWith('part-'));
        if (partIdentifier) {
            const partNum = parseInt(partIdentifier.replace('part-', ''), 10);
            const part = lesson.parts.find(p => p.partNum === partNum);
            return part ? `${lesson.title} / ${part.title}` : lesson.title;
        }
        return lesson.title;
    }

    if (sectionIdentifier) {
        const sectionNum = parseInt(sectionIdentifier.replace('section-', ''), 10);
        const section = unit.lessons.find(l => l.sectionNum === sectionNum);
         if (section) {
            if (section.title.includes(unit.title.split(':')[0])) {
                return section.title;
            }
            return `${unit.title.split(':')[0]} / ${section.title}`;
        }
    }

    return unit.title;
}


export interface NextStep {
    type: 'next' | 'weak';
    lessonTitle: string;
    path: string;
    completedParts?: number;
    totalParts?: number;
    nextPartPath?: string;
    score?: number;
}

const constructPath = (unitId: string, lesson: any, part: any) => {
    const unitNum = unitId.replace('unit-', '');
    let path = `/materials/semester-1/unit-${unitNum}`;
    if (lesson.lessonNum) {
        path += `/lesson-${lesson.lessonNum}`;
    } else if (lesson.sectionNum) {
        path += `/section-${lesson.sectionNum}`;
    }
    if (part.partNum) {
        path += `/part-${part.partNum}`;
    }
    return path;
}

export function calculateNextStep(progressData: DocumentData | null): NextStep | null {
    if (!progressData) return null;

    const completedLessons: Set<string> = new Set(progressData.completedLessons || []);
    const quizHistory: QuizResult[] = progressData.quizHistory || [];
    
    const studentQuizzes = quizHistory.filter(result => result.difficulty > 0.5);
    if (studentQuizzes.length > 0) {
        const weakestQuiz = studentQuizzes.reduce((minResult, currentResult) => 
            (currentResult.score < minResult.score) ? currentResult : minResult
        );
        
        if (weakestQuiz.score < 0.7) {
            return {
                type: 'weak',
                lessonTitle: getLessonTitle(weakestQuiz.lessonId),
                path: weakestQuiz.lessonId,
                score: Math.round(weakestQuiz.score * 100),
            };
        }
    }

    for (const unit of units) {
        for (const lesson of unit.lessons) {
            if (!lesson.parts || lesson.parts.length === 0 || !lesson.parts[0].partNum) {
                continue;
            }

            const totalParts = lesson.parts.length;
            let completedPartsInThisLesson = 0;
            let firstUncompletedPath = '';

            for (const part of lesson.parts) {
                const path = constructPath(unit.id, lesson, part);
                if (completedLessons.has(path)) {
                    completedPartsInThisLesson++;
                } else if (!firstUncompletedPath) {
                    firstUncompletedPath = path;
                }
            }

            if (firstUncompletedPath) {
                return {
                    type: 'next',
                    lessonTitle: lesson.title,
                    path: firstUncompletedPath,
                    nextPartPath: firstUncompletedPath,
                    completedParts: completedPartsInThisLesson,
                    totalParts: totalParts,
                };
            }
        }
    }
    
    return null;
}
