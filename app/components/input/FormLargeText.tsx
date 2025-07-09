import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface LargeTextProps extends TextInputProps {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
}

const FormLargeText: React.FC<LargeTextProps> = ({ value, placeholder, onChangeText, style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, styles.largeInput, style]}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      multiline
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
  largeInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default FormLargeText;
