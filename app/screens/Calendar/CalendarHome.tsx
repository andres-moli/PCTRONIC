// src/screens/CalendarHome.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Asegúrate de instalar esta dependencia
import {useColor} from '../../Constants/Color';
import dayjs from 'dayjs';
import { StatusVisitEnum, useVisitsQuery } from '../../graphql/generated/graphql';
import useUser from '../../context/useUser';
import { formatWithCommonFormats } from '../../Lib/MangerDate';
import { translateStatusVisit } from '../../Lib';
const { color } = useColor();


const eventsData = {
  '2024-10-12': [
    { id: '1', title: 'Reunión de proyecto', description: 'Discutir avances del proyecto.', time: '10:00 AM' },
    { id: '2', title: 'Cita con el cliente', description: 'Reunión para discutir el nuevo contrato.', time: '2:00 PM' },
  ],
  '2024-10-13': [
    { id: '3', title: 'Presentación de informes', description: 'Presentar los informes trimestrales.', time: '11:00 AM' },
  ],
};

const getRandomColor = (status: StatusVisitEnum) => {
  if(status === StatusVisitEnum.Initiated){
    return '#FFD9B3'
  }
  if(status === StatusVisitEnum.Realized) {
    return '#C3E6CB'
  }
  return '#b2ebf2'
  const color = ['#ffccbc', '#b2ebf2', '#d1c4e9', '#ffe082', '#c8e6c9', '#ffcdd2'];
  return color[Math.floor(Math.random() * color.length)];
};

const CalendarScreen = ({navigation}) => {
  const {user} = useUser()
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [events, setEvents] = useState([]);
  const [fechaInicio, setFechaInicio] = useState(dayjs().startOf('day').format('YYYY-MM-DD'));
  const [fechaFin, setFechaFin] = useState(dayjs().endOf('day').format('YYYY-MM-DD'));
  const {data, loading} = useVisitsQuery({
    variables:{
      where: {
        createdAt: {
          _between: [`${fechaInicio} 00:00:00`,`${fechaFin} 23:59:59`]
        },
        user: {
          _eq: user.id
        }
      }
    },
    fetchPolicy: 'no-cache'
  })
  // useEffect(() => {
  //   setIsLoading((pre)=> !pre);
  // }, [data,loading,fechaInicio,fechaFin]);
  const onDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setFechaInicio(day.dateString);
    setFechaFin(day.dateString)
  };
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{loading ? 'Cargando visitas...' : 'No se encontraron visitas'}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        theme={{
          todayTextColor: color.primary,
          selectedDayBackgroundColor: color.primary,
          arrowColor: color.primary,
        }}
      />
      <Text style={styles.selectedDateText}>
        {selectedDate ? `Visitas del ${selectedDate}` : 'Seleccione una fecha'}
      </Text>
      <FlatList
        data={data?.visits}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>navigation.navigate('ActivityDetails', { visitId: item.id })} style={[styles.card, { backgroundColor: getRandomColor(item.status) }]}>
            <MaterialCommunityIcons name="calendar" size={24} color={color.primary} style={styles.icon} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{formatWithCommonFormats(item.dateVisit, 'LLL')}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
              <Text style={styles.cardTime}>{item.type ? item.type.name : 'SIN TIPO'}</Text>
              <Text style={styles.cardTime}>{translateStatusVisit(item.status)}</Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.eventList}
        ListHeaderComponent={
          loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={color.primary} />
            </View>
          ) : null
        }
        contentContainerStyle={data?.visits.length === 0 && styles.emptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: color.lightBeige,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
  selectedDateText: {
    fontSize: 20, // Aumentar el tamaño de la fuente
    fontWeight: 'bold', // Negrita para mayor visibilidad
    marginVertical: 10,
    textAlign: 'center',
  },
  eventList: {
    marginTop: 10,
  },
  emptyList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18, // Aumentar el tamaño del título
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
  cardTime: {
    fontSize: 12,
    color: '#888',
  },
});

export default CalendarScreen;
