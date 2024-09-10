import { naviPassAPi } from "../../../../../api/movilPayAPI";

export const getCategoriesSetting = async (params?: object) => {
  try {
    const response = await naviPassAPi.get("/categories", { params });
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error("Error al obtener los datos");
  }
};

export const postCategoriesSetting = (body: any) => {
  const response = naviPassAPi.post("/categories", body);
  return response;
};

export const deleteCategoriesSetting = (id: number) => {
  const response = naviPassAPi.delete(`/categories/${id}`);
  return response;
};

export const patchCategoriesSetting = (id: number,body:any) => {  console.log();  
  const response = naviPassAPi.patch(`/categories/${id}`,body);
  return response;
};



export const postSubCategoriesSetting = (body: any) => {
  const response = naviPassAPi.post("/sub_categories", body);
  return response;
};

export const deleteSubCategoriesSetting = (id: number) => {
  const response = naviPassAPi.delete(`/sub_categories/${id}`);
  return response;
};



