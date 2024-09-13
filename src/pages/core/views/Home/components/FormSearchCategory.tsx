import { useQuery } from "react-query";
import { getCategoriesSetting } from "../../setting/apis/categoriesSettingApi";
import { useState } from "react";
import { SubCategoriesHome } from "./SubCategoriesHome";
import { useAllParams } from "../../../../../hooks/useAllParams";
import { MdChecklist } from "react-icons/md";
import { Loading } from "../../../../../components/Loading";

const paramsQuery = {
  remove_pagination: true,
};

export const FormSearchCategory = () => {
  const {
    setSearchParams,
    params: { category_id },
  } = useAllParams();

  const [categoriesHome, setCategorieHome] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(undefined);
  const { isLoading, isFetching } = useQuery(
    ["categories", paramsQuery],
    () => getCategoriesSetting(paramsQuery),
    {
      onSuccess: (items) => {
        setCategorieHome(items.data);
        setSelectedCategory(category_id);
      },
      refetchOnWindowFocus: false,
      staleTime: 0, // Los datos siempre están "stale", forzando una nueva petición
      // cacheTime: 0, // Los datos no se almacenan en caché
    }
  );

  const handleCategorySelected = ({ target: { value } }: any) => {

    
    if (!Number(value)) {
      setSelectedCategory(undefined);
      return setSearchParams({});
    }
    setSelectedCategory(value);
    setSearchParams({ category_id: value });
    // const categoryID = categoriesHome.find((d: any) => d.id == value);
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center ">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="my-5">
        <label
          htmlFor="location"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
        >
          Categoría
        </label>
        <select
          id="location"
          name="location"
          defaultValue={category_id}
          onChange={handleCategorySelected}
          className="mt-2 block w-full rounded-lg shadow-md border-0 py-3 pl-3 pr-10 dark:bg-primaryDark dark:text-white text-gray-900 ring-1 ring-inset  dark:ring-primaryDark ring-gray-300 focus:ring-1 focus:ring-primary sm:text-sm sm:leading-6"
        >
          <option value={0}>Selecciona una categoría</option>
          {categoriesHome.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {selectedCategory ? (
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
