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

export const patchCredentials = (id: number, body: object) => {
  return naviPassAPi.patch(`/credentials/${id}`, body);
};

export const postAdditionalInformation = (body: object) => {
  return naviPassAPi.post("/additional_information", body);
};

export const patchAdditionalInformation = (id: number, body: object) => {
  return naviPassAPi.patch(`/additional_information/${id}`, body);
};
export const deleteAdditionalInformation = (id: number) => {
  const response = naviPassAPi.delete(`/additional_information/${id}`);
  return response;
};
