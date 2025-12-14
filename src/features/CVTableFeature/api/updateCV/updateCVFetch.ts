import { graphqlRequest } from "features/authFeatures/api/authFetch";
import type { Cv } from "shared/model/types";

export const UPDATE_CV = `
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
      created_at
      name
      education
      description
      projects {
        id
        name
        description
        created_at
      }
      skills {
        name
        categoryId
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`;

export interface UpdateCvInput {
  cvId: string;
  name: string;
  education?: string | null;
  description: string;
}

export async function updateCv(input: UpdateCvInput): Promise<Cv> {
  const data = await graphqlRequest<{ updateCv: Cv }, { cv: UpdateCvInput }>(UPDATE_CV, {
    cv: input,
  });

  return data.updateCv;
}
