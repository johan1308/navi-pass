import React, { createContext, useState, useContext, useReducer } from "react";

// Definir el tipo para el contexto del tema
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}
// Crear el contexto del tema
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const appReducer = (state: any) => {
  return !state;
};

const initialState = false;

const init = (start: any) => {
  const seteo = JSON.parse(localStorage.getItem("darkMode") as never);
  return seteo && seteo;
};

// Crear el proveedor de contexto del tema
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, dispatchToogle] = useReducer(appReducer, initialState, init);
  // Función para cambiar el modo oscuro
  const toggleDarkMode = () => {
    const cambio = !darkMode;
    dispatchToogle();
    localStorage.setItem("darkMode", JSON.stringify(cambio));
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
