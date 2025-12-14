import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAuthStore } from "app/store/authStore";

import { createCVSchema, type CreateCVSchemaType } from "./schema/schema";
import { useCreateCv } from "../api/createCV/createCVQuery";

interface CreateCV {
  open: boolean;
  onClose: () => void;
}

export function CreateCVModal({ open, onClose }: CreateCV) {
  const { t } = useTranslation(["common", "usersCVs"]);
  const { t: tError } = useTranslation(["errors"]);

  const user = useAuthStore((store) => store.user);
  const userId = String(user?.id);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCVSchemaType>({
    resolver: zodResolver(createCVSchema(tError)),
    defaultValues: {
      userId,
      name: "",
      education: "",
      description: "",
    },
  });

  const { mutate: createCV, isPending } = useCreateCv();

  const onSubmit = (values: CreateCVSchemaType) => {
    createCV({
      userId: userId,
      name: values.name,
      education: values.education,
      description: values.description,
    });

    reset({ userId, name: "", education: "", description: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        component="form"
        id="create-cv-form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          m: 3,
        }}
      >
        <DialogTitle component="div" sx={{ pb: 1 }}>
          <Typography variant="h3">{t("usersCVs:actions.createCv")}</Typography>
        </DialogTitle>

        <DialogContent
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <TextField
            label={t("usersCVs:table.name")}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ mt: 2 }}
          ></TextField>

          <TextField
            label={t("usersCVs:table.education")}
            {...register("education")}
            error={!!errors.education}
            helperText={errors.education?.message}
          ></TextField>

          <TextField
            label={t("usersCVs:actions.description")}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          ></TextField>
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
            form="create-cv-form"
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
