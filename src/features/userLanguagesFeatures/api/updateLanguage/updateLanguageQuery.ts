import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProfileLanguage } from "./updateLanguageFetch";

export function useUpdateProfileLanguage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileLanguage,
    onSuccess: (profile, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.userId],
      });
    },
  });
}
