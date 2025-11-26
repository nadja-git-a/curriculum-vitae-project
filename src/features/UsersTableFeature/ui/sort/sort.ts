import type { HeadCells, SortingField } from "features/UsersTableFeature/model/types";
import type { User } from "shared/model/types";

export function getSortValue(user: User, field: SortingField): string {
  switch (field) {
    case "first_name":
      return user.profile.first_name ?? "";
    case "last_name":
      return user.profile.last_name ?? "";
    case "email":
      return user.email ?? "";
    case "department_name":
      return user.department_name ?? "";
    case "position_name":
      return user.position_name ?? "";
  }
}

export function isSortingField(id: HeadCells["id"]): id is SortingField {
  return id !== "nav" && id !== "avatar";
}

export function sortUsers(data: User[], order: "asc" | "desc", orderBy: SortingField) {
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
