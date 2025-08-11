// src/navigation/Navigator.tsx
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importar los Screens
import HomeScreen from '../screens/Home/HomeScreen';
import CalendarScreen from '../screens/Calendar/CalendarHome';
import ActivitiesScreen from '../screens/Activities/ActivitiesScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import {useColor} from '../Constants/Color';
import { NotificationIcon } from '../components/Headers/Headers';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import ActivityDetailsScreen from '../screens/Activities/ActivityDetailsScreen';
import AddScreen from '../screens/Add/AddScreen';
import AboutScreen from '../screens/Profile/AboutScreen';
import AccountScreen from '../screens/Profile/AccountScreen';
import PermissionsScreen from '../screens/Profile/PermissionsScreen';
import TwoFactorScreen from '../screens/Profile/TwoFactorScreen';
import HelpScreen from '../screens/Profile/HelpScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SplashScreen from '../screens/Splash';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import RestorePasswordScreen from '../screens/auth/RestorePasswordScreen';
import { useValidateUserTokenLazyQuery } from '../graphql/generated/graphql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SESSION_COOKIE_KEY } from '../graphql/client';
import MapComponent from '../screens/Map/Map';
import MapComponentMultiple from '../screens/Map/MapMultiple';
import MapAndoridComponent from '../screens/Map/MapAndroid';
import OpenLinkInApp from '../screens/dummy';
import MapAndoridScreen from '../screens/Map/MapAndroid';
import { ScheduleScreen } from '../screens/Profile/ScheduleScreen';
const { color } = useColor();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const IsAdmin = true
const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity style={styles.customButton} onPress={onPress}>
    <View style={styles.plusIcon}>{children}</View>
  </TouchableOpacity>
);
const sizeIcono = 28
const HeadersConfig = (title: string) => {
  const navigation = useNavigation();
  return {
    headerRight: () => (
      <NotificationIcon notificationCount={23} onPress={()=> navigation.navigate("Notificaction")}/>
    ),
    headerShown: true,
    headerStyle: {
      backgroundColor: color.primary,
    },
    headerTintColor: color.lightBeige,
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 15, // Aumenta el tamaño de la fuente
      textAlign: 'center', // Centra el texto
      marginLeft: 0, // Elimina margen a la izquierda para centrar mejor
      marginRight: 0, // Elimina margen a la derecha para centrar mejor
    },
    title: title.toLocaleUpperCase()
  }
}
// Componente para las pantallas del Stack Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        // tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: color.primary,
        tabBarInactiveTintColor: color.darkGray,
      }}
      initialRouteName='Home'
    >
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="calendar-month"
              size={sizeIcono}
              color={focused ? color.primary : color.darkGray}
            />
          ),
        ...HeadersConfig('calendario')
        }}
      />
          <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name="home-circle"
            size={sizeIcono}
            color={focused ? color.primary : color.darkGray}
          />
        ),
        tabBarButton: (props) => (
          <CustomTabBarButton {...props}>
            <MaterialCommunityIcons name="home" size={sizeIcono} color="white" />
          </CustomTabBarButton>
        ),
        // headerLeft(props) {
        //   return (
        //     <MaterialCommunityIcons
        //     name="format-list-bulleted"
        //     size={sizeIcono}
        //     color={IsAdmin ? color.lightBeige : color.primary}
        //     style={{
        //       marginLeft: 10
        //     }}
        //     onPress={()=> IsAdmin ? navigation.goBack() : null}
        //   />
        //   )
        // },
        headerShown: false
        // ...HeadersConfig('inicio')
      }}
      />
      {/* <Tab.Screen
        name="Plus"
        component={AddScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}>
              <MaterialCommunityIcons name="plus" size={sizeIcono} color="white" />
            </CustomTabBarButton>
          ),
          headerShown: false,
        }}
      /> */}
      {/* <Tab.Screen
        name="Activities"
        component={ActivitiesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="clipboard-list"
              size={sizeIcono}
              color={focused ? color.primary : color.darkGray}
            />
          ),
          ...HeadersConfig('actividades')
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-hard-hat"
              size={sizeIcono}
              color={focused ? color.primary : color.darkGray}
            />
          ),
          ...HeadersConfig('Perfil')

        }}
      />
    </Tab.Navigator>
  );
};

// Componente principal del Navigator
const Navigator = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [valideUser] = useValidateUserTokenLazyQuery()
  useEffect(() => {
    const checkToken = async () => {
      const {loading, data, error } = await valideUser({
        variables: {
          validateTokenInput: {
            token: await AsyncStorage.getItem(SESSION_COOKIE_KEY) || "",
          }
        }
      })
      if(data?.validateUserToken){
        await AsyncStorage.setItem('user', JSON.stringify(data?.validateUserToken));
        setInitialRoute("MainTabs");
        return
      }
      setInitialRoute("Login")
      return
     
    };
    checkToken();
  }, []);
  if (initialRoute == null)
    // CAMBIA ESTO POR ALGO MEJOR, ESTO ES MIENTRAS SE CARGA LA "SESION" ANTERIOR DEL USUARIO
    return (
      <SplashScreen/>
    );
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName={initialRoute}
      >
        {/* Main Tabs */}
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }} // Oculta el encabezado en las tabs
        />
        {/* Pantalla de detalles de actividades sin tab de navegación */}
        <Stack.Screen
          name="Notificaction"
          component={NotificationScreen}
          options={{ 
            headerShown: true,
            headerStyle: {
              backgroundColor: color.primary,
            },
            headerTintColor: color.lightBeige,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 15, // Aumenta el tamaño de la fuente
              textAlign: 'center', // Centra el texto
              marginLeft: 0, // Elimina margen a la izquierda para centrar mejor
              marginRight: 0, // Elimina margen a la derecha para centrar mejor
            },
            title: 'MIS NOTIFICACIONES',
            headerBackTitleVisible: false
          }} // Título para el encabezado
        />
        <Stack.Screen
          name="ActivityDetails"
          component={ActivityDetailsScreen}
          options={{ 
            headerShown: true,
            headerStyle: {
              backgroundColor: color.primary,
            },
            headerTintColor: color.lightBeige,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 15, // Aumenta el tamaño de la fuente
              textAlign: 'center', // Centra el texto
              marginLeft: 0, // Elimina margen a la izquierda para centrar mejor
              marginRight: 0, // Elimina margen a la derecha para centrar mejor
            },
            title: 'Detalle de la actividad',
            headerBackTitleVisible: false
          }} // Título para el encabezado
        />
        <Stack.Screen
          name="MapScreen"
          component={MapComponent}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: color.primary,
            },
            headerLeft: () => (
              <MaterialCommunityIcons
                name="arrow-left" // Nombre del ícono
                size={30} // Tamaño del ícono
                color="black" // Color del ícono
                style={{ marginLeft: 10 }} // Espaciado
                onPress={() => navigation.goBack()} // Acción al presionar el ícono
              />
            ),
            headerTintColor: color.lightBeige,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 15, // Aumenta el tamaño de la fuente
              textAlign: 'center', // Centra el texto
              marginLeft: 0, // Elimina margen a la izquierda para centrar mejor
              marginRight: 0, // Elimina margen a la derecha para centrar mejor
            },
            title: 'Mapa',
            headerBackTitleVisible: true
          })}
        />
        <Stack.Screen
          name="MapComponentMultiple"
          component={MapComponentMultiple}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: color.primary,
            },
            headerLeft: () => (
              <MaterialCommunityIcons
                name="arrow-left" // Nombre del ícono
                size={30} // Tamaño del ícono
                color="black" // Color del ícono
                style={{ marginLeft: 10 }} // Espaciado
                onPress={() => navigation.goBack()} // Acción al presionar el ícono
              />
            ),
            headerTintColor: color.lightBeige,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 15, // Aumenta el tamaño de la fuente
              textAlign: 'center', // Centra el texto
              marginLeft: 0, // Elimina margen a la izquierda para centrar mejor
              marginRight: 0, // Elimina margen a la derecha para centrar mejor
            },
            title: 'Mapa',
            headerBackTitleVisible: true
          })}
        />
         <Stack.Screen
          name="MapAndoridComponent"
          component={OpenLinkInApp}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: color.primary,
            },
            headerLeft: () => (
              <MaterialCommunityIcons
                name="arrow-left" // Nombre del ícono
                size={30} // Tamaño del ícono
                color="black" // Color del ícono
                style={{ marginLeft: 10 }} // Espaciado
                onPress={() => navigation.goBack()} // Acción al presionar el ícono
              />
            ),
            headerTintColor: color.lightBeige,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 15, // Aumenta el tamaño de la fuente
              textAlign: 'center', // Centra el texto
              marginLeft: 0, // Elimina margen a la izquierda para centrar mejor
              marginRight: 0, // Elimina margen a la derecha para centrar mejor
            },
            title: 'Mapa de comentario',
            headerBackTitleVisible: true
          })}
        />
        <Stack.Screen
          name="MapAndoridMulti"
          component={MapAndoridScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: color.primary,
            },
            headerLeft: () => (
              <MaterialCommunityIcons
                name="arrow-left" // Nombre del ícono
                size={30} // Tamaño del ícono
                color="black" // Color del ícono
                style={{ marginLeft: 10 }} // Espaciado
                onPress={() => navigation.goBack()} // Acción al presionar el ícono
              />
            ),
            headerTintColor: color.lightBeige,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 15, // Aumenta el tamaño de la fuente
              textAlign: 'center', // Centra el texto
              marginLeft: 0, // Elimina margen a la izquierda para centrar mejor
              marginRight: 0, // Elimina margen a la derecha para centrar mejor
            },
            title: 'Mapa Comentarios Actividad',
            headerBackTitleVisible: true
          })}
        />
        <Stack.Screen
          name="AboutScreen"
          component={AboutScreen}
          options={{ 
            headerShown: true,
            headerStyle: {
              backgroundColor: color.primary,
            },
            headerTintColor: color.lightBeige,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 15, // Aumenta el tamaño de la fuente
              textAlign: 'center', // Centra el texto
              marginLeft: 0, // Elimina margen a la izquierda para centrar mejor
              marginRight: 0, // Elimina margen a la derecha para centrar mejor
            },
            title: 'Acerca de la app',
            headerBackTitleVisible: false
          }} // Título para el encabezado
        />
        <Stack.Screen
          name="ScheduleScreen"
          component={ScheduleScreen}
          options={{ 
            headerShown: true,
            headerStyle: {
              backgroundColor: color.primary,
            },
            headerTintColor: color.lightBeige,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 15, // Aumenta el tamaño de la fuente
              textAlign: 'center', // Centra el texto
              marginLeft: 0, // Elimina margen a la izquierda para centrar mejor
              marginRight: 0, // Elimina margen a la derecha para centrar mejor
            },
            title: 'Horario',
            headerBackTitleVisible: false
          }} // Título para el encabezado
        />
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: color.primary },
            headerTintColor: color.lightBeige,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 15,
              textAlign: 'center',
              marginLeft: 0,
              marginRight: 0,
            },
            title: 'Mi Cuenta',
            headerBackTitleVisible: false
          }}
        />
        <Stack.Screen
        name="PermissionsScreen"
        component={PermissionsScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: color.primary },
          headerTintColor: color.lightBeige,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 15,
            textAlign: 'center',
            marginLeft: 0,
            marginRight: 0,
          },
          title: 'Mis Permisos',
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="TwoFactorScreen"
        component={TwoFactorScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: color.primary },
          headerTintColor: color.lightBeige,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 15,
            textAlign: 'center',
            marginLeft: 0,
            marginRight: 0,
          },
          title: 'Autenticación en Dos Pasos',
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="HelpScreen"
        component={HelpScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: color.primary },
          headerTintColor: color.lightBeige,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 15,
            textAlign: 'center',
            marginLeft: 0,
            marginRight: 0,
          },
          title: 'Ayuda y Soporte',
          headerBackTitleVisible: false
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: color.primary },
          headerTintColor: color.lightBeige,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 15,
            textAlign: 'center',
            marginLeft: 0,
            marginRight: 0,
          },
          title: 'Bienvenido',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: color.primary },
          headerTintColor: color.lightBeige,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 15,
            textAlign: 'center',
            marginLeft: 0,
            marginRight: 0,
          },
          title: 'Bienvenido',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="RestorePassword"
        component={RestorePasswordScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: color.primary },
          headerTintColor: color.lightBeige,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 15,
            textAlign: 'center',
            marginLeft: 0,
            marginRight: 0,
          },
          title: 'Bienvenido',
          headerBackTitleVisible: false,
        }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 0,
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
    elevation: 5,
  },
  customButton: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    backgroundColor: color.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Navigator;
