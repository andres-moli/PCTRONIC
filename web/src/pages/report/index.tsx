import { useState } from "react";
import Card from "../../components/cards/Card";
import MainLayout from "../../layouts/mainLayouts/mainLayouts";
import UserSelect from "../../components/users/select/user-select";
import {
  useGenerateWorkedHoursQuery,
  useVisitTypesQuery,
  VisitComent,
  VisitComentTypeEnum,
  VisitType,
  User,
} from "../../domain/graphql";
import dayjs from "dayjs";
import { exportToExcel } from "./genrateExcel";

const ReportPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(dayjs().startOf("month").format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState<string>(dayjs().endOf("month").format("YYYY-MM-DD"));
  const [selectUser, setSelectUser] = useState<string>("");

  const { data, loading, refetch } = useGenerateWorkedHoursQuery({
    variables: {
      input: {
        fechaInicio: startDate,
        fechaFinal: endDate,
        userId: selectUser || undefined,
        typeId: statusFilter || undefined,
      },
    },
  });

  const { data: dataType } = useVisitTypesQuery({
    variables: {
      pagination: {
        skip: 0,
        take: 99999999,
      },
    },
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "startDate") setStartDate(value);
    if (name === "endDate") setEndDate(value);
    if (name === "type") setStatusFilter(value);
  };

  const handleFilterSubmit = async () => {
    await refetch({
      input: {
        fechaInicio: startDate,
        fechaFinal: endDate,
        userId: selectUser || undefined,
        typeId: statusFilter || undefined,
      },
    });
  };

  const handelDelteFilter = async () => {
    setStartDate(dayjs().startOf("month").format("YYYY-MM-DD"));
    setEndDate(dayjs().endOf("month").format("YYYY-MM-DD"));
    setSelectUser("");
    setStatusFilter("");

    await refetch({
      input: {
        fechaInicio: dayjs().startOf("month").format("YYYY-MM-DD"),
        fechaFinal: dayjs().endOf("month").format("YYYY-MM-DD"),
        userId: undefined,
        typeId: undefined,
      },
    });
  };



  return (
    <MainLayout>
      <div className="space-y-4">
        <Card className="w-50 md:w-30 lg:w-50">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Genera el reporte</h1>
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">Gestiona y descargar tus reportes</h3>
            </div>
          </div>
        </Card>
        <Card className="w-full md:w-full lg:w-full">
        <div className="w-full md:w-full lg:w-full">
          <div className="flex justify-between items-center space-x-4">
            {/* Filtro de Estado */}
            <div className="flex space-x-4 flex-1">
              <UserSelect onSelect={(e)=>setSelectUser(e)} clear={selectUser == ''}/>
            </div>
            <div className="flex-1">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de visita</label>
              <select
                name="type"
                id="type"
                value={statusFilter}
                onChange={()=>handleFilterChange}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              >
              <option value={''} >Seleccione un tipo de visita</option>
              {dataType?.visitTypes?.map((visit) => (
                  <option value={visit.id} >{visit.name}</option>
              ))}
              </select>
            </div>

            {/* Filtro de Rango de Fechas */}
            <div className="flex space-x-4 flex-1">
              <div className="w-1/2">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha Inicio</label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={startDate}
                  onChange={handleFilterChange}
                  className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fecha Fin</label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={endDate}
                  onChange={handleFilterChange}
                  className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Filtro de Descripción */}

            {/* Botón de Filtrar */}
            <div className="flex items-end">
              <button
                onClick={handleFilterSubmit}
                type="button"
                disabled={loading}
                className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {loading ? "Cargando..." : "Generar"}
              </button>
            </div>

            <div className="flex items-end">
              <button
                onClick={handelDelteFilter}
                type="button"
                className="bg-red-500 text-white hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Borrar
              </button>
            </div>
          </div>
        </div>
        </Card>
        <Card className="w-full md:w-full lg:w-full">
          {loading && (
              <div className="text-sm text-blue-500 font-medium">Cargando datos...</div>
          )}
          {!loading && data?.generateWorkedHours.length === 0 && (
              <div className="text-sm text-red-500 font-medium">No se encontraron datos</div>
          )}
          {!loading && (data?.generateWorkedHours?.length || 0) > 0 && (
              <div className="text-sm text-green-500 font-medium">Se encontraron {data?.generateWorkedHours.length} registros</div>
          )}

          {/* @ts-ignore */}
          <TableReport data={data?.generateWorkedHours || [] } />
        </Card>

      </div>
      {/* <RegisterCategoriesModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} /> */}
    </MainLayout>
  );
};
const TableReport = ({ data }: { data: VisitComent[] }) => {
  const grouped = new Map<
    string,
    {
      user: User;
      visit: any;
      type?: VisitType;
      start?: VisitComent;
      end?: VisitComent;
    }
  >();

  for (const c of data) {
    const { visit, user } = c;
    const type = visit?.type;
    const visitId = visit?.id;

    if (!visitId || !user) continue;

    if (!grouped.has(visitId)) {
      grouped.set(visitId, {
        user,
        visit,
        type,
        start: undefined,
        end: undefined,
      });
    }

    const entry = grouped.get(visitId);

    if (entry && c.type === VisitComentTypeEnum.Inicio && !entry.start) {
      entry.start = c;
    }

    if (entry && c.type === VisitComentTypeEnum.Fin) {
      entry.end = c;
    }
  }

  const groupedByUserAndType = new Map<
    string,
    {
      userName: string;
      visitTypeName: string;
      totalMinutes: number;
      records: {
        date: string;
        startTime: string;
        endTime: string;
        duration: number;
      }[];
    }
  >();

  for (const entry of grouped.values()) {
    const { user, visit, start, end, type } = entry;
    let roundedDiffMin = 0;
    let displayStart = "No registrado";
    let displayEnd = "No registrado";

    if (start && end) {
      const startTime = dayjs(start.createdAt);
      const endTime = dayjs(end.createdAt);

      const roundedStart = startTime.second() > 30 ? startTime.add(1, "minute").startOf("minute") : startTime.startOf("minute");
      const roundedEnd = endTime.second() > 30 ? endTime.add(1, "minute").startOf("minute") : endTime.startOf("minute");

      roundedDiffMin = roundedEnd.diff(roundedStart, "minute");
      displayStart = roundedStart.format("HH:mm:ss");
      displayEnd = roundedEnd.format("HH:mm:ss");
    }

    const key = `${user.id}-${type?.id || "unknown"}`;
    if (!groupedByUserAndType.has(key)) {
      groupedByUserAndType.set(key, {
        userName: user.name,
        visitTypeName: type?.name || "Tipo no encontrado",
        totalMinutes: 0,
        records: [],
      });
    }

    groupedByUserAndType.get(key)!.records.push({
      date: dayjs(visit.createdAt).format("DD/MM/YYYY"),
      startTime: displayStart,
      endTime: displayEnd,
      duration: roundedDiffMin,
    });

    groupedByUserAndType.get(key)!.totalMinutes += roundedDiffMin;
  }
  return (
    <div className="overflow-x-auto">
      <button
        onClick={() => exportToExcel(groupedByUserAndType)}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Exportar a Excel
      </button>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tipo de visita</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hora de entrada</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Hora de salida</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tiempo (min)</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tiempo (h)</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {[...groupedByUserAndType.values()].map((group) => (
            <>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <td colSpan={7} className="px-4 py-2 font-semibold text-gray-900 dark:text-white">
                  {group.userName} - {group.visitTypeName} (Total: {group.totalMinutes} min)
                </td>
              </tr>
              {group.records.map((record, i) => (
                <tr key={i}>
                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{group.userName}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-white">{group.visitTypeName}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{record.date}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{record.startTime}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{record.endTime}</td>
                  <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{record.duration} min</td>
                  <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">
                    {`${Math.floor(record.duration / 60)}h ${record.duration % 60}min`}
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportPage;
