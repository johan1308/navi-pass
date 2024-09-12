import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useThemeMovilPay } from "../../../hooks/useTheme";
import { CheckChangeTheme } from "./CheckChangeTheme";
import { Img } from "react-image";
import { LuLogOut } from "react-icons/lu";
import { configLogout } from "../../../utils/configLogout";

export const NavbarCore = ({
  children,
}: {
  children: React.ReactNode;
  path?: React.ReactNode;
}) => {
  const { darkMode } = useThemeMovilPay();
  const img = darkMode ? "logo-white" : "gonavi";

  const handleLogout = () => {
    configLogout();
  };

  return (
    <Navbar
      maxWidth="full"
      className={`${
        darkMode
          ? "bg-transparent border-b-2 border-primaryDark"
          : "border-b-2 border-gray-300"
      } shadow-md `}
      style={{ zIndex: 10 }}
    >
      <NavbarBrand>
        <a href="/credentials/" className="mt-3 hidden sm:flex ">
          <Img
            src={require(`../../../assets/img/${img}.png`)}
            className="h-10 w-38 mb-2 ml-3"
          />
        </a>
        <div className="flex lg:ml-36">{children}</div>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="">
          <CheckChangeTheme />
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            color="danger"
            size="sm"
            variant="ghost"
            onPress={handleLogout}
          >
            Salir <LuLogOut className="h-4 w-4" />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
