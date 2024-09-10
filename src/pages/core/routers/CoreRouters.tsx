import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { SidebarCore } from "../components/SidebarCore";
import { Loading } from "../../../components/Loading";
import { Home, Setting } from "../data/ItemRouter";
import { PassIDViews } from "../views/PassID/PassIDViews";
import SettingCategories from "../views/setting/categories/SettingCategories";

export const CoreRouters = () => {
  return (
    <>
      <SidebarCore>
        <Suspense
          fallback={
            <div className="flex justify-center items-center">
              <Loading />
            </div>
          }
        >
          <>
            {/* {getTitle} */}
            {/* <BreadCrumbCore /> */}
            <Routes>
              <Route path="/" element={<Navigate to="credentials/" />} />
              <Route path="credentials/" element={<Home />} />
              <Route path="credentials/:id/update/" element={<PassIDViews />} />
              <Route path="setting/" element={<Setting />}>
                <Route index element={<Navigate to="/categories" />} />
                <Route path="categories" element={<SettingCategories />} />
                <Route path="*" element={<Navigate to="/categories" />} />
              </Route>
              <Route path="*" element={<Navigate to="/credentials" />} />
            </Routes>
          </>
        </Suspense>
      </SidebarCore>
    </>
  );
};
