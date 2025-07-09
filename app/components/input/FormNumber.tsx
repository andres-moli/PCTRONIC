import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface NumberProps extends TextInputProps {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
}

const FormNumber: React.FC<NumberProps> = ({
  value,
  placeholder,
  onChangeText,
  style,
  ...props
}) => {
  // Función para ocultar el teclado al tocar fuera
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View>
        <TextInput
          style={[styles.input, style]}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType="numeric"
          {...props}
        />
      </View>
    </TouchableWithoutFeedback>
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

export default FormNumber;
