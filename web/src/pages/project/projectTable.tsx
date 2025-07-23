import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BsEyeFill } from "react-icons/bs";
import ModalUpdateTools from "./modalUpdate";
import useModal from "../../hooks/useModal";
import {
  MetadataPagination,
  OrderTypes,
  useProjectVistsQuery,
  VisitProject,
  VisitProjectStatusEnum,
} from "../../domain/graphql";
import TableSkeleton from "../../components/esqueleto/table";
import Card from "../../components/cards/Card";
import { PaginationTable } from "../../components/table/PaginationTable";


const estadoLabels: Record<VisitProjectStatusEnum, string> = {
  [VisitProjectStatusEnum.Cancelled]: "Cancelado",
  [VisitProjectStatusEnum.Completed]: "Completado",
  [VisitProjectStatusEnum.InProgress]: "En progreso",
  [VisitProjectStatusEnum.OnHold]: "En espera",
  [VisitProjectStatusEnum.Planned]: "Planificado",
};

const ProjectTable = () => {
  const { closeModal, isOpen, openModal } = useModal();

  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);

  const [visitType, setVsitType] = useState<VisitProject>();

  const [nameOrDescription, setNameOrDescription] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, loading, refetch } = useProjectVistsQuery({
    variables: {
      orderBy: {
        createdAt: OrderTypes.Desc,
      },
      pagination: {
        skip,
        take,
      },
    },
  });

  const handelDelteFilter = async () => {
    const toastId = toast.loading("Borrando filtrado...");
    setNameOrDescription("");
    setStatus("");
    setStartDate("");
    setEndDate("");
    setSkip(0);

    try {
      await refetch({
        orderBy: {
          createdAt: OrderTypes.Desc,
        },
        pagination: {
          skip,
          take,
        },
        where: {},
      });
    } catch {
      toast.error("¡Oops! Ha ocurrido un error al intentar filtrar.");
    }

    toast.dismiss(toastId);
  };

  const handleFilterSubmit = async () => {
    const toastId = toast.loading("Filtrando información...");
    setSkip(0);

    const where: any = {};

    if (nameOrDescription.trim()) {
      where.OR = [
        { name: { _contains: nameOrDescription } },
        { description: { _contains: nameOrDescription } },
      ];
    }

    if (status) {
      where.status = { _eq: status };
    }

    if (startDate) {
      where.startDate = { _gte: startDate };
    }

    if (endDate) {
      where.endDate = { _lte: endDate };
    }

    try {
      await refetch({
        where,
        orderBy: {
          createdAt: OrderTypes.Desc,
        },
        pagination: {
          skip,
          take,
        },
      });
    } catch {
      toast.error("¡Oops! Ha ocurrido un error al intentar filtrar.");
    }

    toast.dismiss(toastId);
  };

  const onShown = (visitType: VisitProject) => {
    setVsitType(visitType);
    openModal();
  };

  return (
    <>
      <div className="w-full md:w-full lg:w-full mb-4">
        <div className="flex flex-wrap gap-4 items-end">
          {/* Filtro por Nombre o Descripción */}
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre o descripción</label>
            <input
              type="text"
              id="search"
              value={nameOrDescription}
              onChange={(e) => setNameOrDescription(e.target.value)}
              className="block w-full mt-1 px-3 py-2 border rounded-md shadow-sm sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Buscar por nombre o descripción..."
            />
          </div>

          {/* Filtro por Estado */}
          <div className="min-w-[150px]">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block w-full mt-1 px-3 py-2 border rounded-md sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Todos</option>
              {Object.entries(estadoLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Fecha Inicio */}
          <div className="min-w-[150px]">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Desde</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="block w-full mt-1 px-3 py-2 border rounded-md sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Fecha Fin */}
          <div className="min-w-[150px]">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hasta</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="block w-full mt-1 px-3 py-2 border rounded-md sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Botón Filtrar */}
          <button
            onClick={handleFilterSubmit}
            type="button"
            className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Filtrar
          </button>

          {/* Botón Borrar */}
          <button
            onClick={handelDelteFilter}
            type="button"
            className="bg-red-500 text-white hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Borrar
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {loading ? (
                <TableSkeleton columns={6} rows={6} />
              ) : (
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">Nombre</th>
                      <th scope="col" className="px-6 py-4">Descripción</th>
                      <th scope="col" className="px-6 py-4">Estado</th>
                      <th scope="col" className="px-6 py-4">Fecha de inicio</th>
                      <th scope="col" className="px-6 py-4">Fecha de fin</th>
                      <th scope="col" className="px-6 py-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.projectVists.map((type) => (
                      <tr key={type.id} className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4">{type.name}</td>
                        <td className="whitespace-nowrap px-6 py-4">{type.description}</td>
                        <td className="whitespace-nowrap px-6 py-4">{estadoLabels[type.status]}</td>
                        <td className="whitespace-nowrap px-6 py-4">{type.startDate}</td>
                        <td className="whitespace-nowrap px-6 py-4">{type.endDate}</td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <BsEyeFill
                            className="w-5 h-8 text-gray-500 mr-3 cursor-pointer"
                            title="Ver"
                            onClick={() => onShown(type)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <Card className="w-50 md:w-30 lg:w-50">
              <PaginationTable
                metadata={data?.projectVistsCount || ({} as MetadataPagination)}
                valueSkip={skip}
                setSkip={setSkip}
                valueTake={take}
                setTake={setTake}
              />
            </Card>
          </div>
        </div>
      </div>

      <ModalUpdateTools
        isOpen={isOpen}
        onClose={closeModal}
        project={visitType}
        key={visitType?.id}
      />
    </>
  );
};

export default ProjectTable;
