import React, { useMemo, useState } from "react";
import { Tool, ToolUnit, ToolUnitStatusEnum, useCreateToolMutation, useToolsQuery, useUpdateToolItemMutation, useUpdateToolMutation, useUpdateToolVisitMutation } from "../../../domain/graphql";
import { toast } from "sonner";
import { apolloClient } from "../../../main.config";
import { ToastyErrorGraph } from "../../../lib/utils";
import PhotoCarouselModal from "./PhotoCarouselModal";
import { getStatusLabel } from "../../../components/activity/tables/activity-table";

interface RegisterModalProps { 
  isOpen: boolean;
  onClose: () => void;
  tool: ToolUnit | undefined;
}
export const toolUnitStatusOptions = [
  { label: 'Disponible', value: ToolUnitStatusEnum.Available },
  { label: 'En uso', value: ToolUnitStatusEnum.InUse },
  { label: 'Perdida', value: ToolUnitStatusEnum.Lost },
  { label: 'Dañada', value: ToolUnitStatusEnum.Damaged },
  { label: 'En mantenimiento', value: ToolUnitStatusEnum.Maintenance },
];
const ModalUpdateToolsItem: React.FC<RegisterModalProps> = ({ isOpen, onClose, tool }) => {
  if(!tool) return
  const [update] = useUpdateToolItemMutation();
  const [updateToolVisit] = useUpdateToolVisitMutation()
  const {data, loading} = useToolsQuery({
    variables: {
      pagination: {
        skip: 0,
        take: 9999999
      }
    }
  });
  const [formData, setFormData] = useState({
    name: tool.name,
    status: tool.status,
    toolId: tool.tool.id
  });
  const [errors, setErrors] = useState({
    name: "",
    toolId: "",
    status: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toatsId = toast.loading('Actualizando Herramienta..')
    try {
        const res = await update({
            variables: {
                updateInput: {
                    id: tool.id,
                    name: formData.name,
                    toolId: formData.toolId,
                    status: formData.status
                }
            }
        })
        if(res.errors){
            toast.error('Uupss hubo un error en: ' + res.errors[0].message)
            return
        }
        toast.success('Herramienta actualizada con exito')
        apolloClient.cache.evict({ fieldName: "ToolsItems" })
        onClose(); // Cerrar el modal después de enviar
    } catch (err) {
        ToastyErrorGraph(err as any)
    } finally {
        toast.dismiss(toatsId)
    }
  };

  // Dentro del componente
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [currentPhotos, setCurrentPhotos] = useState<string[]>([]);
  const filteredVisits = useMemo(() => {
    if (!tool?.visits) return [];
    return tool.visits.slice() // Hacer una copia para no mutar el original
    .sort((a, b) => new Date(b.usageDate).getTime() - new Date(a.usageDate).getTime()) .filter((entry) =>
      entry.visit.user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tool?.visits, searchTerm]);
  
  const totalPages = Math.ceil(filteredVisits.length / itemsPerPage);
  const paginatedVisits = filteredVisits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const updateStatusVisit = async (id: string, status: string) => {
    if(!confirm('¿Estas seguro que quieres actulizar?')) return
    const toatsId = toast.loading('Actualizando Herramienta..')
    try {
        const res = await updateToolVisit({
            variables: {
                updateInput: {
                    id: id,
                    status: status as ToolUnitStatusEnum
                }
            }
        })
        if(res.errors){
            toast.error('Uupss hubo un error en: ' + res.errors[0].message)
            return
        }
        toast.success('Herramienta actualizada con exito')
        apolloClient.cache.evict({ fieldName: "ToolsItems" })
        onClose(); // Cerrar el modal después de enviar
    } catch (err) {
        ToastyErrorGraph(err as any)
    } finally {
        toast.dismiss(toatsId)
    }
  }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]">
      <div className="bg-white p-6 rounded-lg w-[1200px] shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Actualizar Herramientas</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            {
              loading ? <>Cargando Herramientas</>
              :
              <>
              <label htmlFor="toolId" className="block text-sm font-medium">Tipo de Herramienta</label>
              <select
                id="toolId"
                name="toolId"
                value={formData.toolId}
                onChange={handleChange}
                className={`mt-1 block w-full p-2 border ${errors.toolId ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              >
                <option disabled selected value={''}>Seleccione un tipo</option>
                {
                  data?.Tools.map((tool)=> {
                    return (
                      <option value={tool.id}>{tool.name}</option>
                    )
                  })
                }
              </select>
              {errors.toolId && <span className="text-red-500 text-sm">{errors.toolId}</span>}
              </>
            }
          </div>
          <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium">Estado de la herramienta</label>
          <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${errors.status ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            >
              <option disabled selected value={''}>Seleccione un estado</option>
              {
                toolUnitStatusOptions .map((tool)=> {
                  return (
                    <option value={tool.value}>{tool.label}</option>
                  )
                })
              }
            </select>
          </div>
          <hr className="my-6" />
          <h3 className="text-lg font-semibold mb-2">Historial de la Herramienta</h3>
            <input
              type="text"
              placeholder="Buscar por usuario..."
              className="mb-3 p-2 border rounded-md w-full"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset page when searching
              }}
            />

            <div className="overflow-x-auto border rounded-md bg-gray-50">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Fecha</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actividad</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Estado Actividad</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Fotos</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Usuario</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Estado Entregada</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Fecha Entregada</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Usuario entregado</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedVisits.length > 0 ? (
                    paginatedVisits.map((entry) => (
                      <tr key={entry.id}>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {new Date(entry.usageDate).toLocaleString()}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {entry.visit.description}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {getStatusLabel(entry.visit.status)}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                        {(entry.photos?.length || 0) > 0 ? (
                          <button
                            className="text-blue-600 underline"
                            type="button"
                            onClick={() => {
                              setCurrentPhotos(entry.photos?.map(p => p.file.url) || []); // ajusta si usas rutas relativas
                              setPhotoModalOpen(true);
                            }}
                          >
                            Sí
                          </button>
                        ) : 'No'}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {entry.visit.user.fullName}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {
                            entry.status ? toolUnitStatusOptions.find(v => v.value == entry.status)?.label || '' :(
                              <select
                              id="statusToolsItem"
                              name="statusToolsItem"
                              onChange={(value) => updateStatusVisit(entry.id,value.target.value)}
                              className={`mt-1 block p-2 border border-gray-300 rounded-md`}
                            >
                              <option disabled selected value={''}>Seleccione un estado</option>
                              {
                                toolUnitStatusOptions.map((tool)=> {
                                  return (
                                    <option value={tool.value}>{tool.label}</option>
                                  )
                                })
                              }
                            </select>
                            )
                          }
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {entry.entryDate ? new Date(entry.entryDate).toLocaleString() : 'SIN RECIBIR'}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-700">
                          {entry.user ? entry.user.fullName : 'SIN RECIBIR'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-4 py-2 text-center text-sm text-gray-500">
                        No hay historial registrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end items-center gap-2 mt-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-sm">Página {currentPage} de {totalPages}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          <div className="flex justify-end space-x-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
      <PhotoCarouselModal
        isOpen={photoModalOpen}
        photos={currentPhotos}
        onClose={() => setPhotoModalOpen(false)}
      />
    </div>
  );
};

export default ModalUpdateToolsItem;
