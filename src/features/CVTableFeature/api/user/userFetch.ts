import { graphqlRequest } from "features/authFeatures/api/authFetch";
import type { Cv } from "shared/model/types";

export const GET_USER_CVS = `
  query GetUserCvs($userId: ID!) {
    user(userId: $userId) {
      cvs {
        id
        name
        education
        description
        user {
          id
          email
        }
      }
    }
  }
`;

export interface UserCvsResponse {
  user: {
    cvs: Cv[];
  };
}

export async function getUserCvs(userId: string): Promise<Cv[]> {
  const data = await graphqlRequest<UserCvsResponse, { userId: string }>(GET_USER_CVS, { userId });

  return data.user.cvs;
}
