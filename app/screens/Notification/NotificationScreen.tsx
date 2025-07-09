// src/screens/NotificationScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import NotificationList, { INotification } from './NotificationList';
import {useColor} from '../../Constants/Color';
const { color } = useColor();

const notificationsData: INotification[] = Array.from({ length: 15 }, (_, index) => ({
  id: (index + 1).toString(),
  message: `Notificación de ejemplo número ${index + 1}. Esta es una notificación que puede ser muy larga para probar el efecto de ver más.`,
  date: new Date().toLocaleDateString(),
  type: index % 2 === 0 ? 'reminder' : 'notification', // Alterna entre tipos
}));

const NotificationScreen = () => {
  const [searchText, setSearchText] = useState('');

  const filteredNotifications = notificationsData.filter(notification =>
    notification.message.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar notificaciones..."
        placeholderTextColor={color.darkGray}
        value={searchText}
        onChangeText={setSearchText}
      />
      {filteredNotifications.length === 0 ? (
        <Text style={styles.emptyMessage}>No tienes nuevas notificaciones</Text>
      ) : (
        <NotificationList notifications={filteredNotifications} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: color.lightBeige,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  emptyMessage: {
    textAlign: 'center',
    color: color.darkGray,
    marginTop: 50,
  },
});

export default NotificationScreen;
