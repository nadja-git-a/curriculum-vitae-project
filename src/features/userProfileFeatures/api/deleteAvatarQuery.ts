import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "app/store/authStore";

import { deleteAvatarRequest } from "./deleteAvatarFetch";

export function useDeleteAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteAvatarRequest({ userId }),
    onSuccess: (_data, userId) => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });

      const { user, updateUser } = useAuthStore.getState();

      if (!user || user.id !== userId) return;

      const patchedUser = {
        ...user,
        profile: {
          ...user.profile,
          avatar_url: null,
        },
      };

      updateUser(patchedUser);
    },
  });
}
