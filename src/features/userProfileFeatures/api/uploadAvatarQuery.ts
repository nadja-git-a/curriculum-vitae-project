import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "app/store/authStore";
import type { AuthResult } from "features/authFeatures/model/types";

import { type UploadAvatarInput, uploadAvatarRequest } from "./uploadAvatarFetch";

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation<string, Error, UploadAvatarInput>({
    mutationFn: uploadAvatarRequest,
    onSuccess: (url, variables) => {
      const { userId } = variables;

      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });

      const { user, updateUser } = useAuthStore.getState();

      if (!user || user.id !== userId) return;

      const patchedUser: AuthResult["user"] = {
        ...user,
        profile: {
          ...user.profile,
          avatar: url,
        },
      };

      updateUser(patchedUser);
    },
  });
}
