import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCv, type DeleteCvInput } from "./deleteCVFetch";

export function useDeleteCv() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: DeleteCvInput) => deleteCv(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"], exact: false });
    },
  });
}
