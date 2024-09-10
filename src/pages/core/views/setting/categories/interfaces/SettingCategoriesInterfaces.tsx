export interface settingCategoriesParamsInterface {}

export interface settingCategoriesInterface {
  params: settingCategoriesParamsInterface | {};
  data: any;
  setData: (payload: any) => void;
}
