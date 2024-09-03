import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthProviders";


interface Props {
  children: JSX.Element;
}

export const RutaPrivada = ({ children }: Props) => {
  const { token } = useContext(AuthContext);

  const { pathname, search } = useLocation();
  const lastPath = pathname + search;

  localStorage.setItem("lastPath", lastPath);

  return token ? children : <Navigate to="auth/" />;
};
