import { PagintorSettingCategories } from "./PagintorSettingCategories";
import { useAllParams } from "../../../../../../../hooks/useAllParams";
import { useSettingCategoriesStore } from "../../SettingCategories";
import { useQuery } from "react-query";
import { getCategoriesSetting } from "../../../apis/categoriesSettingApi";
import { TableLayout } from "../../../../../layout/TableLayout";
import { ButtonDeleteCategories } from "../buttons/ButtonDeleteCategories";
import { ButtonEditCategories } from "../buttons/ButtonEditCategories";
import { ButtonInfoLength } from "../buttons/ButtonInfoLength";

const dataTable: any[] = [
  { name: "ID", value: "id" },
  {
    name: "Nombre",

    value: (e: any) => {
      let long = e.name.length > 20;
      if (e.name.length > 20) {
        return (
          <>
            {e.name.substring(0, 20) }
            {long && <ButtonInfoLength data={e.name} />}
          </>
        );
      }
      return e.name;
    },
  },
  {
    name: "Acción",
    value: (e: any) => {
      let long = e.name.length > 20;
      return (
        <div className="flex items-center ">
          <ButtonEditCategories id={e.id} name={e.name} />
          <ButtonDeleteCategories id={e.id} />
        </div>
      );
    },
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
