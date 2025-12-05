import { useQuery } from "@tanstack/react-query";

import { fetchProfile } from "./profileFetch";

export function useProfile(userId: string) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfile(userId),
    enabled: !!userId,
  });
}
