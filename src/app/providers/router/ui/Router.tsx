import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PageLoader } from "@/shared/ui/PageLoader";

import { AppRouteProps, routeConfig } from "../config/routeConfig";
import { RequireAuth } from "./RequireAuth";

export const Router = () => {
  const renderWithWrapper = ({ path, element, authOnly }: AppRouteProps) => {
    const page = <Suspense fallback={<PageLoader />}>{element}</Suspense>;

    return (
      <Route
        key={path}
        path={path}
        element={authOnly ? <RequireAuth>{page}</RequireAuth> : page}
      />
    );
  };

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};
