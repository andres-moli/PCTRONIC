import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';

const SliderButton = () => {
  const [translateX] = useState(new Animated.Value(0));

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 20; // Detectar si el movimiento es significativo
    },
    onPanResponderMove: (evt, gestureState) => {
      translateX.setValue(gestureState.dx); // Actualizar la posición del botón
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 100) {
        // Si el desplazamiento es suficiente, realizar acción
        console.log('Día iniciado');
        Animated.spring(translateX, {
          toValue: 150, // Desplazar a la posición final
          useNativeDriver: true,
        }).start();
      } else {
        // Regresar a la posición original si no se alcanza el límite
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <View style={styles.pathContainer}>
      <View style={styles.path} />
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.button, { transform: [{ translateX }] }]} >
        <Text style={styles.buttonText}>Iniciar Día</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pathContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  path: {
    width: '100%',
    height: 10,
    backgroundColor: 'lightgray', // Color del camino
    borderRadius: 5,
    position: 'absolute',
    top: '50%', // Centra el camino verticalmente
  },
  button: {
    backgroundColor: 'coral',
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    left: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SliderButton;
