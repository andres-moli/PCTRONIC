import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Linking, Dimensions, Button, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import WebView from 'react-native-webview';
import * as Progress from 'react-native-progress'; // Importa la barra de progreso
import { useColor } from '../../Constants/Color';
const {color} = useColor()
const { width, height } = Dimensions.get('window');

const MapAndoridScreen = ({ route }) => {
  const { link } = route.params;
  const [url, setUrl] = useState(link)
  // Linking.openURL(url).catch((err) => console.error('Error al abrir enlace:', err));
  // return
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Función para manejar la carga del WebView
  const handleLoadStart = () => {
    setLoading(true); // Muestra el indicador de carga
  };

  const handleLoadEnd = () => {
    setLoading(false); // Oculta el indicador de carga una vez cargada la página
  };
return (
  <View style={{ flex: 1 }}>
      {loading && (
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={0.5} // Progreso de la barra
            width={null} // Se ajusta al 100% de la pantalla
            indeterminate={true} // La barra se muestra como indefinida mientras carga
            color={color.primary} // Color de la barra
            borderWidth={0} // Sin borde alrededor de la barra
          />
        </View>
      )}
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        onNavigationStateChange={(navState) => {
          // Puedes gestionar el cambio de navegación si es necesario
          if (navState.url !== url) {
            setUrl(navState.url);
          }
        }}
        onLoadStart={handleLoadStart} // Muestra el cargador cuando se empieza a cargar
        onLoadEnd={handleLoadEnd} // Oculta el cargador cuando la carga ha terminado
      />
    
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
  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Asegura que la barra esté encima del WebView
    paddingTop: Platform.OS === 'ios' ? 20 : 0, // Espaciado superior para iOS
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

export default MapAndoridScreen;
