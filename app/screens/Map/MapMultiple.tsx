import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

const MapComponentMultiple = ({ route }) => {
  const { content } = route.params;
  const {latitude, longitude, routers } = JSON.parse(content)
  console.log({latitude, longitude, routers })
  const [region, setRegion] = useState({
    latitude: latitude, // Coordenadas iniciales
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [userLocation, setUserLocation] = useState(null);
  const [mapType, setMapType] = useState('standard'); // Estado para cambiar el tipo de mapa

  // Ejemplo de coordenadas para la ruta

  // Función para cambiar el tipo de mapa
  const toggleMapType = () => {
    setMapType(mapType === 'standard' ? 'satellite' : 'standard');
  };

  return (
    <View style={styles.container}>
      {/* Botón para cambiar el tipo de mapa */}
      <Button title="Cambiar Tipo de Mapa" onPress={toggleMapType} />

      {/* Card que contiene el mapa */}
      <View style={styles.card}>
        <MapView
          style={styles.map}
          initialRegion={region} // Configuración de la región inicial
          region={region} // Actualización de la región cuando el usuario se mueve
          showsUserLocation={true} // Muestra la ubicación actual del usuario
          followUserLocation={true} // Mueve el mapa para seguir al usuario
          showsCompass={true} // Muestra la brújula
          loadingEnabled={true}
          mapType={mapType} // Cambia el tipo de mapa (satélite o estándar)
          // provider="google"
          // googleMapId='3bd1b033cbce18dc'
        >
          {/* Marcadores de cada punto de la ruta */}
          {routers?.map((point, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: point.latitude, longitude: point.longitude }}
              title={point.title} // Título del marcador
              description={`Latitud: ${point.latitude}, Longitud: ${point.longitude}`} // Descripción
            />
          ))}

          {/* Ruta entre los puntos */}
          <Polyline
            coordinates={routers}
            strokeColor="#0000FF"
            strokeWidth={6}
          />
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  card: {
    width: '95%', // Ocupa el 95% del ancho de la pantalla
    height: '90%', // Ocupa el 90% de la altura de la pantalla
    borderRadius: 15,
    overflow: 'hidden', // Para que el mapa se ajuste a los bordes redondeados
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6, // Sombra para Android
    margin: 10, // Márgenes en los bordes
  },
  map: {
    width: '100%', // El mapa ocupará todo el espacio dentro de la tarjeta
    height: '100%', // El mapa ocupará toda la altura de la tarjeta
  },
});

export default MapComponentMultiple;
