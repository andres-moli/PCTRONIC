import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface EmailProps extends TextInputProps {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
}

const FormEmail: React.FC<EmailProps> = ({ value, placeholder, onChangeText, style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      keyboardType="email-address"
      autoCapitalize="none"
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

export default FormEmail;
