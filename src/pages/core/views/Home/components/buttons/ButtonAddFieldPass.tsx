import { BiPlus } from "react-icons/bi";
import {
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getID } from "../../../../../../libs/GetIDLibs";
import { dataInput } from "../FormAddPass";
import { useThemeMovilPay } from "../../../../../../hooks/useTheme";
import { classNames } from "../../../../../../helpers/ClassN";

interface Props {
  send: (e: dataInput) => void;
}

const schema = yup
  .object({
    title: yup.string().required("Debes introducir el titulo"),
    value: yup.string().required("Debes introducir el titulo"),
  })
  .required();

export const ButtonAddFieldPass = ({ send }: Props) => {
  const {darkMode} =useThemeMovilPay()
  const {
    control,
    formState: { errors, isValid },
    getValues,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const [isOpen, setIsOpen] = useState(false);

  // controlar el ESC para que no se cierre todo
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        event.preventDefault();
        return false;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onSubmit = (data: any) => {
    const id = getID();
    send({
      ...data,
      id,
    });
    setIsOpen(false);
    reset();
  };

  return (
    <>
      <Popover
        placement="top"
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <PopoverTrigger>
          
          <button
            type="button"
            className={classNames(darkMode?'bg-primaryDark':'bg-white',"group -ml-1 flex items-center rounded-md  p-1 focus:outline-none focus:ring-2 ")} 
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
              <BiPlus aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className={classNames(darkMode?'text-titleDark':'text-primary group-hover:text-primary',"ml-4 text-sm font-medium ")}>
              Agregar Información
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px]">
          {(titleProps) => (
            <div className="px-1 py-2 w-full">
              <p className={classNames(darkMode?'text-titleDark':'',"text-small font-bold text-foreground")}>
                Agregar valor
              </p>
              <div className="mt-2 flex flex-col gap-2 w-full">
                <Controller
                  control={control}
                  name="title"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Input
                        size="md"
                        variant="bordered"
                        label="Titulo"
                        placeholder="Introduce un titulo"
                        onChange={onChange}
                        onBlur={onBlur}
                        isInvalid={!!errors.title}
                        errorMessage={errors.title?.message}
                        value={value}
                      />
                    </>
                  )}
                />
                <Controller
                  control={control}
                  name="value"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Textarea
                        size="md"
                        variant="bordered"
                        label="Valor"
                        placeholder="Introduce un titulo"
                        onChange={onChange}
                        onBlur={onBlur}
                        isInvalid={!!errors.title}
                        errorMessage={errors.title?.message}
                        value={value}
                      />
                    </>
                  )}
                />
              </div>
              <Button
                type="button"
                color="secondary"
                className="w-full my-3"
                size="sm"
                disabled={!isValid}
                onClick={() => onSubmit(getValues())}
              >
                Agregar
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
};
