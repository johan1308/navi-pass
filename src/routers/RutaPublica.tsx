import { Navigate } from "react-router";
import { useContext, useReducer } from "react";
import { AuthContext } from "../context/AuthProviders";


interface Props {
  children: JSX.Element;
}

const initialState = "/";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const init = (start: any) => {
  
  const a = localStorage.getItem("lastPath");

  return !a ? start : a;
};

export const RutaPublica = ({ children }: Props) => {
  const [state] = useReducer(reducer, initialState, init);
  const { token } = useContext(AuthContext);
  return !token ? children : <Navigate to={state} />;
};
