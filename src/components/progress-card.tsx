
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

// Positions for the castles on the map [top, left/right]
const semester1Positions = [
    { top: '5%', left: '10%' },
    { top: '50%', left: '25%' },
    { top: '5%', right: '20%' },
    { top: '60%', right: '5%' },
];

const semester2Positions = [
    { top: '15%', left: '15%' },
    { top: '5%', right: '10%' },
    { top: '55%', right: '25%' },
    { top: '65%', left: '5%' },
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

    const semester1Units = units.slice(0, 4);
    const semester2Units = units.slice(4); // Assuming there might be more later

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
                 <div className="relative w-full h-[400px] bg-green-500/10 rounded-lg p-4 overflow-hidden">
                    {/* River and Bridge */}
                    <svg className="absolute inset-0 w-full h-full" data-ai-hint="river bridge map">
                        <path 
                            d="M 50 0 C 40 100, 60 150, 50 250 C 40 350, 60 400, 50 500" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth="20" 
                            fill="none" 
                            transform="translate(180, 0) scale(0.4, 0.8)"
                        />
                        <path
                            d="M 180 190 C 200 170, 220 170, 240 190"
                            stroke="#A98E71"
                            strokeWidth="5"
                            fill="none"
                        />
                         <line x1="185" y1="190" x2="185" y2="200" stroke="#A98E71" strokeWidth="2" />
                         <line x1="235" y1="190" x2="235" y2="200" stroke="#A98E71" strokeWidth="2" />
                    </svg>

                    {/* Semester 1 - Left Side */}
                    <div className="absolute inset-y-0 left-0 w-1/2">
                         <h3 className="absolute top-2 right-4 text-lg font-bold text-background/80">الفصل الأول</h3>
                        {semester1Units.map((unit, index) => (
                            <div
                                key={unit.id}
                                className="absolute w-24 h-32"
                                style={semester1Positions[index]}
                            >
                                <ProgressVessel 
                                    label={`${index + 1}`}
                                    percentage={progress[unit.id] || 0}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Semester 2 - Right Side */}
                    <div className="absolute inset-y-0 right-0 w-1/2">
                        <h3 className="absolute top-2 left-4 text-lg font-bold text-background/80">الفصل الثاني</h3>
                         {semester1Units.map((_, index) => ( // Using semester1Units length to create 4 castles
                            <div
                                key={`sem2-${index}`}
                                className="absolute w-24 h-32"
                                style={semester2Positions[index]}
                            >
                                <ProgressVessel 
                                    label={`${index + 5}`} // Continue numbering
                                    percentage={0} // Mock data for semester 2
                                />
                            </div>
                        ))}
                    </div>
                 </div>
            </CardContent>
        </Card>
    );
}
