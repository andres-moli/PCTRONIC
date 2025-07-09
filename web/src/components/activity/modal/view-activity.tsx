import React, { useState } from "react";
import { useCreateUserMutation, User, UserDocumentTypes, UserTypes, useUpdateUserMutation, Visit, VisitComentTypeEnum } from "../../../domain/graphql";
import { toast } from "sonner";
import { ToastyErrorGraph } from "../../../lib/utils";
import { apolloClient } from "../../../main.config";
import dayjs from "dayjs";
import { getStatusLabel } from "../tables/activity-table";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  visit: Visit | undefined
}
const ViewActivityModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, visit }) => {
  if(!visit) return null


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formErrors = validateForm();
//     if (Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//       return;
//     }
//     const toatsId = toast.loading('Actualizando usuario..')
//     try {
//       const res = await update({
//         variables: {
//           updateInput: {
//             ...formData,
//             id: user.id,
//             type: UserTypes.User,
//             identificationType: formData.identificationType as UserDocumentTypes,
//             password: formData.identificationNumber
//           }
//         }
//       })
//       if(res.errors){
//         toast.error(res.errors[0].message);
//         toast.dismiss(toatsId)
//         return
//       }
//       toast.success('Usuario Actualizado...');
//       apolloClient.cache.evict({ fieldName: "users" })
//     } catch (err) {
//         ToastyErrorGraph(err as any)
//     } finally {
//       toast.dismiss(toatsId)
//     }
//     onClose(); // Cerrar el modal después de enviar
//   };
const startTime = dayjs(visit.visitItem.find((x) => x.type === VisitComentTypeEnum.Inicio)?.dateFull || new Date())
const endTime = dayjs(visit.visitItem.find((x) => x.type === VisitComentTypeEnum.Fin)?.dateFull || new Date())

const totalMinutos = endTime.diff(startTime)
let diffMin = Math.floor(totalMinutos / 60000); // 60000 ms = 1 minuto
const remainingSeconds = (totalMinutos % 60000) / 1000;

if (remainingSeconds >= 30) {
  diffMin += 1;
}
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[800px] shadow-lg max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Información de la Actividad</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="dateVisit" className="block text-sm font-medium">Nombres del usuario</label>
            <input
              type="text"
              id="dateVisit"
              name="dateVisit"
              value={visit.user.fullName}
              disabled
            //   onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="dateVisit" className="block text-sm font-medium">Fecha</label>
            <input
              type="text"
              id="dateVisit"
              name="dateVisit"
              disabled
              value={dayjs(visit.dateVisit).format('YYYY-MM-DD HH:mm')}
            //   onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
            />
            <label htmlFor="time" className="block text-sm font-medium">Tiempo dedicado</label>
            <input
              type="text"
              id="time"
              name="time"
              disabled
              value={diffMin + ' Minutos'}
            //   onChange={handleChange}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
            />
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
                <textarea
                //   type="text"
                id="description"
                name="description"
                value={visit.description}
                disabled
                //   onChange={handleChange}
                className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium">Estado</label>
                <input
                type="text"
                id="status"
                name="status"
                value={getStatusLabel(visit.status)}
                disabled
                //   onChange={handleChange}
                className={`mt-1 block w-full p-2 border border-gray-300 rounded-md`}
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewActivityModal;
