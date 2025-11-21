import { graphqlRequest } from "features/authFeatures/api/authFetch";
import { AUTH_FIELDS } from "features/authFeatures/api/authQuery";
import type { AuthInput, AuthResult } from "features/authFeatures/model/types";

const LOGIN_QUERY = `
  query Login($auth: AuthInput!) {
    login(auth: $auth) {
      ${AUTH_FIELDS}
    }
  }
`;

type LoginData = {
  login: AuthResult;
};

export function loginRequest(auth: AuthInput): Promise<AuthResult> {
  return graphqlRequest<LoginData, { auth: AuthInput }>(LOGIN_QUERY, { auth }).then(
    (data) => data.login
  );
}
