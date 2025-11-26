import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { useAuthStore } from "app/store/authStore";

type Allowed = "guest" | "user";

interface RouteGuardProps {
  element: ReactElement;
  allowed: Allowed;
}

export function RouteGuard({ element, allowed }: RouteGuardProps) {
  const accessToken = useAuthStore((s) => s.accessToken);

  if (allowed === "user" && !accessToken) {
    return <Navigate to="/auth/signup" replace />;
  }

  if (allowed === "guest" && accessToken) {
    return <Navigate to="/users" replace />;
  }

  return element;
}
