import { useEffect, useState } from "react";
import { useAllParams } from "../../../../../hooks/useAllParams";
import { TbSitemap } from "react-icons/tb";
import { Button, Tooltip } from "@nextui-org/react";
import { BiPlus } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { useHomeStore } from "../HomeCore";
import { useQuery } from "react-query";
import { getSubCategories } from "../api/HomeAPi";
import { Loading } from "../../../../../components/Loading";
import { ButtonAddSubCategory } from "./buttons/ButtonAddSubCategory";
import { ButtonDeleteSubCategory } from "./buttons/ButtonDeleteSubCategory";
import { classNames } from "../../../../../helpers/ClassN";
import { configTaiwind } from "../../../../../utils/configTaiwind";
import { queryClient } from "../../../../../App";

export const SubCategoriesHome = ({ category_id }: { category_id: number }) => {
  const [subCategories, setSubcategories] = useState([]);
  const queryParams = { category_id, remove_pagination: true };

  const { isLoading,isSuccess } = useQuery(
    ["sub_categories", category_id],
    () => getSubCategories(queryParams),
    {
      enabled: !!queryParams, // Asegúrate de que la consulta solo se ejecute si `category.id` existe
      onSuccess: ({ data }) => {
        console.log(data);
        
        setSubcategories(data.data);
      },
      refetchOnWindowFocus: false, // Puedes ajustarlo a true si quieres que se vuelva a hacer la petición al cambiar de ventana
    }
  );
  // useEffect(() => {
  //   queryClient.invalidateQueries(["sub_categories", category_id]);
  // }, [category_id]);

  return (
    <div className="py-2 bg-white dark:bg-primaryDark shadow-md rounded-xl p-2">
      <div className="flex justify-between">
        <span className="dark:text-titleDark font-semibold ">
          Sub categoría
        </span>
        <ButtonAddSubCategory category_id={category_id} />
      </div>
      <ul
        className={classNames(
          configTaiwind.scroll,
          configTaiwind.animateViewFade,
          "space-y-4 font-medium mt-5 max-h-[500px] overflow-y-scroll"
        )}
      >
        {isLoading ? (
          <Loading />
        ) : subCategories.length == 0 ? (
          <NotSubCategory />
        ) : (
          isSuccess&&
          subCategories.map((d: any) => (
            <ItemsSearchCategory key={d.id} id={d.id} name={d.name} />
          ))
        )}
      </ul>
    </div>
  );
};

const ItemsSearchCategory = ({ id, name }: { id: number; name: string }) => {
  const {
    params: { data },
    addParams,
  } = useAllParams();

  const handleParams = () => {
    addParams({
      sub_category: id,
    });
  };

  return (
    <li>
      <div className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg dark:text-white">
        <TbSitemap className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          {name}
        </span>
        <div className="flex items-center space-x-3">
          <ButtonDeleteSubCategory sub_category_id={id} />
          <Tooltip content="Mostrar credenciales">
            <button
              onClick={handleParams}
              className="group hover:text-gray-600 text-secondary dark:text-titleDark"
            >
              <FaEye className="h-5 w-5" />
            </button>
          </Tooltip>
        </div>
      </div>
    </li>
  );
};

const NotSubCategory = () => {
  return (
    <div className="text-center mb-5">
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="mx-auto h-12 w-12 text-gray-400"
      >
        <path
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-titleDark">
        Sin sub-categoría
      </h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-textDark">
        Para empezar tendrás que crear una sub-categoría
      </p>
      <div className="mt-6">
        {/* <Tooltip content="Crear Sub-categoría">
          <Button color="primary" endContent={<BiPlus className="h-5 w-5" />}>
            Crear
          </Button>
        </Tooltip> */}
      </div>
    </div>
  );
};
