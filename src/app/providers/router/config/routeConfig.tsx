import { RouteProps } from "react-router-dom";

import { LoginPage } from "@/pages/LoginPage";
import { NotFound } from "@/pages/NotFound";

enum AppRoutes {
  LOGIN = "login",
  NOT_FOUND = "not_found",
}

const routePaths: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.LOGIN]: {
    path: routePaths.login,
    element: <LoginPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: routePaths.not_found,
    element: <NotFound />,
  },
};
