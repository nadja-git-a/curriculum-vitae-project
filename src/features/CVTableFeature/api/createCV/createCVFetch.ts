import { graphqlRequest } from "features/authFeatures/api/authFetch";
import type { Cv } from "shared/model/types";

export const CREATE_CV = `
  mutation CreateCv($cv: CreateCvInput!) {
    createCv(cv: $cv) {
      id
      name
      education
      description
    }
  }
`;

export interface CreateCvInput {
  name: string;
  education?: string | null;
  description: string;
  userId?: string | null;
}

export async function createCv(input: CreateCvInput): Promise<Cv> {
  const data = await graphqlRequest<{ createCv: Cv }, { cv: CreateCvInput }>(CREATE_CV, {
    cv: input,
  });

  return data.createCv;
}
