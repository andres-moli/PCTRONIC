import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es'; // Importa el idioma español
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// Configuración de idioma global
dayjs.locale('es');

type DateInput = string | number | Date | Dayjs;

const isValidDate = (date: DateInput): boolean => dayjs(date).isValid();

const parseDate = (date: DateInput): Dayjs => {
  if (isValidDate(date)) {
    return dayjs(date);
  }
  throw new Error('Invalid date format');
};

const formatDate = (date: DateInput, format: string): string => {
  const parsedDate = parseDate(date);
  return parsedDate.format(format);
};

const formatDatesRecursively = (dates: DateInput[], format: string): string[] => {
  return dates.map((date) => formatDate(date, format));
};

const formatDatesObjectRecursively = (dates: { [key: string]: DateInput }, format: string): { [key: string]: string } => {
  const formattedDates: { [key: string]: string } = {};
  for (const key in dates) {
    if (dates.hasOwnProperty(key)) {
      formattedDates[key] = formatDate(dates[key], format);
    }
  }
  return formattedDates;
};

const formatDateRange = (startDate: DateInput, endDate: DateInput, format: string): string => {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  return `${start.format(format)} - ${end.format(format)}`;
};

const getDatesBetween = (startDate: DateInput, endDate: DateInput): Dayjs[] => {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  const dates: Dayjs[] = [];

  let current = start;
  while (current.isSameOrBefore(end)) {
    dates.push(current);
    current = current.add(1, 'day');
  }

  return dates;
};

const formatDatesBetween = (startDate: DateInput, endDate: DateInput, format: string): string[] => {
  const dates = getDatesBetween(startDate, endDate);
  return formatDatesRecursively(dates, format);
};

// Formatos comunes de dayjs
const DATE_FORMATS = {
  G: 'YYYY-MM-DD HH:mm:ss',
  LT: 'h:mm A',
  LTS: 'h:mm:ss A',
  L: 'MM/DD/YYYY',
  LL: 'MMMM D, YYYY',
  LLL: 'MMMM D, YYYY h:mm A',
  LLLL: 'dddd, MMMM D, YYYY h:mm A',
  l: 'M/D/YYYY',
  ll: 'MMM D, YYYY',
  lll: 'MMM D, YYYY h:mm A',
  llll: 'ddd, MMM D, YYYY h:mm A',
  H: 'h:mm A'
};

const formatWithCommonFormats = (date: DateInput, formatKey: keyof typeof DATE_FORMATS): string => {
  const format = DATE_FORMATS[formatKey];
  return formatDate(date, format);
};

export {
  formatDate,
  formatDatesRecursively,
  formatDatesObjectRecursively,
  formatDateRange,
  getDatesBetween,
  formatDatesBetween,
  parseDate,
  DATE_FORMATS,
  formatWithCommonFormats
};
