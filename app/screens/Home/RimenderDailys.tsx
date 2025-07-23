// src/components/DailyReminders.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import {useColor} from '../../Constants/Color';
import NotificationList, { INotification } from '../Notification/NotificationList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useVisitsQuery, Visit } from '../../graphql/generated/graphql';
import dayjs from 'dayjs';
import useUser from '../../context/useUser';
import { useNavigation } from '@react-navigation/native';
import { formatWithCommonFormats } from '../../Lib/MangerDate';
const { color } = useColor();


const DailyReminders = ({refetchControl}: {refetchControl: boolean}) => {
  const navigation = useNavigation();
  const renderItem = ({ item }: { item: Visit }) => {
    const isLongMessage = item.description.length > 50; // Cambia el límite según tu necesidad
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
    
    return (
      <TouchableOpacity
        style={styles.notificationItem}
        activeOpacity={0.8} // Para efecto de "hover"
        onPress={()=> {navigation.navigate('ActivityDetails', { visitId: item.id })}}
      >
        <View style={[styles.iconContainer, styles.notification]}>
          <MaterialCommunityIcons
            name={ 'calendar'}
            size={24}
            color={color.lightBeige}
          />
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.notificationMessage}>
            {isLongMessage ? `${item.description.substring(0, 50)}... ` : item.description}
            {isLongMessage && <Text style={styles.seeMore}>ver más</Text>}
          </Text>
          <Text style={styles.date}>{item.type ? item.type.name : 'SIN TIPO'}</Text>
          {/* <Text style={styles.date}>{item.project ? item.project.name : 'SIN Proyecto'}</Text> */}
          <Text style={styles.date}>{formatWithCommonFormats(item.dateVisit, 'G')}</Text>
        </View>
      </TouchableOpacity>
    );
    
  };
  const {user} = useUser()
  const [loadingRefesh, setLoadingRefesh] = useState(false)
  const {data, loading, refetch} = useVisitsQuery({
    variables: {
      where: {
        user: {
          _eq: user.id
        },
        createdAt: {
          _between: [dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'),dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss')]
        },
      }
    }
  })
  useEffect(() => {
    const refesh = async () =>{
      if (refetchControl) {
        setLoadingRefesh(true)
        await refetch(); // Refrescar datos
        setLoadingRefesh(false)   
      }
    }
    refesh()
  }, [refetchControl, refetch]);
  const onRefesh = () => {
    refetch()
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis actividades de hoy</Text>
      {/* <View style={styles.card}>
      </View> */}
      <FlatList
          refreshing
          refreshControl={
            <RefreshControl refreshing={loadingRefesh} onRefresh={onRefesh} />
          }
          data={data?.visits || []}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false} 
          nestedScrollEnabled={true} // Habilita el scroll anidado
          ListEmptyComponent={<Text>No hay actividades</Text>}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.darkGray,
    marginBottom: 10,
  },
  card: {
    backgroundColor: color.white,
    borderRadius: 10,
    padding: 15,
    elevation: 3, // Sombra para Android
    shadowColor: color.darkGray, // Sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    maxHeight: 200, // Altura máxima para el desplazamiento
  },
});

export default DailyReminders;
