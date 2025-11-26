import { useAuthStore } from "app/store/authStore";
import { api } from "shared/api";
import { refreshTokenRequest } from "shared/api/refreshToken";

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
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);
