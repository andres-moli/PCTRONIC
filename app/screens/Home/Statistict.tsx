import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {useColor} from '../../Constants/Color';
const { color } = useColor();

// Componente StatsCard
const StatsCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <View style={stylesCard.card}>
      <Text style={stylesCard.title}>{title}</Text>
      <Text style={stylesCard.value}>{value}</Text>
    </View>
  );
};

const stylesCard = StyleSheet.create({
  card: {
    backgroundColor: color.white, // Color de fondo de la tarjeta individual
    padding: 10, // Padding interno
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    margin: 5, // Margen entre las tarjetas
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: color.darkGray,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.primary, // Color del valor
  },
});

// Componente StatisticsDashboard
const StatisticsDashboard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.row}>
          <StatsCard title="Días Trabajados" value="30" />
          <StatsCard title="Horas Trabajadas mes" value="120" />
        </View>
        <View style={styles.row}>
          <StatsCard title="Horas Trabajadas dia" value="10" />
          <StatsCard title="Total Actividades hoy" value="5" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  cardContainer: {
    backgroundColor: color.white, // Color de fondo para la tarjeta contenedora
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Asegura que las filas ocupen el 100% del ancho
    marginBottom: 10,
  },
});

export default StatisticsDashboard;
