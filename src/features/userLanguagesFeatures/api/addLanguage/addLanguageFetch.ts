import { graphqlRequest } from "features/authFeatures/api/authFetch";
import type { Proficiency, Profile } from "shared/model/types";

export const ADD_PROFILE_LANGUAGE = `
  mutation AddProfileLanguage($language: AddProfileLanguageInput!) {
    addProfileLanguage(language: $language) {
      id
      languages {
        name
        proficiency
      }
    }
  }
`;

export interface AddProfileLanguageInput {
  userId: string;
  name: string;
  proficiency: Proficiency;
}

export async function addProfileLanguage(input: AddProfileLanguageInput): Promise<Profile> {
  const data = await graphqlRequest<
    { addProfileLanguage: Profile },
    { language: AddProfileLanguageInput }
  >(ADD_PROFILE_LANGUAGE, {
    language: input,
  });

  return data.addProfileLanguage;
}
