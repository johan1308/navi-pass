import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { HiPlusSm, HiX } from "react-icons/hi";
import { Button } from "@nextui-org/react";
import { useThemeMovilPay } from "../../../../../../hooks/useTheme";
import { classNames } from "../../../../../../helpers/ClassN";
import { FormAddPass } from "../FormAddPass";
import { useAllParams } from "../../../../../../hooks/useAllParams";

export const ButtonAddPassword = () => {
  const { darkMode } = useThemeMovilPay();
  const [open, setOpen] = useState(false);


  return (
    <>
      <Button
        color="primary"
        startContent={<HiPlusSm className="h-5 w-5" />}
        onClick={() => setOpen(true)}
      >
        CREAR
      </Button>
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
                  <Dialog.Panel className="pointer-events-auto w-screen lg:w-[700px] sm:max-w-md ">
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
                              Crear Contraseña
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
                              <HiX className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex-1 px-4 sm:px-6 divide-y-1 space-y-5">
                        <FormAddPass setOpen={setOpen}/>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
