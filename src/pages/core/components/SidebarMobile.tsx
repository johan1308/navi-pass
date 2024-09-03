import { Img } from "react-image";
import { navigation } from "../data/menu";
import { NavLink } from "react-router-dom";
import { useThemeMovilPay } from "../../../hooks/useTheme";
import { Accordion, AccordionItem } from "@nextui-org/react";

export const SidebarMobile = () => {
  const { darkMode } = useThemeMovilPay();
  return (
    <div
      className={`flex grow flex-col gap-y-5 overflow-y-auto ${
        darkMode ? "bg-primaryDark" : "bg-secondary"
      } border-r-3 border-primary px-6 pb-4 ring-1 ring-white/10`}
    >
      <div className="flex h-16 shrink-0 items-center justify-center mt-10 mb-6">
        <Img
          src={require("../../../assets/img/logo-white.png")}
          className="h-26 w-48"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  {!item.children ? (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => {
                        const res = isActive
                          ? "bg-white text-secondary shadow-lg"
                          : "text-white hover:text-white hover:bg-secondary dark:text-white";
                        return `${res} group flex gap-x-3 rounded-md p-2 text-base leading-6 font-semibold`;
                      }}
                    >
                      <item.icon
                        className="h-6 w-6 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </NavLink>
                  ) : (
                    <ComponentChildren item={item} />
                  )}
                </li>
              ))}
            </ul>
          </li>
          {/* <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                          >
                            <HiMiniBanknotes
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            Settings
                          </a>
                        </li> */}
        </ul>
      </nav>
    </div>
  );
};

const ComponentChildren = ({ item }: any) => {
  return (
    <>
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
            <p className="text-white  dark:text-white group flex gap-x-3 rounded-md p-2 text-base leading-6 font-semibold">
              {item.name}
            </p>
          }
        >
          <div className="ml-1">
            {item.children.map((resp: any) => (
              <NavLink
                to={resp.path}
                key={resp.path}
                className={({ isActive }) => {
                  const res = isActive
                    ? "bg-white text-secondary shadow-lg"
                    : "text-white hover:text-white hover:bg-secondary dark:text-white";
                  return `${res} group flex gap-x-1 rounded-md p-2 text-base leading-6 font-semibold`;
                }}
              >
                <resp.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                {resp.name}
              </NavLink>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
};
