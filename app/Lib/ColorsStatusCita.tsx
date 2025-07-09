import { StyleSheet } from "react-native";
import { StatusCita } from "../graphql/generated/graphql";

export const getEventStyle = (status: StatusCita) => {
    let backgroundColor = '';
    let textColor = '#333'; // Color de texto por defecto (gris oscuro)
  
    switch (status) {
      case StatusCita.Cancelada:
        backgroundColor = '#FFB3B3'; // Rojo suave
        textColor = '#A33'; // Texto rojo oscuro para contraste
        break;
      case StatusCita.EnProceso:
        backgroundColor = '#FFD9B3'; // Naranja pastel
        textColor = '#D97706'; // Naranja oscuro
        break;
      case StatusCita.Pendiente:
        backgroundColor = '#FFF5CC'; // Amarillo muy suave
        textColor = '#B8860B'; // Amarillo oscuro
        break;
      case StatusCita.Programada:
        backgroundColor = '#B3D9FF'; // Azul claro pastel
        textColor = '#1E90FF'; // Azul más intenso
        break;
      case StatusCita.Realizada:
        backgroundColor = '#C3E6CB'; // Verde menta suave
        textColor = '#2E8B57'; // Verde más oscuro
        break;
      case StatusCita.Reprogramada:
        backgroundColor = '#D0B3FF'; // Violeta claro
        textColor = '#6A5ACD'; // Azul violeta oscuro
        break;
      default:
        backgroundColor = '#E0E0E0'; // Gris claro por defecto
        textColor = '#333'; // Texto gris oscuro
    }
    const styles = StyleSheet.create({
        style: {
            backgroundColor,
            color: textColor
          },
    })
    return styles.style;
  };