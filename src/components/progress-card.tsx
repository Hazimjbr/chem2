
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useApp } from '@/context/CurriculumContext';
import { getUserProgress } from '@/lib/firebase/progress.actions';
import { units } from '@/data/materials';
import ProgressVessel from './progress-vessel';
import { Award, Loader2 } from 'lucide-react';

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

export default function ProgressCard() {
    const { currentUser } = useApp();
    const [progress, setProgress] = useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            if (!currentUser) return;
            setIsLoading(true);
            const progressData = await getUserProgress(currentUser.uid);
            const completedLessons = new Set(progressData?.completedLessons || []);
            const unitProgress: Record<string, number> = {};

            units.forEach(unit => {
                const totalParts = unit.lessons.reduce((acc, lesson) => acc + lesson.parts.length, 0);
                if (totalParts === 0) {
                    unitProgress[unit.id] = 0;
                    return;
                }
                const completedPartsInUnit = unit.lessons.reduce((acc, lesson) => {
                    const lessonCompletedParts = lesson.parts.filter(part => {
                        const path = constructPath(unit.id, lesson, part);
                        return completedLessons.has(path);
                    }).length;
                    return acc + lessonCompletedParts;
                }, 0);
                unitProgress[unit.id] = Math.round((completedPartsInUnit / totalParts) * 100);
            });
            setProgress(unitProgress);
            setIsLoading(false);
        };
        fetchProgress();
    }, [currentUser]);

    if (isLoading) {
        return (
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Award />
                        تقدمك في الوحدات
                    </CardTitle>
                    <CardDescription>عرض مرئي لإنجازك في كل وحدة دراسية.</CardDescription>
                </CardHeader>
                <div className="flex justify-center items-center h-48">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </Card>
        )
    }

    return (
        <Card className="mt-8">
             <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Award />
                    تقدمك في الوحدات
                </CardTitle>
                <CardDescription>عرض مرئي لإنجازك في كل وحدة دراسية.</CardDescription>
            </CardHeader>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                {units.map(unit => (
                    <ProgressVessel
                        key={unit.id}
                        label={unit.title}
                        percentage={progress[unit.id] || 0}
                    />
                ))}
            </div>
        </Card>
    );
}
