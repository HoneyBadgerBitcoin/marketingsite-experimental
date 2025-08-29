import React, { useEffect, useRef, useState } from 'react';

interface ATMLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  status: 'online' | 'offline' | 'maintenance';
  type: 'indoor' | 'outdoor';
  city: string;
}

const atmLocations: ATMLocation[] = [
  { id: '1', name: 'INS Market', address: '887 Dunsmur St', city: 'Vancouver', lat: 49.2827, lng: -123.1207, status: 'online', type: 'indoor' },
  { id: '2', name: 'J & J Market', address: '1319 Robson St', city: 'Vancouver', lat: 49.2863, lng: -123.1302, status: 'online', type: 'indoor' },
  { id: '3', name: 'Al-Madina Store', address: '516 Pender St W', city: 'Vancouver', lat: 49.2808, lng: -123.1106, status: 'online', type: 'outdoor' },
  { id: '4', name: 'Metro Plus', address: '1020 Granville St', city: 'Vancouver', lat: 49.2780, lng: -123.1208, status: 'online', type: 'indoor' },
  { id: '5', name: 'Quick Stop Mart', address: '789 Seymour St', city: 'Vancouver', lat: 49.2811, lng: -123.1182, status: 'online', type: 'indoor' },
  { id: '6', name: 'Downtown Mall', address: '456 Burrard St', city: 'Vancouver', lat: 49.2855, lng: -123.1190, status: 'maintenance', type: 'indoor' },
  { id: '7', name: 'Corner Market', address: '234 Hastings St W', city: 'Vancouver', lat: 49.2815, lng: -123.1089, status: 'online', type: 'outdoor' },
  { id: '8', name: 'City Center ATM', address: '650 Georgia St', city: 'Toronto', lat: 43.6532, lng: -79.3832, status: 'online', type: 'indoor' },
  { id: '9', name: 'Union Station', address: '65 Front St W', city: 'Toronto', lat: 43.6453, lng: -79.3806, status: 'online', type: 'indoor' },
  { id: '10', name: 'Eaton Centre', address: '220 Yonge St', city: 'Toronto', lat: 43.6544, lng: -79.3807, status: 'online', type: 'indoor' },
  { id: '11', name: 'Old Montreal ATM', address: '400 Rue Saint-Jacques', city: 'Montreal', lat: 45.5017, lng: -73.5673, status: 'online', type: 'outdoor' },
  { id: '12', name: 'Downtown Montreal', address: '1250 René-Lévesque', city: 'Montreal', lat: 45.4972, lng: -73.5733, status: 'online', type: 'indoor' },
  { id: '13', name: 'Calgary Tower', address: '101 9 Ave SW', city: 'Calgary', lat: 51.0447, lng: -114.0719, status: 'online', type: 'indoor' },
  { id: '14', name: 'Edmonton Mall', address: '8882 170 St NW', city: 'Edmonton', lat: 53.5263, lng: -113.6236, status: 'online', type: 'indoor' },
  { id: '15', name: 'Ottawa Parliament', address: '111 Wellington St', city: 'Ottawa', lat: 45.4215, lng: -75.7028, status: 'online', type: 'outdoor' },
];

// Group ATMs by city for clustering
const groupedATMs = atmLocations.reduce((acc, atm) => {
  if (!acc[atm.city]) {
    acc[atm.city] = [];
  }
  acc[atm.city].push(atm);
  return acc;
}, {} as Record<string, typeof atmLocations>);

// City coordinates for pin placement on the map
const cityCoordinates: Record<string, { x: string; y: string }> = {
  'Vancouver': { x: '12%', y: '78%' },
  'Calgary': { x: '22%', y: '75%' },
  'Edmonton': { x: '22%', y: '68%' },
  'Winnipeg': { x: '42%', y: '76%' },
  'Toronto': { x: '66%', y: '85%' },
  'Ottawa': { x: '70%', y: '83%' },
  'Montreal': { x: '73%', y: '82%' },
  'Quebec City': { x: '76%', y: '80%' },
  'Halifax': { x: '85%', y: '83%' },
  'St. Johns': { x: '93%', y: '78%' }
};

export default function ATMMapRealistic() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 via-white to-gray-50 rounded-2xl overflow-hidden">
      {/* Background Map Layer */}
      <div className="absolute inset-0">
        {/* Map Background Image - Using OpenStreetMap or similar */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(219, 234, 254, 0.3), rgba(243, 244, 246, 0.3)),
                              url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Canada_location_map_-_lite.svg/2560px-Canada_location_map_-_lite.svg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'contrast(1.1) brightness(1.05)'
          }}
        />
        
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/20" />
      </div>

      {/* City Pins Layer */}
      <div className="relative w-full h-full">
        {Object.entries(groupedATMs).map(([city, atms]) => {
          const coords = cityCoordinates[city];
          if (!coords) return null;
          
          const isSelected = selectedCity === city;
          const isHovered = hoveredCity === city;
          const onlineCount = atms.filter(atm => atm.status === 'online').length;
          const totalCount = atms.length;
          
          return (
            <div
              key={city}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                mapLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                left: coords.x, 
                top: coords.y,
                zIndex: isSelected || isHovered ? 50 : 10,
                transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.15)' : 'scale(1)'}`
              }}
              onMouseEnter={() => setHoveredCity(city)}
              onMouseLeave={() => setHoveredCity(null)}
              onClick={() => setSelectedCity(isSelected ? null : city)}
            >
              {/* Cluster Pin */}
              <div className="relative">
                {/* Glow effect */}
                {onlineCount > 0 && (
                  <div className="absolute inset-0 -m-3">
                    <div className="absolute inset-0 bg-amber-400 rounded-full opacity-20 blur-md" />
                  </div>
                )}
                
                {/* Main pin */}
                <div className={`
                  relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200
                  ${onlineCount === totalCount ? 'bg-gradient-to-br from-amber-400 to-amber-500' : 
                    onlineCount > 0 ? 'bg-gradient-to-br from-orange-400 to-orange-500' : 
                    'bg-gradient-to-br from-gray-400 to-gray-500'}
                  ${isHovered || isSelected ? 'ring-3 ring-white ring-opacity-90 shadow-xl' : ''}
                `}>
                  <span className="text-white font-bold text-sm">{totalCount}</span>
                </div>
                
                {/* City label */}
                <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <p className="text-[11px] font-medium text-gray-700 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm">
                    {city}
                  </p>
                </div>
              </div>

              {/* Detailed Tooltip */}
              {(isHovered || isSelected) && (
                <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
                  <div className="bg-white rounded-xl shadow-2xl p-4 min-w-[280px] border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-gray-900 text-base">{city}</h4>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          {onlineCount} online
                        </span>
                        {totalCount - onlineCount > 0 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                            {totalCount - onlineCount} offline
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {atms.slice(0, 5).map(atm => (
                        <div key={atm.id} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                          <div className="flex-1">
                            <p className="text-xs font-medium text-gray-800">{atm.name}</p>
                            <p className="text-xs text-gray-500">{atm.address}</p>
                          </div>
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ml-2 ${
                            atm.status === 'online' ? 'bg-green-400' : 
                            atm.status === 'maintenance' ? 'bg-orange-400' : 'bg-gray-400'
                          }`} />
                        </div>
                      ))}
                      {atms.length > 5 && (
                        <p className="text-xs text-gray-500 text-center pt-1">
                          +{atms.length - 5} more locations
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-white transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1.5 border-r border-b border-gray-100" />
                </div>
              )}
            </div>
          );
        })}
        
        {/* Additional cities without ATMs (for visual context) */}
        {['Winnipeg', 'Quebec City', 'Halifax', 'St. Johns'].map(city => {
          const coords = cityCoordinates[city];
          if (!coords) return null;
          
          return (
            <div
              key={city}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                mapLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ 
                left: coords.x, 
                top: coords.y,
                transitionDelay: '200ms'
              }}
            >
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
              <p className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 text-[9px] text-gray-400 whitespace-nowrap">
                {city}
              </p>
            </div>
          );
        })}
      </div>

      {/* Map Controls & Legend */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Network Status</p>
            <p className="text-2xl font-bold text-gray-900">220+ ATMs</p>
            <p className="text-xs text-gray-600">Across Canada</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full" />
                <span className="text-gray-600">All Online</span>
              </div>
              <span className="font-medium text-gray-900">
                {Object.values(groupedATMs).filter(atms => 
                  atms.every(atm => atm.status === 'online')
                ).length}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full" />
                <span className="text-gray-600">Mixed Status</span>
              </div>
              <span className="font-medium text-gray-900">
                {Object.values(groupedATMs).filter(atms => 
                  atms.some(atm => atm.status === 'online') && 
                  atms.some(atm => atm.status !== 'online')
                ).length}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full" />
                <span className="text-gray-600">Offline</span>
              </div>
              <span className="font-medium text-gray-900">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Click Instruction */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <p className="text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          Click on a city to view ATM locations
        </p>
      </div>
    </div>
  );
}
