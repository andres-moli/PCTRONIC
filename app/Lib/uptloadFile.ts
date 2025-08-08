import { FileInfo } from '../graphql/generated/graphql';
import axios from "axios";
import * as ImageManipulator from 'expo-image-manipulator';
import { URL_CLIENT } from '../Constants/url';

const compressImage = async (uri: string) => {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 800 } }], // Redimensionar a 800px de ancho
    { compress: 0.3, format: ImageManipulator.SaveFormat.JPEG } // Comprimir al 70%
  );
  return result.uri;
};
// Función para subir el archivo
const handleUploadImage = async (file: any, setProgress?: React.Dispatch<React.SetStateAction<number>>) => {
  try {
    const url = `${URL_CLIENT}attachment/files`;
    const formData = new FormData();
    formData.append('file', {
      uri: (file.uri),
      ...file,
    });


    const response = await axios.post<FileInfo>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'accept': '*/*'
      },
      timeout: 60000, // Aumentar el tiempo de espera si es necesario
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / (progressEvent?.total || 0));
        if(setProgress){
          setProgress(percent);
        }
      },
    });
    return response?.data;
  } catch (error) {
    console.log(error)
    console.log('Error subiendo imagen:', error);
  }
};


export default handleUploadImage;
