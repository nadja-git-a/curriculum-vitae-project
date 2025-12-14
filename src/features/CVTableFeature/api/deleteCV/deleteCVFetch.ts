import { graphqlRequest } from "features/authFeatures/api/authFetch";

export const DELETE_CV = `
  mutation DeleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`;

export interface DeleteCvInput {
  cvId: string;
}

export interface DeleteResult {
  affected: number;
}

export async function deleteCv(input: DeleteCvInput): Promise<DeleteResult> {
  const data = await graphqlRequest<{ deleteCv: DeleteResult }, { cv: DeleteCvInput }>(DELETE_CV, {
    cv: input,
  });

  return data.deleteCv;
}
