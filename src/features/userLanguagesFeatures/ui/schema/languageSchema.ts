import type { TFunction } from "i18next";
import z from "zod";

import type { Proficiency } from "shared/model/types";

const PROFICIENCY_VALUES: Proficiency[] = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"] as const;

export const masterySchema = z.enum(PROFICIENCY_VALUES);

export const languageSchema = (t: TFunction<"errors">) =>
  z.object({
    language: z.string().nonempty(t("errors.requiredField")),
    proficiency: masterySchema,
  });

export type LanguageSchema = z.infer<ReturnType<typeof languageSchema>>;
