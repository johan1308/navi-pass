import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useAllParams } from "../../../hooks/useAllParams";
import { Controller, useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiX } from "react-icons/hi";
import { classNames } from "../../../helpers/ClassN";
import { useThemeMovilPay } from "../../../hooks/useTheme";
import { FaFilter } from "react-icons/fa";

interface ItemFilter {
  name: string;
  icon?: any;
  component: React.ReactNode;
  field: string;
}

interface Props {
  filters?: ItemFilter[];
  children: React.ReactNode;
  search?: (data: string) => void;
  bottons?: React.ReactNode;
  title?: string;
}

export const TemplateTableLayout = ({
  filters,
  children,
  search,
  bottons,

  title,
}: Props) => {
  const { params } = useAllParams();
  const { darkMode } = useThemeMovilPay();
  const [open, setOpen] = useState(false);
  const expandKeys = Object.keys(params);
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      search: params.search,
    },
  });

  const onSubmit = (data: any) => {
    if (search) {
      search(data);
    }
  };

  return (
    <>
      <div className=" ">
        <div className="p-4 border-b-1 dark:border-gray-800">{bottons}</div>
        <div className="col-span-full   p-4 h-full ">
          <div className="lg:flex lg:justify-between lg:items-center">
            <p className="font-semibold text-xl  mb-5 lg:mb-0 dark:text-white">
              {title}
            </p>
          </div>

          <div className="lg:flex lg:justify-between col-span-full mr-3 space-x-3 items-center">
            {search && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:w-[40%] flex items-center"
              >
                <Controller
                  name="search"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      type="text"
                      placeholder="Introduce para buscar"
                      className={`my-4 ${darkMode && "text-white"}`}
                      variant="faded"
                      color="primary"
                      size="lg"
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      endContent={
                        <button className="focus:outline-none" type="submit">
                          <BiSearch className="text-2xl text-default-400 pointer-events-none " />
                        </button>
                      }
                    />
                  )}
                />
                {/* <Button
                  isIconOnly
                  color="default"
                  aria-label="Like"
                  type="button"
                  className="ml-5"
                  onClick={() => setOpen(true)}
                >
                  <FaFilter className="h-6 w-6 text-white" />
                </Button> */}
              </form>
            )}

            <Transition.Root show={open} as={Fragment}>
              <Dialog as="div" className="relative z-10 " onClose={setOpen}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-400"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-400"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden ">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 ">
                      <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-400 sm:duration-400"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-400 sm:duration-400"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                      >
                        <Dialog.Panel className="pointer-events-auto w-screen max-w-md ">
                          <div
                            className={classNames(
                              darkMode ? "bg-primaryDark" : "bg-white",
                              "flex h-full flex-col overflow-y-scroll py-6 shadow-md "
                            )}
                          >
                            <div className="px-4 sm:px-6 py-2">
                              <div className="flex items-start justify-between ">
                                <Dialog.Title
                                  className={classNames(
                                    darkMode ? "text-white" : "text-gray-900",
                                    "text-base font-semibold leading-6  "
                                  )}
                                >
                                  <p className="flex items-center font-semibold text-xl mb-2 dark:text-white">
                                    Filtros
                                    <FaFilter className="h-5 w-5 ml-2" />
                                  </p>
                                </Dialog.Title>
                                <div className="ml-3 flex h-7 items-center">
                                  <button
                                    type="button"
                                    className={`relative rounded-md ${
                                      darkMode ? "bg-primaryDark" : "bg-white"
                                    }  text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                                    onClick={() => setOpen(false)}
                                  >
                                    <span className="absolute -inset-2.5" />
                                    <span className="sr-only">Close panel</span>
                                    <HiX
                                      className="h-6 w-6"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="relative flex-1 px-4 sm:px-6 divide-y-1 space-y-5">
                              {filters && (
                                <>
                                  {filters.map((filter) => (
                                    <div key={filter.name}>
                                      <p
                                        className={`py-2 ${
                                          darkMode && "text-neutral-500"
                                        }`}
                                      >
                                        {filter.name}
                                      </p>
                                      {filter.component}
                                    </div>
                                  ))}
                                </>
                              )}
                            </div>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          </div>
          <div className=" mt-2 p-3 bg-white dark:bg-primaryDark rounded-xl shadow-md">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
