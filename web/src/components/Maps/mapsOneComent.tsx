import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, ZoomControl, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { VisitComent } from '../../domain/graphql';

interface MapsCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  visitComment: VisitComent | undefined;
}

const MapsComponentOneComment: React.FC<MapsCommentModalProps> = ({ isOpen, onClose, visitComment }) => {
  if(!visitComment) return null
  if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada
  const router = {
    coordinate: [visitComment.latitude, visitComment.longitude],
    name: visitComment.type,
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 relative">
        {/* Botón de cerrar arriba */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 text-xl hover:text-gray-900"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Mapa de Visitas</h2>
        
        <MapContainer
        // @ts-ignore
          center={router.coordinate}
          zoom={13}
          style={{ height: '500px' }}
        >
          {/* Capa de fondo del mapa */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* Control de zoom */}
          <ZoomControl position="topright" />

          {/* Línea de ruta */}
          {/* <Polyline positions={router.coordinate} color="blue" weight={4} opacity={0.7} /> */}

          {/* Marcadores de las visitas */}
          <Marker key={1} 
          // @ts-ignore
          position={router.coordinate}>
              <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                {router.name}
              </Tooltip>
              {/* <Popup>{`${router.name}`}</Popup> */}
            </Marker>
        </MapContainer>

        {/* Botón de cerrar abajo */}
        <button 
          onClick={onClose} 
          className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Cerrar Mapa
        </button>
      </div>
    </div>
  );
};

export default MapsComponentOneComment;
