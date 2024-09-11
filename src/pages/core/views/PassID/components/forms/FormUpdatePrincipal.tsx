import { Button, Input, Textarea } from "@nextui-org/react";
import { Credentials } from "../../../Home/interfaces/CredentialsInterfaces";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { patchCredentials } from "../../../Home/api/HomeAPi";
import { ErrorToast, SuccessToast } from "../../../../../../libs/Notifications";
import { queryClient } from "../../../../../../App";

interface Props {
  credential: Credentials;
}

const schema = yup
  .object({
    user: yup.string().required("* El usuario es requerido *"),
    password: yup.string().required("* La Contraseña es requerida *"),
    description: yup.string(),
  })
  .required();

export const FormUpdatePrincipal = ({ credential }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      user: credential.user,
      password: credential.password,
      description: credential.description,
    },
  });
  const mutation = useMutation(({ id, body }: any) =>
    patchCredentials(id, body)
  );

  const onSubmit = (data: any) => {
    
    mutation.mutateAsync(
      {
        id: credential.id,
        body:data,
      },
      {
        onSuccess: ({ data }: any) => {
          const { message } = data;
          SuccessToast(message);
          queryClient.invalidateQueries("credential");
        },
        onError: (data: any) => {
          if (data.status == 400) {
            ErrorToast(data.data.message);
          }
        },
      }
    );
  };
  return (
    <form
      className=" bg-white dark:bg-primaryDark rounded-xl shadow-xl p-5 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-3">
        <h2 className="text-base font-semibold leading-7 dark:dark:text-white">
          Información Principal
        </h2>
      </div>
      <div className="space-y-8">
        <div className="col-span-full">
          <Input
            label="Usuario"
            placeholder="Introduce un usuario"
            variant="bordered"
            color="secondary"
            className="dark:text-textDark"
            {...register("user")}
          />
          <p className="text-xs text-danger">{errors.user?.message}</p>
        </div>
        <div className="col-span-full">
          <Input
            label="Contraseña"
            placeholder="Introduce la contraseña"
            variant="bordered"
            color="secondary"
            className="dark:text-textDark"
            {...register("password")}
          />
          <p className="text-xs text-danger">{errors.password?.message}</p>
        </div>
        <div className="col-span-full">
          <Textarea
            label="Descripción"
            placeholder="Introduce la descripción"
            variant="bordered"
            color="secondary"
            className="dark:text-textDark"
          ></Textarea>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button type="submit" color="secondary" isLoading={mutation.isLoading}>
          Actualizar
        </Button>
      </div>
    </form>
  );
};
