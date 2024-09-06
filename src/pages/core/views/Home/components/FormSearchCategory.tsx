import { Button, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { useAllParams } from "../../../../../hooks/useAllParams";
import { TbSitemap } from "react-icons/tb";
import { BiPlus, BiTrash } from "react-icons/bi";
import { FaEye } from "react-icons/fa";


export const animals = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
  { key: "tiger", label: "Tiger" },
  { key: "giraffe", label: "Giraffe" },
  { key: "dolphin", label: "Dolphin" },
  { key: "penguin", label: "Penguin" },
  { key: "zebra", label: "Zebra" },
  { key: "shark", label: "Shark" },
  { key: "whale", label: "Whale" },
  { key: "otter", label: "Otter" },
  { key: "crocodile", label: "Crocodile" },
];

export const FormSearchCategory = () => {
  return (
    <>
      <div className="my-5">
        <Select
          label="Categoría"
          className="max-w-xs"
          placeholder="Selecciona la categoría"
        >
          {animals.map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="py-2 bg-white dark:bg-primaryDark shadow-md rounded-xl p-2">
        <span className="dark:text-titleDark font-semibold ">
          Sub categoría
        </span>
        <ul className="space-y-4 font-medium mt-5">
          {/* <NotSubCategory /> */}
          <ItemsSearchCategory />
        </ul>
      </div>
    </>
  );
};

const ItemsSearchCategory = () => {
  const {
    params: { data },
    addParams,
  } = useAllParams();

  const handleParams = () => {
    addParams({
      data: "data",
    });
  };
  return (
    <li>
      <div className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg dark:text-white">
        <TbSitemap className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          E-commerce
        </span>
        <div className="flex items-center space-x-3">
          <Tooltip content="Eliminar sub-categoría">
            <button
              onClick={() => alert("crear sub-categoría")}
              className="group hover:text-primary text-danger"
            >
              <BiTrash className="h-5 w-5" />
            </button>
          </Tooltip>
          <Tooltip content="Mostrar credenciales">
            <button
              onClick={() => handleParams()}
              className="group hover:text-gray-600 text-secondary dark:text-titleDark"
            >
              <FaEye  className="h-5 w-5" />
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
        <Tooltip content="Crear Sub-categoría">
          <Button color="primary" endContent={<BiPlus className="h-5 w-5" />}>
            Crear
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
