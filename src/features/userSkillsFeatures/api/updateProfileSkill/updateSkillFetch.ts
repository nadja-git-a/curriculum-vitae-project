import { graphqlRequest } from "features/authFeatures/api/authFetch";
import type { Mastery, Profile } from "shared/model/types";

export const UPDATE_PROFILE_SKILL = `
  mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {
    updateProfileSkill(skill: $skill) {
      id
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`;

export interface UpdateProfileSkillInput {
  userId: string;
  name: string;
  categoryId?: string | null;
  mastery: Mastery;
}

export async function updateProfileSkill(input: UpdateProfileSkillInput): Promise<Profile> {
  const data = await graphqlRequest<
    { addProfileSkill: Profile },
    { skill: UpdateProfileSkillInput }
  >(UPDATE_PROFILE_SKILL, { skill: input });

  return data.addProfileSkill;
}
