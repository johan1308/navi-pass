import { Button, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { ButtonAddFieldPass } from "./buttons/ButtonAddFieldPass";
import { BiPlus, BiTrash } from "react-icons/bi";
import { classNames } from "../../../../../helpers/ClassN";
import { useThemeMovilPay } from "../../../../../hooks/useTheme";

export interface dataInput {
  title: string;
  id: string;
  value: string;
}

export const FormAddPass = () => {
  const { darkMode } = useThemeMovilPay();
  const [inputList, setInputList] = useState<dataInput[]>([]);

  const onSubmit = (data: any) => {
    console.log(inputList);
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
      <form className="space-y-5">
        {/* Agregar Campo */}
        <Input
          type="text"
          label={
            <span className={darkMode ? "text-titleDark" : ""}>Usuario</span>
          }
          placeholder="Introduce tu usuario"
          variant="bordered"
          color="secondary"
          className={classNames(darkMode && "text-textDark", "w-full")}
        />
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
        />
        <Textarea
          type="text"
          label={<span className={darkMode?'text-titleDark':''}>Descripción</span>}
          placeholder="Introduce la descripción"
          variant="bordered"
          color="secondary"
          className={classNames(darkMode && "text-textDark", "w-full")}
        />

        <div className="">
          <h3 className={classNames(darkMode?"text-titleDark":"text-gray-900","font-medium ")}>Información Adicional</h3>
          <ul
            role="list"
            className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200"
          >
            {inputList.map((d) => (
              <li className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <div>
                    <dt className={classNames(darkMode?'text-titleDark':'text-gray-500'," font-medium  sm:w-40 sm:flex-shrink-0")}>
                      {d.title}
                    </dt>
                    <dd className={classNames(darkMode?'text-textDark':'text-gray-900',"mt-1 text-sm  sm:col-span-2")}>
                      <p>{d.value}</p>
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
          type="button"
          onClick={onSubmit}
          className="w-full mt-14 rounded-xl"
        >
          Guardar
        </Button>
      </form>
    </div>
  );
};
