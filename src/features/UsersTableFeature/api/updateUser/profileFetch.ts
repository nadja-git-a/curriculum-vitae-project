import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "shared/api";
import type { GraphQLResponse } from "shared/api/types";

export interface UpdateProfileInput {
  userId: string;
  first_name?: string;
  last_name?: string;
}

const UPDATE_PROFILE = `
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      first_name
      last_name
      full_name
      avatar
    }
  }
`;

export async function updateProfileRequest(input: UpdateProfileInput) {
  const res = await apiFetch<GraphQLResponse<{ updateProfile: UpdateProfileInput }>>("/graphql", {
    method: "POST",
    data: { query: UPDATE_PROFILE, variables: { profile: input } },
  });

  if (res.errors?.length) throw new Error(res.errors[0].message);

  return res.data!.updateProfile;
}

export function useUpdateProfile() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateProfileInput) => updateProfileRequest(input),
    onSuccess: () => client.invalidateQueries({ queryKey: ["users"] }),
  });
}
