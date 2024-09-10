import { NextUIProvider } from "@nextui-org/react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { RutaPrincipal } from "./routers/RutaPrincipal";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProviders } from "./context/AuthProviders";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

export const queryClient = new QueryClient();

function App() {
  return (
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProviders>
          <ThemeProvider>
            <BrowserRouter>
              <RutaPrincipal />
              <Toaster position="top-right" reverseOrder={false} />
            </BrowserRouter>
          </ThemeProvider>
        </AuthProviders>
      </QueryClientProvider>
    </NextUIProvider>
  );
}

export default App;
