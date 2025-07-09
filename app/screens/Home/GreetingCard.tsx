import React, { useState } from 'react';
import { Modal, FlatList, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useColor } from '../../Constants/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUser from '../../context/useUser';

const { color } = useColor(); // Accede al color actual

// Componente GreetingCard
const storeData = async (key: string, value: string) => {
  try {
    const jsonValue = JSON.stringify(value); // Convierte el valor a JSON
    await AsyncStorage.setItem(key, value); // Guarda el valor en Local Storage
  } catch (e) {
    console.error('Error storing data', e);
  }
};

const GreetingCard = ({greeting, scrollOffset }: {greeting: string, scrollOffset: number}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useUser();
  const isScrolled = scrollOffset > 80;
  const handleSelect = (option: string) => {
    setIsVisible(false);
    storeData("typeColor", option);
  };
  const styles = StyleSheet.create({
    headerContainer: {
      backgroundColor: color.primary, // Fondo del header
      padding: 20,
      paddingTop: 55, // Ajuste para espacio adicional en la parte superior
      borderBottomLeftRadius: isScrolled ? 0 : 20,
      borderBottomRightRadius: isScrolled ? 0 : 20,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      // marginBottom: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    logoContainer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 20, // Espacio entre el logo y el resto del contenido
    },
    logo: {
      width: 200, // Ancho del logo (ajusta según tus necesidades)
      height: 60,  // Alto del logo (ajusta según tus necesidades)
      resizeMode: 'contain',
    },
    profileCard: {
      backgroundColor: color.primary,
      padding: 15,
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    profileInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 15,
      borderWidth: 2,
      borderColor: color.white,
    },
    textContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start', // Alinea los elementos al principio (inicio) de la columna
      justifyContent: 'flex-start',
    },
    greeting: {
      color: color.white,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    sucursal: {
      color: color.lightBeige,
      fontSize: 14,
    },
    status: {
      color: color.white,
      fontSize: 12,
      marginTop: 5,
      fontStyle: 'italic', // Estilo de texto para diferenciar el estado
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: '100%',
      height: '50%',
      backgroundColor: '#ffffff',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      padding: 20,
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: -2 },
      shadowRadius: 4,
      elevation: 5,
    },
    option: {
      padding: 10,
      paddingVertical: 10,
    },
    optionText: {
      fontSize: 16,
    },
    closeButton: {
      marginTop: 15,
      backgroundColor: color.primary,
      paddingVertical: 10,
      borderRadius: 19,
      alignItems: 'center',
    },
    closeButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  return (
      <View style={styles.headerContainer}>
        {/* Logo más ancho en la parte superior */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')} // Ajusta la ruta a tu logo
            style={styles.logo}
          />
        </View>

        {/* Ocultamos los datos si el scroll ha superado el umbral */}
        {(
          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <Image
                source={require('../../assets/user-icono.png')} // Icono del usuario (ajusta la ruta)
                style={styles.avatar}
              />
              <View style={styles.textContainer}>
                <Text style={styles.greeting}>{`¡${greeting}!`}</Text>
                <Text style={styles.sucursal}>{user.fullName}</Text>
                <Text style={styles.status}>Activo ahora</Text>
              </View>
            </View>
          </View>
        )}
      </View>
  );
};



export default GreetingCard;
