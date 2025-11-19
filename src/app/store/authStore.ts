import { create } from "zustand";

import type { AuthResult } from "features/signUpFeatures/model/types";

interface AuthState {
  user: AuthResult["user"] | null;
  accessToken: string | null;
  refreshToken: string | null;

  setAuth: (data: AuthResult) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  setAuth: (data) =>
    set({
      user: data.user,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    }),

  clearAuth: () =>
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
    }),
}));
