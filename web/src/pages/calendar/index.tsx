import React, { useMemo, useState } from "react";
import MainLayout from "../../layouts/mainLayouts/mainLayouts";
import { Schedule, useRemoveSchudeleMutation, useSchudelesQuery, useUpdateSchudeleMutation, WeekDay } from "../../domain/graphql";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import dayjs from "dayjs";
import { EventClickArg, EventInput } from "@fullcalendar/core/index.js";
import { toast } from "sonner";
import useModal from "../../hooks/useModal";
import ModalCreateSchedule from "./ModalCreateSchedule";
import { alertConfirm } from "../../lib/alert";

const weekDayToDate = (weekDay: string): string => {
  const today = new Date();
  const currentDay = today.getDay();
  const weekDays: Record<string, number> = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
  };
  const targetDay = weekDays[weekDay.toUpperCase()] ?? 1;
  today.setDate(today.getDate() + (targetDay - currentDay));
  return dayjs(today).format('"yyyy-MM-dd"');
};

const CalendarPage: React.FC = () => {
  const { data, loading, refetch } = useSchudelesQuery(
    { 
      fetchPolicy: "cache-and-network",  
      variables: {
        pagination: {
          skip: 0,
          take: 999999,
        }
      }
    }
  );
  const [updateSchedule] = useUpdateSchudeleMutation(); // tu mutation de update
  const [remove] = useRemoveSchudeleMutation()
  const {closeModal, isOpen, openModal} = useModal();
  const colorMap = useMemo(() => {
    const map: Record<string, string> = {};
    if (!data?.schudeles) return map;
    // @ts-ignore
    data?.schudeles?.forEach((s: Schedule, i: number) => {
      map[s.user.id] = map[s.user.id] || `hsl(${(i * 87) % 360}, 70%, 60%)`;
    });
    return map;
  }, [data]);

  const events = useMemo(() => {
    if (!data?.schudeles) return [];
    // @ts-ignore
    return data.schudeles.map((s: Schedule) => {
    const userColor = s.isDayOff
      ? "#9CA3AF" // gris si es día libre
      : colorMap[s.user.id] || "#3b82f6"; // color asignado por usuario o azul por defecto
      return {
        id: s.id,
        title: `${s.user.fullName} ${s.isDayOff ? "(LIBRE)" : ''}`,
        start: `${s.date}T${s.startTime}`,
        end: `${s.date}T${s.endTime}`,
        backgroundColor: userColor,
        borderColor: userColor, 
        textColor: "#fff", // opcional: texto blanco para mejor contraste
        display: 'block',
        extendedProps: { ...s },
      } as EventInput;
    });
  }, [data, colorMap, refetch]);

  const onEventClick = async (arg: EventClickArg) => {
    const confirm = await alertConfirm({title: '¿Estas seguro que quieres eliminar este horario?'})
    if(confirm){
      const toastId = toast.loading('Eliminando horario...')
      try {
        const id = arg.event.id
        const res =await remove({
          variables: {
            removeSchudeleId: id
          },
        });
      if(res.errors){ 
        throw new Error(res.errors[0].message);
      }
      toast.success('Eliminado con exito')
      window.location.reload()
      // puedes agregar un toast de éxito
    } catch (err) {
      toast.error("Error al eliminar el horario");
      console.error("Error al actualizar horario", err);
    } finally {
      toast.dismiss(toastId)
    }
    }
  };

  const handleEventDrop = async (info: any) => {
    try {
      const event = info.event;
      const newStart = dayjs(event.start!);
      const newEnd = dayjs(event.end!);

      const newDay = newStart.format("dddd").toUpperCase() as WeekDay; // Ej: "MONDAY"
      const res =await updateSchedule({
        variables: {
          updateInput: {
            id: event.id,
            day: newDay,
            date: newStart.format("YYYY-MM-DD"),
            startTime: dayjs(newStart).startOf('day').format("HH:mm"),
            endTime: dayjs(newStart).endOf('day').format("HH:mm"),
          }
        },
      });
      if(res.errors){ 
        throw new Error(res.errors[0].message);
      }
      // puedes agregar un toast de éxito
    } catch (err) {
      toast.error("Error al actualizar el horario");
      console.error("Error al actualizar horario", err);
      info.revert(); // volver al lugar anterior si falla
    }
  };
  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Calendario de Horarios</h1>
        {loading ? (
          <p className="text-gray-500">Cargando...</p>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-end mb-4">
            <button
              onClick={() => openModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              + Nuevo Horario
            </button>
          </div>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              locale={esLocale}
              firstDay={1}
              nowIndicator
              selectable
              events={events}
              eventClick={onEventClick}
              height="auto"
              eventDrop={handleEventDrop}
              editable={true}
              eventBorderColor="#000"
            />
          </div>
        )}
      </div>
      <ModalCreateSchedule
        isOpen={isOpen}
        onClose={() => closeModal()}
      />

    </MainLayout>
  );
};

export default CalendarPage;
