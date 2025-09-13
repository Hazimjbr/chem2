
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import ProgressVessel from './progress-vessel';
import { units } from '@/data/materials';
import { useMemo, useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils.tsx';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useIsMobile } from '@/hooks/use-mobile';
import { useApp } from '@/context/CurriculumContext';
import { getUserProgress } from '@/lib/firebase/progress.actions';
import type { DocumentData } from 'firebase/firestore';


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


const topPositions = {
    mobile: [
        { top: '5%', left: '15%' },
        { top: '15%', left: '40%' },
        { top: '5%', left: '65%' },
        { top: '15%', left: '90%' },
    ],
    desktop: [
        { top: '5%', left: '15%' },
        { top: '15%', left: '40%' },
        { top: '5%', left: '65%' },
        { top: '15%', left: '90%' },
    ]
};

const bottomPositions = {
    mobile: [
         { bottom: '15%', left: '10%' },
        { bottom: '5%', left: '35%' },
        { bottom: '15%', left: '60%' },
        { bottom: '5%', left: '85%' },
    ],
    desktop: [
         { bottom: '15%', left: '10%' },
        { bottom: '5%', left: '35%' },
        { bottom: '15%', left: '60%' },
        { bottom: '5%', left: '85%' },
    ]
};


interface ProgressCardProps {
    lastVisitedLesson: string;
}

export default function ProgressCard({ lastVisitedLesson }: ProgressCardProps) {
    const { currentUser } = useApp();
    const [userProgress, setUserProgress] = useState<DocumentData | null>(null);
    const isMobile = useIsMobile();
    
    useEffect(() => {
        const fetchProgress = async () => {
            if (!currentUser) return;
            const progress = await getUserProgress(currentUser.uid);
            setUserProgress(progress);
        };
        fetchProgress();
    }, [currentUser]);

    const allUnits = useMemo(() => [...units, ...Array(8 - units.length).fill(null)], []);
    
    const lastVisitedUnitId = useMemo(() => {
        if (!lastVisitedLesson) return null;
        const match = lastVisitedLesson.match(/unit-(\d+)/);
        return match ? `unit-${match[1]}` : null;
    }, [lastVisitedLesson]);
    
    const progressPercentages = useMemo(() => {
        const completedLessons = new Set(userProgress?.completedLessons || []);
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
        
        return newProgress;
    }, [userProgress]);

    
    const getPositionForUnit = useMemo(() => (unitId: string) => {
        const index = allUnits.findIndex(u => u && u.id === unitId);
        if (index === -1) return null;

        const posGroup = isMobile ? 'mobile' : 'desktop';
        if (index < 4) { // Top row
            return topPositions[posGroup][index];
        } else { // Bottom row
            return bottomPositions[posGroup][index - 4];
        }
    }, [isMobile, allUnits]);
    
    const lastVisitedPosition = useMemo(() => {
        if (!lastVisitedUnitId) return null;
        
        const basePosition = getPositionForUnit(lastVisitedUnitId);
        if (!basePosition) return null;
        
         if (basePosition.top) {
            const topValue = parseInt(basePosition.top.replace('%', ''));
            return { ...basePosition, top: `${isMobile ? topValue + 20 : topValue + 23}%` };
        } else if (basePosition.bottom) {
            const bottomValue = parseInt(basePosition.bottom.replace('%', ''));
            return { ...basePosition, bottom: `${isMobile ? bottomValue + 23 : bottomValue + 23}%` };
        }
        
        return basePosition;

    }, [lastVisitedUnitId, getPositionForUnit, isMobile]);


    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-3xl font-bold">
                    أحكم سيطرتك على مملكة الكيمياء
                </CardTitle>
                <CardDescription>
                    خارطتك هنا. اختر قلعة لغزوها أو عزز سيطرتك عليها.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <div className={cn(
                    "relative w-full bg-map-background rounded-lg p-4 overflow-hidden",
                    isMobile ? "h-[250px]" : "h-[450px]"
                 )} data-ai-hint="fantasy map castles">
                    {/* River that spans the full width */}
                    <svg className="absolute inset-0 w-full h-full" data-ai-hint="river path map">
                        {/* River Border */}
                        <path 
                            d="M -50 225 C 100 205, 300 245, 835 225"
                            stroke="black"
                            strokeWidth="42"
                            fill="none"
                            strokeLinecap="round"
                            className="hidden md:block"
                        />
                        <path 
                            d="M -50 150 C 100 135, 300 165, 835 150"
                            stroke="black"
                            strokeWidth="28"
                            fill="none"
                            strokeLinecap="round"
                            className="block md:hidden"
                        />
                        {/* River Water */}
                         <path 
                            d="M -50 225 C 100 205, 300 245, 835 225"
                            stroke="hsl(var(--primary))" 
                            strokeWidth="40" 
                            fill="none"
                            className="hidden md:block"
                        />
                         <path 
                            d="M -50 150 C 100 135, 300 165, 835 150"
                            stroke="hsl(var(--primary))" 
                            strokeWidth="26" 
                            fill="none"
                            className="block md:hidden"
                        />
                    </svg>
                    
                    {/* Top Castles */}
                    <div className="absolute inset-x-0 top-0 h-1/2">
                        {allUnits.slice(0, 4).map((unit, index) => {
                           const path = unit ? `/materials/semester-1#${unit.id}` : '#';
                           const isClickable = unit && unit.lessons.some((l: any) => l.parts.length > 0);
                           
                           const Castle = (
                               <div
                                    className="absolute transform -translate-x-1/2 transition-transform hover:scale-105 w-16 h-24 md:w-24 md:h-32"
                                    style={isMobile ? topPositions.mobile[index] : topPositions.desktop[index]}
                                >
                                    <ProgressVessel 
                                        label={`${index + 1}`}
                                        percentage={unit ? progressPercentages[unit.id] || 0 : 0}
                                    />
                               </div>
                           );

                           return (
                               <div key={`top-castle-${index}`}>
                                {isClickable ? <Link href={path}>{Castle}</Link> : Castle}
                               </div>
                           )
                        })}
                    </div>

                    {/* Bottom Castles */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2">
                         {allUnits.slice(4, 8).map((unit, index) => {
                           const path = unit ? `/materials/semester-1#${unit.id}` : '#';
                           const isClickable = unit && unit.lessons.some((l: any) => l.parts.length > 0);
                           
                           const Castle = (
                               <div
                                    className="absolute transform -translate-x-1/2 transition-transform hover:scale-105 w-16 h-24 md:w-24 md:h-32"
                                    style={isMobile ? bottomPositions.mobile[index] : bottomPositions.desktop[index]}
                               >
                                     <ProgressVessel 
                                        label={`${index + 5}`}
                                        percentage={unit ? progressPercentages[unit.id] || 0 : 0}
                                    />
                               </div>
                           );

                           return (
                               <div key={`bottom-castle-${index}`}>
                                {isClickable ? <Link href={path}>{Castle}</Link> : Castle}
                               </div>
                           )
                        })}
                    </div>
                    
                    {lastVisitedPosition && lastVisitedLesson && (
                         <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                      <Link href={lastVisitedLesson}>
                                        <div className="absolute transform -translate-x-1/2 cursor-pointer animate-bounce"
                                            style={lastVisitedPosition}>
                                            <MapPin className="w-6 h-6 md:w-8 md:h-8 text-destructive drop-shadow-lg" />
                                        </div>
                                      </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>أنت هنا! أكمل من حيث توقفت.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                 </div>
            </CardContent>
        </Card>
    );
}
