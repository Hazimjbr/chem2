
export interface Element {
  name: string;
  symbol: string;
  number: number;
  atomic_mass: number | string; // string for elements with no stable isotopes
  category: string;
  gridRow: number;
  gridColumn: number;
}

export const elements: Element[] = [
  // name, symbol, number, atomic_mass, category, gridRow, gridColumn
  { name: 'هيدروجين', symbol: 'H', number: 1, atomic_mass: 1.008, category: 'nonmetal', gridRow: 1, gridColumn: 1 },
  { name: 'هيليوم', symbol: 'He', number: 2, atomic_mass: 4.0026, category: 'noble-gas', gridRow: 1, gridColumn: 18 },
  { name: 'ليثيوم', symbol: 'Li', number: 3, atomic_mass: 6.94, category: 'alkali-metal', gridRow: 2, gridColumn: 1 },
  { name: 'بيريليوم', symbol: 'Be', number: 4, atomic_mass: 9.0122, category: 'alkaline-earth-metal', gridRow: 2, gridColumn: 2 },
  { name: 'بورون', symbol: 'B', number: 5, atomic_mass: 10.81, category: 'metalloid', gridRow: 2, gridColumn: 13 },
  { name: 'كربون', symbol: 'C', number: 6, atomic_mass: 12.011, category: 'nonmetal', gridRow: 2, gridColumn: 14 },
  { name: 'نيتروجين', symbol: 'N', number: 7, atomic_mass: 14.007, category: 'nonmetal', gridRow: 2, gridColumn: 15 },
  { name: 'أكسجين', symbol: 'O', number: 8, atomic_mass: 15.999, category: 'nonmetal', gridRow: 2, gridColumn: 16 },
  { name: 'فلور', symbol: 'F', number: 9, atomic_mass: 18.998, category: 'halogen', gridRow: 2, gridColumn: 17 },
  { name: 'نيون', symbol: 'Ne', number: 10, atomic_mass: 20.180, category: 'noble-gas', gridRow: 2, gridColumn: 18 },
  { name: 'صوديوم', symbol: 'Na', number: 11, atomic_mass: 22.990, category: 'alkali-metal', gridRow: 3, gridColumn: 1 },
  { name: 'ماغنسيوم', symbol: 'Mg', number: 12, atomic_mass: 24.305, category: 'alkaline-earth-metal', gridRow: 3, gridColumn: 2 },
  { name: 'ألومنيوم', symbol: 'Al', number: 13, atomic_mass: 26.982, category: 'post-transition-metal', gridRow: 3, gridColumn: 13 },
  { name: 'سيليكون', symbol: 'Si', number: 14, atomic_mass: 28.085, category: 'metalloid', gridRow: 3, gridColumn: 14 },
  { name: 'فسفور', symbol: 'P', number: 15, atomic_mass: 30.974, category: 'nonmetal', gridRow: 3, gridColumn: 15 },
  { name: 'كبريت', symbol: 'S', number: 16, atomic_mass: 32.06, category: 'nonmetal', gridRow: 3, gridColumn: 16 },
  { name: 'كلور', symbol: 'Cl', number: 17, atomic_mass: 35.45, category: 'halogen', gridRow: 3, gridColumn: 17 },
  { name: 'أرجون', symbol: 'Ar', number: 18, atomic_mass: 39.948, category: 'noble-gas', gridRow: 3, gridColumn: 18 },
  { name: 'بوتاسيوم', symbol: 'K', number: 19, atomic_mass: 39.098, category: 'alkali-metal', gridRow: 4, gridColumn: 1 },
  { name: 'كالسيوم', symbol: 'Ca', number: 20, atomic_mass: 40.078, category: 'alkaline-earth-metal', gridRow: 4, gridColumn: 2 },
  { name: 'سكانديوم', symbol: 'Sc', number: 21, atomic_mass: 44.956, category: 'transition-metal', gridRow: 4, gridColumn: 3 },
  { name: 'تيتانيوم', symbol: 'Ti', number: 22, atomic_mass: 47.867, category: 'transition-metal', gridRow: 4, gridColumn: 4 },
  { name: 'فاناديوم', symbol: 'V', number: 23, atomic_mass: 50.942, category: 'transition-metal', gridRow: 4, gridColumn: 5 },
  { name: 'كروم', symbol: 'Cr', number: 24, atomic_mass: 51.996, category: 'transition-metal', gridRow: 4, gridColumn: 6 },
  { name: 'منغنيز', symbol: 'Mn', number: 25, atomic_mass: 54.938, category: 'transition-metal', gridRow: 4, gridColumn: 7 },
  { name: 'حديد', symbol: 'Fe', number: 26, atomic_mass: 55.845, category: 'transition-metal', gridRow: 4, gridColumn: 8 },
  { name: 'كوبالت', symbol: 'Co', number: 27, atomic_mass: 58.933, category: 'transition-metal', gridRow: 4, gridColumn: 9 },
  { name: 'نيكل', symbol: 'Ni', number: 28, atomic_mass: 58.693, category: 'transition-metal', gridRow: 4, gridColumn: 10 },
  { name: 'نحاس', symbol: 'Cu', number: 29, atomic_mass: 63.546, category: 'transition-metal', gridRow: 4, gridColumn: 11 },
  { name: 'خارصين', symbol: 'Zn', number: 30, atomic_mass: 65.38, category: 'transition-metal', gridRow: 4, gridColumn: 12 },
  { name: 'جاليوم', symbol: 'Ga', number: 31, atomic_mass: 69.723, category: 'post-transition-metal', gridRow: 4, gridColumn: 13 },
  { name: 'جرمانيوم', symbol: 'Ge', number: 32, atomic_mass: 72.63, category: 'metalloid', gridRow: 4, gridColumn: 14 },
  { name: 'زرنيخ', symbol: 'As', number: 33, atomic_mass: 74.922, category: 'metalloid', gridRow: 4, gridColumn: 15 },
  { name: 'سيلينيوم', symbol: 'Se', number: 34, atomic_mass: 78.971, category: 'nonmetal', gridRow: 4, gridColumn: 16 },
  { name: 'بروم', symbol: 'Br', number: 35, atomic_mass: 79.904, category: 'halogen', gridRow: 4, gridColumn: 17 },
  { name: 'كريبتون', symbol: 'Kr', number: 36, atomic_mass: 83.798, category: 'noble-gas', gridRow: 4, gridColumn: 18 },
  { name: 'روبيديوم', symbol: 'Rb', number: 37, atomic_mass: 85.468, category: 'alkali-metal', gridRow: 5, gridColumn: 1 },
  { name: 'سترونشيوم', symbol: 'Sr', number: 38, atomic_mass: 87.62, category: 'alkaline-earth-metal', gridRow: 5, gridColumn: 2 },
  { name: 'إتريوم', symbol: 'Y', number: 39, atomic_mass: 88.906, category: 'transition-metal', gridRow: 5, gridColumn: 3 },
  { name: 'زركونيوم', symbol: 'Zr', number: 40, atomic_mass: 91.224, category: 'transition-metal', gridRow: 5, gridColumn: 4 },
  { name: 'نيوبيوم', symbol: 'Nb', number: 41, atomic_mass: 92.906, category: 'transition-metal', gridRow: 5, gridColumn: 5 },
  { name: 'موليبدنوم', symbol: 'Mo', number: 42, atomic_mass: 95.96, category: 'transition-metal', gridRow: 5, gridColumn: 6 },
  { name: 'تكنيشيوم', symbol: 'Tc', number: 43, atomic_mass: '(98)', category: 'transition-metal', gridRow: 5, gridColumn: 7 },
  { name: 'روثينيوم', symbol: 'Ru', number: 44, atomic_mass: 101.07, category: 'transition-metal', gridRow: 5, gridColumn: 8 },
  { name: 'روديوم', symbol: 'Rh', number: 45, atomic_mass: 102.91, category: 'transition-metal', gridRow: 5, gridColumn: 9 },
  { name: 'بالاديوم', symbol: 'Pd', number: 46, atomic_mass: 106.42, category: 'transition-metal', gridRow: 5, gridColumn: 10 },
  { name: 'فضة', symbol: 'Ag', number: 47, atomic_mass: 107.87, category: 'transition-metal', gridRow: 5, gridColumn: 11 },
  { name: 'كادميوم', symbol: 'Cd', number: 48, atomic_mass: 112.41, category: 'transition-metal', gridRow: 5, gridColumn: 12 },
  { name: 'إنديوم', symbol: 'In', number: 49, atomic_mass: 114.82, category: 'post-transition-metal', gridRow: 5, gridColumn: 13 },
  { name: 'قصدير', symbol: 'Sn', number: 50, atomic_mass: 118.71, category: 'post-transition-metal', gridRow: 5, gridColumn: 14 },
  { name: 'إثمد', symbol: 'Sb', number: 51, atomic_mass: 121.76, category: 'metalloid', gridRow: 5, gridColumn: 15 },
  { name: 'تيلوريوم', symbol: 'Te', number: 52, atomic_mass: 127.60, category: 'metalloid', gridRow: 5, gridColumn: 16 },
  { name: 'يود', symbol: 'I', number: 53, atomic_mass: 126.90, category: 'halogen', gridRow: 5, gridColumn: 17 },
  { name: 'زينون', symbol: 'Xe', number: 54, atomic_mass: 131.29, category: 'noble-gas', gridRow: 5, gridColumn: 18 },
];

    