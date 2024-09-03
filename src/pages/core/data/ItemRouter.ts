import { lazy } from "react";

export const Home = lazy(
  () =>
    import(
      /* webpackChunkName: "Statistics" */ "../views/Home/HomeCore"
    )
);


