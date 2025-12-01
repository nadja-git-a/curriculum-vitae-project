import { useAuthStore } from "app/store/authStore";
import { api } from "shared/api";
import { refreshTokenRequest } from "shared/api/refreshToken";

api.interceptors.response.use(
  async (response) => {
    const { refreshToken, setAuth, clearAuth } = useAuthStore.getState();
    const graphErrors = response.data?.errors;
    const unauthError = graphErrors?.[0];

    if (unauthError?.extensions?.code === "UNAUTHENTICATED" && refreshToken) {
      try {
        const newTokens = await refreshTokenRequest(refreshToken);
        setAuth(newTokens);

        const originalRequest = response.config;
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`;

        return api.request(originalRequest);
      } catch {
        clearAuth();
        window.location.href = "/auth/login";
      }
    }

    return response;
  },

  (error) => {
    return Promise.reject(error);
  }
);
