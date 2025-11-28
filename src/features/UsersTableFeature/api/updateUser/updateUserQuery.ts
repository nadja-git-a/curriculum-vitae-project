import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { User } from "shared/model/types";

import { updateUser, type UpdateUserInput } from "./updateUserFetch";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UpdateUserInput>({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
