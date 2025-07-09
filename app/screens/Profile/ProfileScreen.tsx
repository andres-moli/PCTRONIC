import React from 'react';
import { 
  View, Text, StyleSheet, Switch, Image, 
  TouchableOpacity, ScrollView, Dimensions 
} from 'react-native';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useColor } from '../../Constants/Color';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SESSION_COOKIE_KEY } from '../../graphql/client';
import useUser from '../../context/useUser';

const { width, height } = Dimensions.get('window'); // Obtener dimensiones del dispositivo
const { color } = useColor();

interface OptionItem {
  icon: string;
  title: string;
  description?: string;
  rightComponent?: any;
  screen?: string;
}

const ProfileScreen = () => {
  const [faceIdEnabled, setFaceIdEnabled] = React.useState(false);
  const {user} = useUser()
  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: height * 0.02 }}
    >
      {/* Card del Perfil */}
      <View style={styles.profileCard}>
        <View style={styles.profileInfo}>
          <Image
           source={require('../../assets/user-icono.png')} // Imagen de avatar
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>{user.fullName}</Text>
            <Text style={styles.username}>{user.email}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Feather name="edit-2" size={width * 0.06} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Opciones */}
      <View style={styles.card}>
        <OptionItem 
          icon="account" 
          title="Mi cuenta" 
          description="Realiza cambios en tu cuenta" 
          screen="AccountScreen"
        />
        {/* <OptionItem
          icon="account-multiple"
          title="Mis permisos"
          description="Gestiona tus permisos"
          screen="PermissionsScreen"
        /> */}
        <OptionItem
          icon="fingerprint"
          title="Face ID / Touch ID"
          description="Gestiona la seguridad"
          rightComponent={
            <Switch
              value={faceIdEnabled}
              onValueChange={(value) => setFaceIdEnabled(value)}
            />
          }
        />
        <OptionItem
          icon="shield-lock"
          title="Verificar en dos pasos"
          description="Mejora la seguridad de tu cuenta"
          screen="TwoFactorScreen"
        />
        <OptionItem 
          icon="logout" 
          title="Cerrar sesión" 
          description="Cierra sesión de forma segura" 
          screen="Login"
        />
      </View>

      {/* Más opciones */}
      <View style={styles.card}>
        <OptionItem 
          icon="help-circle" 
          title="Ayuda y soporte" 
          screen="HelpScreen" 
        />
        <OptionItem 
          icon="information" 
          title="Acerca de la app" 
          screen="AboutScreen" 
        />
      </View>
    </ScrollView>
  );
};

const OptionItem = ({ icon, title, description, rightComponent, screen }: OptionItem) => {
  const navigation = useNavigation(); 

  return (
    <TouchableOpacity
      style={styles.optionItem}
      onPress={async () => {
        if (screen === 'Login') {
          await AsyncStorage.removeItem(SESSION_COOKIE_KEY);
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
          return;
        }
        navigation.navigate(screen);
      }}
    >
      <View style={styles.optionInfo}>
        <MaterialCommunityIcons
          name={icon}
          size={width * 0.07}
          color={color.primary}
          style={styles.optionIcon}
        />
        <View>
          <Text style={styles.optionTitle}>{title}</Text>
          {description && (
            <Text style={styles.optionDescription}>{description}</Text>
          )}
        </View>
      </View>
      {rightComponent || (
        <Ionicons 
          name="chevron-forward" 
          size={width * 0.06} 
          color={color.darkGray} 
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  profileCard: {
    backgroundColor: color.primary,
    padding: width * 0.05,
    margin: width * 0.05,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    marginRight: width * 0.04,
  },
  name: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  username: {
    color: '#ddd',
    fontSize: width * 0.04,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: width * 0.05,
    marginVertical: height * 0.01,
    borderRadius: 16,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    elevation: 3,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: width * 0.04,
  },
  optionTitle: {
    fontSize: width * 0.045,
    fontWeight: '500',
  },
  optionDescription: {
    fontSize: width * 0.035,
    color: '#888',
  },
});

export default ProfileScreen;
