import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useColor } from '../../Constants/Color';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../components/Headers/Footer';
import { useSigninMutation } from '../../graphql/generated/graphql';
import { ToastyErrorGraph } from '../../graphql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SESSION_COOKIE_KEY } from '../../graphql/client';
import useUser from '../../context/useUser';

const { color } = useColor();

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [login] = useSigninMutation()
  const {saveUser} = useUser();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if(!email){
      Alert.alert('Alerta','Email no puede ser vacio')
      return
    }
    if(!password){
      Alert.alert('Alerta','Password no puede ser vacio')
      return
    }
    setIsLoading(true)
    try{
      const res = await login({
        variables: {
          signinInput: {
            email,
            password
          }
        }
      })
      await AsyncStorage.setItem(SESSION_COOKIE_KEY, res.data?.signin.token || "");
      await saveUser(res.data?.signin.user)
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    }catch(err) {
      const menssage = ToastyErrorGraph(err as any);
      Alert.alert('ERROR','¡Oops! El correo o la contraseña no coinciden. Por favor, verifica y vuelve a intentarlo.')
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <View style={styles.container}>
      {/* Sección del logo y título en la misma fila */}
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/logo.png')}
          // style={styles.logo}
        />
        <Text style={styles.title}>¡Bienvenido otra vez!</Text>
      </View>

      {/* Campo de Email */}
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
          keyboardType="email-address"

        />
      </View>

      {/* Campo de Contraseña */}
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="lock"
          size={24}
          color={color.lightBeige}
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={color.darkGray}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          //@ts-ignore
          // keyboardType='password'
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <MaterialCommunityIcons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color={color.lightBeige}
          />
        </TouchableOpacity>
      </View>

      {/* Enlace de "Olvidaste tu contraseña" */}
      <TouchableOpacity style={styles.saveButton} onPress={handleLogin}>
      {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity>
        {/* Botón de Iniciar Sesión */} 
        <Text style={styles.forgotPassword} onPress={()=> {navigation.navigate("ForgotPassword")}}>¿Olvidaste tu contraseña?</Text>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    flexWrap: 'wrap', // Permitir que el contenido se ajuste en varias líneas
    justifyContent: 'center', // Centrar el contenido
  },
  logo: {
    width: 110,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.white,
    fontFamily: 'Roboto',
    marginBottom: 20,
    paddingVertical: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: color.lightPink,
    marginBottom: 20,
    paddingHorizontal: 5,
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
  forgotPassword: {
    fontSize: 14,
    color: color.darkGray,
    marginBottom: 30,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  saveButton: {
    backgroundColor: color.lightPink,
    paddingVertical: 15,
    borderRadius: 20,
    width: '50%',
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: color.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
