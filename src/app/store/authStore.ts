import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AuthResult } from "features/authFeatures/model/types";
import type { User } from "shared/model/types";

interface AuthState {
  user: AuthResult["user"] | null;
  accessToken: string | null;
  refreshToken: string | null;

  setAuth: (data: AuthResult) => void;
  updateUser: (data: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      setAuth: (data) =>
        set({
          user: data.user,
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        }),

      updateUser: (data) =>
        set({
          user: data,
        }),

      clearAuth: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
