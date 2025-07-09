import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapMultiplePage = () => {
  // Obtenemos las ubicaciones de la URL
  const { locations } = useParams(); // La URL tendrá un parámetro 'locations' con las coordenadas
  const locationsArray = locations?.split(';').map(location => {
    const [lat, lon] = location.split(',').map(coord => parseFloat(coord));
    return { lat, lon };
  });
  const [coordinates, setCoordinates] = useState<any[]>([]);
  useEffect(() => {
    // Procesamos las coordenadas de la URL
    if (locations) {
      const locationsArray = locations.split(';').map(location => {
        const [lat, lon] = location.split(',').map(coord => parseFloat(coord));
        return { lat, lon };
      });
      setCoordinates(locationsArray);
    }
  }, [locations]);

  return (
    <div style={{ height: '100vh' }}> {/* Hacer que el mapa ocupe toda la pantalla */}
      <MapContainer
        // @ts-ignore
        center={locationsArray?.[0] || { lat: 0, lon: 0 }} // Centrar el mapa en el primer punto
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Marcadores para cada ubicación */}
        {coordinates.map((point, index) => (
          <Marker key={index} position={[point.lat, point.lon]}>
            <Popup>Ubicación {index + 1}: {point.lat}, {point.lon}</Popup>
          </Marker>
        ))}

        {/* Polilínea conectando las ubicaciones */}
        {coordinates.length > 1 && (
          <Polyline positions={coordinates} color="blue" />
        )}
      </MapContainer>
    </div>
  );
};

export default MapMultiplePage;
