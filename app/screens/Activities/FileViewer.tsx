import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, Linking, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';

interface Props {
  url: string;
}

const FileViewer = ({ url }: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(url);
  const isPdf = /\.pdf$/i.test(url);

  const openInBrowser = async () => {
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (err) {
      Linking.openURL(url);
    }
  };

  const renderContent = () => {
    if (isImage) {
      return (
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.previewContainer}>
          <Image source={{ uri: url }} style={styles.thumbnail} />
        </TouchableOpacity>
      );
    } else if (isPdf) {
      return (
        <TouchableOpacity onPress={openInBrowser} style={styles.previewContainer}>
          <MaterialCommunityIcons name="file-pdf-box" size={60} color="#d32f2f" />
          <Text numberOfLines={1} style={styles.fileName}>Ver PDF</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={openInBrowser} style={styles.previewContainer}>
          <MaterialCommunityIcons name="file" size={60} color="#757575" />
          <Text numberOfLines={1} style={styles.fileName}>Abrir archivo</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <Card style={styles.card}>
      {renderContent()}

      {isImage && (
        <Modal visible={isModalVisible} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <MaterialCommunityIcons name="close-circle" size={40} color="white" />
            </TouchableOpacity>
            <Image source={{ uri: url }} style={styles.fullImage} />
          </View>
        </Modal>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    padding: 10,
  },
  previewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  thumbnail: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  fileName: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
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

export default FileViewer;
