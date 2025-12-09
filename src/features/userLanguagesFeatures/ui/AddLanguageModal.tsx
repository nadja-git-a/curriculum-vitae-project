import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAuthStore } from "app/store/authStore";
import type { Proficiency } from "shared/model/types";

import { type LanguageSchema, languageSchema } from "./schema/languageSchema";
import { useAddProfileLanguage } from "../api/addLanguage/addLanguageQuery";
import { useLanguages } from "../api/languages/languagesQuery";

interface LanguageModal {
  open: boolean;
  onClose: () => void;
}

export const PROFICIENCY_VALUES: Proficiency[] = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"];

export function AddLanguageModal({ open, onClose }: LanguageModal) {
  const userId = useAuthStore((store) => store.user?.id);
  const { t } = useTranslation(["language", "common", "proficiency"]);
  const { t: tErrors } = useTranslation("errors");

  const { control, handleSubmit } = useForm<LanguageSchema>({
    resolver: zodResolver(languageSchema(tErrors)),
    defaultValues: {
      language: "",
      proficiency: undefined,
    },
  });

  const { data: languages } = useLanguages();

  const { mutate: addLanguage, isPending: isAdding } = useAddProfileLanguage();

  const onSubmit = (values: LanguageSchema) => {
    addLanguage({
      userId: userId || "",
      name: values.language,
      proficiency: values.proficiency,
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
          <Typography variant="h3">{t("actions.addLanguage")}</Typography>
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
            name="language"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                select
                fullWidth
                label={t("common:navigation.languages")}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
                sx={{
                  mt: 5,
                }}
              >
                {languages?.map((lang) => (
                  <MenuItem key={lang.name} value={lang.name}>
                    {lang.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="proficiency"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                select
                label={t("language:title")}
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                {...field}
                value={field.value ?? ""}
              >
                <MenuItem value=""> </MenuItem>

                {PROFICIENCY_VALUES.map((level) => (
                  <MenuItem key={level} value={level}>
                    {t(`proficiency:${level}`)}
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
            disabled={isAdding}
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
