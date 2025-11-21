import i18n from "app/internalization/i18n";
import { apiFetch } from "shared/api";

const t = i18n.getFixedT(null, "common");

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function graphqlRequest<TData, TVars = unknown>(
  query: string,
  variables?: TVars
): Promise<TData> {
  const res = await apiFetch<GraphQLResponse<TData>>("/graphql", {
    method: "POST",
    data: {
      query,
      variables,
    },
  });

  if (res.errors?.length) {
    throw new Error(res.errors[0].message);
  }

  if (!res.data) {
    throw new Error(t("actions.unknownError"));
  }

  return res.data;
}
