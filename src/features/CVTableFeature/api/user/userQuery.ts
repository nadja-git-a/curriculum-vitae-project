import { useQuery } from "@tanstack/react-query";

import { getUserCvs } from "./userFetch";

export function useUserCvs(userId: string) {
  return useQuery({
    queryKey: ["user", userId, "cvs"],
    queryFn: () => getUserCvs(userId),
    enabled: !!userId,
  });
}
