import React, { useEffect, useState } from 'react';

// Simple map component that doesn't use Leaflet directly
export default function ATMMapWrapper() {
  const [isClient, setIsClient] = useState(false);
  const [MapComponent, setMapComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Only load Leaflet on the client side
    setIsClient(true);
    if (typeof window !== 'undefined') {
      import('./ATMLeafletMap').then((module) => {
        setMapComponent(() => module.default);
      });
    }
  }, []);

  if (!isClient || !MapComponent) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
          <p className="mt-2 text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return <MapComponent />;
}
