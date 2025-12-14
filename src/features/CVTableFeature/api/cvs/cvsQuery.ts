import { useQuery } from "@tanstack/react-query";

import { getCvs } from "./cvsFetch";

export function useCvs() {
  return useQuery({
    queryKey: ["cvs"],
    queryFn: getCvs,
  });
}
