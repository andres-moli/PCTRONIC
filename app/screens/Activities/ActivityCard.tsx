// src/components/ActivityCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useColor} from '../../Constants/Color';
const { color } = useColor();
interface ActivityCardProps {
  title: string;
  description: string;
  date: string;
  status: string;
  onViewDetails: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ title, description, date, status, onViewDetails }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onViewDetails}>
      <View style={styles.line} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.status}>{status}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right-box" size={24} color={color.primary} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    paddingVertical: 12,
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'flex-start', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  line: {
    width: 6,
    backgroundColor: color.primary,
    borderRadius: 5,
    marginRight: 10,
    height: '100%', // Hacer la línea tan larga como la tarjeta
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  statusContainer: {
    alignSelf: 'flex-end', // Colocar el estado en la parte inferior derecha
  },
  status: {
    fontSize: 12,
    color: color.primary,
  },
  icon: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
});

export default ActivityCard;
