import type { TFunction } from "i18next";
import z from "zod";

export const createCVSchema = (t: TFunction<"errors">) =>
  z.object({
    userId: z.string(),
    name: z.string().nonempty(t("errors.requiredField")),
    education: z.string().optional(),
    description: z.string().nonempty(t("errors.requiredField")),
  });

export type CreateCVSchemaType = z.infer<ReturnType<typeof createCVSchema>>;
