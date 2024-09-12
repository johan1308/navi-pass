import { useQuery } from "react-query";
import { useAllParams } from "../../../../../../hooks/useAllParams";
import { getCredentials } from "../../api/HomeAPi";
import { useEffect, useState } from "react";
import { TableLayout } from "../../../../layout/TableLayout";
import { PaginatorPassword } from "./PaginatorPassword";
import { ButtonInfoPassword } from "../buttons/ButtonInfoPassword";
import { queryClient } from "../../../../../../App";

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
    params: { sub_category, search },
  } = useAllParams();

  const { isLoading, isSuccess } = useQuery(
    ["credentials"],
    () => getCredentials({ sub_category, search }),
    {
      onSuccess: ({ data }) => {
        setCredentials(data.data);
        setPaginate(data.links);
      },
      refetchOnWindowFocus: false,
      staleTime: 0,
    }
  );

  useEffect(() => {
    // queryClient.prefetchQuery("credentials");
    queryClient.prefetchQuery("credentials");
  }, [search]);

  return (
    <div className="animate-fade">
      <TableLayout
        isLoading={isLoading}
        data={credentials ?? []}
        columns={dataTable}
        Paginator={paginate.length > 0 && <PaginatorPassword data={paginate} />}
      />
    </div>
  );
};
