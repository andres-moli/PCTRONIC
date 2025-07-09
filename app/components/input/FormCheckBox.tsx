import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Checkbox as RNCheckbox } from 'react-native-paper';

interface CheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: string;
}

const FormCheckbox: React.FC<CheckboxProps> = ({ value, onValueChange, label }) => {
  return (
    <View style={styles.container}>
      <RNCheckbox
        status={value ? 'checked' : 'unchecked'}
        onPress={() => onValueChange(!value)}
        color='black'
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginLeft: 10,
  },
});

export default FormCheckbox;
