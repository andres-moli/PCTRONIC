import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useColor } from '../../Constants/Color'; 

const { color } = useColor();
const { height } = Dimensions.get('window'); // Obtener la altura de la pantalla

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.byText}>CREATED BY:</Text>
      <Text style={styles.turnText}>TURN 💡N</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    bottom: height * 0.04, // Ajustar la distancia desde el fondo
    left: 0,
    right: 0,
    padding: 15,
    // backgroundColor: color.lightBeige, // Fondo suave
    alignItems: 'center',
  },
  byText: {
    color: '#000000', // Color negro para "CREATED BY:"
    fontSize: 14, // Tamaño de fuente más pequeño
    fontWeight: '600', // Peso de fuente más ligero
    textAlign: 'center', // Centrar texto
    letterSpacing: 1.3, // Espaciado entre letras
  },
  turnText: {
    color: color.softYellow, // Color amarillo para "TURN"
    fontSize: 16, // Tamaño de fuente más pequeño
    fontWeight: '600', // Peso de fuente más ligero
    textAlign: 'center', // Centrar texto
    letterSpacing: 1.1, // Espaciado entre letras
    textShadowColor: 'rgba(0, 0, 0, 0.2)', // Color de sombra
    textShadowOffset: { width: 0, height: 1 }, // Desplazamiento de sombra
    textShadowRadius: 1, // Difuminado de sombra
  },
});

export default Footer;
