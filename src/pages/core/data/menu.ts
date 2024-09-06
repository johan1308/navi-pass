import { FcLock, FcSettings, FcTodoList } from "react-icons/fc";

export const navigation = [
  {
    name: "Contraseñas",
    path: "password",
    icon: FcLock,
    show: true,
    children: false,
  },
  {
    name: "Configuración",
    path: "setting/",
    icon: FcSettings,
    show: true,
    children: [
      {
        name: "Categorías",
        path: "/setting/categories/",
        icon: FcTodoList,
        show: true,
        children: false,
      },
    ],
  },
];
