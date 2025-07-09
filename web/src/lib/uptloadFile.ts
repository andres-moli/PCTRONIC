import axios from "axios";
import { toast } from "sonner";
import { FileInfo } from "../domain/graphql";

const handleUploadImage = async (file: File) => {
  const toastId = "upload-toast";

  toast.loading("Subiendo imagen... 0%", {
    id: toastId,
    duration: Infinity,
  });

  try {
    const url = `${import.meta.env.VITE_APP_GRAPH}attachment/files`;
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post<FileInfo>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Transfer-Encoding": "chunked",
      },
      timeout: 60000,
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / (progressEvent?.total || 1)
        );
        toast.message(`Subiendo imagen... ${percent}%`, {
          id: toastId,
        });
      },
    });

    toast.success("Imagen subida exitosamente", { id: toastId });
    return response?.data;
  } catch (error) {
    toast.error("Error subiendo imagen", { id: toastId });
    console.error("Error subiendo imagen:", error);
  }
};

export default handleUploadImage;
