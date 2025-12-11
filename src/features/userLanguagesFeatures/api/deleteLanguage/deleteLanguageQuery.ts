import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProfileLanguage, type DeleteProfileLanguageInput } from "./deleteLanguageFetch";

export function useDeleteProfileLanguage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: DeleteProfileLanguageInput) => deleteProfileLanguage(input),
    onSuccess: (profile, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.userId],
      });
    },
  });
}
