// src/components/NotificationList.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useColor} from '../../Constants/Color';
const { color } = useColor();

export interface INotification {
  id: string;
  message: string;
  date: string; // Fecha de la notificación
  type: 'reminder' | 'notification'; // Diferenciar entre tipos
}

interface NotificationListProps {
  notifications: INotification[];
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  const renderItem = ({ item }: { item: Notification }) => {
    const isLongMessage = item.message.length > 50; // Cambia el límite según tu necesidad

    return (
      <TouchableOpacity
        style={styles.notificationItem}
        activeOpacity={0.8} // Para efecto de "hover"
      >
        <View style={[styles.iconContainer, item.type === 'reminder' ? styles.reminder : styles.notification]}>
          <MaterialCommunityIcons
            name={item.type === 'reminder' ? 'calendar' : 'bell'}
            size={24}
            color={color.lightBeige}
          />
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.notificationMessage}>
            {isLongMessage ? `${item.message.substring(0, 50)}... ` : item.message}
            {isLongMessage && <Text style={styles.seeMore}>ver más</Text>}
          </Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false} 
      nestedScrollEnabled={true} // Habilita el scroll anidado
    />
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: color.white, // Cambiado a blanco
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3, // Sombra para Android
    shadowColor: color.darkGray, // Sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginRight: 10,
  },
  reminder: {
    backgroundColor: color.lightPink, // Color específico para recordatorios
  },
  notification: {
    backgroundColor: color.primary, // Color específico para notificaciones
  },
  messageContainer: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 16,
    color: color.darkGray,
  },
  seeMore: {
    color: color.primary,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: color.darkGray,
  },
});

export default NotificationList;
