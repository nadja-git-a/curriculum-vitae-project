import { useAuthStore } from "app/store/authStore";
import { api } from "shared/api";

import type { AuthResult } from "../model/types";

const REFRESH_TOKEN_MUTATION = `
  mutation UpdateToken($refresh_token: String!) {
    updateToken(refresh_token: $refresh_token) {
      access_token
      refresh_token
    }
  }
`;
export async function refreshTokenRequest(refreshToken: string): Promise<AuthResult> {
  const response = await api.post("", {
    query: REFRESH_TOKEN_MUTATION,
    variables: { refresh_token: refreshToken },
  });

  return response.data.data.updateToken;
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { clearAuth, refreshToken, setAuth } = useAuthStore.getState();

    if (error.response?.status === 401 && refreshToken) {
      try {
        const newTokens = await refreshTokenRequest(refreshToken);
        setAuth(newTokens);

        error.config.headers.Authorization = `Bearer ${newTokens.access_token}`;
        return api.request(error.config);
      } catch {
        clearAuth();
        window.location.href = "/auth/signup";
      }
    }

    return Promise.reject(error);
  }
);
