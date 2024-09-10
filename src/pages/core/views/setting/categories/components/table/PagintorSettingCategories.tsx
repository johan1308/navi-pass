import { useAllParams } from "../../../../../../../hooks/useAllParams";
import queryString from "query-string";
import { queryClient } from "../../../../../../../App";
import { useSettingCategoriesStore } from "../../SettingCategories";
import { classNames } from "../../../../../../../helpers/ClassN";

export const PagintorSettingCategories = () => {
  const { data } = useSettingCategoriesStore();
  const { setSearchParams } = useAllParams();
  const [previous, ...rest] = data.links;
  const next = rest.pop();

  const handlePage = async (e: any) => {
    const parsed = queryString.parseUrl(e);
    const { query } = parsed || {};
    setSearchParams(query as any);
  };

  const active =
    "text-primary  border-primary border-t-2  focus-visible:outline-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const noActive = "text-gray-500 dark:text-white hover:text-primary dark:hover:text-primary";

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        {!!previous.url && (
          <a
            onClick={() => handlePage(previous.url)}
            className="cursor-pointer dark:text-white dark:hover:text-primary inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:text-primary"
          >
            Anterior
          </a>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {rest.map((d: { url?: string; label: string; active: boolean }) => (
          <a
            key={d.label}
            onClick={() => {
              if (d.active) return
              handlePage(d.url)
            } }
            className={classNames(
              d.active ? active : noActive,
              "inline-flex items-center border-t  px-4 pt-4 text-md font-medium cursor-pointer"
            )}
          >
            {d.label}
          </a>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {!!next.url && (
          <a
            onClick={() =>  handlePage(next.url)}
            className="cursor-pointer inline-flex dark:text-white  dark:hover:text-primary items-center border-t border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:text-primary"
          >
            Siguiente
          </a>
        )}
      </div>
    </nav>
  );
};
