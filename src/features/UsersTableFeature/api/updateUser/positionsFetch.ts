import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "shared/api";
import type { GraphQLResponse } from "shared/api/types";

export interface Position {
  id: string;
  name: string;
}

interface PositionsData {
  positions: Position[];
}

const POSITIONS = `
  query Positions {
    positions {
      id
      name
    }
  }
`;

export function usePositions() {
  return useQuery<Position[], Error>({
    queryKey: ["positions"],
    queryFn: async () => {
      const res = await apiFetch<GraphQLResponse<PositionsData>>("/graphql", {
        method: "POST",
        data: { query: POSITIONS },
      });

      if (res.errors?.length) {
        throw new Error(res.errors[0].message);
      }

      return res.data!.positions;
    },
  });
}
