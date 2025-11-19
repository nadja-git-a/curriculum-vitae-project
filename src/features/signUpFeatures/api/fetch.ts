import { apiFetch } from "shared/api";

import type { AuthInput, AuthResult } from "../model/types";

const SIGNUP_MUTATION = `
  mutation SignUp($auth: AuthInput!) {
    signup(auth: $auth) {
      access_token
      refresh_token
      user {
        id
        email
      }
    }
  }
`;

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

type SignUpGraphQLData = {
  signup: AuthResult;
};

export async function signupRequest(auth: AuthInput): Promise<AuthResult> {
  const res = await apiFetch<GraphQLResponse<SignUpGraphQLData>>("/graphql", {
    method: "POST",
    body: JSON.stringify({
      query: SIGNUP_MUTATION,
      variables: { auth },
    }),
  });

  if (res.errors?.length) {
    throw new Error(res.errors[0].message);
  }

  if (!res.data) {
    throw new Error("Empty GraphQL response");
  }

  return res.data.signup;
}
