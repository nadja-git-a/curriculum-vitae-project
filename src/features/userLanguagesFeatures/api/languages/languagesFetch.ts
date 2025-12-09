import i18n from "app/internalization/i18n";
import { apiFetch } from "shared/api";
import type { GraphQLResponse } from "shared/api/types";
import type { Language } from "shared/model/types";

const t = i18n.getFixedT(null, "common");

export const LANGUAGES = `
  query Language {
    languages {
        id
        name
    }
}
`;

interface Languages {
  languages: Language[];
}

export async function fetchLanguages() {
  const res = await apiFetch<GraphQLResponse<Languages>>("/graphql", {
    method: "POST",
    data: { query: LANGUAGES },
  });

  if (res.errors?.length) {
    throw new Error(res.errors[0].message);
  }

  if (!res.data) {
    throw new Error(t("actions.unknownError"));
  }
  return res.data.languages;
}
