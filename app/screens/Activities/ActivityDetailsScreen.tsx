import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicatorComponent, ActivityIndicator, RefreshControl, Platform, Linking, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useColor} from '../../Constants/Color';
import NoCommentsAnimation from '../../components/Amination/NotComentsAnimation';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useVisitQuery, VisitComent, VisitComentTypeEnum } from '../../graphql/generated/graphql';
import { formatWithCommonFormats } from '../../Lib/MangerDate';
import dayjs from 'dayjs';
import { translateStatusVisit } from '../../Lib';
import ImageField from './imagenComponente';
import { OpenUrlInApp } from '../../Lib/OpenUrl';
const { color } = useColor();



const ActivityDetailsScreen = ({route, navigation}) => {
  const { visitId } = route.params;
  const [refreshing, setRefreshing] = useState(false)
  const {data, loading, error, refetch} = useVisitQuery({
    variables: {
      visitId
    }
  })
  if(loading) return <ActivityIndicator></ActivityIndicator>
  if(!data || error) return <>Error</>
  const startTime = dayjs(data.visit.visitItem.find((x) => x.type === VisitComentTypeEnum.Inicio)?.dateFull || new Date())
  const endTime = dayjs(data.visit.visitItem.find((x) => x.type === VisitComentTypeEnum.Fin)?.dateFull || new Date())

  const totalMinutos = endTime.diff(startTime, 'minutes')
  const toggleActions = (id: string) => {
   
  };
  const routers = data.visit.visitItem.map((x) => {
    return {
      "latitude": x.latitude,
      "longitude": x.longitude,
      "title": x.description
    }
  })
  const jsonContent = {
    "latitude": data.visit.latitude, 
    "longitude": data.visit.longitude,
    "routers": routers
  }
  const generateGoogleMapsURL = () => {
    if(Platform.OS === 'android'){
      const center = `ll=${routers[0].latitude},${routers[0].longitude}`;

      // Crear un enlace con múltiples marcadores
      const markers = routers
        .map(point => `${point.latitude},${point.longitude}`)
        .join(';');
    
      const url = `https://89qpvk6w-5173.use.devtunnels.ms/locationMulti/${markers}`;
      navigation.navigate('MapAndoridMulti',  {link: url})
      return
    }
    // Convertir la lista de rutas a un string de URL
    navigation.navigate('MapComponentMultiple',  {content: jsonContentString})
    // Generar el enlace de Google Maps con la ruta

  };
  const jsonContentString = JSON.stringify(jsonContent)
  const renderComment = ({ item }: {item: VisitComent}) => (
    <View style={styles.commentCard}>
      <View style={styles.leftLine} />
      <View style={styles.commentContent}>
        <TouchableOpacity
          style={styles.moreIcon}
          onPress={() => toggleActions(item.id)}
        >
          <MaterialCommunityIcons name="chevron-right-box" size={24} color={color.primary} />
        </TouchableOpacity>

        <Text style={styles.commentLabel}>Fecha de creación: {formatWithCommonFormats(item.dateFull, 'G')}</Text>
        <Text style={styles.commentMessage}>{item.description}</Text>
        <View style={styles.commentFooter}>
          <Text style={styles.commentValue}>{item.type}</Text>
          {
            item.file && (
              <>
                {/* <ImageField value={item.file.url} key={item.id}></ImageField> */}
                <TouchableOpacity onPress={() => {
                  OpenUrlInApp(item.file?.url || '')
                }}>
                  <MaterialCommunityIcons name={"image"} size={24} color={color.primary} />
                </TouchableOpacity>
              </>
            )
          }
          {
            Platform.OS === 'android'
            ?
            <Text style={styles.commentValue} onPress={()=> navigation.navigate('MapAndoridComponent',{latitude: item.latitude, longitude: item.longitude})}>Ver mapa</Text>
            :
            <Text style={styles.commentValue} onPress={()=> navigation.navigate('MapScreen',{latitude: item.latitude, longitude: item.longitude})}>Ver mapa</Text>
          }
        </View>
      </View>
    </View>
  );
  const onRefreshf = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }
  return (
    <View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshf}/>
        }
      >
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Descripción</Text>
          <Text style={styles.value}>{data.visit.description}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fecha de creación</Text>
          <Text style={styles.value}>{formatWithCommonFormats(data.visit.dateVisit, 'LLLL')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tipo de visita</Text>
          <Text style={styles.value}>{data.visit.type ? data.visit.type.name : 'SIN TIPO'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Proyecto</Text>
          <Text style={styles.value}>{data.visit.project ? data.visit.project.name : 'SIN PROYECTO'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tiempo Dedicado</Text>
          <Text style={styles.value}>{totalMinutos} minutos</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Estado</Text>
          <Text style={styles.value}>{translateStatusVisit(data.visit.status)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.value, {color: color.primary}]} onPress={generateGoogleMapsURL }>{'VER MAPA DE LAS RUTAS'}</Text>
        </View>
      </View>
      <Text style={styles.headerText}>Comentarios realizados...</Text>
      {data.visit.visitItem.length == 0 ? (
          <NoCommentsAnimation />
        ) : (
          <FlatList
            data={data.visit.visitItem || []}
            renderItem={renderComment}
            keyExtractor={(item) => item.id}
            nestedScrollEnabled={true} // Habilita el scroll anidado
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.white,
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: color.lightPink,
    marginBottom: 4,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 5,
    marginTop: 5,
  },
  value: {
    fontSize: 14,
    color: color.darkGray,
  },
  commentCard: {
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: color.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftLine: {
    width: 4,
    backgroundColor: color.primary,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  commentContent: {
    flex: 1,
    padding: 12,
    position: 'relative',
  },
  moreIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  commentLabel: {
    fontSize: 12,
    color: color.darkGray,
  },
  commentMessage: {
    fontSize: 14,
    color: color.darkGray,
    marginVertical: 8,
  },
  commentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  commentValue: {
    fontSize: 14,
    color: color.primary,
    marginLeft: 4,
  },
  actions: {
    marginTop: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    color: color.darkGray,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.lightPink,
    paddingLeft: 15
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: color.white,
    margin: 10,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconButton: {
    padding: 20,
  },
});

export default ActivityDetailsScreen;
