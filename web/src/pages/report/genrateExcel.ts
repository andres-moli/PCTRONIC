import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

type GroupedData = Map<
  string,
  {
    userName: string;
    visitTypeName: string;
    totalMinutes: number;
    records: {
      date: string;
      startTime: string;
      endTime: string;
      duration: number; // en minutos
    }[];
  }
>;

const formatHours = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}:${m.toString().padStart(2, '0')}`;
};

export const exportToExcel = async (groupedData: GroupedData) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Reporte');

  worksheet.columns = [
    { header: 'Nombre', key: 'userName', width: 30 },
    { header: 'Tipo de visita', key: 'visitTypeName', width: 25 },
    { header: 'Fecha', key: 'date', width: 15 },
    { header: 'Hora de entrada', key: 'startTime', width: 15 },
    { header: 'Hora de salida', key: 'endTime', width: 15 },
    { header: 'Minutos', key: 'duration', width: 15 },
    { header: 'Horas', key: 'durationFormatted', width: 15 },
  ];

  // Encabezados con estilo
  worksheet.getRow(1).eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4F46E5' },
    };
    cell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  });

  // Recorremos el Map agrupado
  groupedData.forEach((group) => {
    group.records.forEach((record) => {
      worksheet.addRow({
        userName: group.userName,
        visitTypeName: group.visitTypeName,
        date: record.date,
        startTime: record.startTime,
        endTime: record.endTime,
        duration: record.duration,
        durationFormatted: formatHours(record.duration),
      });
    });

    // Fila de resumen por grupo
    worksheet.addRow({
      userName: `Total ${group.userName}`,
      visitTypeName: group.visitTypeName,
      duration: group.totalMinutes,
      durationFormatted: formatHours(group.totalMinutes),
    });

    worksheet.addRow({}); // fila vacía para separar grupos
  });

  // Estilo general
  worksheet.eachRow({ includeEmpty: false }, (row, rowIndex) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFCCCCCC' } },
        left: { style: 'thin', color: { argb: 'FFCCCCCC' } },
        bottom: { style: 'thin', color: { argb: 'FFCCCCCC' } },
        right: { style: 'thin', color: { argb: 'FFCCCCCC' } },
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    // Zebra style
    if (rowIndex % 2 === 0 && rowIndex !== 1) {
      row.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF3F4F6' },
        };
      });
    }
  });

  // Exportar archivo
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  saveAs(blob, 'reporte.xlsx');
};
export default exportToExcel;