import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { SidebarCore } from "../components/SidebarCore";
import { Loading } from "../../../components/Loading";
import { Home} from "../data/ItemRouter";

import { BreadCrumbCore } from "../components/BreadCrumb/BreadCrumbCore";


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
              <Route path="/" element={<Navigate to="home/" />} />
              <Route path="home/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        </Suspense>
      </SidebarCore>
    </>
  );
};
