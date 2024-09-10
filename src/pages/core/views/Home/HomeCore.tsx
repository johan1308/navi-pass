import { TemplateTableLayout } from "../../layout/TemplateTableLayout";

import { Button } from "@nextui-org/react";
import { FiRefreshCw } from "react-icons/fi";
import { ButtonAddPassword } from "./components/buttons/ButtonAddPassword";
import { TablePassword } from "./components/tables/TablePassword";
import { FormSearchCategory } from "./components/FormSearchCategory";
import { useAllParams } from "../../../../hooks/useAllParams";
import { CiViewList } from "react-icons/ci";
import { create } from "zustand";

export const useHomeStore = create<any>((set:any) => ({
  category: false,
  subcategory: false,
  setCategories: (payload: any) => set({ category: payload }),
  setSubCategories: (payload: any) => set({ category: payload }),
}));

const HomeCore = () => {
  const {
    params: { sub_category },
  } = useAllParams();

  const handleSearch = (e: any) => {
    console.log(e);
  };

  return (
    <div className="grid lg:grid-cols-5  sm:grid-cols-1 gap-4 divide-x-2 divide-gray-200 dark:divide-secondaryDark">
      <div className="lg:col-span-1 sm:col-span-full">
        <FormSearchCategory />
      </div>
      <div className="lg:col-span-4 sm:col-span-full">
        {sub_category ? (
          <TemplateTableLayout
            title="Información de las contraseñas"
            bottons={
              <div className="space-x-4 flex items-center">
                <ButtonAddPassword />
                <Button isIconOnly color="secondary" aria-label="Like">
                  <FiRefreshCw className="h-4 w-4" />
                </Button>
              </div>
            }
            search={handleSearch}
          >
            <>
              <TablePassword />
            </>
          </TemplateTableLayout>
        ) : (
          <NotSelectedCategory />
        )}
      </div>
    </div>
  );
};

function NotSelectedCategory() {
  return (
    <div className="text-center mt-40 animate-fade">
      <CiViewList className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-titleDark">
        No hay resultado
      </h3>
      <p className="mt-1 text-lg text-gray-500">
        Debes seleccionar una Sub categoría
      </p>
    </div>
  );
}

export default HomeCore;
