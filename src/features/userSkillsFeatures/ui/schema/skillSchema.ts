import type { TFunction } from "i18next";
import z from "zod";

const MASTERY_VALUES = ["Novice", "Advanced", "Competent", "Proficient", "Expert"] as const;

export const masterySchema = z.enum(MASTERY_VALUES);

export const skillSchema = (t: TFunction<"errors">) =>
  z.object({
    skill: z.string().nonempty(t("errors.requiredField")),
    mastery: masterySchema,
  });

export type SkillSchema = z.infer<ReturnType<typeof skillSchema>>;
