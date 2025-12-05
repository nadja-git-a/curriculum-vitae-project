import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteProfileSkill, type DeleteProfileSkillInput } from "./deleteProfileSkillsFetch";

export function useDeleteProfileSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: DeleteProfileSkillInput) => deleteProfileSkill(input),
    onSuccess: (profile, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.userId],
      });
    },
  });
}
