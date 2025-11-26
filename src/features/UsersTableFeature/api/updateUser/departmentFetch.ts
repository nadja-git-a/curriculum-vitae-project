import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "shared/api";
import type { GraphQLResponse } from "shared/api/types";

export interface Department {
  id: string;
  name: string;
}

interface DepartmentsData {
  departments: Department[];
}

const DEPARTMENTS = `
  query Departments {
    departments {
      id
      name
    }
  }
`;

export function useDepartments() {
  return useQuery<Department[], Error>({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await apiFetch<GraphQLResponse<DepartmentsData>>("/graphql", {
        method: "POST",
        data: { query: DEPARTMENTS },
      });

      if (res.errors?.length) {
        throw new Error(res.errors[0].message);
      }

      return res.data!.departments;
    },
  });
}
