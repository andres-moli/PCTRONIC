// src/screens/ActivityListScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import ActivityCard from './ActivityCard';
import { MaterialIcons } from '@expo/vector-icons';
import {useColor} from '../../Constants/Color';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import DatePickerComponent from '../../components/input/FormDate';
const { color } = useColor();
// Simulando datos de actividades
const activitiesData = [
  { id: '1', title: 'Reunión de proyecto', description: 'Discutir avances del proyecto.', date: '2024-10-12', status: 'Completo' },
  { id: '2', title: 'Cita con el cliente', description: 'Reunión para discutir el nuevo contrato.', date: '2024-10-13', status: 'Pendiente' },
  { id: '3', title: 'Presentación de informes', description: 'Presentar los informes trimestrales.', date: '2024-10-14', status: 'Completo' },
];

const ActivityListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredActivities, setFilteredActivities] = useState(activitiesData);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const navigator = useNavigation()
  const handleViewDetails = (activityId: string) => {
    navigator.navigate("ActivityDetails", {id: activityId})
    console.log(`Ver detalles de la actividad ${activityId}`);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filteredData = activitiesData.filter(activity => 
      activity.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredActivities(filteredData);
  };

  const handleDateRangeFilter = () => {
    if (startDate && endDate) {
      const filteredData = activitiesData.filter(activity => {
        const activityDate = new Date(activity.date);
        return activityDate >= startDate && activityDate <= endDate;
      });
      setFilteredActivities(filteredData);
    }
  };

  const showDatePicker = (mode: 'start' | 'end') => {
    DateTimePickerAndroid.open({
      value: mode === 'start' ? (startDate || new Date()) : (endDate || new Date()),
      onChange: (event, selectedDate) => {
        if (mode === 'start') {
          setStartDate(selectedDate);
        } else {
          setEndDate(selectedDate);
        }
        handleDateRangeFilter(); // Filtrar por rango de fechas cada vez que se selecciona una fecha
      },
      mode: 'date',
      is24Hour: true,
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStartDate(undefined);
    setEndDate(undefined);
    setFilteredActivities(activitiesData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar actividades..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {/* <MaterialIcons name="search" size={24} color={color.darkGray} style={styles.searchIcon} /> */}
          <TouchableOpacity onPress={clearFilters} style={styles.clearButton}>
            <MaterialIcons name="clear" size={24} color={color.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.datePickerContainer}>
        <DatePickerComponent
            mode="day"
            label=" fecha de incio....."
            onDateChange={()=>{}}
          />
                  <DatePickerComponent
            mode="day"
            label=" fecha de incio....."
            onDateChange={()=>{}}
          />
         </View>

      </View>
      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ActivityCard
            title={item.title}
            description={item.description}
            date={item.date}
            status={item.status}
            onViewDetails={() => handleViewDetails(item.id)}
          />
        )}
        contentContainerStyle={filteredActivities.length === 0 && styles.emptyList}
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
  filterContainer: {
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: color.darkGray,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  datePickerText: {
    marginHorizontal: 5,
    color: color.primary,
  },
  clearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  emptyList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActivityListScreen;
