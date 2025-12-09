import { useQuery } from "@tanstack/react-query";

import type { Language } from "shared/model/types";

import { fetchLanguages } from "./languagesFetch";

export function useLanguages() {
  return useQuery<Language[]>({
    queryKey: ["languages"],
    queryFn: fetchLanguages,
  });
}
