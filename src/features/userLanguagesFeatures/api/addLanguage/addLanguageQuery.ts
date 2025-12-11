import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProfileLanguage } from "./addLanguageFetch";

export function useAddProfileLanguage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProfileLanguage,
    onSuccess: (profile, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.userId],
      });
    },
  });
}
