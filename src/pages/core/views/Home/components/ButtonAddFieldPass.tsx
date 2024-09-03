import { BiPlus } from "react-icons/bi";
import {
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getID } from "../../../../../libs/GetIDLibs";
import { dataInput } from "./FormAddPass";

interface Props {
  send: (e: dataInput) => void;
}

const schema = yup
  .object({
    title: yup.string().required("Debes introducir el titulo"),
  })
  .required();

export const ButtonAddFieldPass = ({ send }: Props) => {
  const {
    control,
    formState: { errors, isValid },
    getValues,
    reset
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
      value:''
    });
    setIsOpen(false)
    reset()
  };

  return (
    <>
      <Popover placement="top" backdrop="opaque" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger>
          <button
            type="button"
            className="group flex w-full items-center justify-between space-x-3 rounded-lg border-2 border-gray-300  border-dashed p-2 text-left shadow-sm hover:bg-gray-50 "
          >
            <span className="flex min-w-0 flex-1 items-center space-x-3">
              <span className="block flex-shrink-0"></span>
              <span className="block min-w-0 flex-1">
                <p className="block truncate  font-light text-gray-500">
                  Agregar campo
                </p>
              </span>
            </span>
            <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center">
              <BiPlus
                aria-hidden="true"
                className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
              />
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px]">
          {(titleProps) => (
            <div className="px-1 py-2 w-full">
              <p className="text-small font-bold text-foreground">Titulo</p>
              <div className="mt-2 flex flex-col gap-2 w-full">
                <Controller
                  control={control}
                  name="title"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Input
                        size="md"
                        variant="bordered"
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
