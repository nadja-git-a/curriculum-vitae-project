import type { ReactElement } from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { RouteGuard } from "./RouterGuard";

const SignUpPage = lazy(() => import("pages/SignUpPage/ui/SignUpPage"));

type Allowed = "guest" | "user";

interface AppRoute {
  path: string;
  element: ReactElement;
  allowed: Allowed;
}

export const ROUTES: AppRoute[] = [
  {
    path: "/auth/signup",
    element: <SignUpPage />,
    allowed: "guest",
  },
];

export function AppRouter() {
  return (
    <Routes>
      {ROUTES.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<RouteGuard element={element} allowed={"guest"} />}
        />
      ))}
    </Routes>
  );
}
