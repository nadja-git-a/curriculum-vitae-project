import { graphqlRequest } from "features/authFeatures/api/authFetch";
import type { Profile } from "shared/model/types";

export const GET_PROFILE = `
  query GetProfile($userId: ID!) {
    profile(userId: $userId) {
      id
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

export async function fetchProfile(userId: string): Promise<Profile> {
  const res = await graphqlRequest<{ profile: Profile }, { userId: string }>(GET_PROFILE, {
    userId,
  });

  return res.profile;
}
