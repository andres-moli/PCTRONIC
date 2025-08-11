import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HelpScreen = () => {
  
  const handleFAQ = () => {
    const faqUrl = 'https://drive.google.com/drive/folders/13eKp1fk7oJo1LnwdeMJmTcBm858UFwYm?usp=drive_link'; // Cambia al link real
    Linking.openURL(faqUrl).catch(() =>
      Alert.alert('Error', 'No se pudo abrir el enlace')
    );
  };

  const handleContactSupport = () => {
    const phoneNumber = '+573103320565'; // Número en formato internacional
    const message = encodeURIComponent(
      `Hola, necesito soporte con el sistema.\n\nMi nombre: ______\nProblema: ______\nFecha del incidente: ______`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`;

    Linking.openURL(whatsappUrl).catch(() =>
      Alert.alert('Error', 'No se pudo abrir WhatsApp')
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={handleFAQ}>
        <Text style={styles.optionText}>Preguntas Frecuentes</Text>
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleContactSupport}>
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
