// import React from 'react';
// import { View, Text, TouchableOpacity, Alert, StyleSheet, Platform } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
//   // Importamos el ícono desde FontAwesome

// const uploadFile = async () => {
//   try {
//     // Paso 1: Seleccionar archivo
//     const res = await DocumentPicker.pick({
//       type: [DocumentPicker.types.allFiles],
//     });

//     // Paso 2: Crear un objeto FormData
//     const formData = new FormData();

//     // Aquí se agrega el archivo seleccionado al FormData.
//     formData.append('file', {
//       uri: Platform.OS === 'ios' ? res[0].uri.replace('file://', '') : res[0].uri,
//       type: res[0].type,  // Tipo MIME del archivo
//       name: res[0].name,  // Nombre del archivo
//     });

//     // Paso 3: Subir el archivo
//     const response = await fetch('https://89qpvk6w-3075.use.devtunnels.ms/attachment/files', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       body: formData,
//     });

//     // Paso 4: Verificar respuesta
//     const jsonResponse = await response.json();
//     if (response.ok) {
//       Alert.alert('Archivo subido con éxito', JSON.stringify(jsonResponse));
//     } else {
//       Alert.alert('Error al subir el archivo', JSON.stringify(jsonResponse));
//     }
//   } catch (error) {
//     if (DocumentPicker.isCancel(error)) {
//       // El usuario canceló la selección de archivos
//       Alert.alert('Selección cancelada');
//     } else {
//       // Otro tipo de error
//       Alert.alert('Error', 'Hubo un error al seleccionar o subir el archivo');
//     }
//   }
// };

// const FileUploadButton = () => (
//   <View style={styles.container}>
//     <TouchableOpacity style={styles.button} onPress={uploadFile}>
//       <MaterialCommunityIcons name="upload" size={20} color="#fff" style={styles.icon} />
//       <Text style={styles.buttonText}>Subir archivo</Text>
//     </TouchableOpacity>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   button: {
//     backgroundColor: '#4CAF50',  // Color verde para indicar éxito
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 30,  // Bordes redondeados para un aspecto moderno
//     flexDirection: 'row',
//     alignItems: 'center',
//     shadowColor: '#000',  // Sombra para dar profundidad
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 5,  // Elevación para Android
//   },
//   icon: {
//     marginRight: 10,  // Espacio entre el icono y el texto
//   },
//   buttonText: {
//     color: '#fff',  // Color blanco para el texto
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default FileUploadButton;
