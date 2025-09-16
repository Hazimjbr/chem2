
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import React from "react";
import { units } from "@/data/materials";
import type { DocumentData } from 'firebase/firestore';
import type { QuizResult } from "@/components/quiz";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

// Helper function to map lessonId (which is a URL path) to a human-readable title
export const getLessonTitle = (lessonId: string): string => {
    // Example lessonId: "/materials/semester-1/unit-1/lesson-2/part-3" or "/materials/semester-1/unit-1/section-5"
    if (!lessonId) return "درس غير معروف";
    
    const pathParts = lessonId.split('/').filter(p => p); // remove empty parts

    const unitIdentifier = pathParts.find(p => p.startsWith('unit-'));
    if (!unitIdentifier) return lessonId; // Return raw path if no unit found

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
            // Avoid repetition like "الوحدة 1: حالات المادة / مراجعة الوحدة"
            if (section.title.includes(unit.title.split(':')[0])) {
                return section.title;
            }
            return `${unit.title.split(':')[0]} / ${section.title}`;
        }
    }

    return unit.title; // Fallback to unit title
}


export interface NextStep {
    type: 'next' | 'weak';
    lessonTitle: string;
    path: string;
    // For 'next' type
    completedParts?: number;
    totalParts?: number;
    // For 'weak' type
    score?: number;
}


export function calculateNextStep(progressData: DocumentData | null): NextStep | null {
    if (!progressData) return null;

    const completedLessons: Set<string> = new Set(progressData.completedLessons || []);
    const quizHistory: QuizResult[] = progressData.quizHistory || [];

    // 1. Find the weakest lesson from quiz history (difficulty > 0.5)
    const studentQuizzes = quizHistory.filter(r => r.difficulty > 0.5);
    if (studentQuizzes.length > 0) {
        const weakestQuiz = studentQuizzes.reduce((min, current) => (current.score < min.score) ? current : min);
        
        // If the weakest score is below a threshold (e.g., 70%), recommend reviewing it.
        if (weakestQuiz.score < 0.7) {
            return {
                type: 'weak',
                lessonTitle: getLessonTitle(weakestQuiz.lessonId),
                path: weakestQuiz.lessonId,
                score: Math.round(weakestQuiz.score * 100),
            };
        }
    }

    // 2. If all scores are good, find the next uncompleted lesson
    for (const unit of units) {
        for (const lesson of unit.lessons) {
             if (lesson.parts.length === 0) continue;
             let completedInThisLesson = 0;
             let firstUncompletedPathInThisLesson = '';
             for (const part of lesson.parts) {
                const path = constructPath(unit.id, lesson, part);
                if (completedLessons.has(path)) {
                    completedInThisLesson++;
                } else if (!firstUncompletedPathInThisLesson) {
                    firstUncompletedPathInThisLesson = path;
                }
             }
             if (firstUncompletedPathInThisLesson) {
                return {
                    type: 'next',
                    lessonTitle: lesson.title,
                    path: firstUncompletedPathInThisLesson,
                    completedParts: completedInThisLesson,
                    totalParts: lesson.parts.length,
                };
             }
        }
    }

    return null; // All lessons are completed
}
