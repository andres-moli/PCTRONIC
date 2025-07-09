import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, ZoomControl, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { VisitComent } from '../../domain/graphql';

interface MapsCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  visitComment: VisitComent[];
}

const MapsComponentComment: React.FC<MapsCommentModalProps> = ({ isOpen, onClose, visitComment }) => {
  const routers = visitComment.map((v) => {
    return {
      coordinate: [v.latitude || '', v.longitude || ''],
      name: v.type,
    }
  });

  if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada

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
          center={routers[0].coordinate}
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
          {/* @ts-ignore */}
          <Polyline positions={routers?.map(x => x.coordinate)} color="blue" weight={4} opacity={0.7} />

          {/* Marcadores de las visitas */}
          {routers?.map((coordinate, index) => (
            <Marker key={index} 
          // @ts-ignore
            position={coordinate.coordinate || []}>
              {/* <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
                {`Visita  #${index + 1}`}
              </Tooltip> */}
              <Popup>{`${coordinate.name}`}</Popup>
            </Marker>
          ))}
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

export default MapsComponentComment;
