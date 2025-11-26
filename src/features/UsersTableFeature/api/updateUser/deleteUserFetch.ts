import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "shared/api";
import type { GraphQLResponse } from "shared/api/types";

interface DeleteUserInput {
  userId: string;
}

interface DeleteResult {
  affected: number;
}

const DELETE_USER = `
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      affected
    }
  }
`;

export async function deleteUserRequest(input: DeleteUserInput): Promise<DeleteResult> {
  const res = await apiFetch<GraphQLResponse<{ deleteUser: DeleteResult }>>("/graphql", {
    method: "POST",
    data: {
      query: DELETE_USER,
      variables: { userId: input.userId },
    },
  });

  if (res.errors?.length) {
    throw new Error(res.errors[0].message);
  }

  if (!res.data) {
    throw new Error("Empty deleteUser response");
  }

  return res.data.deleteUser;
}

export function useDeleteUser() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: deleteUserRequest,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
