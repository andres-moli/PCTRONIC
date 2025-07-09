import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Progress from 'react-native-progress'; // Importa la barra de progreso
import { useColor } from '../../Constants/Color';
const {color} = useColor()
const MapOneScreen = ({ navigation, route }) => {
  const { latitude, longitude } = route.params;
  const [url, setUrl] = useState(`https://89qpvk6w-5173.use.devtunnels.ms/locationFree/${latitude}/${longitude}`);
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
      {/* Barra de progreso cargando (se muestra solo mientras carga el WebView) */}
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

      {/* WebView que carga el contenido */}
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        onNavigationStateChange={(navState) => {
          if (navState.url !== url) {
            setUrl(navState.url);
          }
        }}
        onLoadStart={handleLoadStart} // Muestra la barra de carga al comenzar a cargar
        onLoadEnd={handleLoadEnd} // Oculta la barra de carga cuando la página se carga
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Asegura que la barra esté encima del WebView
    paddingTop: Platform.OS === 'ios' ? 20 : 0, // Espaciado superior para iOS
  },
});

export default MapOneScreen;
