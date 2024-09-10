import { Button, Tooltip } from "@nextui-org/react";
import { FaInfo } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { useThemeMovilPay } from "../../../../../../hooks/useTheme";
import { Fragment, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { classNames } from "../../../../../../helpers/ClassN";
import { HiX } from "react-icons/hi";
import { useQuery } from "react-query";
import { getCredentialsID } from "../../api/HomeAPi";
import { Loading } from "../../../../../../components/Loading";

interface Props {
  id: number;
}

export const ButtonInfoPassword = ({ id }: Props) => {
  const navigation = useNavigate();
  const handleNavigate = () => {
    const url = `${id}/update/`;
    navigation(url);
  };

  const { darkMode } = useThemeMovilPay();
  const [open, setOpen] = useState(false);
  const { isLoading } = useQuery(
    ["credential", id],
    () => getCredentialsID(id),
    {
      enabled: open,
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );
  return (
    <>
      <Tooltip content="Ver información">
        <Button
          isIconOnly
          size="sm"
          onClick={() => setOpen(true)}
          className="dark:bg-transparent "
        >
          <FaInfo className="text-primary dark:text-white h-4 w-4  rounded-full " />
        </Button>
      </Tooltip>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
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
                  enter="transform transition ease-in-out duration-300 sm:duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300 sm:duration-300"
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
                              Información de contraseña
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
                      {isLoading ? (
                        <Loading />
                      ) : (
                        <>
                          {/* información principal */}
                          <div className="relative  px-4 sm:px-6  space-y-1 mt-5">
                            <div>
                              <div className="px-4 sm:px-0">
                                <h3
                                  className={classNames(
                                    darkMode
                                      ? "text-titleDark"
                                      : "text-gray-900",
                                    "text-lg font-semibold leading-7 "
                                  )}
                                >
                                  Información principal
                                </h3>
                              </div>
                              <div className="border-t border-gray-100">
                                <dl className="py-2 space-y-5">
                                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt
                                      className={classNames(
                                        darkMode
                                          ? "text-titleDark"
                                          : "text-gray-900",
                                        "text-sm font-medium leading-6 "
                                      )}
                                    >
                                      Usuario
                                    </dt>
                                    <dd
                                      className={classNames(
                                        darkMode
                                          ? "text-textDark"
                                          : "text-gray-700",
                                        "mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0"
                                      )}
                                    >
                                      Margot Foster
                                    </dd>
                                  </div>
                                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt
                                      className={classNames(
                                        darkMode
                                          ? "text-titleDark"
                                          : "text-gray-900",
                                        "text-sm font-medium leading-6 "
                                      )}
                                    >
                                      Contraseña
                                    </dt>
                                    <dd
                                      className={classNames(
                                        darkMode
                                          ? "text-textDark"
                                          : "text-gray-700",
                                        "mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0"
                                      )}
                                    >
                                      Backend Developer
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            </div>
                          </div>
                          {/* Descripción */}
                          <div className="relative  px-4 sm:px-6  space-y-1 mt-5">
                            <div>
                              <div className="px-4 sm:px-0 ">
                                <h3
                                  className={classNames(
                                    darkMode
                                      ? "text-titleDark"
                                      : "text-gray-900",
                                    "text-lg font-semibold leading-7 "
                                  )}
                                >
                                  Descripción
                                </h3>
                              </div>
                              <div
                                className={classNames(
                                  darkMode ? "text-textDark" : "text-gray-700",
                                  "border-t border-gray-100 py-3"
                                )}
                              >
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Dignissimos eveniet nesciunt
                                blanditiis similique earum temporibus aspernatur
                                quibusdam, voluptas, molestiae at et quasi
                                rerum, nostrum tenetur quos eaque ipsam
                                laboriosam iste!
                              </div>
                            </div>
                          </div>
                          {/* información adicional */}
                          <div className="relative  px-4 sm:px-6  space-y-1 mt-5">
                            <div>
                              <div className="px-4 sm:px-0">
                                <h3
                                  className={classNames(
                                    darkMode
                                      ? "text-titleDark"
                                      : "text-gray-900",
                                    "text-lg font-semibold leading-7 "
                                  )}
                                >
                                  Información adicional
                                </h3>
                              </div>
                              <div className="border-t border-gray-100">
                                <dl className="py-2">
                                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt
                                      className={classNames(
                                        darkMode
                                          ? "text-titleDark"
                                          : "text-gray-900",
                                        "text-sm font-medium leading-6 "
                                      )}
                                    >
                                      Usuario
                                    </dt>
                                    <dd
                                      className={classNames(
                                        darkMode
                                          ? "text-textDark"
                                          : "text-gray-700",
                                        "mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0"
                                      )}
                                    >
                                      Margot Foster
                                    </dd>
                                  </div>
                                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt
                                      className={classNames(
                                        darkMode
                                          ? "text-titleDark"
                                          : "text-gray-900",
                                        "text-sm font-medium leading-6 "
                                      )}
                                    >
                                      Usuario
                                    </dt>
                                    <dd
                                      className={classNames(
                                        darkMode
                                          ? "text-textDark"
                                          : "text-gray-700",
                                        "mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0"
                                      )}
                                    >
                                      Margot Foster
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end px-4 mt-1">
                            <Button
                              color="warning"
                              className="text-white"
                              onClick={handleNavigate}
                            >
                              Editar
                            </Button>
                          </div>
                        </>
                      )}
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
