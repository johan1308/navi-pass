import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { navigation } from "../../data/menu";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";


type dataBread = {
  path: string;
  name: string;
  icon?: any;
};
interface Props {
  data: dataBread[];
}

export const BreadCrumbCore = () => {
  const navigate = useNavigate();
  const param = useParams();
  const ruta: any = param["*"];
  const arrayRoute = ruta!.split("/");
  const [routesActive, setRoutesActive] = useState<any>([]);

  const findObjectByPath = (jsonData: any, path: any): any => {
    if (!Array.isArray(jsonData)) {
      return null;
    }

    for (const obj of jsonData) {
      if (obj.path === path) {
        return obj;
      }

      if (obj.children) {
        const result = findObjectByPath(obj.children, path);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const getLastPosition = () => {
    // Verificar si el arreglo no está vacío
    if (routesActive.length === 0) {
      return undefined; // O puedes manejar este caso de otra manera según tus necesidades
    }

    // Retornar el último elemento del arreglo
    const last = routesActive[routesActive.length - 1];
    return (
      <p className="mt-5 text-3xl font-semibold dark:text-white flex space-x-3">
        <last.icon />
        <span className="mr-3">{last.name}</span>
      </p>
    );
  };

  const handleBread = (action: any) => {
    navigate(action);
  };

  useEffect(() => {
    let routes: any = [];
    arrayRoute.forEach((element: any, i: any) => {
      if (i > 0) {
        const cut = arrayRoute.slice(0, i).join("/") + "/";
        const response = findObjectByPath(navigation, cut);
        routes.push(response);
      }
    });
    const filtr = routes.filter((d: any) => !!d);
    setRoutesActive(filtr);
  }, [ruta]);

  return (
    <div className="mb-7 p-4 flex justify-between items-start">
      <div>
        <Breadcrumbs size="lg" onAction={(key) => handleBread(key)}>
          {routesActive.map((d: any) => (
            <BreadcrumbItem key={d.path} startContent={<d.icon />}>
              {d.name}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
        {getLastPosition()}
      </div>
      
    </div>
  );
};
