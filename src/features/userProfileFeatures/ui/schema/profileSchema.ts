import type { TFunction } from "i18next";
import { z } from "zod";

import { UpdateUserSchema } from "features/UsersTableFeature/ui/schema/updateUserSchema";

export const profileSchema = (t: TFunction<"errors">) =>
  UpdateUserSchema(t).omit({ userId: true, role: true });

export type ProfileSchemaType = z.infer<ReturnType<typeof profileSchema>>;
