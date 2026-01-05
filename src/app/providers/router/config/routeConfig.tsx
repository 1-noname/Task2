import { RouteProps } from "react-router-dom";

import { LoginPage } from "@/pages/LoginPage";
import { MainPage } from "@/pages/MainPage";
import { NotFound } from "@/pages/NotFound";

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
};

enum AppRoutes {
  LOGIN = "login",
  NOT_FOUND = "not_found",
  MAIN = "main",
}

const routePaths: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.NOT_FOUND]: "*",
  [AppRoutes.MAIN]: "/",
};

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
  [AppRoutes.LOGIN]: {
    path: routePaths.login,
    element: <LoginPage />,
    authOnly: false,
  },

  [AppRoutes.NOT_FOUND]: {
    path: routePaths.not_found,
    element: <NotFound />,
    authOnly: false,
  },

  [AppRoutes.MAIN]: {
    path: routePaths.main,
    element: <MainPage />,
    authOnly: true,
  },
};
