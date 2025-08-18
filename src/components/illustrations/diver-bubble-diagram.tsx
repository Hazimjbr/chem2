
'use client';

export default function DiverBubbleDiagram() {
    return (
        <div className="w-full md:w-1/2" data-ai-hint="diver bubble pressure">
             <svg viewBox="0 0 150 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <defs>
                    <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity: 0.8}} />
                    <stop offset="100%" style={{stopColor: 'hsl(var(--accent))', stopOpacity: 0.9}} />
                    </linearGradient>
                </defs>
                <rect width="150" height="200" fill="url(#waterGradient)"/>

                <circle cx="85" cy="180" r="15" fill="white" fillOpacity="0.5" stroke="white" strokeWidth="1"/>
                <text x="85" y="183" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">P ضغط عالٍ</text>

                <circle cx="105" cy="100" r="25" fill="white" fillOpacity="0.5" stroke="white" strokeWidth="1"/>

                <circle cx="115" cy="30" r="35" fill="white" fillOpacity="0.5" stroke="white" strokeWidth="1"/>
                 <text x="115" y="33" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">P ضغط منخفض</text>
                
                <path d="M 80 160 C 90 140, 100 120, 105 100" stroke="white" strokeWidth="1" strokeDasharray="2" fill="none"/>
                <path d="M 105 100 C 110 80, 115 50, 115 30" stroke="white" strokeWidth="1" strokeDasharray="2" fill="none"/>

                <text x="35" y="185" fontSize="24">🤿</text>
            </svg>
        </div>
    )
}
