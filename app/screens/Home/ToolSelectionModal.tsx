import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Platform,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useColor } from '../../Constants/Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateVisitToolUnitInput, Tool, ToolUnitStatusEnum, useCreateToolVisitAllMutation, useCreateToolVisitMutation, useRemoveFileMutation, useToolsListLazyQuery, useToolsListQuery } from '../../graphql/generated/graphql';
import handleUploadImage from '../../Lib/uptloadFile';
import UploadProgressModal from './updload';
import UploadProgressModal2 from '../../Lib/UploadProgressModal';
import { ToastyErrorGraph } from '../../graphql';

export interface IImageWithTools {
  id: string;
  url: string;
}
export interface ToolWithImages extends Tool {
  images: IImageWithTools[];
}

interface ToolSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (selectedTools: ToolWithImages[]) => void;
  visitId?: string | undefined
}

const ToolSelectionModal: React.FC<ToolSelectionModalProps> = ({
    visible,
    onClose,
    onSubmit,
    visitId
  }) => {
    const { color } = useColor();
    const { data, loading, refetch } = useToolsListQuery({
      fetchPolicy: 'no-cache'
    });
    const [createToolVisit] = useCreateToolVisitAllMutation()
    const [deleteFile] = useRemoveFileMutation()
    const [selectedTools, setSelectedTools] = useState<ToolWithImages[]>([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadVisible, setUploadVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [addloading, setaddloading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
      refetch()
      setSelectedTools([])
    }, [visible])
    const handleRefresh = async () => {
    setRefreshing(true);
    try {
        await refetch(); // Refresca los datos
    } catch (error) {
        console.error('Error refreshing tools:', error);
    } finally {
        setRefreshing(false);
    }
    };
    const confirmRemoveTool = (tool: ToolWithImages) => {
      const selectedTool = selectedTools.find((t) => t.id === tool.id);
      if((selectedTool?.images.length || 0) > 0){
        Alert.alert('Primero elimine las fotos vinculadas a esta herramienta antes de eliminarla.')
        return
      }
      Alert.alert(
        '¿Eliminar herramienta?',
        `¿Estás seguro que deseas eliminar "${tool.name}" de la selección?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Eliminar',
            style: 'destructive',
            onPress: () => {
              setSelectedTools((prev) => prev.filter((t) => t.id !== tool.id));
            },
          },
        ]
      );
    };
  
    const toggleTool = (tool: ToolWithImages) => {
      const exists = selectedTools.find((t) => t.id === tool.id);
      if (exists) {
        confirmRemoveTool(tool);
      } else {
        setSelectedTools((prev) => [...prev, { ...tool, images: [] }]);
      }
    };
  
    const takePhoto = async (toolId: string) => {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResult.granted) return;
  
      const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        base64: false,
      });
  
      if (!result.canceled && result.assets.length > 0) {
        const imageUri = result.assets[0];
        console.log(imageUri)
        const file = {
          uri: Platform.OS === 'ios' ? imageUri.uri.replace('file://', '') : imageUri.uri,
          name: `${imageUri.fileName || 'test_file'}.jpeg`,
          type: imageUri.mimeType,
        }
        setUploadProgress(0);
        setUploadVisible(true);
        try {
          const uploaded = await handleUploadImage(file, setUploadProgress); // Llama a la función de subida
    
          if (uploaded?.id) {
            const newImage = {
              id: uploaded.id,
              url: file.uri,
            };
      
            setSelectedTools((prev) =>
              prev.map((tool) =>
                tool.id === toolId
                  ? { ...tool, images: [...tool.images, newImage] }
                  : tool
              )
            );
          }
        } catch (e) {
          Alert.alert('Error', 'No se pudo subir la imagen');
        } finally {
          setUploadVisible(false);
        setUploadProgress(0);
        }
      }
    };
  
    const removeImage = async (toolId: string, imageId: string) => {
      Alert.alert('Alerta', '¿Estás seguro que quiere eliminar esta imagen?', [
        {
          text: 'SI',
          onPress: async () => {
            try {
              const res = await deleteFile({
                variables: {
                  removeFileId: imageId
                }
              })
              if (res.errors) {
                Alert.alert('HUBO UN ERROR', res.errors[0].message);
                return;
              }
              setSelectedTools((prev) =>
                prev.map((tool) =>
                  tool.id === toolId
                    ? {
                        ...tool,
                        images: tool.images.filter((image) => image.id !== imageId),
                      }
                    : tool
                )
              );
              Alert.alert('¡Muy bien!', 'El proceso terminó con éxito');
            }catch (err) {
              const message = ToastyErrorGraph(err as any);
              Alert.alert('HUBO UN ERROR', message);
            }
          },
        },
        { text: 'NO' },
      ]);
    };
    
  
    const renderToolUnit = (unit: Tool['units'][0]) => {
      const isSelected = selectedTools.some((t) => t.id === unit.id);
      const selectedTool = selectedTools.find((t) => t.id === unit.id);
  
      return (
        <View
          key={unit.id}
          style={[
            styles.toolItem,
            {
              borderColor: isSelected ? color.primary : color.darkGray,
              backgroundColor: isSelected ? color.lightBeige : color.white,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.toolHeader}
            onPress={() =>
              toggleTool({ id: unit.id, name: unit.name, images: [] })
            }
          >
            <MaterialCommunityIcons
              name="tools"
              size={24}
              color={isSelected ? color.primary : color.darkGray}
            />
            <Text style={[styles.toolName, { color: color.darkGray }]}>
              {unit.name}
            </Text>
          </TouchableOpacity>
  
          {isSelected && (
            <>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={() => takePhoto(unit.id)}
              >
                <MaterialCommunityIcons
                  name="camera"
                  size={22}
                  color={color.primary}
                />
                <Text style={{ marginLeft: 6, color: color.primary }}>
                  Agregar foto
                </Text>
              </TouchableOpacity>
  
              <ScrollView
                horizontal
                style={styles.imageList}
                showsHorizontalScrollIndicator={false}
              >
              {selectedTool?.images.map((image, index) => (
                <View key={`${unit.id}_img_${index}`} style={styles.imageWrapper}>
                  <Image source={{ uri: image.url }} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.deleteIcon}
                    onPress={() => removeImage(unit.id, image.id)}
                  >
                    <MaterialCommunityIcons
                      name="close-circle"
                      size={20}
                      color={color.coral}
                    />
                  </TouchableOpacity>
                </View>
              ))}
              </ScrollView>
            </>
          )}
        </View>
      );
    };
    const handleAddToolsVisit = async () => {
      Alert.alert('Alerta', '¿Estás seguro que quieres solicitar esta herramienta?', [
        {
          text: 'SI',
          onPress: async () => {
            setaddloading(true)
            const inputTools: CreateVisitToolUnitInput[] = selectedTools.map((tool) => {
              return {
                toolUnitId: tool.id,
                visitId: visitId || '',
                photoUrls: tool.images.map(img => img.id),
                usageDate: new Date()
              }
            }) || []
            try {
              const res = await createToolVisit({
                variables: {
                  createVisitToolUnitAllInput: {
                    input: inputTools
                  }
                }
              })
              if (res.errors) {
                Alert.alert('HUBO UN ERROR', res.errors[0].message);
                return;
              }
              Alert.alert('¡Muy bien!', 'Herramienta agregada exitosamente');
              setSearchQuery('')
            }catch (err) {
              const message = ToastyErrorGraph(err as any);
              Alert.alert('HUBO UN ERROR', message);
            } finally {
              refetch();
              setaddloading(false)
            }
          } 
        },
        { text: 'NO' }
      ])
    }
    if(loading) return   <ActivityIndicator size="small" color="#fff" />
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <UploadProgressModal2 visible={uploadVisible} progress={uploadProgress} />
        <View style={styles.overlay}>
          <View style={[styles.modalContent, { backgroundColor: color.white }]}>
            <Text style={[styles.title, { color: color.primary }]}>
              Selecciona Herramientas
            </Text>
            <TextInput
              placeholder="Buscar herramienta..."
              placeholderTextColor={color.darkGray}
              style={{
                borderWidth: 1,
                borderColor: color.darkGray,
                borderRadius: 10,
                padding: 10,
                marginBottom: 15,
                color: color.darkGray
              }}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <ScrollView
                style={{ maxHeight: '78%' }}
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={[color.primary]} // para Android
                    tintColor={color.primary} // para iOS
                    />
                }
            >
              {data?.Tools.map((category) => (
                <View key={category.id}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 16, color: color.darkGray }}>
                    {category.name}
                  </Text>
                 {category.units
                  ?.filter(unit => unit.status === ToolUnitStatusEnum.Available)
                  .filter(unit => 
                    unit.name.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((unit) => renderToolUnit(unit))}
                </View>
              ))}
            </ScrollView>
            <View style={[styles.actions]}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: color.softYellow }]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Solicitar Herramienta</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: color.coral }]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              {
                (data?.Tools.length || 0) > 0 && (
                  <TouchableOpacity
                  disabled={addloading}
                  style={[styles.button, { backgroundColor: color.primary }]}
                  onPress={() => {
                    if(visitId){
                      handleAddToolsVisit()
                    }else {
                      onSubmit(selectedTools),
                      onClose()
                    }
                  }}
                >
                   {addloading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Confirmar</Text>}
                </TouchableOpacity>
                )
              }
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  
export default ToolSelectionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000099',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '95%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  toolItem: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolName: {
    fontSize: 16,
    marginLeft: 10,
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  imageList: {
    marginTop: 10,
    flexDirection: 'row',
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 8,
    marginVertical: 10
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 6
  },
  deleteIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  button: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
});
