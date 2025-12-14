import type { AllHeadCells, AllIDs, IDs } from "features/CVTableFeature/model/types";
import type { Cv } from "shared/model/types";

type Id = IDs | AllIDs;

export function getSortValue(cv: Cv, field: Id): string {
  switch (field) {
    case "name":
      return cv.name ?? "";
    case "education":
      return cv.education ?? "";
    case "employee":
      return cv.user?.email ?? "";
    default:
      return field;
  }
}

export function isSortingField(id: AllHeadCells["id"]): id is Id {
  return id !== "nav" && id !== "description";
}

export function sortCvs(data: Cv[], order: "asc" | "desc", orderBy: Id) {
  return [...data].sort((a, b) => {
    const aValue = getSortValue(a, orderBy)?.trim() ?? "";
    const bValue = getSortValue(b, orderBy)?.trim() ?? "";

    const aEmpty = aValue === "";
    const bEmpty = bValue === "";

    if (aEmpty && !bEmpty) return 1;
    if (!aEmpty && bEmpty) return -1;
    if (aEmpty && bEmpty) return 0;

    const comparison = aValue.localeCompare(bValue, "ru", { sensitivity: "base" });

    return order === "asc" ? comparison : -comparison;
  });
}
