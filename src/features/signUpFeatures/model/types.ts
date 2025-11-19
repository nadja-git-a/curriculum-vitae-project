import type { User } from "shared/model/types";

export interface AuthInput {
  email: string;
  password: string;
}

export interface AuthResult {
  user: User;
  access_token: string;
  refresh_token: string;
}
