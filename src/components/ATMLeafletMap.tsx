import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

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
  { id: '16', name: 'Winnipeg Downtown', address: '360 Main St', city: 'Winnipeg', lat: 49.8951, lng: -97.1384, status: 'online', type: 'indoor' },
  { id: '17', name: 'Regina City Square', address: '1945 Hamilton St', city: 'Regina', lat: 50.4452, lng: -104.6189, status: 'online', type: 'indoor' },
  { id: '18', name: 'Halifax Waterfront', address: '1869 Upper Water St', city: 'Halifax', lat: 44.6488, lng: -63.5752, status: 'online', type: 'outdoor' },
];

// Group ATMs by city for clustering
const groupedATMs = atmLocations.reduce((acc, atm) => {
  if (!acc[atm.city]) {
    acc[atm.city] = [];
  }
  acc[atm.city].push(atm);
  return acc;
}, {} as Record<string, typeof atmLocations>);

// Component to handle map centering
function MapController() {
  const map = useMap();
  
  useEffect(() => {
    // Center map on Canada
    map.setView([56.1304, -106.3468], 4);
  }, [map]);
  
  return null;
}

// Custom cluster icon
const createClusterIcon = (count: number, status: 'all-online' | 'mixed' | 'offline') => {
  const color = status === 'all-online' ? '#fbbf24' : status === 'mixed' ? '#fb923c' : '#9ca3af';
  return L.divIcon({
    html: `
      <div style="
        background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%);
        color: white;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1), 0 0 0 3px rgba(255,255,255,0.8);
      ">
        ${count}
      </div>
    `,
    className: 'custom-cluster-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

// Create custom icon for individual ATMs
const createATMIcon = (status: 'online' | 'offline' | 'maintenance') => {
  const color = status === 'online' ? '#10b981' : status === 'maintenance' ? '#f97316' : '#6b7280';
  return L.divIcon({
    html: `
      <div style="
        background: ${color};
        border-radius: 50%;
        width: 12px;
        height: 12px;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      "></div>
    `,
    className: 'custom-atm-icon',
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

export default function ATMLeafletMap() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure proper rendering
    const timer = setTimeout(() => setMapReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mapReady) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
          <p className="mt-2 text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <MapContainer
        center={[56.1304, -106.3468]}
        zoom={4}
        className="w-full h-full"
        style={{ background: '#f9fafb' }}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        <MapController />
        
        {/* Map Tiles - Using CartoDB Positron for a clean, light look */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Render city clusters */}
        {Object.entries(groupedATMs).map(([city, atms]) => {
          const centerLat = atms.reduce((sum, atm) => sum + atm.lat, 0) / atms.length;
          const centerLng = atms.reduce((sum, atm) => sum + atm.lng, 0) / atms.length;
          const onlineCount = atms.filter(atm => atm.status === 'online').length;
          const status = onlineCount === atms.length ? 'all-online' : onlineCount > 0 ? 'mixed' : 'offline';
          
          return (
            <Marker
              key={city}
              position={[centerLat, centerLng]}
              icon={createClusterIcon(atms.length, status)}
              eventHandlers={{
                click: () => setSelectedCity(selectedCity === city ? null : city),
              }}
            >
              <Popup className="custom-popup">
                <div className="p-2">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{city}</h3>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {atms.map(atm => (
                      <div key={atm.id} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                        <div className="flex-1 pr-2">
                          <p className="text-xs font-medium text-gray-800">{atm.name}</p>
                          <p className="text-xs text-gray-500">{atm.address}</p>
                        </div>
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          atm.status === 'online' ? 'bg-green-400' : 
                          atm.status === 'maintenance' ? 'bg-orange-400' : 'bg-gray-400'
                        }`} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between text-xs">
                    <span className="text-green-600 font-medium">{onlineCount} online</span>
                    {atms.length - onlineCount > 0 && (
                      <span className="text-gray-500">{atms.length - onlineCount} offline/maintenance</span>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Show individual ATMs when a city is selected */}
        {selectedCity && groupedATMs[selectedCity]?.map(atm => (
          <CircleMarker
            key={atm.id}
            center={[atm.lat, atm.lng]}
            radius={6}
            fillColor={
              atm.status === 'online' ? '#10b981' : 
              atm.status === 'maintenance' ? '#f97316' : '#6b7280'
            }
            fillOpacity={0.8}
            weight={2}
            color="white"
          >
            <Popup>
              <div className="p-2">
                <h4 className="font-semibold text-sm text-gray-900">{atm.name}</h4>
                <p className="text-xs text-gray-600 mt-1">{atm.address}</p>
                <p className="text-xs text-gray-500">{atm.city}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    atm.status === 'online' ? 'bg-green-100 text-green-700' : 
                    atm.status === 'maintenance' ? 'bg-orange-100 text-orange-700' : 
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {atm.status === 'online' ? 'Online' : atm.status === 'maintenance' ? 'Maintenance' : 'Offline'}
                  </span>
                  <span className="text-xs text-gray-500">{atm.type}</span>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Stats Overlay */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000]">
        <div className="space-y-2">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Network</p>
            <p className="text-xl font-semibold text-gray-900">230+ ATMs</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-amber-400 rounded-full" />
              <span className="text-xs text-gray-600">Cities</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-xs text-gray-600">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[1000]">
        <p className="text-xs text-gray-600 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
          Click on city markers to view ATM locations
        </p>
      </div>

      <style jsx global>{`
        .leaflet-container {
          font-family: inherit;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .leaflet-popup-content {
          margin: 0;
          min-width: 250px;
        }
        .custom-cluster-icon {
          background: transparent !important;
          border: none !important;
        }
        .custom-atm-icon {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
}
