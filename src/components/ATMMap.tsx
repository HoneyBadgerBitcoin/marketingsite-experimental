import React, { useEffect, useRef, useState } from 'react';

interface ATMLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  status: 'online' | 'offline' | 'maintenance';
  type: 'indoor' | 'outdoor';
}

const atmLocations: ATMLocation[] = [
  { id: '1', name: 'INS Market', address: '887 Dunsmur St, Vancouver', lat: 49.2827, lng: -123.1207, status: 'online', type: 'indoor' },
  { id: '2', name: 'J & J Market', address: '1319 Robson St, Vancouver', lat: 49.2863, lng: -123.1302, status: 'online', type: 'indoor' },
  { id: '3', name: 'Al-Madina Store', address: '516 Pender St W, Vancouver', lat: 49.2808, lng: -123.1106, status: 'online', type: 'outdoor' },
  { id: '4', name: 'Metro Plus', address: '1020 Granville St, Vancouver', lat: 49.2780, lng: -123.1208, status: 'online', type: 'indoor' },
  { id: '5', name: 'Quick Stop Mart', address: '789 Seymour St, Vancouver', lat: 49.2811, lng: -123.1182, status: 'online', type: 'indoor' },
  { id: '6', name: 'Downtown Mall', address: '456 Burrard St, Vancouver', lat: 49.2855, lng: -123.1190, status: 'maintenance', type: 'indoor' },
  { id: '7', name: 'Corner Market', address: '234 Hastings St W, Vancouver', lat: 49.2815, lng: -123.1089, status: 'online', type: 'outdoor' },
  { id: '8', name: 'City Center ATM', address: '650 Georgia St, Toronto', lat: 43.6532, lng: -79.3832, status: 'online', type: 'indoor' },
  { id: '9', name: 'Union Station', address: '65 Front St W, Toronto', lat: 43.6453, lng: -79.3806, status: 'online', type: 'indoor' },
  { id: '10', name: 'Eaton Centre', address: '220 Yonge St, Toronto', lat: 43.6544, lng: -79.3807, status: 'online', type: 'indoor' },
  { id: '11', name: 'Old Montreal ATM', address: '400 Rue Saint-Jacques, Montreal', lat: 45.5017, lng: -73.5673, status: 'online', type: 'outdoor' },
  { id: '12', name: 'Downtown Montreal', address: '1250 René-Lévesque, Montreal', lat: 45.4972, lng: -73.5733, status: 'online', type: 'indoor' },
  { id: '13', name: 'Calgary Tower', address: '101 9 Ave SW, Calgary', lat: 51.0447, lng: -114.0719, status: 'online', type: 'indoor' },
  { id: '14', name: 'Edmonton Mall', address: '8882 170 St NW, Edmonton', lat: 53.5263, lng: -113.6236, status: 'online', type: 'indoor' },
  { id: '15', name: 'Ottawa Parliament', address: '111 Wellington St, Ottawa', lat: 45.4215, lng: -75.7028, status: 'online', type: 'outdoor' },
];

export default function ATMMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedATM, setSelectedATM] = useState<string | null>(null);
  const [hoveredATM, setHoveredATM] = useState<string | null>(null);

  // Calculate map positions for Canada with better projection
  const getMapPosition = (lat: number, lng: number) => {
    // Canada's approximate bounds
    const bounds = {
      north: 62,
      south: 42,
      east: -52,
      west: -141
    };
    
    // Map specific city coordinates to better visual positions
    // These are manually adjusted for visual accuracy on the map
    const cityPositions: { [key: string]: { x: number; y: number } } = {
      'Vancouver': { x: 8, y: 75 },
      'Calgary': { x: 18, y: 73 },
      'Edmonton': { x: 18, y: 65 },
      'Toronto': { x: 65, y: 85 },
      'Ottawa': { x: 68, y: 83 },
      'Montreal': { x: 71, y: 82 }
    };

    // Determine which city this coordinate is closest to
    if (lng < -120) return cityPositions['Vancouver'];
    if (lng < -110) return lng > -115 ? cityPositions['Calgary'] : cityPositions['Edmonton'];
    if (lng < -78) return cityPositions['Toronto'];
    if (lng < -75) return cityPositions['Ottawa'];
    if (lng < -70) return cityPositions['Montreal'];
    
    // Default calculation for other locations
    const x = ((lng - bounds.west) / (bounds.east - bounds.west)) * 100;
    const y = ((bounds.north - lat) / (bounds.north - bounds.south)) * 100;
    
    return { x, y };
  };

  useEffect(() => {
    // Subtle fade-in for pins on mount
    const timer = setTimeout(() => {
      const pins = document.querySelectorAll('.atm-pin');
      pins.forEach((pin, index) => {
        setTimeout(() => {
          pin.classList.add('opacity-100');
        }, index * 50);
      });
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl overflow-hidden">
      {/* Map Background - Using CSS gradient to simulate water/land */}
      <div className="absolute inset-0">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-gray-50/30" />
        
        {/* Canada Map Image Placeholder - You can use an actual map image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700"><rect fill="%23f3f4f6" width="1200" height="700"/><text x="600" y="350" text-anchor="middle" fill="%23d1d5db" font-size="48" font-family="sans-serif">Canada Map</text></svg>')`
          }}
        />
        
        {/* Detailed Canada SVG Map */}
        <svg
          viewBox="0 0 1200 700"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fafafa" />
              <stop offset="100%" stopColor="#f3f4f6" />
            </linearGradient>
            <filter id="mapShadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1"/>
            </filter>
          </defs>
          
          {/* More realistic Canada shape */}
          <g filter="url(#mapShadow)">
            {/* Main landmass */}
            <path
              d="M 50 400 
                 C 50 380, 70 360, 90 350
                 L 120 340 L 150 335 L 180 330 L 210 325
                 L 240 320 L 270 315 L 300 310 L 330 305
                 L 360 300 L 390 295 L 420 290 L 450 285
                 L 480 280 L 510 275 L 540 270 L 570 265
                 L 600 260 L 630 255 L 660 250 L 690 245
                 L 720 240 L 750 235 L 780 230 L 810 225
                 L 840 220 L 870 215 L 900 210 L 930 205
                 L 960 200 L 990 195 L 1020 190 L 1050 185
                 L 1080 180 L 1110 175 L 1140 170
                 C 1150 168, 1155 172, 1150 180
                 L 1140 190 L 1130 200 L 1120 210 L 1110 220
                 L 1100 230 L 1090 240 L 1080 250 L 1070 260
                 L 1060 270 L 1050 280 L 1040 290 L 1030 300
                 L 1020 310 L 1010 320 L 1000 330 L 990 340
                 L 980 350 L 970 360 L 960 370 L 950 380
                 L 940 390 L 930 400 L 920 410 L 910 420
                 L 900 430 L 890 440 L 880 450 L 870 460
                 L 860 470 L 850 480 L 840 490 L 830 500
                 L 820 510 L 810 520 L 800 530 L 790 540
                 L 780 550 L 770 560 L 760 570 L 750 580
                 L 740 590 L 730 600 L 720 610 L 710 620
                 C 700 630, 680 635, 660 630
                 L 640 625 L 620 620 L 600 615 L 580 610
                 L 560 605 L 540 600 L 520 595 L 500 590
                 L 480 585 L 460 580 L 440 575 L 420 570
                 L 400 565 L 380 560 L 360 555 L 340 550
                 L 320 545 L 300 540 L 280 535 L 260 530
                 L 240 525 L 220 520 L 200 515 L 180 510
                 L 160 505 L 140 500 L 120 495 L 100 490
                 L 80 485 L 60 480
                 C 45 475, 40 460, 45 440
                 L 50 420 Z"
              fill="url(#landGradient)"
              stroke="#e5e7eb"
              strokeWidth="1.5"
              opacity="0.9"
            />
            
            {/* Vancouver Island */}
            <ellipse cx="80" cy="420" rx="15" ry="25" fill="url(#landGradient)" stroke="#e5e7eb" strokeWidth="1" opacity="0.9"/>
            
            {/* Newfoundland */}
            <ellipse cx="1080" cy="320" rx="25" ry="30" fill="url(#landGradient)" stroke="#e5e7eb" strokeWidth="1" opacity="0.9"/>
            
            {/* PEI */}
            <ellipse cx="1040" cy="360" rx="10" ry="8" fill="url(#landGradient)" stroke="#e5e7eb" strokeWidth="1" opacity="0.9"/>
          </g>
          
          {/* Province boundaries */}
          <g stroke="#d1d5db" strokeWidth="0.5" fill="none" opacity="0.3" strokeDasharray="2 4">
            {/* British Columbia - Alberta */}
            <line x1="200" y1="300" x2="200" y2="550" />
            {/* Alberta - Saskatchewan */}
            <line x1="300" y1="300" x2="300" y2="550" />
            {/* Saskatchewan - Manitoba */}
            <line x1="400" y1="300" x2="400" y2="550" />
            {/* Manitoba - Ontario */}
            <line x1="500" y1="300" x2="500" y2="550" />
            {/* Ontario - Quebec */}
            <line x1="750" y1="280" x2="750" y2="580" />
            {/* Quebec - New Brunswick */}
            <line x1="950" y1="300" x2="950" y2="500" />
          </g>
        </svg>
      </div>

      {/* ATM Pins */}
      <div className="relative w-full h-full">
        {atmLocations.map((atm, index) => {
          const { x, y } = getMapPosition(atm.lat, atm.lng);
          const isSelected = selectedATM === atm.id;
          const isHovered = hoveredATM === atm.id;
          
          return (
            <div
              key={atm.id}
              className="atm-pin opacity-0 absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200"
              style={{ 
                left: `${x}%`, 
                top: `${y}%`,
                zIndex: isSelected || isHovered ? 50 : 10 + index,
                transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.2)' : 'scale(1)'}`
              }}
              onMouseEnter={() => setHoveredATM(atm.id)}
              onMouseLeave={() => setHoveredATM(null)}
              onClick={() => setSelectedATM(isSelected ? null : atm.id)}
            >
              {/* Subtle glow for online ATMs */}
              {atm.status === 'online' && (
                <div className="absolute inset-0 -m-2">
                  <div className="absolute inset-0 bg-amber-400 rounded-full opacity-10 blur-sm" />
                </div>
              )}
              
              {/* Pin */}
              <div className={`
                relative w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-all duration-200
                ${atm.status === 'online' ? 'bg-amber-400' : atm.status === 'maintenance' ? 'bg-orange-500' : 'bg-gray-400'}
                ${isHovered || isSelected ? 'ring-2 ring-white ring-opacity-80 shadow-lg' : ''}
              `}>
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>

              {/* Tooltip */}
              {(isHovered || isSelected) && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
                  <div className="bg-white rounded-lg shadow-xl p-3 min-w-[200px] border border-gray-100">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{atm.name}</h4>
                      <span className={`
                        px-2 py-0.5 text-xs font-medium rounded-full
                        ${atm.status === 'online' ? 'bg-green-100 text-green-700' : 
                          atm.status === 'maintenance' ? 'bg-orange-100 text-orange-700' : 
                          'bg-gray-100 text-gray-600'}
                      `}>
                        {atm.status === 'online' ? 'Active' : atm.status === 'maintenance' ? 'Maintenance' : 'Offline'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{atm.address}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-500">Type:</span>
                      <span className="font-medium text-gray-700">{atm.type === 'indoor' ? 'Indoor' : 'Outdoor'}</span>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-white transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1.5 border-r border-b border-gray-100" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stats Overlay */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-3 shadow-md">
        <div className="space-y-2">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Total ATMs</p>
            <p className="text-xl font-semibold text-gray-900">220+</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-amber-400 rounded-full" />
              <span className="text-xs text-gray-600">Online</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span className="text-xs text-gray-600">Maintenance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Major Cities Labels */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute" style={{ left: '8%', top: '75%' }}>
          <p className="text-[10px] text-gray-600 font-medium bg-white/70 px-1 rounded">Vancouver</p>
        </div>
        <div className="absolute" style={{ left: '18%', top: '73%' }}>
          <p className="text-[10px] text-gray-600 font-medium bg-white/70 px-1 rounded">Calgary</p>
        </div>
        <div className="absolute" style={{ left: '18%', top: '65%' }}>
          <p className="text-[10px] text-gray-600 font-medium bg-white/70 px-1 rounded">Edmonton</p>
        </div>
        <div className="absolute" style={{ left: '65%', top: '85%' }}>
          <p className="text-[10px] text-gray-600 font-medium bg-white/70 px-1 rounded">Toronto</p>
        </div>
        <div className="absolute" style={{ left: '68%', top: '83%' }}>
          <p className="text-[10px] text-gray-600 font-medium bg-white/70 px-1 rounded">Ottawa</p>
        </div>
        <div className="absolute" style={{ left: '71%', top: '82%' }}>
          <p className="text-[10px] text-gray-600 font-medium bg-white/70 px-1 rounded">Montreal</p>
        </div>
      </div>

      <style jsx>{`
        .atm-pin {
          transition: opacity 0.3s ease-in-out;
        }
        
        .opacity-100 {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
