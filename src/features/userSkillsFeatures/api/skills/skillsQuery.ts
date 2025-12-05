import { useQuery } from "@tanstack/react-query";

import type { Skill } from "shared/model/types";

import { fetchSkills } from "./skillsFetch";

export function useSkills() {
  return useQuery<Skill[]>({
    queryKey: ["skills"],
    queryFn: fetchSkills,
  });
}
