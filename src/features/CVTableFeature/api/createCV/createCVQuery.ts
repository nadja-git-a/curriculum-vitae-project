import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createCv } from "./createCVFetch";

export function useCreateCv() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCv,
    onSuccess: (cv, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["user", variables.userId, "cvs"],
      });
    },
  });
}
