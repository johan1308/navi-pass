import { PagintorSettingCategories } from "./PagintorSettingCategories";
import { useAllParams } from "../../../../../../../hooks/useAllParams";
import { useSettingCategoriesStore } from "../../SettingCategories";
import { useQuery } from "react-query";
import { getCategoriesSetting } from "../../../apis/categoriesSettingApi";
import { TableLayout } from "../../../../../layout/TableLayout";
import { Button, Tooltip } from "@nextui-org/react";
import { BiSolidEdit } from "react-icons/bi";
import { ButtonDeleteCategories } from "../buttons/ButtonDeleteCategories";
import { ButtonEditCategories } from "../buttons/ButtonEditCategories";

const dataTable: any[] = [
  { name: "ID", value: "id" },
  {
    name: "Nombre",
    value: (e: any) => {
      return (
        <div className="flex items-centers">
          <span className="text-md">{e.name}</span>
          <ButtonEditCategories id={e.id} name={e.name} />
        </div>
      );
    },
  },
  {
    name: "Acción",
    value: (e: any) => <ButtonDeleteCategories id={e.id} />,
  },
];

export const TableSettingCategories = () => {
  const { params } = useAllParams();
  const {
    setData,
    data: { data },
  } = useSettingCategoriesStore();
  const { isLoading, isSuccess } = useQuery(
    ["categories", params],
    () => getCategoriesSetting(params),
    {
      onSuccess: (e: any) => {

        setData(e);
      },
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <TableLayout
        isLoading={isLoading}
        data={data ?? []}
        columns={dataTable}
        Paginator={isSuccess && <PagintorSettingCategories />}
      />
    </>
  );
};
