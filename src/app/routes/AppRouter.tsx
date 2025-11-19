import { Box, CircularProgress } from "@mui/material";
import type { ReactElement } from "react";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";

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

const router = createBrowserRouter(
  ROUTES.map(({ path, element, allowed }) => ({
    path,
    element: (
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <RouteGuard element={element} allowed={allowed} />
      </Suspense>
    ),
  }))
);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
