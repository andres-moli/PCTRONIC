import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Switch,
  Modal,
  ScrollView,
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DatePickerComponent from '../../components/input/FormDate'; // Asegúrate de tener este componente
import {useColor} from '../../Constants/Color'; // Paleta de colores
import Select from '../../components/input/Select';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
const { color } = useColor();

const screenWidth = Dimensions.get('window').width;

const permissions = [
  { id: '1', name: 'Permiso 1', date: '2024-10-01', status: 'Aprobado', type: 'Vacaciones' },
  { id: '2', name: 'Permiso 2', date: '2024-10-10', status: 'Pendiente', type: 'Personal' },
  { id: '2', name: 'Permiso 2', date: '2024-10-10', status: 'Pendiente', type: 'Personal' },
  { id: '2', name: 'Permiso 2', date: '2024-10-10', status: 'Pendiente', type: 'Personal' },
  { id: '2', name: 'Permiso 2', date: '2024-10-10', status: 'Pendiente', type: 'Personal' },
  { id: '2', name: 'Permiso 2', date: '2024-10-10', status: 'Pendiente', type: 'Personal' },
  { id: '2', name: 'Permiso 2', date: '2024-10-10', status: 'Pendiente', type: 'Personal' },
  { id: '2', name: 'Permiso 2', date: '2024-10-10', status: 'Pendiente', type: 'Personal' },
  { id: '2', name: 'Permiso 2', date: '2024-10-10', status: 'Pendiente', type: 'Personal' },
  { id: '2', name: 'Permiso 2', date: '2024-10-10', status: 'Pendiente', type: 'Personal' },
  { id: '2', name: 'Permiso 2', date: '2024-10-10', status: 'Pendiente', type: 'Personal' },
  { id: '2', name: 'Permiso 2', date: '2024-10-10', status: 'Pendiente', type: 'Personal' },
  { id: '2', name: 'Permiso 2', date: '2024-10-10', status: 'Pendiente', type: 'Personal' },
];

const PermissionsScreen = () => {
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const [isMultiDay, setIsMultiDay] = useState(false);

  const closeModal = () => {
    setInfoModalVisible(false);
    setSelectedPermission(null); // Resetea el permiso seleccionado al cerrar el modal
  };
  
  const closeModalCrear = () => {
    setCreateModalVisible(false);
  };

  const openInfoModal = (permission) => {
    setSelectedPermission(permission);
    setInfoModalVisible(true);
  };
  const options = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5'];

  const handleSelect = (selectedOption: string) => {
    console.log('Seleccionado:', selectedOption);
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const timestamp = new Date().toLocaleTimeString();
    }
  };

  const handleDocumentPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
    }
  };

  const renderPermissionItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openInfoModal(item)}>
      <View style={styles.verticalLine} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardInfo}>Fecha: {item.date}</Text>
        <Text style={styles.cardInfo}>Estado: {item.status}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={color.primary} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={permissions}
        keyExtractor={(item) => item.id}
        renderItem={renderPermissionItem}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.saveButton} onPress={() => setCreateModalVisible(true)}>
        <Feather name="plus" size={20} color="#fff" />
        <Text style={styles.saveButtonText}>Crear Permiso</Text>
      </TouchableOpacity>

      {/* Modal de creación */}
      <Modal
        visible={isCreateModalVisible}
        animationType="slide"
        transparent={true} // Usar fondo transparente
        onRequestClose={closeModalCrear} // Cerrar al tocar fuera (si es posible)
      >
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <Ionicons name="create" size={40} color={color.primary} style={styles.modalIcon} />
            <Text style={styles.modalTitle}>Crear Permiso</Text>

            <Text style={styles.label}>Título</Text>
            <TextInput style={styles.input} placeholder="Ej: Vacaciones" />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              placeholder="Ej: Personal"
              blurOnSubmit={true}
              returnKeyType="next"
            />
            <Select
              options={options}
              placeholder="Selecciona una opción"
              onSelect={handleSelect}
            />
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handleImagePicker} style={styles.iconButton}>
                <MaterialCommunityIcons name="image-plus" color={color.coral} size={28} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDocumentPicker} style={styles.iconButton}>
                <MaterialCommunityIcons name="file-plus" color={color.coral} size={28} />
              </TouchableOpacity>
            </View>
            <View style={styles.optionItem}>
              <Text style={styles.label}>Es más de 1 día</Text>
              <Switch
                value={isMultiDay}
                onValueChange={setIsMultiDay} // Simplificado
              />
            </View>
            {isMultiDay ? (
              <>
                <DatePickerComponent mode="day" label="Fecha Inicio" onDateChange={() => {}} />
                <DatePickerComponent mode="day" label="Fecha Final" onDateChange={() => {}} />
              </>
            ) : (
              <>
                <DatePickerComponent label="Hora Entrada" onDateChange={() => {}} mode="time" />
                <DatePickerComponent label="Hora Salida" onDateChange={() => {}} mode="time" />
              </>
            )}

            <TouchableOpacity style={styles.saveButton} onPress={closeModalCrear}>
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>            
            <TouchableOpacity style={styles.closeButton} onPress={closeModalCrear}>
              <Text style={styles.saveButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </ScrollView>
          </View>
        </View>
        {/* </ScrollView> */}
      </Modal>

      {/* Modal de información */}
      <Modal
        visible={isInfoModalVisible}
        animationType="slide"
        transparent={true} // Usar fondo transparente
        onRequestClose={closeModal} // Cerrar al tocar fuera (si es posible)
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContentWide}>
            {selectedPermission && (
              <>
                <Ionicons name="document-text" size={40} color={color.primary} style={styles.modalIcon} />
                <Text style={styles.modalTitle}>{selectedPermission.name}</Text>

                <Text style={styles.label}>Fecha de Solicitud</Text>
                <Text style={styles.modalInfo}>{selectedPermission.date}</Text>

                <Text style={styles.label}>Estado</Text>
                <Text style={styles.modalInfo}>{selectedPermission.status}</Text>

                <Text style={styles.label}>Tipo</Text>
                <Text style={styles.modalInfo}>{selectedPermission.type}</Text>

                <Text style={styles.label}>Descripción</Text>
                <Text style={styles.modalInfo}>Aquí va la descripción del permiso.</Text>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: color.lightBeige,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  verticalLine: {
    width: 8,
    backgroundColor: color.primary,
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.primary,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end', // Ajustar para que el modal aparezca desde abajo
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalContentWide: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 30,
  },
  modalIcon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: color.primary,
    marginTop: 10,
  },
  modalInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 45,
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: color.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: color.lightPink,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textArea: {
    height: 100,
    borderColor: color.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: color.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
  },
  iconButton: {
    padding: 20,
  },
});

export default PermissionsScreen;
