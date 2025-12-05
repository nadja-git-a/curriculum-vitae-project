import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListSubheader,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useAuthStore } from "app/store/authStore";
import type { Mastery, Skill } from "shared/model/types";

import { type SkillSchema, skillSchema } from "./schema/skillSchema";
import { useSkills } from "../api/skills/skillsQuery";
import { useUpdateProfileSkill } from "../api/updateProfileSkill/updateSkillQuery";

interface SkillModal {
  open: boolean;
  mastery: Mastery;
  skillId: string;
  onClose: () => void;
}

const MASTERY_VALUES: Mastery[] = ["Novice", "Advanced", "Competent", "Proficient", "Expert"];

export function UpdateSkillModal({ open, onClose, skillId, mastery }: SkillModal) {
  const { t } = useTranslation(["skills", "common", "mastery"]);
  const { t: tErrors } = useTranslation("errors");
  const user = useAuthStore((store) => store.user);
  const { mutate: updateSkill, isPending } = useUpdateProfileSkill();
  const { data: skills } = useSkills();

  const { control, reset, handleSubmit } = useForm<SkillSchema>({
    resolver: zodResolver(skillSchema(tErrors)),
    defaultValues: {
      skill: skillId,
      mastery,
    },
  });

  useEffect(() => {
    reset({ skill: skillId, mastery });
  }, [skillId, mastery, reset]);

  const groupedSkills = useMemo(() => {
    if (!skills) return [];

    const map = new Map<string, { categoryId: string; categoryName: string; skills: Skill[] }>();

    skills.forEach((s) => {
      const categoryId = s.category?.id ?? "other";
      const categoryName = s.category_name ?? "Other";

      if (!map.has(categoryId)) {
        map.set(categoryId, {
          categoryId,
          categoryName,
          skills: [],
        });
      }

      map.get(categoryId)!.skills.push(s);
    });

    return Array.from(map.values()).sort((a, b) => a.categoryName.localeCompare(b.categoryName));
  }, [skills]);

  const skillOptions = useMemo(
    () =>
      groupedSkills.flatMap((group) => [
        <ListSubheader
          key={`header-${group.categoryId}`}
          disableSticky
          sx={{
            bgcolor: "background.paper",
            color: "text.secondary",
            fontWeight: 600,
            fontSize: "theme.typography.h3.fontSize",
          }}
        >
          {group.categoryName}
        </ListSubheader>,
        ...group.skills.map((s) => (
          <MenuItem key={s.id} value={s.id}>
            {s.name}
          </MenuItem>
        )),
      ]),
    [groupedSkills]
  );

  const onSubmit = (values: SkillSchema) => {
    if (!skills) return;

    const selected = skills.find((s) => s.id === values.skill);

    if (!selected) {
      toast.error(tErrors("unknownError"));
      return;
    }

    updateSkill({
      userId: user?.id ?? "",
      name: selected.name,
      categoryId: selected.category?.id ?? null,
      mastery: values.mastery,
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <DialogTitle component="div" sx={{ pb: 1 }}>
          <Typography variant="h3">{t("skills:actions.updateSkill")}</Typography>
        </DialogTitle>

        <DialogContent
          sx={{
            pt: 0,
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <Controller
            name="skill"
            control={control}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label={t("skills:title")}
                disabled
                {...field}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
                sx={{
                  mt: 5,
                }}
              >
                {skillOptions}
              </TextField>
            )}
          />

          <Controller
            name="mastery"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                select
                label={t("mastery:title")}
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
                value={field.value ?? ""}
              >
                <MenuItem value=""> </MenuItem>

                {MASTERY_VALUES.map((level) => (
                  <MenuItem key={level} value={level}>
                    {t(`mastery:${level}`)}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            pt: 1,
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
          }}
        >
          <Button
            variant="text"
            color="inherit"
            onClick={onClose}
            sx={{
              px: 2.5,
              borderRadius: 999,
            }}
          >
            {t("common:actions.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
            sx={{
              px: 3,
              borderRadius: 999,
              boxShadow: "none",
              transition: (theme) => theme.transitions.custom,
              "&:hover": {
                boxShadow: 4,
                bgcolor: "primary.dark",
              },
            }}
          >
            {t("common:actions.save")}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
