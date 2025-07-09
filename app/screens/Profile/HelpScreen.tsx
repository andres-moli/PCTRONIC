import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HelpScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Preguntas Frecuentes</Text>
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Contactar Soporte</Text>
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: { fontSize: 18 },
});

export default HelpScreen;
