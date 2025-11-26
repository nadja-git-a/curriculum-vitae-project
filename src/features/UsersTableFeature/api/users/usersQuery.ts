import { useQuery } from "@tanstack/react-query";

import type { User } from "shared/model/types";

import { fetchUsers } from "./usersFetch";

export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}
