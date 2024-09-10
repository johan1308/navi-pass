import { useQuery } from "react-query";
import { useAllParams } from "../../../../../../hooks/useAllParams";
import { getCredentials } from "../../api/HomeAPi";
import { useState } from "react";
import { TableLayout } from "../../../../layout/TableLayout";
import { PaginatorPassword } from "./PaginatorPassword";
import { ButtonInfoPassword } from "../buttons/ButtonInfoPassword";

const dataTable: any[] = [
  { name: "Usuario", value: "user" },
  { name: "Contraseña", value: "password" },
  {
    name: "Acción",
    value: (e: any) => {
      return (
        <div className="flex items-centers">
          <ButtonInfoPassword id={e.id} />
        </div>
      );
    },
  },
];

export const TablePassword = () => {
  const [credentials, setCredentials] = useState([]);
  const [paginate, setPaginate] = useState([]);
  const {
    params: { sub_category },
  } = useAllParams();

  const { isLoading, isSuccess } = useQuery(
    ["credentials", sub_category],
    () => getCredentials({ sub_category }),
    {
      onSuccess: ({ data }) => {
        setCredentials(data.data);
        setPaginate(data.links);
      },
      refetchOnWindowFocus: false,
    }
  );
  return (
    <div className="animate-fade">
      <TableLayout
        isLoading={isLoading}
        data={credentials ?? []}
        columns={dataTable}
        Paginator={isSuccess && <PaginatorPassword data={paginate}/>}
      />
    </div>
  );
};
