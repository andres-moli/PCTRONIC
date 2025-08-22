import React, { useState } from "react";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useCreateSchudeleMutation, WeekDay } from "../../domain/graphql";
import { alertConfirm } from "../../lib/alert";
import { apolloClient } from "../../main.config";
import { ToastyErrorGraph } from "../../lib/utils";
import UserSelect from "../../components/users/select/user-select";

interface ModalCreateScheduleProps {
  isOpen: boolean;
  onClose: () => void;
  refetch?: () => void;
}

const ModalCreateSchedule: React.FC<ModalCreateScheduleProps> = ({
  isOpen,
  onClose,
  refetch
}) => {
  const [create] = useCreateSchudeleMutation();
  const [selectUser, setSelectUser] = useState<string>("");

  const [formData, setFormData] = useState({
    date: "", // Nueva propiedad: fecha seleccionada (YYYY-MM-DD)
    startTime: undefined,
    endTime: undefined,
    isDayOff: false,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getWeekDayFromDate = (dateString: string): WeekDay => {
    const dayName = dayjs(dateString).format("dddd"); // Ej: "MONDAY"
    return WeekDay[dayName as keyof typeof WeekDay];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const confirmed = await alertConfirm({
      title: "¿Crear nuevo horario?",
      confirmButtonText: "Sí, crear",
    });

    if (!confirmed) return;

    // if (!formData.date || (!formData.isDayOff && (!formData.startTime || !formData.endTime))) {
    //   toast.error("Debes completar todos los campos requeridos");
    //   return;
    // }

    const toastId = toast.loading("Creando horario...");

    try {
      const weekDay = getWeekDayFromDate(formData.date);
      const res = await create({
        variables: {
          createInput: {
            day: weekDay,
            date: formData.date,
            startTime: dayjs(formData.date).startOf('day').format("HH:mm"),
            endTime: dayjs(formData.date).endOf('day').format("HH:mm"),
            isDayOff: formData.isDayOff,
            userId: selectUser,
            description: formData.description
            // Puedes guardar `date: formData.date` si tu schema lo permite
          },
        },
      });

      if (res.errors) {
        toast.error("Error: " + res.errors[0].message);
        return;
      }

      toast.success("Horario creado con éxito");
      if(refetch){
        refetch()
      }
      // apolloClient.cache.evict({ fieldName: "Schedules" });

      setFormData({
        date: "",
        startTime: undefined,
        endTime: undefined,
        isDayOff: false,
        description: ""
      });

      onClose();
      window.location.reload()
    } catch (err) {
      ToastyErrorGraph(err as any);
    } finally {
      toast.dismiss(toastId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Crear Horario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <UserSelect onSelect={(e) => setSelectUser(e)} clear={selectUser === ""} />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Fecha</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
          </div>

          {/* <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Hora Inicio</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                disabled={formData.isDayOff}
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Hora Fin</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                disabled={formData.isDayOff}
              />
            </div>
          </div> */}

          <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <input
                type="text"
                value={formData.description}
                name="description"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                required
              />
          </div>

          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="isDayOff"
                checked={formData.isDayOff}
                onChange={handleChange}
                className="mr-2"
              />
              Día libre
            </label>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCreateSchedule;
