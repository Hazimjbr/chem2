
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Award } from 'lucide-react';
import ProgressVessel from './progress-vessel';
import { units } from '@/data/materials';
import { useApp } from '@/context/CurriculumContext';
import { getUserProgress } from '@/lib/firebase/progress.actions';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils.tsx';

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
};

export default function ProgressCard() {
    const { currentUser } = useApp();
    const [progress, setProgress] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchProgress = async () => {
            if (!currentUser) return;

            const progressData = await getUserProgress(currentUser.uid);
            const completedLessons = new Set(progressData?.completedLessons || []);
            
            const newProgress: { [key: string]: number } = {};

            units.forEach(unit => {
                const totalPartsInUnit = unit.lessons.reduce((acc, lesson) => acc + lesson.parts.length, 0);
                if (totalPartsInUnit === 0) {
                    newProgress[unit.id] = 0;
                    return;
                };

                const completedPartsInUnit = unit.lessons.reduce((acc, lesson) => {
                    return acc + lesson.parts.filter(part => {
                        const path = constructPath(unit.id, lesson, part);
                        return completedLessons.has(path);
                    }).length;
                }, 0);

                newProgress[unit.id] = Math.round((completedPartsInUnit / totalPartsInUnit) * 100);
            });
            
            if (newProgress['unit-1'] !== undefined) {
                 newProgress['unit-1'] = 100;
            }
            
            setProgress(newProgress);
        };

        fetchProgress();
    }, [currentUser]);


    return (
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Award className="h-6 w-6 text-primary" />
                    تقدمك في وحدات الفصل الأول
                </CardTitle>
                <CardDescription>
                    تابع رحلتك في احتلال القلاع التعليمية!
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex flex-wrap items-end justify-center gap-x-4 gap-y-2 py-4">
                    {units.map((unit, index) => (
                        <div
                          key={unit.id}
                          className={cn(
                            "w-1/4 min-w-[100px]",
                            index === 1 && "mb-10", // Second castle lower
                            index === 2 && "mt-5"  // Third castle higher
                          )}
                        >
                            <ProgressVessel 
                                label={`${index + 1}`}
                                percentage={progress[unit.id] || 0}
                            />
                        </div>
                    ))}
                 </div>
            </CardContent>
        </Card>
    );
}
