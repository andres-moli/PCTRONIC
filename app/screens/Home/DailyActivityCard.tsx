import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Keyboard, Alert, ActivityIndicator, Platform } from 'react-native';
import { useColor } from '../../Constants/Color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { StatusVisitEnum, useCreateVisitComentMutation, useCreateVisitMutation, useFinishVisitMutation, useUpdateVisitMutation, useVisitFindOneArgQuery, useVisitsQuery, VisitComentStatusEnum, VisitComentTypeEnum } from '../../graphql/generated/graphql';
import useUser from '../../context/useUser';
import { ToastyErrorGraph } from '../../graphql';
import dayjs, { Dayjs } from 'dayjs';
import handleUploadImage from '../../Lib/uptloadFile';
import UploadProgressModal from './updload';
import ImageField from '../Activities/imagenComponente';
import VisitTypeSelector from './VisitTypeSelector';
import FileViewer from '../Activities/FileViewer';
import useDailyActivity from './useDailyActivity';
import ToolSelectionModal, { ToolWithImages } from './ToolSelectionModal';
import useModal from '../../hook/useModal';
import UploadProgressModal2 from '../../Lib/UploadProgressModal';
import Octicons from '@expo/vector-icons/Octicons';
import VisitProjectSelector from './VisitProjectSelector';
const { color } = useColor();
const ERROR_MOCK_LOCATION = 'Detectamos que la ubicación es falsa. Por favor, verifica tu conexión o intenta con una ubicación válida.';

const DailyActivityCard = () => {
  const { isVisible, open, close } = useModal();
  const {
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
    typeVisitId,
    setTypeVisitId,
    activities,
    setActivities,
    handleStartDay,
    handleFinishDay,
    handleCameraPicker,
    handleCommentAdd,
    commentMap,
    refetch,
    handleAddComment,
    data,
    setToolWithImages,
    toolWithImages,
    setProjectId
  } = useDailyActivity();
  const mode = data?.visitFindOneArg ? 'fin' : 'inicio'
  const predefinedComments = commentMap[mode];
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.header}>
        <Text style={styles.headerText}>
          {activities ? 'Estoy trabajando en...' : 'Voy a comenzar a...'}
        </Text>
        <MaterialCommunityIcons name={isOpen ? 'arrow-up-drop-circle' : 'arrow-down-drop-circle'} size={20} color={color.primary} />
      </TouchableOpacity>
      <UploadProgressModal2 visible={isUploading} progress={uploadProgress} />
      {isOpen && (
        <View style={styles.content}>
          <Text style={styles.label}>Comentarios rápidos:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
            {predefinedComments.map((item, index) => (
              <TouchableOpacity key={index} style={styles.chip} onPress={() => handleAddComment(item)}>
                <Text style={styles.chipText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TextInput
            style={styles.textArea}
            placeholder={`Comentario antes de ${data?.visitFindOneArg ? 'finalizar' : 'iniciar'} la actividad...`}
            placeholderTextColor={color.lightBeige}
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
          />
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleCameraPicker} style={styles.iconButton}>
              <MaterialCommunityIcons name="camera" color={color.primary} size={28} />
            </TouchableOpacity>
            <TouchableOpacity onPress={open} style={styles.iconButton}>
              <Octicons name="tools" size={28} color={color.primary} />
              {/* <MaterialCommunityIcons name="tools" color={color.primary} size={28} /> */}
            </TouchableOpacity>
            {fileUri && (
              <TouchableOpacity onPress={() => setFileuri(undefined)} style={styles.iconButton}>
                <MaterialCommunityIcons name="delete-restore" color={color.primary} size={28} />
              </TouchableOpacity>
            )}
          </View>
          {data?.visitFindOneArg ? (
            <>
              <TouchableOpacity disabled={loading || loadingC} onPress={handleCommentAdd} style={styles.commentDayButton}>
                {loading || loadingC ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.startDayText}>Agregar Comentario</Text>}
              </TouchableOpacity>
              <TouchableOpacity disabled={loading || loadingF} onPress={handleFinishDay} style={styles.finishDayButton}>
                {loading || loadingF ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.startDayText}>Finalizar Actividad</Text>}
              </TouchableOpacity>
            </>
          ) : (
            <>
            {
              toolWithImages.length > 0 && (
                <Text style={{ color: color.darkGray, fontSize: 16, marginBottom: 10 }}>
                  Vas a usar: {toolWithImages.map(t => t.name).join(', ')}
                </Text>
              )
            }
              <VisitTypeSelector
                onSelect={(visitType) => setTypeVisitId(visitType?.id)}
              />
              <VisitProjectSelector 
                onSelect={(project) => setProjectId(project?.id)}
                placeholder="Selecciona un proyecto"
              />
              <TouchableOpacity disabled={loading || loadingF} onPress={handleStartDay} style={styles.startDayButton}>
                {loading || loadingF ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.startDayText}>Iniciar Actividad</Text>}
              </TouchableOpacity>
            </>
          )}
          <ScrollView style={styles.activityList} showsVerticalScrollIndicator={false}>
            {data?.visitFindOneArg && data?.visitFindOneArg?.visitItem.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <Text style={styles.activityText}>• {activity.description} <Text style={styles.timestamp}>({dayjs(activity.dateFull).format('HH:mm:ss')})</Text></Text>
                <TouchableOpacity onPress={() => console.log(index)}>
                  <MaterialCommunityIcons name="comment-account" color={color.primary} size={20} />
                </TouchableOpacity>
                {activity.file && <ImageField value={activity.file.url} key={activity.id} />}
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      <ToolSelectionModal
          visible={isVisible}
          onClose={close}
          onSubmit={(data) => setToolWithImages(data)}
          visitId={data?.visitFindOneArg?.id}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.white,
    padding: 20,
    borderRadius: 10,
    shadowColor: color.lightBeige,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    margin: 20,
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
    fontSize: 16
  },
  chipContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  chip: {
    backgroundColor: color.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  chipText: {
    fontSize: 14,
    color: color.lightBeige
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.darkGray,
  },
  content: {
    marginTop: 10,
  },
  startDayButton: {
    backgroundColor: color.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  finishDayButton: {
    backgroundColor: color.coral,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  commentDayButton: {
    backgroundColor: color.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  startDayText: {
    color: color.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: color.lightBeige,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    height: 80,
    textAlignVertical: 'top',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  activityList: {
    marginTop: 10,
    maxHeight: 200,
  },
  activityItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: color.lightBeige,
    borderLeftWidth: 4,
    borderLeftColor: color.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityText: {
    fontSize: 16,
    color: color.darkGray,
    flex: 1,
  },
  timestamp: {
    fontSize: 10,
    color: color.darkGray,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 5,
    marginTop: 5,
  },
  fileLink: {
    marginTop: 5,
  },
  fileText: {
    color: color.primary,
    textDecorationLine: 'underline',
  },
});
export default DailyActivityCard;
