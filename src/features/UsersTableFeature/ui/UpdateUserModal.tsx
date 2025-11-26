import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useAuthStore } from "app/store/authStore";
import type { User, UserRole } from "shared/model/types";

import { UpdateUserSchema } from "./schema/updateUserSchema";
import { useDepartments } from "../api/updateUser/departmentFetch";
import { usePositions } from "../api/updateUser/positionsFetch";
import { useUpdateProfile } from "../api/updateUser/profileFetch";
import { useUpdateUser } from "../api/updateUser/updateUserQuery";

interface FormValues {
  userId: string;
  password: string;
  firstName: string;
  lastName: string;
  departmentId: string;
  positionId: string;
  role: UserRole;
}

interface UpdateUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

export function UpdateUserModal({ open, onClose, user }: UpdateUserModalProps) {
  const { t } = useTranslation(["common", "positions", "users"]);
  const { t: tErrors } = useTranslation(["errors"]);
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { mutate: updateProfile } = useUpdateProfile();
  const storeUpdate = useAuthStore((store) => store.updateUser);

  const { data: positions = [] } = usePositions();
  const { data: departments = [] } = useDepartments();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      userId: "",
      firstName: "",
      lastName: "",
      departmentId: "",
      positionId: "",
      role: "Employee",
    },
  });

  useEffect(() => {
    if (!user) return;

    reset({
      userId: user.id,
      firstName: user.profile.first_name ?? "",
      lastName: user.profile.last_name ?? "",
      departmentId: user.department?.id ?? "",
      positionId: user.position?.id ?? "",
      role: user.role,
    });
  }, [user, reset, open]);

  const onSubmit = (values: FormValues) => {
    if (!user) return;

    const schema = UpdateUserSchema(tErrors);
    const parsed = schema.safeParse(values);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;

      Object.values(fieldErrors)
        .flat()
        .forEach((msg) => {
          if (msg) toast.error(msg);
        });

      return;
    }
    updateUser(
      {
        userId: values.userId,
        departmentId: values.departmentId || null,
        positionId: values.positionId || null,
        role: values.role,
      },
      {
        onSuccess: (updatedUserFromUserMutation) => {
          updateProfile(
            {
              userId: values.userId,
              first_name: values.firstName || undefined,
              last_name: values.lastName || undefined,
            },
            {
              onSuccess: (updatedProfile) => {
                const patchedUser: User = {
                  ...updatedUserFromUserMutation,
                  profile: {
                    ...updatedUserFromUserMutation.profile,
                    first_name: updatedProfile.first_name ?? null,
                    last_name: updatedProfile.last_name ?? null,
                  },
                };

                storeUpdate(patchedUser);
                onClose();
              },
            }
          );
        },
      }
    );
  };

  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{t("users:menu.updateUser")}</DialogTitle>

      <DialogContent sx={{ mt: 1 }}>
        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2}>
          <TextField
            label={t("common:actions.email")}
            value={user.email}
            sx={{ mt: 2, gridColumn: { xs: "1 / -1", sm: "1 / -1" } }}
            disabled
            fullWidth
          />

          <TextField label={t("users:table.firstName")} {...register("firstName")} fullWidth />

          <TextField label={t("users:table.lastName")} {...register("lastName")} fullWidth />

          <Controller
            name="departmentId"
            control={control}
            render={({ field }) => (
              <TextField
                label={t("users:table.department")}
                select
                fullWidth
                value={field.value ?? ""}
                onChange={field.onChange}
              >
                <MenuItem value="">{t("users:table.department")}</MenuItem>

                {departments.map((dep) => (
                  <MenuItem key={dep.id} value={dep.id}>
                    {dep.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="positionId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                select
                fullWidth
                label={t("users:table.position")}
                value={field.value ?? ""}
                onChange={field.onChange}
                error={!!errors.positionId}
              >
                <MenuItem value="">{t("positions:noPosition")}</MenuItem>

                {positions.map((pos) => (
                  <MenuItem key={pos.id} value={pos.id}>
                    {pos.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <TextField
                sx={{ gridColumn: { xs: "1 / -1", sm: "1 / -1" } }}
                label={t("users:roles.role")}
                select
                value={field.value ?? "Employee"}
                onChange={field.onChange}
              >
                <MenuItem value="Employee">{t("users:roles.employee")}</MenuItem>
                <MenuItem value="Admin">{t("users:roles.admin")}</MenuItem>
              </TextField>
            )}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color="inherit">
          {t("common:actions.cancel")}
        </Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={isPending}>
          {t("common:actions.update")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
