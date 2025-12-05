import i18n from "app/internalization/i18n";
import { apiFetch } from "shared/api";
import { type GraphQLResponse } from "shared/api/types";
import type { Skill } from "shared/model/types";

const t = i18n.getFixedT(null, "common");

export const SKILLS = `
  query Skills {
  skills {
    id
    name
    category {
      id
      order
      __typename
    }
    category_name
    category_parent_name
    __typename
  }
}
`;

interface Skills {
  skills: Skill[];
}

export async function fetchSkills() {
  const res = await apiFetch<GraphQLResponse<Skills>>("/graphql", {
    method: "POST",
    data: { query: SKILLS },
  });

  if (res.errors?.length) {
    throw new Error(res.errors[0].message);
  }

  if (!res.data) {
    throw new Error(t("actions.unknownError"));
  }
  return res.data.skills;
}
