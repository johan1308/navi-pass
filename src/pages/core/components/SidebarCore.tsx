import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { IoIosClose, IoIosMenu } from "react-icons/io";
import { NavbarCore } from "./NavbarCore";
import { SidebarDesktop } from "./SidebarDesktop";
import { SidebarMobile } from "./SidebarMobile";
import { useThemeMovilPay } from "../../../hooks/useTheme";


export const SidebarCore = ({
  children,
  
}: {
  children: React.ReactNode;
  path?: React.ReactNode;
}) => {
  const { darkMode } = useThemeMovilPay();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpandOnHover, setIsExpandOnHover] = useState(true);


  useEffect(() => {
    document.documentElement.style.backgroundColor = darkMode
      ? "#0a0a0a"
      : "#eeeeee";
  }, [darkMode]);

  return (
    <>
      <NavbarCore>
        <button
          type="button"
          className=" text-gray-700 dark:text-white lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <IoIosMenu className="h-7 w-7" aria-hidden="true" />
        </button>
      </NavbarCore>
      <div className={`${darkMode && "dark"}`}>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <IoIosClose
                          className="h-12 w-12 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <SidebarMobile />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Sidebar para escritorio*/}
        <SidebarDesktop setExpand={setIsExpandOnHover}/>

        <div className={`${isExpandOnHover?'lg:pl-64':'lg:pl-20'}  transition-all duration-300 ease-in-out `}>
          <main className="py-4">
            <div className="px-6 sm:px-6 lg:px-8 ">
              
              {children}
            </div>
        
          </main>
        </div>
      </div>
    </>
  );
};
