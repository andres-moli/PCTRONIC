import React, { useState } from "react";
import { TipoDocumento, Tool, useCreateToolMutation, useUpdateTipoDocumentoMutation, useUpdateToolMutation } from "../../../domain/graphql";
import { toast } from "sonner";
import { apolloClient } from "../../../main.config";
import { ToastyErrorGraph } from "../../../lib/utils";

interface RegisterModalProps { 
  isOpen: boolean;
  onClose: () => void;
  tipoDocumento: TipoDocumento | undefined;
}

const ModalUpdateTools: React.FC<RegisterModalProps> = ({ isOpen, onClose, tipoDocumento }) => {
  if(!tipoDocumento) return
  const [update] = useUpdateTipoDocumentoMutation()
  const [formData, setFormData] = useState({
    nombre: tipoDocumento.nombre,
    activo: tipoDocumento.activo,
    obligatorio: tipoDocumento.obligatorio,
    descripcion: tipoDocumento.descripcion
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toatsId = toast.loading('Actualizando Tipo de Documento..')
    try {
        const res = await update({
            variables: {
                updateInput: {
                    id: tipoDocumento.id,
                    nombre: formData.nombre,
                    descripcion: tipoDocumento.descripcion,
                    activo: formData.activo,
                    obligatorio: formData.obligatorio
                }
            }
        })
        if(res.errors){
            toast.error('Uupss hubo un error en: ' + res.errors[0].message)
            return
        }
        toast.success('Tipo de Documento actualizado con exito')
        apolloClient.cache.evict({ fieldName: "tiposDocumento" })
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
        <h2 className="text-2xl font-bold mb-4">Actualizar Tipo de Documento</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              descripcion
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.descripcion || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="activo" className="block text-sm font-medium">
              ¿Está activo?
            </label>
            <input
              type="checkbox"
              id="activo"
              name="activo"
              checked={formData.activo || false}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="obligatorio" className="block text-sm font-medium">
              ¿Es obligatorio?
            </label>
            <input
              type="checkbox"
              id="obligatorio"
              name="obligatorio"
              checked={formData.obligatorio || false}
              onChange={handleChange}
              className="mt-1"
            />
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
