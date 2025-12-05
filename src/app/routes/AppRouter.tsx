import { Box, CircularProgress } from "@mui/material";
import type { ReactElement } from "react";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProfileWrapper from "features/profileNavigationFeatures/ui/ProfileWraper";
import { AppWrapper } from "shared/ui/AppWrapper/AppWrapper";

import { RouteGuard } from "./RouterGuard";

const SignUpPage = lazy(() => import("pages/SignUpPage/ui/SignUpPage"));
const LogInPage = lazy(() => import("pages/LogInPage/ui/LogInPage"));
const UsersPage = lazy(() => import("pages/UsersPage/UsersPage"));
const UserProfilePage = lazy(() => import("pages/UserProfilePage/UserProfilePage"));
const UserSkillsPage = lazy(() => import("pages/UserSkillsPage/UserSkillsPage"));
const ProfileSkillPage = lazy(() => import("pages/ProfileSkillPage/ProfileSkillPage"));

type Allowed = "guest" | "user";

interface AppRoute {
  path: string;
  element: ReactElement;
  allowed: Allowed;
}

// export const ROUTES: AppRoute[] = [
//   {
//     path: "/",
//     element: <LogInPage />,
//     allowed: "guest",
//   },
//   {
//     path: "/auth/signup",
//     element: <SignUpPage />,
//     allowed: "guest",
//   },
//   {
//     path: "/auth/login",
//     element: <LogInPage />,
//     allowed: "guest",
//   },
//   {
//     path: "/users",
//     element: <UsersPage />,
//     allowed: "user",
//   },
//   {
//     path: "/user/:id/profile",
//     element: <UserProfilePage />,
//     allowed: "user",
//   },
//   {
//     path: "/skills",
//     element: <UserSkillsPage />,
//     allowed: "user",
//   },
//   {
//     path: "/user/:userId/skills",
//     element: <ProfileSkillPage />,
//     allowed: "user",
//   },
// ];

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <RouteGuard element={<LogInPage />} allowed="guest"></RouteGuard>,
  },
  {
    path: "/auth/signup",
    element: <RouteGuard element={<SignUpPage />} allowed="guest"></RouteGuard>,
  },

  {
    path: "/",
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
        <RouteGuard element={<AppWrapper />} allowed="user"></RouteGuard>
      </Suspense>
    ),
    children: [
      { path: "users", element: <UsersPage /> },
      { path: "skills", element: <UserSkillsPage /> },

      {
        path: "user/:id",
        element: <ProfileWrapper />,
        children: [
          { path: "profile", element: <UserProfilePage /> },
          { path: "skills", element: <ProfileSkillPage /> },
        ],
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
