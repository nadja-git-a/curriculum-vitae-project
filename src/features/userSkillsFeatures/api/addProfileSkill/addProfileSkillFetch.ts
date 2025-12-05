import { graphqlRequest } from "features/authFeatures/api/authFetch";
import type { Mastery, Profile } from "shared/model/types";

export const ADD_PROFILE_SKILL = `
  mutation AddProfileSkill($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export interface AddProfileSkillInput {
  userId: string;
  name: string;
  categoryId?: string | null;
  mastery: Mastery;
}

export async function addProfileSkill(input: AddProfileSkillInput): Promise<Profile> {
  const data = await graphqlRequest<{ addProfileSkill: Profile }, { skill: AddProfileSkillInput }>(
    ADD_PROFILE_SKILL,
    { skill: input }
  );

  return data.addProfileSkill;
}
