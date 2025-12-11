import { graphqlRequest } from "features/authFeatures/api/authFetch";
import type { Proficiency, Profile } from "shared/model/types";

export const UPDATE_PROFILE_LANGUAGE = `
  mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {
    updateProfileLanguage(language: $language) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`;

export interface UpdateProfileLanguageInput {
  userId: string;
  name: string;
  proficiency: Proficiency;
}

export async function updateProfileLanguage(input: UpdateProfileLanguageInput): Promise<Profile> {
  const data = await graphqlRequest<
    { updateProfileLanguage: Profile },
    { language: UpdateProfileLanguageInput }
  >(UPDATE_PROFILE_LANGUAGE, { language: input });

  return data.updateProfileLanguage;
}
