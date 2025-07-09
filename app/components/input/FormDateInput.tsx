import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';

interface DateProps extends TextInputProps {
  value: string;
  onChangeDate: (value: Date) => void;
}

const FormDateInput: React.FC<DateProps> = ({ value, onChangeDate, style, ...props }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChangeDate(date);
    hideDatePicker();
  };

  return (
    <View>
      <TextInput
        style={[styles.input, style]}
        value={dayjs(value).format('DD/MM/YYYY')}
        onFocus={showDatePicker}
        onPress={showDatePicker}
        // editable={false}
        {...props}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onChange={onChangeDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default FormDateInput;
