import React, { useState } from "react";
import { ToolUnitStatusEnum, useCreateToolItemMutation, useCreateToolMutation, useToolsQuery } from "../../../domain/graphql";
import { toast } from "sonner";
import { apolloClient } from "../../../main.config";
import { ToastyErrorGraph } from "../../../lib/utils";
import { alertConfirm } from "../../../lib/alert";

interface RegisterModalProps { 
  isOpen: boolean;
  onClose: () => void;
}

const ModalCreateToolsItem: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [create] = useCreateToolItemMutation()
  const {data, loading} = useToolsQuery({
    variables: {
      pagination: {
        skip: 0,
        take: 9999999
      }
    }
  })
  const [formData, setFormData] = useState({
    name: "",
    toolId: "",
    referencia: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    toolId: "",
    referencia: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    {/* @ts-ignore */}
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirmed = await alertConfirm({
      title: "¿Estás seguro que quieres crear esta herramienta?",
      confirmButtonText: "Si, crear",
      // denyButtonText: "Cancelar",
    });
    if(!confirmed) {
      return;
    }
    if (!formData.name || !formData.toolId || !formData.referencia) {
      setErrors({
        name: !formData.name ? "El nombre es requerido" : "",
        toolId: !formData.toolId ? "La herramienta es requerida" : "",
        referencia: !formData.referencia ? "La referencia es requerida" : "",
      });
      return;
    }
    const toatsId = toast.loading('Creando Herramienta..')
    try {
        const res = await create({
            variables: {
                createInput: {
                    name: formData.name,
                    toolId: formData.toolId,
                    status: ToolUnitStatusEnum.Available,
                    referencia: formData.referencia,
                }
            }
        })
        if(res.errors){
            toast.error('Uupss hubo un error en: ' + res.errors[0].message)
            return
        }
        toast.success('Herramienta creada con exito')
        apolloClient.cache.evict({ fieldName: "ToolsItem" })
        // Aquí podrías hacer una llamada a una API o gestionar el registro del usuario
        setFormData({
            name: "",
            toolId: "",
            referencia: "",
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
        <h2 className="text-2xl font-bold mb-4">Crear Herramientas</h2>
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
            <label htmlFor="referencia" className="block text-sm font-medium">
              Referencia
            </label>
            <input
              type="text"
              id="referencia"
              name="referencia"
              value={formData.referencia}
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

export default ModalCreateToolsItem;
