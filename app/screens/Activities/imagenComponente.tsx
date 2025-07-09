import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ImageField = ({value  }: { value: string}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <TouchableOpacity onPress={() => {
          setIsVisible(!isVisible),setModalVisible(true)
          }}>
          <MaterialCommunityIcons name={isVisible ? "image-off" : "image"} size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* {isVisible && (
        <TouchableOpacity style={styles.imageContainer} onPress={() => setModalVisible(true)}>
          {value ? (
            <Image source={{ uri: value }} style={styles.image} />
          ) : (
            <MaterialCommunityIcons name="image-plus" size={50} color="gray" />
          )}
        </TouchableOpacity>
      )} */}

      {/* Modal para ver la imagen en pantalla completa */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <MaterialCommunityIcons name="close-circle" size={40} color="white" />
          </TouchableOpacity>
          <Image source={{ uri: value }} style={styles.fullImage} />
        </View>
      </Modal>
    </Card>
  );
};


const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
});

export default ImageField;