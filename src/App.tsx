import { NextUIProvider } from "@nextui-org/react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { RutaPrincipal } from "./routers/RutaPrincipal";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProviders } from "./context/AuthProviders";

const theme = {
  colors: {
    primary: "blue",
    secondary: "green",
  },
};

function App() {
  return (
    <NextUIProvider>
      <AuthProviders>
        <ThemeProvider>
          <BrowserRouter>
            <Provider store={store}>
              <RutaPrincipal />
              <Toaster position="top-right" reverseOrder={false} />
            </Provider>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProviders>
    </NextUIProvider>
  );
}

export default App;
