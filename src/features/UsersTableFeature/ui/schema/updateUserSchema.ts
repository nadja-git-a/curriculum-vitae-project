import type { TFunction } from "i18next";
import { z } from "zod";

export const UpdateUserSchema = (t: TFunction<"errors">) =>
  z.object({
    userId: z.string(),
    firstName: z.string().trim().min(1, t("errors.requiredField")),
    lastName: z.string().trim().min(1, t("errors.requiredField")),
    departmentId: z.string().nonempty(t("errors.requiredField")),
    positionId: z.string().nonempty(t("errors.requiredField")),
    role: z.enum(["Employee", "Admin"]).optional(),
  });

export type ModalType = z.infer<ReturnType<typeof UpdateUserSchema>>;
