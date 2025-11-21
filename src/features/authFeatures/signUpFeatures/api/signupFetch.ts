import { graphqlRequest } from "features/authFeatures/api/authFetch";
import { AUTH_FIELDS } from "features/authFeatures/api/authQuery";
import type { AuthInput, AuthResult } from "features/authFeatures/model/types";

const SIGNUP_MUTATION = `
  mutation Signup($auth: AuthInput!) {
    signup(auth: $auth) {
      ${AUTH_FIELDS}
    }
  }
`;

type SignupData = {
  signup: AuthResult;
};

export function signupRequest(auth: AuthInput): Promise<AuthResult> {
  return graphqlRequest<SignupData, { auth: AuthInput }>(SIGNUP_MUTATION, { auth }).then(
    (data) => data.signup
  );
}
