import { MapPin, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import '../styles/map.css';

// Ícones customizados
const createCustomIcon = (color) => {
  return L.divIcon({
    html: `<div style="background: linear-gradient(135deg, ${color}, rgba(0,0,0,0.1)); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 4px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
      </svg>
    </div>`,
    iconSize: [40, 40],
    className: 'custom-icon'
  });
};

const MapTracker = () => {
  // Coordenadas de cidades em Angola
  const locations = {
    origem: { lat: -8.8368, lng: 13.2344, name: 'Centro Luanda' },
    destino: { lat: -8.9727, lng: 13.1699, name: 'Viana' }
  };

  const routeCoordinates = [
    [locations.origem.lat, locations.origem.lng],
    [locations.destino.lat, locations.destino.lng]
  ];

  const centerMap = [
    (locations.origem.lat + locations.destino.lat) / 2,
    (locations.origem.lng + locations.destino.lng) / 2
  ];

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 col-span-full md:col-span-2 lg:col-span-2 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-4 rounded-xl mr-4">
          <MapPin size={28} className="text-blue-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Rastreamento em Tempo Real</h3>
          <p className="text-sm text-gray-600 mt-1">Visualize a rota de viagem ativa</p>
        </div>
      </div>
      
      {/* Mapa com Leaflet */}
      <MapContainer 
        center={centerMap} 
        zoom={14} 
        className="map-container"
        style={{ borderRadius: '1rem', border: '2px solid #e5e7eb' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Marcador de Origem */}
        <Marker 
          position={[locations.origem.lat, locations.origem.lng]}
          icon={createCustomIcon('#3b82f6')}
        >
          <Popup>
            <div className="font-semibold">
              <p className="font-bold text-blue-600 text-sm">📍 Origem</p>
              <p className="text-xs text-gray-600 mt-1">{locations.origem.name}</p>
            </div>
          </Popup>
        </Marker>
        
        {/* Marcador de Destino */}
        <Marker 
          position={[locations.destino.lat, locations.destino.lng]}
          icon={createCustomIcon('#ef4444')}
        >
          <Popup>
            <div className="font-semibold">
              <p className="font-bold text-red-600 text-sm">🎯 Destino</p>
              <p className="text-xs text-gray-600 mt-1">{locations.destino.name}</p>
            </div>
          </Popup>
        </Marker>
        
        {/* Linha da Rota */}
        <Polyline 
          positions={routeCoordinates}
          color="#3b82f6"
          weight={4}
          opacity={0.8}
          dashArray="8, 5"
        />
      </MapContainer>

      {/* Informações da Rota */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
          <p className="text-xs text-blue-700 font-bold uppercase tracking-wider">Origem</p>
          <p className="text-lg font-bold text-gray-900 mt-2">{locations.origem.name}</p>
          <p className="text-xs text-blue-600 mt-1 font-medium">{locations.origem.lat.toFixed(4)}, {locations.origem.lng.toFixed(4)}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2 mb-2">
            <Navigation size={16} className="text-purple-600" />
            <p className="text-xs text-purple-700 font-bold uppercase tracking-wider">Rota Ativa</p>
          </div>
          <p className="text-lg font-bold text-gray-900">22 km</p>
          <p className="text-xs text-purple-600 mt-1 font-medium">~15 min de viagem</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-xl border border-red-200 hover:shadow-lg transition-shadow">
          <p className="text-xs text-red-700 font-bold uppercase tracking-wider">Destino</p>
          <p className="text-lg font-bold text-gray-900 mt-2">{locations.destino.name}</p>
          <p className="text-xs text-red-600 mt-1 font-medium">{locations.destino.lat.toFixed(4)}, {locations.destino.lng.toFixed(4)}</p>
        </div>
      </div>
    </div>
  );
};

export default MapTracker;
