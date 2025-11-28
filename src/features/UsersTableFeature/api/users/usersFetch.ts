import i18n from "app/internalization/i18n";
import { apiFetch } from "shared/api";
import type { GraphQLResponse } from "shared/api/types";
import type { User } from "shared/model/types";

const t = i18n.getFixedT(null, "common");

export const USERS = `
  query Users {
    users {
      id
      email
      profile {
        avatar
        first_name
        last_name
      }
      position_name
      department_name
      department {
        id
        name
      }
      position {
        id
        name
      }
    }
  }
`;

interface UsersData {
  users: User[];
}

export async function fetchUsers(): Promise<User[]> {
  const res = await apiFetch<GraphQLResponse<UsersData>>("/graphql", {
    method: "POST",
    data: {
      query: USERS,
    },
  });

  if (res.errors?.length) {
    throw new Error(res.errors[0].message);
  }

  if (!res.data) {
    throw new Error(t("actions.unknownError"));
  }

  return res.data.users;
}
