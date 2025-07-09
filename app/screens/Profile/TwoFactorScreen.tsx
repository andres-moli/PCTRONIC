import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const TwoFactorScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Autenticación en Dos Pasos</Text>
      <View style={styles.option}>
        <Text style={styles.optionText}>Habilitar 2FA</Text>
        <Switch value={isEnabled} onValueChange={setIsEnabled} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: { fontSize: 18 },
});

export default TwoFactorScreen;
