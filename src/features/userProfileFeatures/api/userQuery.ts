import { useQuery } from "@tanstack/react-query";

import type { User } from "shared/model/types";

import { fetchUser } from "./userFetch";

export function useUser(id: string) {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  });
}
