import axios from "axios";
import { ErrorToast } from "../libs/Notifications";
import { deleteCookie, getCookie } from "../config/cookies";
import { configLogout } from "../utils/configLogout";

export const movilPayAPI = axios.create({
  //baseURL: "https://validator.movilpay.app",
  baseURL: "http://38.45.34.27/api/v1",
});

movilPayAPI.interceptors.request.use((config) => {
  // Modificar la configuración de la solicitud antes de enviarla
  // Puedes agregar encabezados, tokens, etc.
  const token = getCookie("token");
  config.headers["Authorization"] = token;
  return config;
});

movilPayAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {        
    // Manejar errores de respuesta
    if (error.response.status == 500) {
      ErrorToast("Server Internal Error (500)");
    }
    if (error.request.status == 0) {
      ErrorToast("Error de conexión, intente nuevamente");
    }
    if (error.response.status == 401 || error.response.status == 403 ) {
      configLogout()
      return;
    }
    return Promise.reject(error);
  }
);


