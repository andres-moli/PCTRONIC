import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AntDesign } from '@expo/vector-icons';
import dayjs from 'dayjs';
import {useColor} from '../../Constants/Color';
const { color } = useColor();
type DatePickerMode = 'day' | 'day-time' | 'separate' | 'time';

interface DatePickerComponentProps {
  mode: DatePickerMode;
  label: string;
  onDateChange: (date: Date) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  mode,
  label,
  onDateChange,
}) => {
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');

  const showDatePicker = (mode: 'date' | 'time') => {
    setPickerMode(mode);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate: Date) => {
    setDate(selectedDate);
    onDateChange(selectedDate);
    hideDatePicker();
  };
  const CustomCancelButton = () => (
    <TouchableOpacity onPress={hideDatePicker} style={{ padding: 10, backgroundColor: color.coral, borderRadius: 5 }}>
        <Text style={{ color: color.white }}>Cancelar</Text>
    </TouchableOpacity>
);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inlineContainer}>
        <Pressable
          style={[styles.input, styles.inlineInput]}
          onPress={() => showDatePicker('date')}
        >
          <AntDesign name="calendar" size={20} color={color.primary} style={styles.icon} />
          <Text>{dayjs(date).format('DD/MM/YYYY')}</Text>
        </Pressable>

        {mode !== 'day' && (
          <Pressable
            style={[styles.input, styles.inlineInput]}
            onPress={() => showDatePicker('time')}
          >
            <AntDesign name="clockcircleo" size={20} color={color.primary} style={styles.icon} />
            <Text>{dayjs(date).format('HH:mm')}</Text>
          </Pressable>
        )}
      </View>

      {/* DateTime Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={pickerMode}
        date={date}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        display="spinner" // Para iOS es más amigable
        accentColor={color.primary} // Puedes cambiar esto a otro color si lo prefieres
        textColor={color.darkGray}
        locale="es_ES" 
        cancelTextIOS='Cancelar'
        confirmTextIOS='Confirmar'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
    color: color.primary
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  icon: {
    marginRight: 10,
  },
  inlineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inlineInput: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default DatePickerComponent;
