import type { AuthResult } from "features/authFeatures/model/types.ts";

import { api } from "./index.ts";

const REFRESH_TOKEN_MUTATION = `
  mutation UpdateToken($refresh_token: String!) {
    updateToken(refresh_token: $refresh_token) {
      access_token
      refresh_token
    }
  }
`;
export async function refreshTokenRequest(refreshToken: string): Promise<AuthResult> {
  const response = await api.post("/graphql", {
    query: REFRESH_TOKEN_MUTATION,
    variables: { refresh_token: refreshToken },
  });

  return response.data.data.updateToken;
}
