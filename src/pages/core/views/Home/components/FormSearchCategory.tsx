import { Select, SelectItem } from "@nextui-org/react";
import { useQuery } from "react-query";
import { getCategoriesSetting } from "../../setting/apis/categoriesSettingApi";
import { useEffect, useState } from "react";
import { useHomeStore } from "../HomeCore";
import { SubCategoriesHome } from "./SubCategoriesHome";
import { useAllParams } from "../../../../../hooks/useAllParams";
import { MdChecklist } from "react-icons/md";

const paramsQuery = {
  remove_pagination: true,
};

export const FormSearchCategory = () => {
  const { setCategories, category } = useHomeStore();
  const {
    setSearchParams,
    params: { category_id },
  } = useAllParams();

  const [categoriesHome, setCategorieHome] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(undefined);
  useQuery(
    ["categories", paramsQuery],
    () => getCategoriesSetting(paramsQuery),
    {
      onSuccess: (items) => {
        console.log(items.data);
        
        setCategorieHome(items.data);
        setSelectedCategory(category_id)
        if (category_id) {
          setCategories(category_id);
        }
      },
      refetchOnWindowFocus: false,
      staleTime: 0, // Los datos siempre están "stale", forzando una nueva petición
      // cacheTime: 0, // Los datos no se almacenan en caché
    }
  );

  const handleCategorySelected = ({ target: { value } }: any) => {
    setSearchParams({ category_id: value });
    if (!value) {
      setSearchParams({});
    }
    const categoryID = categoriesHome.find((d: any) => d.id == value);
    setCategories(categoryID);
  };
  
  

  return (
    <>
      <div className="my-5">
        <Select
          label="Categoría"
          className="max-w-xs "
          placeholder="Selecciona la categoría"
          onChange={handleCategorySelected}
          selectedKeys={selectedCategory}
        >
          {categoriesHome.map((category: any) => (
            <SelectItem
              key={category.id}
              className="hover:bg-primary hover:text-white"
            >
              {category.name}
            </SelectItem>
          ))}
        </Select>
      </div>
      {category ? (
        <SubCategoriesHome category_id={Number(category_id)} />
      ) : (
        <NotCategory />
      )}
    </>
  );
};

export const NotCategory = () => {
  return (
    <div className="text-center mb-5 bg-white dark:bg-primaryDark rounded-xl shadow-xl p-5">
      <MdChecklist className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-titleDark">
        Sin categoría
      </h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-textDark">
        Para empezar tienes que seleccionar una categoría
      </p>
      <div className="mt-6"></div>
    </div>
  );
};
