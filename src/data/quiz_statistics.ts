
'use client';

// This file is generated from quiz_statistics.md and contains the statistics of the question bank.

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

export const quizStatistics: UnitStats[] = [
  {
    title: 'الوحدة 1: حالات المادة',
    lessons: [
      {
        title: 'الدرس 1: الحالة الغازية',
        parts: [
          { title: 'نظرية الحركة الجزيئية', stats: { lvl1: 8, lvl2: 5, lvl3: 7 } },
          { title: 'مقدمة قوانين الغازات', stats: { lvl1: 5, lvl2: 7, lvl3: 5 } },
          { title: 'قانون بويل', stats: { lvl1: 6, lvl2: 6, lvl3: 5 } },
          { title: 'قانون شارل', stats: { lvl1: 5, lvl2: 6, lvl3: 6 } },
          { title: 'قانون جاي لوساك', stats: { lvl1: 5, lvl2: 6, lvl3: 5 } },
          { title: 'القانون الجامع للغازات', stats: { lvl1: 5, lvl2: 5, lvl3: 5 } },
          { title: 'قانون أفوجادرو', stats: { lvl1: 5, lvl2: 5, lvl3: 8 } },
          { title: 'قانون الغاز المثالي', stats: { lvl1: 5, lvl2: 6, lvl3: 5 } },
          { title: 'قانون دالتون للضغوط الجزئية', stats: { lvl1: 5, lvl2: 5, lvl3: 5 } },
          { title: 'قانون جراهام للانتشار والتدفق', stats: { lvl1: 5, lvl2: 5, lvl3: 5 } },
        ],
      },
      {
        title: 'الدرس 2: الحالة السائلة',
        parts: [
          { title: 'مقدمة عن المواد السائلة', stats: { lvl1: 5, lvl2: 5, lvl3: 6 } },
          { title: 'التبخر', stats: { lvl1: 8, lvl2: 10, lvl3: 6 } },
          { title: 'التكاثف', stats: { lvl1: 8, lvl2: 4, lvl3: 5 } },
          { title: 'الضغط البخاري', stats: { lvl1: 5, lvl2: 5, lvl3: 7 } },
          { title: 'درجة الغليان', stats: { lvl1: 5, lvl2: 5, lvl3: 7 } },
        ],
      },
      {
        title: 'الدرس 3: الحالة الصلبة',
        parts: [
          { title: 'مقدمة عن المواد الصلبة', stats: { lvl1: 5, lvl2: 4, lvl3: 5 } },
          { title: 'المواد الصلبة البلورية الجزيئية', stats: { lvl1: 6, lvl2: 5, lvl3: 5 } },
          { title: 'المواد الصلبة البلورية الشبكية التساهمية', stats: { lvl1: 5, lvl2: 5, lvl3: 5 } },
          { title: 'المواد الصلبة البلورية الفلزية', stats: { lvl1: 5, lvl2: 5, lvl3: 0 } },
          { title: 'المواد الصلبة البلورية الأيونية', stats: { lvl1: 5, lvl2: 5, lvl3: 0 } },
        ],
      },
      {
        title: 'الإثراء والتوسع',
        parts: [
          { title: 'الربط', stats: { lvl1: 4, lvl2: 0, lvl3: 0 } },
          { title: 'الإثراء', stats: { lvl1: 6, lvl2: 0, lvl3: 0 } },
        ],
      },
      {
        title: 'مراجعة الوحدة',
        parts: [
            { title: 'مراجعة الوحدة الأولى', stats: { lvl1: 9, lvl2: 6, lvl3: 15 } }
        ],
      },
    ],
  },
];
