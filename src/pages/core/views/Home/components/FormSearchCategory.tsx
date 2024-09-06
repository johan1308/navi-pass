import { Select, SelectItem } from "@nextui-org/react";
import { classNames } from "../../../../../helpers/ClassN";
import { useState } from "react";
import { useAllParams } from "../../../../../hooks/useAllParams";
import { TbSitemap } from "react-icons/tb";

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
        <span className="dark:text-titleDark font-semibold ">Sub categoría</span>
        <ul className="space-y-4 font-medium mt-5">
          <ItemsSearchCategory />
          <ItemsSearchCategory />
          <ItemsSearchCategory />
          <ItemsSearchCategory />
          <ItemsSearchCategory />
        </ul>
      </div>
    </>
  );
};

const ItemsSearchCategory = () => {
  const active = "bg-primary rounded-xl shadow-xl text-white";
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
      <button
        type="button"
        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        aria-controls="dropdown-example"
        data-collapse-toggle="dropdown-example"
        onClick={() => setIsOpen(!isOpen)}
      >
        <TbSitemap className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          E-commerce
        </span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <ul
        id="dropdown-example"
        className={classNames(!isOpen ? "hidden" : "", "py-2 space-y-2 animate-fade")}
      >
        <li className=" ">
          <button
            className={classNames(
              data == "data" ? active : "",
              "flex items-center w-full p-2 text-gray-900 transition duration-75 pl-11 group hover:bg-primary hover:text-white dark:text-white dark:hover:primary  rounded-xl"
            )}
            onClick={handleParams}
          >
            • Products
          </button>
        </li>
      </ul>
    </li>
  );
};
