import { apiFetch } from "shared/api";
import type { GraphQLResponse } from "shared/api/types";

export interface UploadAvatarInput {
  userId: string;
  base64: string;
  size: number;
  type: string;
}

const UPLOAD_AVATAR = `
  mutation UploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`;

export async function uploadAvatarRequest(input: UploadAvatarInput): Promise<string> {
  const res = await apiFetch<GraphQLResponse<{ uploadAvatar: string }>>("/graphql", {
    method: "POST",
    data: {
      query: UPLOAD_AVATAR,
      variables: { avatar: input },
    },
  });

  if (res.errors?.length) {
    throw new Error(res.errors[0].message);
  }

  return res.data!.uploadAvatar;
}
