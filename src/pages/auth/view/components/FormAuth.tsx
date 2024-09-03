import { Button, Input } from "@nextui-org/react";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingToast } from "../../../../libs/Notifications";
import { authApi } from "../../../../api/authAPI";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthProviders";
import { setCookie } from "../../../../config/cookies";

const schema = yup
  .object({
    email: yup.string().required("*Este campo es obligatorio*"),
    password: yup.string().required("*Este campo es obligatorio*"),
  })
  .required();

export const FormAuth = () => {
  const navigate = useNavigate()
  const [cargando, setCargando] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { setToken } = useContext(AuthContext);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(schema),
  });



  const onSubmit = (data: any) => {
    setCargando(true);
    const payload = {
      email:data.email.trim(),
      password:data.password.trim()
    }
    const { success, error } = LoadingToast();
    authApi
      .post("/login/", data)
      .then(({ data }: any) => {
        
        setCookie("user", JSON.stringify(data.user));
        setCookie("token", `Token ${data.token}`);
        success(`Bienvenido ${data.user.name} ${data.user.lastname}`);
        setCargando(false);
        setToken(data.token);
      })
      .catch(({ response }: any) => {
        setCargando(false);
        if (response.status == 500) return error("Server Internal Error (500)");
        if (response.status == 0)
          return error("Error de conexión intente nuevamente");
        error(response.data.error);
      });
  };

  return (
    <form className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto mt-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex -mx-3">
        <div className="w-full px-3 mb-5">
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type="email"
                label="Usuario"
                color="primary"
                variant="faded"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                className="w-full dark:text-white text-default"
                maxLength={40}
                placeholder="Introduce tu usuario"
              />
            )}
          />
        </div>
      </div>
      <div className="flex -mx-3 my-5">
        <div className="w-full px-3 mb-5">
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Contraseña"
                color="primary"
                variant="faded"
                className="w-full dark:text-white text-default"
                placeholder="************"
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <FaEye className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
            )}
          />
        </div>
      </div>
      <div className="flex -mx-3">
        <div className="w-full px-3 ">
          <Button
            color="primary"
            className="w-full"
            type="submit"
            size="lg"
            disabled={cargando}
          >
            Ingresar
          </Button>
        </div>
      </div>
    </form>
  );
};
