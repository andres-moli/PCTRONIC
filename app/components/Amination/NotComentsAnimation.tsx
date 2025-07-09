import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import LottieView from 'lottie-react-native';
import { useColor } from '../../Constants/Color';
const { color } = useColor();
const NoCommentsAnimation = () => {
  return (
    <>
      {/* <LottieView
        source={require('../../assets/Animation/no-comments.json')}
        autoPlay
        loop
        style={styles.animation}
      /> */}
      <Text style={styles.message}>No hay comentarios disponibles.</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 400,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: -10,
    fontSize: 16,
    color: color.lightPink,
    textAlign: 'center'
    
  },
});

export default NoCommentsAnimation;
