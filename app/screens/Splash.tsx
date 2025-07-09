import React from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
} from 'react-native';
import { useColor } from '../Constants/Color';
import LottieView from 'lottie-react-native';
import Footer from '../components/Headers/Footer';

const { color } = useColor();

const SplashScreen: React.FC = () => {
  const imageScale = new Animated.Value(0.1);

  Animated.timing(imageScale, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/Animation/loading-app.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.welcomeText}>PC TROCNIC</Text>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.lightBeige,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, // Agrega un poco de espaciado lateral
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 36, // Aumenté el tamaño de la fuente
    fontWeight: 'bold',
    color: color.primary,
    textAlign: 'center', // Centra el texto horizontalmente
    lineHeight: 40, // Espaciado entre líneas
    letterSpacing: 2, // Aumenté el espaciado entre letras
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Color de la sombra
    textShadowOffset: { width: 1, height: 1 }, // Desplazamiento de la sombra
    textShadowRadius: 3, // Radio de la sombra
    paddingVertical: 10, // Espaciado vertical adicional
    paddingHorizontal: 15, // Espaciado horizontal adicional
    // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semi-transparente
    borderRadius: 10, // Bordes redondeados
    overflow: 'hidden', // Ocultar el desbordamiento del fondo
    elevation: 3, // Sombra para dar un efecto de elevación en Android
    shadowColor: '#000', // Color de la sombra en iOS
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.3, // Opacidad de la sombra
    shadowRadius: 4, // Radio de la sombra
    // transform: [{ rotate: '2deg' }], // Inclinar el texto
  },
  animation: {
    width: 500,
    height: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default SplashScreen;
