import {
  Box,
  Button,
  Chip,
  keyframes,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useAuthStore } from "app/store/authStore";
import { useProfile } from "features/userSkillsFeatures/api/profile/profileQuery";
import type { Proficiency } from "shared/model/types";

import { AddLanguageModal } from "./AddLanguageModal";
import { UpdateLanguageModal } from "./UpdateLanguageModal";
import { useDeleteProfileLanguage } from "../api/deleteLanguage/deleteLanguageQuery";

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
  75% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
`;

const PROFICIENCY_PROGRESS = {
  A1: 15,
  A2: 29,
  B1: 43,
  B2: 57,
  C1: 71,
  C2: 85,
  Native: 100,
} as const;

export function UserLanguages() {
  const { t } = useTranslation(["skills", "common", "proficiency"]);

  const user = useAuthStore((store) => store.user);

  const userId = user?.id ?? "";

  const { data: profile } = useProfile(userId);

  const profileLanguages = profile?.languages;

  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<{
    language: string;
    proficiency: Proficiency;
  } | null>(null);

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());

  const toggleMode = (name: string) => {
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const handleSkillClick = (lang: { name: string; proficiency: Proficiency }) => {
    if (isDeleteMode) {
      toggleMode(lang.name);
    } else {
      setEditingLanguage({
        language: lang.name,
        proficiency: lang.proficiency,
      });
      setOpenUpdate(true);
    }
  };

  const { mutate: deleteLanguage, isPending: isDeleting } = useDeleteProfileLanguage();

  const handleDelete = () => {
    if (!user || selectedSkills.size === 0) return;

    deleteLanguage({
      userId: userId,
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

  const selectedCount = selectedSkills.size;

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

              {isDeleteMode && selectedCount === 0
                ? t("common:actions.cancel")
                : t("skills:actions.removeSkills")}
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

        {profileLanguages?.map((lang) => {
          const progress = PROFICIENCY_PROGRESS[lang.proficiency];
          const isSelected = selectedSkills.has(lang.name);

          return (
            <Button
              key={lang.name}
              onClick={() => handleSkillClick(lang)}
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
                    {lang.name}
                  </Typography>

                  <Chip
                    label={t(`proficiency:${lang.proficiency}`)}
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

      <AddLanguageModal open={openAdd} onClose={() => setOpenAdd((prev) => !prev)} />

      {editingLanguage && (
        <UpdateLanguageModal
          open={openUpdate}
          onClose={() => setOpenUpdate((prev) => !prev)}
          language={editingLanguage.language}
          proficiency={editingLanguage.proficiency}
        />
      )}
    </>
  );
}
