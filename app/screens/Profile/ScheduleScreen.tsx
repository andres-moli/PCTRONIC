import React, { useCallback, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import dayjs from "dayjs";
import "dayjs/locale/es";
import useUser from "../../context/useUser";
import { useSchudelesQuery } from "../../graphql/generated/graphql";
import { useColor } from "../../Constants/Color";

export const ScheduleScreen = () => {
  const { user } = useUser();
  const { color } = useColor();

  dayjs.locale("es");

  const { data, loading, refetch } = useSchudelesQuery({
    variables: {
      where: {
        user: { _eq: user.id },
      },
    },
  });

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const schedules = data?.schudeles || [];

  // Estado para el mes visible en el filtro
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  // Filtrar actividades por mes actual seleccionado
  const filteredSchedules = useMemo(() => {
    return schedules.filter((item) =>
      dayjs(item.date).isSame(currentMonth, "month")
    );
  }, [schedules, currentMonth]);

  const renderItem = ({ item }) => {
    const isDayOff = item.isDayOff;
    const dateFormatted = dayjs(item.date).format("dddd, DD [de] MMMM YYYY");

    return (
      <View style={[styles.card, isDayOff && styles.dayOffCard]}>
        <View style={styles.iconContainer}>
          {isDayOff ? (
            <MaterialCommunityIcons name="beach" size={28} color={color.coral} />
          ) : (
            <FontAwesome5 name="calendar-day" size={24} color={color.primary} />
          )}
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.date}>
            {dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1)}
          </Text>
          {isDayOff ? (
            <Text style={styles.dayOffText}>Día Libre</Text>
          ) : (
            <Text style={styles.time}>
              {item.startTime} - {item.endTime}
            </Text>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </View>
    );
  };

  const keyExtractor = (item) => item.id;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Ionicons
          name="calendar-outline"
          size={28}
          color={color.primary}
          style={{ marginRight: 8 }}
        />
        <Text style={styles.header}>Mi Agenda</Text>
      </View>

      {/* Filtro de mes */}
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setCurrentMonth(currentMonth.subtract(1, "month"))}>
          <Ionicons name="chevron-back" size={24} color={color.primary} />
        </TouchableOpacity>
        <Text style={styles.filterText}>
          {currentMonth.format("MMMM YYYY").charAt(0).toUpperCase() +
            currentMonth.format("MMMM YYYY").slice(1)}
        </Text>
        <TouchableOpacity onPress={() => setCurrentMonth(currentMonth.add(1, "month"))}>
          <Ionicons name="chevron-forward" size={24} color={color.primary} />
        </TouchableOpacity>
      </View>

      {/* Lista */}
      <FlatList
        data={filteredSchedules}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={[color.primary]}
          />
        }
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons
                name="calendar-blank-outline"
                size={64}
                color="#ccc"
              />
              <Text style={styles.emptyText}>
                No hay actividades para este mes
              </Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#F9F9F9",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  filterText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  dayOffCard: {
    backgroundColor: "#FFEDEB",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "#F5F5F5",
  },
  cardContent: {
    flex: 1,
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  time: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  dayOffText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#D9534F",
    marginTop: 4,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 60,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 16,
    color: "#777",
  },
});
