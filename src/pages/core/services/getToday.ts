import moment from "moment";
import { today as hoy, getLocalTimeZone } from "@internationalized/date";

const today = moment();

export const getToday = () => {  
  return today.format("DD/MM/YYYY");
};
export const firstDayMonth = () => {
  return moment().startOf("month").format("DD/MM/YYYY");
};
