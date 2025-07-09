// src/components/Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useColor} from '../../Constants/Color'; // Asegúrate de que `color.primary` esté definido
const { color } = useColor();
interface HeaderProps {
  title: string; // Título del encabezado
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const notificationCount = 2; // Aquí puedes implementar lógica para el conteo real

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title.toLocaleUpperCase()}</Text>
      <TouchableOpacity style={styles.notificationButton}>
        <MaterialCommunityIcons
          name="bell"
          size={24}
          color={notificationCount > 0 ? color.primary : color.darkGray} // Cambia el color según la notificación
        />
        {notificationCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{notificationCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20, // Ajusta el padding vertical según sea necesario
    paddingHorizontal: 20, // Añade padding horizontal
    backgroundColor: color.lightPink, // Cambia el fondo al color principal
    elevation: 6, // Sombra
    marginBottom: 10, // Espacio entre el encabezado y el contenido
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.primary, // Color del texto blanco para contrastar con el fondo
  },
  notificationButton: {
    position: 'relative',
    padding: 10,
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 15,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default Header;


interface NotificationIconProps {
  notificationCount: number; // Número de notificaciones
  onPress: () => void; // Función al hacer clic
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({ notificationCount, onPress }) => {
  return (
    <View style={stylesN.container}>
      <MaterialCommunityIcons
        name="bell"
        size={28} // Tamaño del ícono
        color={notificationCount > 0 ? color.lightBeige : color.lightBeige} // Cambia el color si hay notificaciones
        onPress={onPress} // Manejar el clic
      />
      {notificationCount > 0 && (
        <View style={stylesN.badge}>
          <Text style={stylesN.badgeText}>{notificationCount}</Text>
        </View>
      )}
    </View>
  );
};

const stylesN = StyleSheet.create({
  container: {
    position: 'relative', // Para posicionar el badge sobre el ícono
    marginRight: 20, // Espacio a la derecha (ajusta según tu diseño)
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -6, // Ajusta la posición según el tamaño del ícono
    backgroundColor: color.lightPink,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});


