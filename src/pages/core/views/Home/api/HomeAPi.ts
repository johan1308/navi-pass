import { naviPassAPi } from "../../../../../api/movilPayAPI";

export const getSubCategories = (params: object | null) => {
  return naviPassAPi.get("/sub_categories", { params });
};

export const getCredentials = (params: object | null) => {
  return naviPassAPi.get("/credentials", { params });
};
export const getCredentialsID = (id: number | null) => {
  return naviPassAPi.get(`/credentials/${id}`);
};
export const postCredentials = (body: object) => {
  return naviPassAPi.post("/credentials", body);
};
