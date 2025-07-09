import React, { useState } from 'react';
import {
  View, Text, TextInput, Switch, ScrollView,
  TouchableOpacity, StyleSheet, Platform,
  KeyboardAvoidingView, SafeAreaView, Dimensions, Keyboard
} from 'react-native';
import { useColor } from '../../Constants/Color';
import DatePickerComponent from '../../components/input/FormDate';
import Select from '../../components/input/Select';

const { width, height } = Dimensions.get('window'); // Dimensiones del dispositivo
const { color } = useColor();

const AddScreen = () => {
  const [tab, setTab] = useState('Evento'); // Tab activo
  const [isAllDay, setIsAllDay] = useState(false); // Todo el día
  const [reminderOptions, setReminderOptions] = useState({
    oneDayBefore: false,
    sixHoursBefore: false,
    twoHoursBefore: false,
    thirtyMinutesBefore: false,
  });

  const handleDateChange = (date: Date) => {
    console.log('Fecha seleccionada:', date);
  };

  const options = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5'];

  const handleSelect = (selectedOption: string) => {
    console.log('Seleccionado:', selectedOption);
  };

  const handleSwitchChange = (option: string) => {
    setReminderOptions((prevState) => ({
      ...prevState,
      [option]: !prevState[option],
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: width * 0.04 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Encabezado */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.buttonHeader}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Nuevo</Text>
            <TouchableOpacity style={styles.buttonHeader}>
              <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, tab === 'Evento' && styles.activeTab]}
              onPress={() => setTab('Evento')}
            >
              <Text>Evento</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, tab === 'Recordatorio' && styles.activeTab]}
              onPress={() => setTab('Recordatorio')}
            >
              <Text>Recordatorio</Text>
            </TouchableOpacity>
          </View>

          {/* Campos comunes */}
          <TextInput 
            placeholder="Título" 
            style={styles.input} 
          />
          <TextInput
            placeholder="Nota"
            style={styles.inputArea}
            numberOfLines={4}
            onBlur={Keyboard.dismiss}
          />

          {/* Opciones para Evento */}
          {tab === 'Evento' && (
            <View>
              <View style={styles.switchContainer}>
                <Text style={styles.label}>Todo el día</Text>
                <Switch
                  value={isAllDay}
                  onValueChange={() => setIsAllDay(!isAllDay)}
                />
              </View>

              <DatePickerComponent
                mode="separate"
                label="Seleccionar fecha de inicio"
                onDateChange={handleDateChange}
              />

              <DatePickerComponent
                mode="separate"
                label="Seleccionar fecha de final"
                onDateChange={handleDateChange}
              />
            </View>
          )}

          {/* Recordatorio */}
          {tab === 'Recordatorio' && (
            <View>
              <DatePickerComponent
                mode="separate"
                label="Seleccionar fecha para el recordatorio"
                onDateChange={handleDateChange}
              />
            </View>
          )}

          {/* Selector de Repetición */}
          <View style={styles.pickerContainer}>
            <Select
              options={options}
              placeholder="Selecciona una opción"
              onSelect={handleSelect}
            />
          </View>

          {/* Opciones de recordatorio */}
          <Text style={styles.label}>Recuérdame...</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.label}>1 día antes</Text>
            <Switch
              value={reminderOptions.oneDayBefore}
              onValueChange={() => handleSwitchChange('oneDayBefore')}
            />
            <Text style={styles.label}>6 horas antes</Text>
            <Switch
              value={reminderOptions.sixHoursBefore}
              onValueChange={() => handleSwitchChange('sixHoursBefore')}
            />
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.label}>2 horas antes</Text>
            <Switch
              value={reminderOptions.twoHoursBefore}
              onValueChange={() => handleSwitchChange('twoHoursBefore')}
            />
            <Text style={styles.label}>30 minutos antes</Text>
            <Switch
              value={reminderOptions.thirtyMinutesBefore}
              onValueChange={() => handleSwitchChange('thirtyMinutesBefore')}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.lightBeige,
    paddingHorizontal: width * 0.04,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  buttonHeader: {
    padding: width * 0.02,
  },
  buttonText: {
    color: color.primary,
    fontSize: width * 0.045,
  },
  headerTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginVertical: height * 0.02,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: height * 0.015,
    backgroundColor: color.lightPink,
  },
  activeTab: {
    backgroundColor: color.primary,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: height * 0.01,
    marginVertical: height * 0.01,
    fontSize: width * 0.04,
  },
  inputArea: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: width * 0.03,
    marginVertical: height * 0.01,
    fontSize: width * 0.04,
    height: height * 0.15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: height * 0.01,
  },
  label: {
    fontSize: width * 0.04,
    marginVertical: height * 0.005,
    color: color.primary,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginVertical: height * 0.01,
  },
});

export default AddScreen;
