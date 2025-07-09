import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapOnePage = () => {
  const { lat, lon } = useParams(); // Obtenemos las coordenadas de la URL

  const [coordinates, setCoordinates] = useState({
    lat: parseFloat(lat || '0'), // Convertir la latitud y longitud a números flotantes
    lon: parseFloat(lon || '0'),
  });

  useEffect(() => {
    // Verificar que las coordenadas son válidas
    if (!isNaN(coordinates.lat) && !isNaN(coordinates.lon)) {
      setCoordinates({
        lat: parseFloat(lat || '0'),
        lon: parseFloat(lon || '0'),
      });
    }
  }, [lat, lon]);

  return (
    <div style={{ height: '100vh' }}> {/* Hacer que el mapa ocupe toda la pantalla */}
      <MapContainer
        center={[coordinates.lat, coordinates.lon]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Utilizamos el tile layer de OpenStreetMap
        />
        <Marker position={[coordinates.lat, coordinates.lon]}>
          <Popup>Ubicación: {coordinates.lat}, {coordinates.lon}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapOnePage;
