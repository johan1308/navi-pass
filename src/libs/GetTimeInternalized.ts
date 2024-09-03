import {
  today as hoy,
  getLocalTimeZone,
  DateFormatter,
  parseDate,
  CalendarDate,
} from "@internationalized/date";

export const todayInternalized = () => {
  return hoy(getLocalTimeZone());
};

export const DateInternalized = (date: any) => {
  
  
  const [day, month, year] = date.split("/").map((d: string) => Number(d));
  const dateFormatter= new CalendarDate(year, month, day);
  return dateFormatter
};

export const formaterTimeInternalized = (date: any) => {
  const formatter = new DateFormatter("es-ES");
  const dataFormater = new Date(date);
  const f = formatter.format(dataFormater);
  return f;
};

export const formaterTimeInternalizedRange = ({ start, end }: any) => {
  const formatter = new DateFormatter("es-ES");

  const startDate = new Date(start.year, start.month - 1, start.day);

  const endDate = new Date(end.year, end.month - 1, end.day);

  // Formatea el rango de fechas
  const [since, until] = formatter.formatRange(startDate, endDate).split("–");
  
  
  return {
    since,
    until,
  };
};
