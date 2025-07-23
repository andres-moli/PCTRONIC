import { useState, useEffect } from 'react';
import { Alert, ActivityIndicator, Platform } from 'react-native';
import * as Location from 'expo-location';
import { useCreateVisitMutation, useFinishVisitMutation, useCreateVisitComentMutation, useVisitFindOneArgQuery, VisitComentTypeEnum, Visit, CreateVisitToolUnitInput } from '../../graphql/generated/graphql';
import handleUploadImage from '../../Lib/uptloadFile';
import { StatusVisitEnum } from '../../graphql/generated/graphql';
import { ToastyErrorGraph } from '../../graphql';
import useUser from '../../context/useUser';
import * as ImagePicker from 'expo-image-picker';
import { ToolWithImages } from './ToolSelectionModal';

const useDailyActivity = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingF, setLoadingF] = useState(false);
  const [loadingC, setLoadingC] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [comment, setComment] = useState('');
  const [typeVisitId, setTypeVisitId] = useState<string | undefined>();
  const [projectId, setProjectId] = useState<string | undefined>();
  const [fileUri, setFileuri] = useState<any>();
  const [activities, setActivities] = useState<Visit[]>([]);
  const [toolWithImages, setToolWithImages] = useState<ToolWithImages[]>([])
  const { user } = useUser();
  const { data, error, loading: loadingS, refetch } = useVisitFindOneArgQuery({
    variables: {
      where: {
        user: { _eq: user.id },
        status: { _eq: StatusVisitEnum.Initiated },
      },
    },
  });
  
  const [createVisit] = useCreateVisitMutation();
  const [updateVisit] = useFinishVisitMutation();
  const [commentAdd] = useCreateVisitComentMutation();

  const handleStartDay = async () => {
    if (!typeVisitId) {
      Alert.alert('Debes seleccionar un tipo de vista');
      return;
    }
    Alert.alert('Alerta', '¿Estás seguro que quieres comenzar con la actividad?', [
      {
        text: 'SI',
        onPress: async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            let fileId: undefined | any = undefined;
            if (fileUri) {
              const file = {
                uri: Platform.OS === 'ios' ? fileUri.uri.replace('file://', '') : fileUri.uri,
                name: `test-file.jpeg`,
                type: fileUri.mimeType,
              };
              setIsUploading(true);
              setUploadProgress(0);
              const dataFile = await handleUploadImage(file, setUploadProgress);
              setIsUploading(false);
              setUploadProgress(0);
              fileId = dataFile?.id;
            }
            try {
              setLoading(true);
              const toolsPhots: CreateVisitToolUnitInput[] = toolWithImages.map((toolsPhoto) => {
                return {
                  toolUnitId: toolsPhoto.id,
                  visitId: '',
                  photoUrls: toolsPhoto.images?.map((t) => t.id) || [],
                  usageDate: new Date()
                }
              }) || []
              const res = await createVisit({
                variables: {
                  createInput: {
                    dateVisit: new Date(),
                    status: StatusVisitEnum.Initiated,
                    userId: user.id || '',
                    description: comment,
                    latitude: location.coords.latitude.toString(),
                    longitude: location.coords.longitude.toString(),
                    mocked: location.mocked,
                    typeId: typeVisitId || '',
                    fileId,
                    tools: toolsPhots,
                    projectId: projectId || undefined,
                  },
                },
              });
              if (res.errors) {
                Alert.alert('HUBO UN ERROR', res.errors[0].message);
                return;
              }
              setComment('');
              setFileuri(undefined);
              setToolWithImages([])
              setTypeVisitId(undefined);
              Alert.alert('¡Muy bien!', 'El proceso terminó con éxito');
            } catch (err) {
              const message = ToastyErrorGraph(err as any);
              Alert.alert('HUBO UN ERROR', message);
            } finally {
              refetch();
              setLoading(false);
            }
          } else {
            Alert.alert('Permiso de ubicación no concedido');
          }
        },
      },
      { text: 'NO' },
    ]);
  };

  const handleFinishDay = async () => {
    Alert.alert('Alerta', '¿Estás seguro que quieres finalizar con la actividad?', [
      {
        text: 'SI',
        onPress: async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            let fileId: undefined | any = undefined;
            if (fileUri) {
              const file = {
                uri: Platform.OS === 'ios' ? fileUri.uri.replace('file://', '') : fileUri.uri,
                name: `test-file.jpeg`,
                type: fileUri.mimeType,
              };
              setIsUploading(true);
              setUploadProgress(0);
              const dataFile = await handleUploadImage(file, setUploadProgress);
              setIsUploading(false);
              setUploadProgress(0);
              fileId = dataFile?.id;
            }
            try {
              setLoadingF(true);
              const res = await updateVisit({
                variables: {
                  updateStatusInput: {
                    dateVisit: new Date(),
                    status: StatusVisitEnum.Initiated,
                    id: data?.visitFindOneArg?.id || '',
                    description: comment,
                    latitude: location.coords.latitude.toString(),
                    longitude: location.coords.longitude.toString(),
                    mocked: location.mocked,
                    fileId,
                  },
                },
              });
              if (res.errors) {
                Alert.alert('HUBO UN ERROR', res.errors[0].message);
                return;
              }
              setFileuri(undefined);
              setComment('');
              setToolWithImages([])
              setTypeVisitId(undefined);
              Alert.alert('¡Muy bien!', 'El proceso terminó con éxito');
            } catch (err) {
              const message = ToastyErrorGraph(err as any);
              Alert.alert('HUBO UN ERROR', message);
            } finally {
              refetch();
              setLoadingF(false);
            }
          } else {
            Alert.alert('Permiso de ubicación no concedido');
          }
        },
      },
      { text: 'NO' },
    ]);
  };

  const handleCommentAdd = async () => {
    Alert.alert('Alerta', '¿Estás seguro que quieres agregar el comentario?', [
      {
        text: 'SI',
        onPress: async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            let fileId: undefined | any = undefined;
            if (fileUri) {
              const file = {
                uri: Platform.OS === 'ios' ? fileUri.uri.replace('file://', '') : fileUri.uri,
                name: `test-file.jpeg`,
                type: fileUri.mimeType,
              };
              setIsUploading(true);
              setUploadProgress(0);
              const dataFile = await handleUploadImage(file, setUploadProgress);
              setIsUploading(false);
              setUploadProgress(0);
              fileId = dataFile?.id;
            }
            try {
              setLoadingC(true);
              const res = await commentAdd({
                variables: {
                  createInput: {
                    dateFull: new Date(),
                    date: new Date(),
                    time: new Date(),
                    visitId: data?.visitFindOneArg?.id || '',
                    description: comment,
                    type: VisitComentTypeEnum.Intermedio,
                    latitude: location.coords.latitude.toString(),
                    longitude: location.coords.longitude.toString(),
                    mocked: location.mocked,
                    fileId: fileId
                  },
                },
              });
              if (res.errors) {
                Alert.alert('HUBO UN ERROR', res.errors[0].message);
                return;
              }
              setComment('');
              setFileuri(undefined);
              setToolWithImages([])
              Alert.alert('¡Muy bien!', 'Comentario agregado exitosamente');
            } catch (err) {
              const message = ToastyErrorGraph(err as any);
              Alert.alert('HUBO UN ERROR', message);
            } finally {
              refetch();
              setLoadingC(false);
            }
          } else {
            Alert.alert('Permiso de ubicación no concedido');
          }
        },
      },
      { text: 'NO' },
    ]);
  };
  const handleAddComment = (text: string) => {
    setComment(prev => prev ? `${prev}\n${text}` : text);
  };
  type Mode = 'inicio' | 'fin';   
  const commentMap: Record<Mode, string[]> = {
    inicio: [
      'Inicio de jornada',
      'Llegada a puesto de trabajo',
      'Inicio de servicio de levantamiento',
      'Inicio de servicio de mantenimiento',
      'Inicio de servicio de instalación',
      'Inicio de tarea programada',
    ],
    fin: [
      'Fin de jornada',
      'Fin de servicio de levantamiento',
      'Fin de servicio de mantenimiento',
      'Fin de servicio de instalación',
      'Fin de tarea programada',
    ]
  };
  const handleCameraPicker = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Se requiere permiso de cámara para continuar.');
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      exif: true
    });
  
    if (!result.canceled) {
      const file = result.assets[0];
      setFileuri(file);
    }
  };
  return {
    isOpen,
    setIsOpen,
    loading,
    loadingF,
    loadingC,
    isUploading,
    uploadProgress,
    comment,
    setComment,
    fileUri,
    setFileuri,
    activities,
    setActivities,
    typeVisitId,
    setTypeVisitId,
    handleStartDay,
    handleFinishDay,
    handleCommentAdd,
    handleAddComment,
    handleCameraPicker,
    commentMap,
    refetch,
    data,
    toolWithImages,
    setToolWithImages,
    setProjectId
  };
};

export default useDailyActivity;
