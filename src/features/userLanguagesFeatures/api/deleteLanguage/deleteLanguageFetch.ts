import { graphqlRequest } from "features/authFeatures/api/authFetch";
import type { Profile } from "shared/model/types";

export const DELETE_PROFILE_LANGUAGE = `
  mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {
    deleteProfileLanguage(language: $language) {
      id
    }
  }
`;

export interface DeleteProfileLanguageInput {
  userId: string;
  name: string[];
}

export async function deleteProfileLanguage(input: DeleteProfileLanguageInput): Promise<Profile> {
  const data = await graphqlRequest<
    { deleteProfileLanguage: Profile },
    { language: DeleteProfileLanguageInput }
  >(DELETE_PROFILE_LANGUAGE, { language: input });

  return data.deleteProfileLanguage;
}
