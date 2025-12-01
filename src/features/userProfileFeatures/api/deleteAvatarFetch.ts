import { apiFetch } from "shared/api";
import type { GraphQLResponse } from "shared/api/types";

const DELETE_AVATAR = `
  mutation DeleteAvatar($avatar: DeleteAvatarInput!) {
    deleteAvatar(avatar: $avatar)
  }
`;

export interface DeleteAvatarInput {
  userId: string;
}

export async function deleteAvatarRequest(input: DeleteAvatarInput): Promise<void> {
  const res = await apiFetch<GraphQLResponse<unknown>>("/graphql", {
    method: "POST",
    data: {
      query: DELETE_AVATAR,
      variables: { avatar: input },
    },
  });

  if (res.errors?.length) {
    throw new Error(res.errors[0].message);
  }
}
