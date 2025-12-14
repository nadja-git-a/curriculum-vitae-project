import { graphqlRequest } from "features/authFeatures/api/authFetch";
import type { Cv } from "shared/model/types";

export const GET_CVS = `
  query GetCvs {
    cvs {
      id
      created_at
      name
      education
      description
      user {
        id
        email
      }
    }
  }
`;

export async function getCvs(): Promise<Cv[]> {
  const data = await graphqlRequest<{ cvs: Cv[] }>(GET_CVS);
  return data.cvs;
}
