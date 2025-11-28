export type Order = "asc" | "desc";

export type SortingField =
  | "first_name"
  | "last_name"
  | "email"
  | "department_name"
  | "position_name";

export type Labels =
  | "table.firstName"
  | "table.lastName"
  | "table.email"
  | "table.department"
  | "table.position";

export interface HeadCells {
  id: SortingField | "nav" | "avatar";
  label?: Labels;
}
