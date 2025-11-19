import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "app/store/authStore";

import { signupRequest } from "./fetch";
import type { AuthInput, AuthResult } from "../model/types";

export function useSignup() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (auth: AuthInput) => signupRequest(auth),
    onSuccess: (data: AuthResult) => {
      setAuth(data);
    },
  });
}
