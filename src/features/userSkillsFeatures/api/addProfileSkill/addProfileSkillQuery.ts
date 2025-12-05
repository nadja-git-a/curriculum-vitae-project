import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProfileSkill } from "./addProfileSkillFetch";

export function useAddProfileSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProfileSkill,
    onSuccess: (profile, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["profile", variables.userId],
      });
    },
  });
}
