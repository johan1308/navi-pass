import Cookies from "js-cookie";

export const setCookie = (name: string, value: any) => {
  Cookies.set(name, JSON.stringify(value));
};

// Obtener el valor de una cookie
export const getCookie = (name: string) => {
  const cookieValue = Cookies.get(name);
  if (cookieValue) {
      return JSON.parse(cookieValue);
  }
  return false
};

// Eliminar una cookie
export const deleteCookie = (name: string) => {
  Cookies.remove(name);
};
