import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProfileSkill } from "./updateSkillFetch";

export function useUpdateProfileSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileSkill,
    onSuccess: (profile, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.userId],
      });
    },
  });
}
