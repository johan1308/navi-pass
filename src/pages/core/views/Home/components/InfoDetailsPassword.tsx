import { classNames } from "../../../../../helpers/ClassN";
import { useThemeMovilPay } from "../../../../../hooks/useTheme";

const data = [
  {
    title: "titulo",
    value: "valor",
  },
];

export const InfoDetailsPassword = () => {
  const { darkMode } = useThemeMovilPay();

  return (
    <div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              className={classNames(
                darkMode ? "text-textDark" : "text-gray-900",
                "text-sm font-medium leading-6 "
              )}
            >
              Usuario
            </dt>
            <dd
              className={classNames(
                darkMode ? "text-textDark" : "text-gray-700",
                "mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0"
              )}
            >
              Margot Foster
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt
              className={classNames(
                darkMode ? "text-textDark" : "text-gray-900",
                "text-sm font-medium leading-6 "
              )}
            >
              Contraseña
            </dt>
            <dd
              className={classNames(
                darkMode ? "text-textDark" : "text-gray-700",
                "mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0"
              )}
            >
              Backend Developer
            </dd>
          </div>
          {data.map((d) => (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0" key={d.title}>
              <dt
                className={classNames(
                  darkMode ? "text-textDark" : "text-gray-900",
                  "text-sm font-medium leading-6 "
                )}
              >
                {d.title}
              </dt>
              <dd
                className={classNames(
                  darkMode ? "text-textDark" : "text-gray-700",
                  "mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0"
                )}
              >
                {d.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};
