import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PageLoader } from "@/shared/ui/PageLoader";

import { routeConfig } from "../config/routeConfig";

export const Router = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {Object.values(routeConfig).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
};
