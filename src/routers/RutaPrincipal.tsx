import { Route, Routes } from "react-router-dom";
import { RutaPublica } from "./RutaPublica";
import { RutaPrivada } from "./RutaPrivada";

import { CoreRouters } from "../pages/core/routers/CoreRouters";
import { AuthPage } from "../pages/auth/view/AuthPage";





export const RutaPrincipal = () => {
    return (
        <div className="">
          
          <Routes>
            <Route
              path="auth/"
              element={
                <RutaPublica>
                  <Routes>
                    <Route path="/*" element={<AuthPage/>} />
                  </Routes>
                </RutaPublica>
              }
            />
            <Route path="/*"  element={
                <RutaPrivada>
                  <CoreRouters/>
                </RutaPrivada>
            } />
          </Routes>
        </div>
      );
}
