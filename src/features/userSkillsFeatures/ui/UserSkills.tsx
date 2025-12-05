import { Box, Button, Chip, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAuthStore } from "app/store/authStore";
import type { Mastery } from "shared/model/types";

import { AddSkillModal } from "./AddSkillModal";
import { UpdateSkillModal } from "./UpdateSkillModal";
import { useDeleteProfileSkill } from "../api/deleteProfileSkills/deleteProfileSkillsQuery";
import { useProfile } from "../api/profile/profileQuery";
import { useSkills } from "../api/skills/skillsQuery";

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
  75% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
`;

const MASTERY_PROGRESS = {
  Novice: 20,
  Advanced: 40,
  Competent: 60,
  Proficient: 80,
  Expert: 100,
} as const;

export function UserSkills() {
  const { t } = useTranslation(["skills", "common", "mastery"]);

  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const user = useAuthStore((store) => store.user);

  const id = user?.id ?? "";

  const { data: profile } = useProfile(id);

  const profileSkills = profile?.skills ?? [];

  const { data: allSkills } = useSkills();

  const [editingSkill, setEditingSkill] = useState<{
    skillId: string;
    mastery: Mastery;
  } | null>(null);

  const skillIdByName = useMemo(() => {
    const skills = new Map<string, string>();

    if (!allSkills) return skills;

    allSkills.forEach((s) => {
      skills.set(s.name, s.id);
    });

    return skills;
  }, [allSkills]);

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());

  const toggleSkill = (name: string) => {
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const selectedCount = selectedSkills.size;

  const { mutate: deleteSkills, isPending: isDeleting } = useDeleteProfileSkill();

  const handleDelete = () => {
    if (!user || selectedSkills.size === 0) return;

    deleteSkills({
      userId: user.id,
      name: Array.from(selectedSkills),
    });

    setSelectedSkills(new Set());
  };

  const handleDeleteButtonClick = () => {
    if (!isDeleteMode) {
      setIsDeleteMode(true);
      setSelectedSkills(new Set());
      return;
    }

    if (selectedSkills.size === 0) {
      setIsDeleteMode(false);
      setSelectedSkills(new Set());
      return;
    }

    handleDelete();
    setIsDeleteMode(false);
  };

  if (!profileSkills) return null;

  return (
    <>
      <Paper elevation={0}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography color="primary" variant="h2">
            {t("skills:title")}
          </Typography>

          <Stack direction="row" spacing={1.5}>
            <Button
              variant="text"
              color={isDeleteMode ? "error" : "inherit"}
              disabled={isDeleting}
              onClick={handleDeleteButtonClick}
              sx={{ px: 2.5, borderRadius: 999 }}
            >
              {!isDeleteMode && t("skills:actions.removeSkills")}

              {isDeleteMode && selectedCount === 0 && t("common:actions.cancel")}

              {isDeleteMode && selectedCount > 0 && t("skills:actions.removeSkills")}
            </Button>

            <Button
              variant="contained"
              onClick={() => setOpenAdd(true)}
              disabled={isDeleteMode}
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
              {t("skills:actions.addSkill")}
            </Button>
          </Stack>
        </Stack>

        {profileSkills.map((skill) => {
          const progress = MASTERY_PROGRESS[skill.mastery];
          const isSelected = selectedSkills.has(skill.name);

          const handleSkillClick = () => {
            if (isDeleteMode) {
              toggleSkill(skill.name);
            } else {
              const skillId = skillIdByName.get(skill.name) ?? "";
              setEditingSkill({
                skillId,
                mastery: skill.mastery,
              });
              setOpenUpdate(true);
            }
          };

          return (
            <Button
              key={skill.name}
              onClick={handleSkillClick}
              sx={{ p: 0, textTransform: "none" }}
            >
              <Box
                sx={{
                  minWidth: 200,
                  p: 2,
                  borderRadius: 2,
                  border: isDeleteMode && isSelected ? "1px solid " : "",
                  transition: (theme) => theme.transitions.custom,
                  "&:hover": {
                    bgcolor: "background.paper",
                    boxShadow: 2,
                  },
                  animation: isDeleteMode && isSelected ? `${shake} 0.25s linear` : "none",
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle1" color="primary.main">
                    {skill.name}
                  </Typography>

                  <Chip
                    label={t(`mastery:${skill.mastery}`)}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      bgcolor: "primary.light",
                      color: "primary.dark",
                    }}
                  />
                </Stack>

                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 8,
                    borderRadius: 999,
                    "& .MuiLinearProgress-bar": { borderRadius: 999 },
                  }}
                />

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 0.5, display: "block" }}
                >
                  {progress}% mastery
                </Typography>
              </Box>
            </Button>
          );
        })}
      </Paper>

      <AddSkillModal open={openAdd} onClose={() => setOpenAdd(false)} />

      {editingSkill && (
        <UpdateSkillModal
          open={openUpdate}
          onClose={() => setOpenUpdate(false)}
          skillId={editingSkill.skillId}
          mastery={editingSkill.mastery}
        />
      )}
    </>
  );
}
