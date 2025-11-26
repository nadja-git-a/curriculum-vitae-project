import type { TFunction } from "i18next";
import { z } from "zod";

export const UpdateUserSchema = (t: TFunction<"errors">) =>
  z.object({
    firstName: z.string().trim().min(1, t("errors.firstNameRequired")),
    lastName: z.string().trim().min(1, t("errors.lastNameRequired")),
  });

export type UpdateUserSchemaType = z.infer<ReturnType<typeof UpdateUserSchema>>;
