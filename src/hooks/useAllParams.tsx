import { useSearchParams } from "react-router-dom";

export const useAllParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const previousParams = Object.fromEntries(searchParams);

  const addParams = (payload: object) => {
    setSearchParams({ ...previousParams, ...payload });
  };
  const deleteParams = (payload: string[]) => {
    const newParam = { ...previousParams };    
    payload.forEach((element) => {
      delete newParam[element];
    });
    setSearchParams(newParam);
  };

  return {
    params: previousParams,
    setSearchParams,
    addParams,
    deleteParams,
  };
};
