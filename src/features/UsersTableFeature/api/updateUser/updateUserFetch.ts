import i18n from "app/internalization/i18n";
import { apiFetch } from "shared/api";
import type { GraphQLResponse } from "shared/api/types";
import type { User, UserRole } from "shared/model/types";

const t = i18n.getFixedT(null, "common");

export interface UpdateUserInput {
  userId: string;
  cvsIds?: string[];
  departmentId?: string | null;
  positionId?: string | null;
  role?: UserRole;
}
interface UpdateUserData {
  updateUser: User;
}

const UPDATE_USER = `
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      email
      profile {
        avatar
        first_name
        last_name
      }
      position_name
      department_name
      role
    }
  }
`;

export async function updateUser(input: UpdateUserInput): Promise<User> {
  const res = await apiFetch<GraphQLResponse<UpdateUserData>>("/graphql", {
    method: "POST",
    data: {
      query: UPDATE_USER,
      variables: { user: input },
    },
  });

  if (res.errors?.length) {
    throw new Error(res.errors[0].message);
  }

  if (!res.data) {
    throw new Error(t("actions.unknownError"));
  }

  return res.data.updateUser;
}
