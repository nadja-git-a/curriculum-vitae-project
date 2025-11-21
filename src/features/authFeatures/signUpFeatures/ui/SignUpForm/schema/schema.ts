import { type TFunction } from "i18next";
import { z } from "zod/v4";

export const signUpSchema = (t: TFunction<"errors">) =>
  z
    .object({
      email: z.email(t("errors.invalidEmail")),
      password: z.string().min(6, t("errors.minPassword")),
      repeatPassword: z.string().min(6, t("errors.minPassword")),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: t("errors.passwordsMustMatch"),
      path: ["repeatPassword"],
    });

export type SignUpType = z.infer<ReturnType<typeof signUpSchema>>;
