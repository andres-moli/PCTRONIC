import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColor } from '../../Constants/Color';
import { useNavigation } from '@react-navigation/native';
import DatePickerComponent from '../../components/input/FormDate';
import Footer from '../../components/Headers/Footer';

const { color } = useColor();

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleSendEmail = () => {
    // Aquí puedes agregar la lógica para enviar el correo
    console.log('Email enviado a:', email);
    navigation.navigate('RestorePassword'); // Navegar a la pantalla de restaurar contraseña
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Olvidé mi contraseña</Text>
      <Text style={styles.description}>
        Introduce tu correo electrónico para recibir instrucciones sobre cómo restablecer tu contraseña.
      </Text>

      {/* <DatePickerComponent
          mode="day"
          label="Seleccionar fecha para el recordatorio"
          onDateChange={()=>{}}
        /> */}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="email"
          size={24}
          color={color.lightBeige}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor={color.darkGray}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <TouchableOpacity style={styles.sendButton} onPress={handleSendEmail}>
        <Text style={styles.sendButtonText}>Enviar</Text>
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
    marginBottom: 60,
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
  sendButton: {
    backgroundColor: color.lightPink,
    paddingVertical: 15,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  sendButtonText: {
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

export default ForgotPasswordScreen;
