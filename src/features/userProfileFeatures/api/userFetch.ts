import i18n from "app/internalization/i18n";
import { apiFetch } from "shared/api";
import { type GraphQLResponse } from "shared/api/types";
import type { User } from "shared/model/types";

const t = i18n.getFixedT(null, "common");

export const USER = `
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      email
      profile {
        avatar
        first_name
        last_name
        full_name
        created_at
      }
      department_name
      department {
        id
      }
      position_name
      position {
        id
      }
    }
  }
`;

type UserQueryData = {
  user: User;
};

export async function fetchUser(id: string): Promise<User> {
  const res = await apiFetch<GraphQLResponse<UserQueryData>>("/graphql", {
    method: "POST",
    data: {
      query: USER,
      variables: { userId: id },
    },
  });

  if (res.errors?.length) {
    throw new Error(res.errors[0].message);
  }

  if (!res.data) {
    throw new Error(t("actions.unknownError"));
  }

  return res.data.user;
}
