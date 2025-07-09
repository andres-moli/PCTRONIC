import React, { useEffect, useState } from "react";
import {
  EstadoDocumento,
  useUpdateDocumentoUsuarioMutation,
  useTiposDocumentoQuery,
  useUsersQuery,
  DocumentoUsuario
} from "../../../domain/graphql";
import { toast } from "sonner";
import { apolloClient } from "../../../main.config";
import { ToastyErrorGraph } from "../../../lib/utils";
import handleUploadImage from "../../../lib/uptloadFile";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentoUsers?: DocumentoUsuario;
}

const ModalUpdateDocumentUser: React.FC<RegisterModalProps> = ({ isOpen, onClose, documentoUsers }) => {
  if(!documentoUsers) return
  const [updateDocumento] = useUpdateDocumentoUsuarioMutation();
  const { data, loading } = useUsersQuery({
    variables: { pagination: { skip: 0, take: 9999999 } },
  });
  const { data: dataDocument, loading: loadingDocument } = useTiposDocumentoQuery({
    variables: { pagination: { skip: 0, take: 9999999 } },
  });

  const [formData, setFormData] = useState({
    observaciones: documentoUsers.observaciones || "",
    tipoDocumentoId: documentoUsers.tipoDocumento.id,
    usuarioId: documentoUsers?.usuario.id
  });

  const [fileId, setFileId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    observaciones: "",
    tipoDocumentoId: "",
    usuarioId: "",
    fileId: ""
  });

  // Prellenar datos cuando documentoUsers cambia
  useEffect(() => {
    if (documentoUsers) {
      setFormData({
        observaciones: documentoUsers.observaciones || "",
        tipoDocumentoId: documentoUsers.tipoDocumento.id,
        usuarioId: documentoUsers.usuario.id,
      });
      setFileId(documentoUsers.file?.id || null);
    }
  }, [documentoUsers]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const formErrors: any = {};
    if (!formData.tipoDocumentoId) formErrors.tipoDocumentoId = "Este campo es obligatorio";
    if (!formData.usuarioId) formErrors.usuarioId = "Este campo es obligatorio";
    return formErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const toastId = toast.loading("Actualizando documento...");

    try {
      let finalFileId = fileId;

      if (file && !fileId) {
        const uploaded = await handleUploadImage(file);
        if (uploaded?.id) {
          finalFileId = uploaded.id;
          setFileId(uploaded.id);
        } else {
          toast.error("Error al subir el archivo", { id: toastId });
          return;
        }
      }

      if (!documentoUsers) {
        toast.error("Documento no definido para actualizar", { id: toastId });
        return;
      }

      const res = await updateDocumento({
        variables: {
          updateInput: {
            id: documentoUsers.id,
            estado: EstadoDocumento.Aceptado,
            tipoDocumentoId: formData.tipoDocumentoId,
            observaciones: formData.observaciones,
            fileId: finalFileId || "",
            usuarioId: formData.usuarioId
          }
        }
      });

      if (res.errors) {
        toast.error("Error: " + res.errors[0].message, { id: toastId });
        return;
      }

      toast.success("Documento actualizado con éxito", { id: toastId });
      apolloClient.cache.evict({ fieldName: "documentosUsuario" });
      setFile(null);
      setFileId(null);
      onClose();
    } catch (err) {
      ToastyErrorGraph(err as any);
    } finally {
      toast.dismiss(toastId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Actualizar Documento</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {loading ? (
              <>Cargando usuarios...</>
            ) : (
              <>
                <label htmlFor="usuarioId" className="block text-sm font-medium">Usuario</label>
                <select
                  id="usuarioId"
                  name="usuarioId"
                  value={formData.usuarioId}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 border ${errors.usuarioId ? "border-red-500" : "border-gray-300"} rounded-md`}
                >
                  <option disabled value="">Seleccione un usuario</option>
                  {data?.users.map((user) => (
                    <option key={user.id} value={user.id}>{user.fullName}</option>
                  ))}
                </select>
              </>
            )}
          </div>

          <div className="mb-4">
            {loadingDocument ? (
              <>Cargando tipo documentos...</>
            ) : (
              <>
                <label htmlFor="tipoDocumentoId" className="block text-sm font-medium">Tipo documento</label>
                <select
                  id="tipoDocumentoId"
                  name="tipoDocumentoId"
                  value={formData.tipoDocumentoId}
                  onChange={handleChange}
                  className={`mt-1 block w-full p-2 border ${errors.tipoDocumentoId ? "border-red-500" : "border-gray-300"} rounded-md`}
                >
                  <option disabled value="">Seleccione un Tipo de documento</option>
                  {dataDocument?.tiposDocumento.map((doc) => (
                    <option key={doc.id} value={doc.id}>{doc.nombre}</option>
                  ))}
                </select>
              </>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium">Archivo</label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*,application/pdf"
              onChange={(e) => {
                const selected = e.target.files?.[0];
                setFile(selected || null);
                setFileId(null);
              }}
              className={`mt-1 block w-full p-2 border ${errors.fileId ? "border-red-500" : "border-gray-300"} rounded-md`}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="observaciones" className="block text-sm font-medium">Observaciones</label>
            <input
              type="text"
              id="observaciones"
              name="observaciones"
              value={formData.observaciones}
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

export default ModalUpdateDocumentUser;
