import { type TFunction } from "i18next";
import { z } from "zod/v4";

export const logInSchema = (t: TFunction<"errors">) =>
  z.object({
    email: z.email(t("errors.invalidEmail")),
    password: z.string().min(6, t("errors.minPassword")),
  });

export type LogInType = z.infer<ReturnType<typeof logInSchema>>;
