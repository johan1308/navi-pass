import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { getCookie } from "../config/cookies";
// Define your context type
interface AuthContextInterface {
  token: string | boolean;
  setToken: (newData: any) => void;
}

interface Props {
  children: JSX.Element;
}

export const AuthContext = createContext<AuthContextInterface>({
  token: true,
  setToken: (newData: any) => true,
});

export const AuthProviders = ({ children }: Props) => {
  const [token, setToken] = useState<string | boolean>(false);
  useEffect(() => {
    const to = getCookie("token");
    if (to) {
        setToken(to)
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ setToken, token }}>
      {children}
    </AuthContext.Provider>
  );
};
