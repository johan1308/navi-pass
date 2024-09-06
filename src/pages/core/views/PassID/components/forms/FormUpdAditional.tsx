import { Button } from "@nextui-org/react";
import { ButtonAddPassUpd } from "../buttons/ButtonAddPassUpd";
import { BiPencil, BiTrash } from "react-icons/bi";

export const FormUpdAditional = () => {
  return (
    <div className="bg-white dark:bg-primaryDark rounded-xl shadow-xl p-5  col-span-2">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900 dark:text-titleDark">
          Información Adicional
        </h3>
      </div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-lg font-medium leading-6 text-gray-900 dark:text-titleDark">
              About
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-textDark sm:mt-2 flex justify-between">
              <div>
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
              </div>
              <div className="ml-10 flex space-x-2">
                <Button isIconOnly className="rounded-xl text-warning">
                    <BiPencil className="h-6 w-6"/>
                </Button>
                <Button isIconOnly className="rounded-xl text-danger">
                    <BiTrash className="h-6 w-6"/>
                </Button>
              </div>
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-titleDark">

            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-textDark sm:mt-2 flex justify-between">
                <div>Agregar nueva información</div>
                <div>
                    <ButtonAddPassUpd send={(e)=>console.log(e)}/>
                </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
