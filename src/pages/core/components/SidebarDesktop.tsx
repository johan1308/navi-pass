import { Accordion, AccordionItem } from "@nextui-org/react";
import { navigation } from "../data/menu";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useUserMovilPay } from "../../../hooks/useUserMovilPay";
import { FaUserCircle } from "react-icons/fa";


export const SidebarDesktop = ({
  setExpand,
}: {
  setExpand: (e: any) => void;
}) => {
  const { name, lastname, identification } = useUserMovilPay();
  const username = `${name} ${lastname}`;
  const company = `J${identification}`;
  

  const [isExpand, setIsExpand] = useState(true);
  const handleOpened = (status: any) => {
    setIsExpand(status);
    setExpand(status);
  };

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-1 mt-[4.1rem] lg:flex lg:w-72 lg:flex-col ">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto  px-6 pb-4">
        <nav
          role="navigation"
          className={[
            "dark:bg-transparent  dark:border-r-transparent bg-transparent   shadow-md absolute inset-y-0 left-0 mt-14",
            "transition-all duration-300 ease-in-out md:fixed",
            `${isExpand ? "w-60" : "w-20"}`,
          ].join(" ")}
        >
          <button
            className="absolute z-50 top-16 -right-6 bg-white dark:bg-primaryDark  hover:bg-slate-100 text-primary p-0.5 rounded-full "
            onClick={() => {
              handleOpened(!isExpand);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${
                isExpand ? "rotate-0" : "rotate-180"
              } transform transition duration-500 h-7 w-7`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className={`relative h-screen overflow-hidden`}>
            <div className="mb-0 list-none text-slate-500">
              <div
                className={`my-8 flex flex-col items-center overflow-x-hidden duration-300 ${
                  isExpand ? "px-3" : "px-5"
                }`}
              >
                <div
                  className={`flex items-center rounded-lg w-full h-20 duration-300 ${
                    isExpand
                      ? "bg-gray-400/25 dark:bg-primaryDark px-4 gap-3"
                      : ""
                  }`}
                >
                  <div
                    className={`rounded-full overflow-hidden duration-300 h-10 w-10 shrink-0`}
                  >
                    <FaUserCircle className="h-10 w-10 text-gray-600"/> 
                  </div>
                  <div
                    className={`flex flex-col ${
                      isExpand ? "" : "w-0 h-0 opacity-0"
                    }`}
                  >
                    <div
                      className={`text-base font-semibold text-slate-700 dark:text-white truncate duration-300`}
                    >
                      {username}
                    </div>
                    <div
                      className={`text-sm text-slate-500 truncate dark:text-white`}
                    >
                      {company}
                    </div>
                    
                  </div>
                </div>
              </div>
              

              <div className="mt-3 mb-10 p-0 leading-10">
                <ul className="list-none text-sm font-normal px-3">
                  <li>
                    <ul role="list" className="-mx-2 space-y-4">
                      {navigation.map(
                        (item) =>
                          item.show && (
                            <li key={item.name}>
                              {!item.children ? (
                                <NavLink
                                  to={item.path}
                                  className={({ isActive }) => {
                                    const res = isActive
                                      ? "bg-secondary text-white shadow-lg"
                                      : "text-black hover:text-white hover:bg-secondary dark:text-white";
                                    return `${res} group flex ${
                                      !isExpand &&
                                      "justify-center animate-jump-in"
                                    } gap-x-3 rounded-md p-2 text-base leading-6 font-semibold duration-200`;
                                  }}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  <span className={!isExpand ? "hidden" : ""}>
                                    {item.name}
                                  </span>
                                </NavLink>
                              ) : (
                                <ComponentChildren
                                  item={item}
                                  isExpand={isExpand}
                                />
                              )}
                            </li>
                          )
                      )}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

const ComponentChildren = ({ item, isExpand }: any) => {
  return (
    <>
      {isExpand ? (
        <Accordion
          selectionMode="multiple"
          
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                height: "auto",
                transition: {
                  height: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 1,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 1,
                  },
                },
              },
              exit: {
                y: -10,
                opacity: 0,
                height: 0,
                transition: {
                  height: {
                    easings: "ease",
                    duration: 0.25,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 0.3,
                  },
                },
              },
            },
          }}
          itemClasses={{
            content: "m-0 px-2",
          }}
          isCompact
        >
          <AccordionItem
            key={item.path}
            aria-label="Accordion 1"
            startContent={
              <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
            }
            title={
              <p
                className={`text-dark  dark:text-white group flex gap-x-3 rounded-md  text-base leading-6 font-semibold`}
              >
                {item.name}
              </p>
            }
          >
            <div className="ml-1">
              {item.children.map(
                (resp: any) =>
                  resp.show && (
                    <NavLink
                      to={resp.path}
                      key={resp.path}
                      className={({ isActive }) => {
                        const res = isActive
                          ? "bg-secondary text-white shadow-lg"
                          : "text-dark hover:text-white hover:bg-secondary dark:text-white";
                        return `${res} group flex gap-x-1 rounded-md p-2 text-base leading-6 font-semibold`;
                      }}
                    >
                      <resp.icon
                        className="h-6 w-6 shrink-0"
                        aria-hidden="true"
                      />
                      {resp.name}
                    </NavLink>
                  )
              )}
            </div>
          </AccordionItem>
        </Accordion>
      ) : (
        <NavLink
          to={item.path}
          key={item.name}
          className={({ isActive }) => {
            const res = isActive
              ? "bg-secondary text-white shadow-lg"
              : "text-dark hover:text-white hover:bg-secondary dark:text-white";
            return `${res} group flex ${
              !isExpand && "justify-center animate-jump-in"
            } gap-x-3 rounded-md p-2 text-base leading-6 font-semibold duration-200`;
          }}
        >
          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        </NavLink>
      )}
    </>
  );
};
