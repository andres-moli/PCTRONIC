import React from 'react';
import { View, Modal, Text, ActivityIndicator, StyleSheet } from 'react-native';

const UploadProgressModal = ({ visible, progress }: {visible: boolean, progress: number }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.progressText}>Subiendo foto {progress}%</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' },
  progressText: { marginTop: 10, fontSize: 16, fontWeight: 'bold' },
});

export default UploadProgressModal;
