import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCv } from "./updateCVFetch";

export function useUpdateCv(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCv,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", userId, "cvs"],
      });
    },
  });
}
