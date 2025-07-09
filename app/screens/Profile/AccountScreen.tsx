import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {useColor} from '../../Constants/Color'; // Usa tu paleta de colores personalizada
import Footer from '../../components/Headers/Footer';
import useUser from '../../context/useUser';
import FileUploadButton from '../../Lib/fileFormData';
const { color } = useColor();

const AccountScreen = () => {
  const {user} = useUser()
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phoneNumber);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/1' }}
          style={styles.avatar}
        />
        {/* <FileUploadButton/> */}
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.username}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nombres completo</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nombres completo"
        />
        <Text style={styles.label}>Apellidos completo</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Nombres completo"
        />

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Correo electrónico"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Teléfono"
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Feather name="save" size={20} color="#fff" />
        <Text style={styles.saveText}>Guardar cambios</Text>
      </TouchableOpacity>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 20, 
    backgroundColor: color.lightBeige, 
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    marginRight: 15 
  },
  name: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: color.primary 
  },
  username: { 
    fontSize: 16, 
    color: color.softYellow 
  },
  form: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: color.primary,
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default AccountScreen;
