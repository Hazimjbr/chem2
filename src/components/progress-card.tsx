
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
    { top: '5%', left: '5%' },
    { top: '10%', right: '25%' },
    { top: '5%', left: '35%' },
    { top: '10%', right: '2%' },
];

const bottomPositions = [
    { bottom: '5%', left: '20%' },
    { bottom: '10%', right: '40%' },
    { bottom: '5%', left: '55%' },
    { bottom: '10%', right: '15%' },
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

    const allUnits = [...units, ...Array(4).fill(null)];

    return (
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Award className="h-6 w-6 text-primary" />
                    خريطة رحلتك التعليمية
                </CardTitle>
                <CardDescription>
                    تابع رحلتك في احتلال القلاع التعليمية!
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="relative w-full h-[450px] bg-green-500/10 rounded-lg p-4 overflow-hidden">
                    {/* River and Bridge */}
                    <svg className="absolute inset-0 w-full h-full" data-ai-hint="river path map">
                        <path 
                            d="M -50 225 C 100 205, 300 245, 500 225"
                            stroke="hsl(var(--primary))" 
                            strokeWidth="30" 
                            fill="none"
                        />
                    </svg>
                    
                    {/* Top Castles */}
                    <div className="absolute inset-x-0 top-0 h-1/2">
                         <h3 className="absolute top-2 right-4 text-lg font-bold text-background/80">الفصل الأول</h3>
                        {allUnits.slice(0, 4).map((unit, index) => (
                            <div
                                key={`top-castle-${index}`}
                                className="absolute w-24 h-32"
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
                       <h3 className="absolute bottom-2 left-4 text-lg font-bold text-background/80">الفصل الثاني</h3>
                         {allUnits.slice(4).map((unit, index) => (
                            <div
                                key={`bottom-castle-${index}`}
                                className="absolute w-24 h-32"
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
