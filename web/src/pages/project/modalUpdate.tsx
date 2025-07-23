import React, { useState } from "react";
import { toast } from "sonner";
import { useUpdateProjectVistMutation, VisitProject, VisitProjectStatusEnum, VisitTypeStatusEnum } from "../../domain/graphql";
import { apolloClient } from "../../main.config";
import { ToastyErrorGraph } from "../../lib/utils";

interface RegisterModalProps { 
  isOpen: boolean;
  onClose: () => void;
  project: VisitProject | undefined;
}

const ModalUpdateTools: React.FC<RegisterModalProps> = ({ isOpen, onClose, project }) => {
  if(!project) return
  const [update] = useUpdateProjectVistMutation()
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    status: project.status,
    startDate: project.startDate,
    endDate: project.endDate,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toatsId = toast.loading('Actualizando proyecto..')
    try {
        const res = await update({
            variables: {
                updateInput: {
                    id: project.id,
                    name: formData.name,
                    description: formData.description,
                    status: formData.status,
                    endDate: formData.endDate,
                    startDate: formData.startDate,
                }
            }
        })
        if(res.errors){
            toast.error('Uupss hubo un error en: ' + res.errors[0].message)
            return
        }
        toast.success('Proyecto actualizado correctamente')
        apolloClient.cache.evict({ fieldName: "projectVists" })
        onClose(); // Cerrar el modal después de enviar
    } catch (err) {
        ToastyErrorGraph(err as any)
    } finally {
        toast.dismiss(toatsId)
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
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
            <label htmlFor="description" className="block text-sm font-medium">
              Descripción
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-sm font-medium">
              Fecha de Inicio
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endDate" className="block text-sm font-medium">
              Fecha de Fin
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
          <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
            >
              <option disabled selected value={''}>Seleccione un estado</option>
              <option value={VisitProjectStatusEnum.Cancelled}>{'Cancelado'}</option>
              <option value={VisitProjectStatusEnum.Completed}>{'Completado'}</option>
              <option value={VisitProjectStatusEnum.InProgress}>{'En Progreso'}</option>
              <option value={VisitProjectStatusEnum.OnHold}>{'En Espera'}</option>
              <option value={VisitProjectStatusEnum.Planned}>{'Planificado'}</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
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
    </div>
  );
};

export default ModalUpdateTools;
