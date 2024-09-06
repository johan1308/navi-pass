import { lazy } from "react";

export const Home = lazy(
  () => import(/* webpackChunkName: "Statistics" */ "../views/Home/HomeCore")
);

export const Setting = lazy(
  () =>
    import(
      /* webpackChunkName: "Setting" */ "../views/setting/SettingViews"
    )
);
