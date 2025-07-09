import React, { useState } from "react";
import { Tool, useCreateToolMutation, useUpdateToolMutation } from "../../../domain/graphql";
import { toast } from "sonner";
import { apolloClient } from "../../../main.config";
import { ToastyErrorGraph } from "../../../lib/utils";

interface RegisterModalProps { 
  isOpen: boolean;
  onClose: () => void;
  tool: Tool | undefined;
}

const ModalUpdateTools: React.FC<RegisterModalProps> = ({ isOpen, onClose, tool }) => {
  if(!tool) return
  const [update] = useUpdateToolMutation()
  const [formData, setFormData] = useState({
    name: tool.name,
    description: tool.reference,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    reference: formData.description
                }
            }
        })
        if(res.errors){
            toast.error('Uupss hubo un error en: ' + res.errors[0].message)
            return
        }
        toast.success('Herramienta actualizada con exito')
        apolloClient.cache.evict({ fieldName: "Tools" })
        // Aquí podrías hacer una llamada a una API o gestionar el registro del usuario
        setFormData({
            name: "",
            description: "",
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
              referencia
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
