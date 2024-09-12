import { Button, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { ButtonAddFieldPass } from "./buttons/ButtonAddFieldPass";
import { BiPlus, BiTrash } from "react-icons/bi";
import { classNames } from "../../../../../helpers/ClassN";
import { useThemeMovilPay } from "../../../../../hooks/useTheme";
import { useAllParams } from "../../../../../hooks/useAllParams";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { postCredentials } from "../api/HomeAPi";
import { SuccessToast } from "../../../../../libs/Notifications";
import { queryClient } from "../../../../../App";

export interface dataInput {
  title: string;
  id: string;
  values: string;
}

const schema = yup
  .object({
    user: yup.string().required("* El usuario es requerido *"),
    password: yup.string().required("* La Contraseña es requerida *"),
    description: yup.string(),
  })
  .required();

  interface Props{
    setOpen:(e:boolean)=>void
  }

export const FormAddPass = ({setOpen}:Props) => {
  const {
    params: { sub_category },
  } = useAllParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { darkMode } = useThemeMovilPay();
  const [inputList, setInputList] = useState<dataInput[]>([]);
  const mutation = useMutation(postCredentials);

  const onSubmit = (data: any) => {
    const withoutId = inputList.map((d) => {
      const { id, ...rest } = d;
      return rest;
    });
    const body = {
      ...data,
      additional_information: withoutId,
      sub_category_id: sub_category,
    };

    mutation.mutate(body, {
      onSuccess: ({data}, variables, context) => {
        queryClient.invalidateQueries('credentials')
        setOpen(false)
        SuccessToast(data.message)
      },
      onError: (error, variables, context) => {
        
      },
    });
  };

  const handleInput = (data: dataInput) => {
    setInputList((d) => [...d, data]);
  };

  const deleteInput = (id: string) => {
    const valueFilteres = inputList.filter((d) => d.id !== id);
    setInputList(valueFilteres);
  };

  return (
    <div className="mt-4">
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Agregar Campo */}
        <div>
          <Input
            type="text"
            label={
              <span className={darkMode ? "text-titleDark" : ""}>Usuario</span>
            }
            placeholder="Introduce tu usuario"
            variant="bordered"
            color="secondary"
            className={classNames(darkMode && "text-textDark", "w-full")}
            {...register("user")}
          />
          <p className="text-xs text-danger">{errors.user?.message}</p>
        </div>
        <div>
          <Input
            type="text"
            label={
              <span className={darkMode ? "text-titleDark" : ""}>
                Contraseñas
              </span>
            }
            placeholder="*********"
            variant="bordered"
            color="secondary"
            className={classNames(darkMode && "text-textDark", "w-full")}
            {...register("password")}
          />
          <p className="text-xs text-danger">{errors.password?.message}</p>
        </div>
        <div>
          <Textarea
            type="text"
            label={
              <span className={darkMode ? "text-titleDark" : ""}>
                Descripción
              </span>
            }
            placeholder="Introduce la descripción"
            variant="bordered"
            color="secondary"
            {...register("description")}
            className={classNames(darkMode && "text-textDark", "w-full")}
          />
        </div>

        <div className="">
          <h3
            className={classNames(
              darkMode ? "text-titleDark" : "text-gray-900",
              "font-medium "
            )}
          >
            Información Adicional
          </h3>
          <ul
            role="list"
            className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200"
          >
            {inputList.map((d) => (
              <li className="flex items-center justify-between py-3" key={d.id}>
                <div className="flex items-center">
                  <div>
                    <dt
                      className={classNames(
                        darkMode ? "text-titleDark" : "text-gray-500",
                        " font-medium  sm:w-40 sm:flex-shrink-0"
                      )}
                    >
                      {d.title}
                    </dt>
                    <dd
                      className={classNames(
                        darkMode ? "text-textDark" : "text-gray-900",
                        "mt-1 text-sm  sm:col-span-2"
                      )}
                    >
                      <p>{d.values}</p>
                    </dd>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => deleteInput(d.id)}
                  className="ml-6 rounded-md  text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <BiTrash className="h-6 w-6 text-danger hover:text-danger/60" />
                </button>
              </li>
            ))}
            <li className="flex items-center justify-between py-2">
              <ButtonAddFieldPass send={handleInput} />
            </li>
          </ul>
        </div>
        <Button
          color="secondary"
          type="submit"
          className="w-full mt-14 rounded-xl"
        >
          Guardar
        </Button>
      </form>
    </div>
  );
};
