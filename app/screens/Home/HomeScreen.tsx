import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import GreetingCard from './GreetingCard';
import { useColor } from '../../Constants/Color';
import DailyActivityCard from './DailyActivityCard';
import DailyReminders from './RimenderDailys';
import StatisticsDashboard from './Statistict';
const { color } = useColor();

const HomeScreen = ({ route, navigation }) => {
  const getGreeting = (): string => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Buenos días';
    } else if (hours < 18) {
      return 'Buenas tardes';
    } else {
      return 'Buenas noches';
    }
  };

  const name = 'Nombre'; // Aquí puedes reemplazarlo por el nombre real del usuario.
  const [refreshing, setRefreshing] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0); // Estado para el desplazamiento del scroll

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Simula una llamada asíncrona o actualización
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setRefreshing(false);
      navigation.setParams({ isRefesh: false });
    }
  };

  // Función para manejar el desplazamiento del scroll
  const handleScroll = (event: any) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    setScrollOffset(contentOffsetY); // Guardamos la posición actual del scroll
  };

  return (
    <View style={styles.container}>
      <GreetingCard greeting={getGreeting()} name={name} scrollOffset={scrollOffset} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onScroll={handleScroll} // Escucha el evento de scroll
        scrollEventThrottle={16} // Controla la frecuencia con la que se dispara el evento de scroll
      >
        {/* <StatisticsDashboard /> */}
        <DailyActivityCard />
        <DailyReminders refetchControl={refreshing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.lightBeige,
  },
  scrollContainer: {
    paddingBottom: 20, // Espacio en la parte inferior
  },
});

export default HomeScreen;
