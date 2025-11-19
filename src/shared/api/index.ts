import axios, { AxiosError, type AxiosRequestConfig } from "axios";

import { useAuthStore } from "app/store/authStore";

export const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function apiFetch<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
  try {
    const response = await api.request<T>({
      url,
      ...options,
    });

    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;

    throw new Error(error.response?.data?.message ?? "Unknown API error");
  }
}

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
