import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { useColor } from '../Constants/Color';

const { color } = useColor();
const UploadProgressModal2 = ({ visible, progress }: { visible: boolean; progress: number }) => {

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: color.white }]}>
          <Text style={{ color: color.darkGray, marginBottom: 12 }}>
            Subiendo imagen... 
            {/* {progress}% */}
          </Text>
          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${progress}%`,
                  backgroundColor: color.primary,
                },
              ]}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
  },
  progressBackground: {
    height: 10,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
});

export default UploadProgressModal2;
