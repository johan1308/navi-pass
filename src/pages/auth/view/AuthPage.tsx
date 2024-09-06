import { FormAuth } from "./components/FormAuth";

export const AuthPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 ">
      <div
        className="
          flex flex-col
          bg-white
          shadow-xl
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-xl
          w-50
          max-w-md
        "
      >
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Ingresar
        </div>

        <div className="w-[300px] ">
          <FormAuth />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-6">
        <p className="text-xs text-gray-500">Sistema de credenciales de Gonavi © 2024 G-Aéreo.</p>
        <p className="text-xs text-primary">Todos los derechos reservados.</p>
      </div>
    </div>
  );
};
