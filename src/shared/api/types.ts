export interface GraphQLResponse<T> {
  data?: T | null;
  errors?: { message: string }[];
}
