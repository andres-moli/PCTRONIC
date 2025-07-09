import React from 'react';
import { TextInput, StyleSheet, TextInputProps, Keyboard } from 'react-native';

interface TextProps extends TextInputProps {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
}

const FormText: React.FC<TextProps> = ({ value, placeholder, onChangeText, style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      onBlur={Keyboard.dismiss} 
      {...props}
    />
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

export default FormText;
