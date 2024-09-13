import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { BiPlus, BiSolidEdit } from "react-icons/bi";
import { Mutation, useMutation } from "react-query";
import * as yup from "yup";
import {
  ErrorToast,
  SuccessToast,
} from "../../../../../../../libs/Notifications";
import { queryClient } from "../../../../../../../App";
import { patchCategoriesSetting } from "../../../apis/categoriesSettingApi";
import { classNames } from "../../../../../../../helpers/ClassN";
import { useThemeMovilPay } from "../../../../../../../hooks/useTheme";
import { useEffect, useState } from "react";
import { useAllParams } from "../../../../../../../hooks/useAllParams";

const schema = yup
  .object({
    name: yup.string().required("* El nombre es obligatorio *"),
  })
  .required();

export const ButtonEditCategories = ({
  id,
  name,
}: {
  id: number;
  name: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode } = useThemeMovilPay();
  const Mutation = useMutation(({ id, body }: any) =>
    patchCategoriesSetting(id, body)
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name,
    },
  });

  useEffect(() => {
    setValue("name", name);
  }, [isOpen, name]);

  const onSubmit = (body: { name: string }) => {
    Mutation.mutateAsync(
      {
        id,
        body,
      },
      {
        onSuccess: ({ data }: any, variables, context) => {
          const { message } = data;
          SuccessToast(message);
          reset();
          setIsOpen(false);
          queryClient.invalidateQueries("categories");
        },
        onError: (data: any, variables, context) => {
          if (data.status == 400) {
            ErrorToast(data.data.message);
          }
        },
      }
    );
  };

  return (
    <>
      <Popover
        placement="bottom"
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <PopoverTrigger>
          <Button
            isIconOnly
            color="warning"
            className="mx-1 text-white"
            size="sm"
          >
            <BiSolidEdit className="h-5 w-5"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={classNames(darkMode && "bg-primaryDark", "w-[240px] ")}
        >
          {(titleProps) => (
            <div className="px-1 py-2 w-full">
              <p
                className={classNames(
                  darkMode && "text-white",
                  "text-small font-bold text-foreground"
                )}
                {...titleProps}
              >
                Editar Nombre categoría
              </p>
              <div className="mt-2 flex flex-col gap-2 w-full">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    variant="bordered"
                    {...register("name")}
                    label="Nombre"
                    className={classNames(darkMode && "text-textDark ")}
                    placeholder="Introduce el nombre para la categoría"
                  />
                  <p className="text-xs text-red-500">{errors.name?.message}</p>
                  <div className="flex justify-end mt-5 space-x-5">
                    <Button
                      color="warning"
                      type="submit"
                      className="text-white mb-3"
                      endContent={<BiSolidEdit className="h-5 w-5" />}
                    >
                      Actualizar
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
};
