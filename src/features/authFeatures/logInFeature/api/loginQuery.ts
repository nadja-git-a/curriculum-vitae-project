import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import i18n from "app/internalization/i18n";
import { useAuthStore } from "app/store/authStore";
import type { AuthInput, AuthResult } from "features/authFeatures/model/types";

import { loginRequest } from "./loginFetch";

const t = i18n.getFixedT(null, "common");

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation<AuthResult, Error, AuthInput>({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setAuth(data);
      toast.success(t("actions.success"));
    },
    onError: (error) => {
      toast.error(error.message || t("actions.unknownError"));
    },
  });
}
