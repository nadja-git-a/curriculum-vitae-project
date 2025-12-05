import { graphqlRequest } from "features/authFeatures/api/authFetch";
import type { Profile } from "shared/model/types";

const DELETE_PROFILE_SKILL = `
  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
    }
  }
`;

export interface DeleteProfileSkillInput {
  userId: string;
  name: string[];
}

export async function deleteProfileSkill(input: DeleteProfileSkillInput): Promise<Profile> {
  const data = await graphqlRequest<
    { deleteProfileSkill: Profile },
    { skill: DeleteProfileSkillInput }
  >(DELETE_PROFILE_SKILL, { skill: input });

  return data.deleteProfileSkill;
}
