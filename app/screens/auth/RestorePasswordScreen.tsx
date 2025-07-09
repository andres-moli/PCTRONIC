import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColor } from '../../Constants/Color';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../components/Headers/Footer';

const { color } = useColor();

const RestorePasswordScreen: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleRestorePassword = () => {
    // Aquí puedes agregar la lógica para restaurar la contraseña
    if (newPassword === confirmPassword) {
      console.log('Contraseña restaurada a:', newPassword);
      navigation.navigate('Login'); // Navegar a la pantalla de inicio de sesión
    } else {
      alert("Las contraseñas no coinciden.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Restaurar contraseña</Text>
      <Text style={styles.description}>
        Introduce tu nueva contraseña.
      </Text>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="lock"
          size={24}
          color={color.lightBeige}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          placeholderTextColor={color.darkGray}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="lock"
          size={24}
          color={color.lightBeige}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar nueva contraseña"
          placeholderTextColor={color.darkGray}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity style={styles.restoreButton} onPress={handleRestorePassword}>
        <Text style={styles.restoreButtonText}>Restablecer Contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backToLogin}>Volver a iniciar sesión</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.white,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: color.lightBeige,
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: color.lightPink,
    marginBottom: 20,
    paddingHorizontal: 5,
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: color.lightPink,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 5,
  },
  restoreButton: {
    backgroundColor: color.lightPink,
    paddingVertical: 15,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  restoreButtonText: {
    color: color.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToLogin: {
    fontSize: 14,
    color: color.darkGray,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default RestorePasswordScreen;
