
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


const topPositions = [
    { top: '5%', left: '15%' },
    { top: '15%', left: '40%' },
    { top: '5%', left: '65%' },
    { top: '15%', left: '90%' },
];

const bottomPositions = [
    { bottom: '15%', left: '10%' },
    { bottom: '5%', left: '35%' },
    { bottom: '15%', left: '60%' },
    { bottom: '5%', left: '85%' },
];

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
            
            setProgress(newProgress);
        };

        fetchProgress();
    }, [currentUser]);

    const allUnits = [...units, ...Array(8 - units.length).fill(null)];

    return (
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Award className="h-6 w-6 text-primary" />
                    عدل تقدمك في الوحدات
                </CardTitle>
                <CardDescription>
                    تابع رحلتك في احتلال القلاع التعليمية!
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="relative w-full h-[450px] bg-green-500/10 rounded-lg p-4 overflow-hidden">
                    {/* River that spans the full width */}
                    <svg className="absolute inset-0 w-full h-full" data-ai-hint="river path map">
                        <path 
                            d="M -10 225 C 25% 205, 75% 245, 110% 225"
                            stroke="black"
                            strokeWidth="42"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <path 
                            d="M -10 225 C 25% 205, 75% 245, 110% 225"
                            stroke="hsl(var(--primary))" 
                            strokeWidth="40" 
                            fill="none"
                        />
                    </svg>
                    
                    {/* Top Castles */}
                    <div className="absolute inset-x-0 top-0 h-1/2">
                        {allUnits.slice(0, 4).map((unit, index) => (
                            <div
                                key={`top-castle-${index}`}
                                className="absolute w-24 h-32 transform -translate-x-1/2"
                                style={topPositions[index]}
                            >
                                <ProgressVessel 
                                    label={`${index + 1}`}
                                    percentage={unit ? (progress[unit.id] || 0) : 0}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Bottom Castles */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2">
                         {allUnits.slice(4, 8).map((unit, index) => (
                            <div
                                key={`bottom-castle-${index}`}
                                className="absolute w-24 h-32 transform -translate-x-1/2"
                                style={bottomPositions[index]}
                            >
                                <ProgressVessel 
                                    label={`${index + 5}`}
                                    percentage={unit ? (progress[unit.id] || 0) : 0}
                                />
                            </div>
                        ))}
                    </div>
                 </div>
            </CardContent>
        </Card>
    );
}
