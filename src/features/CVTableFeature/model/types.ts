export type AllLabels = "table.name" | "table.education" | "table.employee";
export type AllIDs = "name" | "education" | "employee" | "nav" | "description";

export interface AllHeadCells {
  id: AllIDs;
  label?: AllLabels;
}

export type Labels = "table.name" | "actions.description";
export type IDs = "name" | "description" | "nav";

export interface HeadCells {
  id: IDs;
  label?: Labels;
}
