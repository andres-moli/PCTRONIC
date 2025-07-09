import React, { useState } from "react";
import { useCreateTipoDocumentoMutation, useCreateToolMutation } from "../../../domain/graphql";
import { toast } from "sonner";
import { apolloClient } from "../../../main.config";
import { ToastyErrorGraph } from "../../../lib/utils";

interface RegisterModalProps { 
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateDocument: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [create] = useCreateTipoDocumentoMutation()
  const [formData, setFormData] = useState({
    nombre: "",
    activo: true,
    obligatorio: false,
    descripcion: ""
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
    const toatsId = toast.loading('Creando Tipo de documentos..')
    try {
        const res = await create({
            variables: {
                createInput: {
                  nombre: formData.nombre,
                  descripcion: formData.descripcion,
                  activo: formData.activo,
                  obligatorio: formData.obligatorio
                }
            }
        })
        if(res.errors){
            toast.error('Uupss hubo un error en: ' + res.errors[0].message)
            return
        }
        toast.success('Tipo de documento creada con exito')
        apolloClient.cache.evict({ fieldName: "tiposDocumento" })
        // Aquí podrías hacer una llamada a una API o gestionar el registro del usuario
        setFormData({
          nombre: "",
          activo: true,
          obligatorio: false,
          descripcion: ""
        })
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
        <h2 className="text-2xl font-bold mb-4">Crear Documento</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium">
              Descripcion
            </label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
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
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCreateDocument;
