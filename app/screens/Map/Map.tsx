import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Linking, Dimensions, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import WebView from 'react-native-webview';

const { width, height } = Dimensions.get('window');

const MapComponent = ({ route }) => {
  const { latitude, longitude } = route.params;
  const [url, setUrl] = useState(`https://89qpvk6w-5173.use.devtunnels.ms/locationFree/${latitude}/${longitude}`)
  console.log(url)
  const [region, setRegion] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
      {/* Mapa que se carga al iniciar */}
      {
        Platform.OS !== 'android' 
        ?
        (
        <MapView
        style={styles.map}
        initialRegion={region} // Configuración de la región inicial
        region={region} // Actualización de la región cuando el usuario se mueve
        showsUserLocation={true} // Muestra la ubicación actual del usuario
        showsCompass={true} // Muestra la brújula
        loadingEnabled={true}
        // provider="google" // Usamos Google Maps como proveedor
      >
        {/* Marcador de la ubicación */}
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} title="Ubicación donde se marcó" />
      </MapView>
        )
        :
        <>
        <WebView
          source={{ uri: url }}
          style={{ flex: 1 }}
          onNavigationStateChange={(navState) => {
            // Puedes gestionar el cambio de navegación si es necesario
            if (navState.url !== url) {
              setUrl(navState.url);
            }
          }}
        />
        </>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  card: {
    width: '100%', // Ocupa el 95% del ancho de la pantalla
    height: '100%', // Ocupa el 90% de la altura de la pantalla
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

export default MapComponent;
