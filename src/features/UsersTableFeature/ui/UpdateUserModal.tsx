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
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAuthStore } from "app/store/authStore";
import type { AuthResult } from "features/authFeatures/model/types";
import type { User } from "shared/model/types";

import { type ModalType, UpdateUserSchema } from "./schema/updateUserSchema";
import { useDepartments } from "../api/updateUser/departmentFetch";
import { usePositions } from "../api/updateUser/positionsFetch";
import { useUpdateProfile } from "../api/updateUser/profileFetch";
import { useUpdateUser } from "../api/updateUser/updateUserQuery";

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

  const userStore = useAuthStore((store) => store.user);
  const isAdmin = userStore?.role === "Admin";

  const { data: positions = [] } = usePositions();
  const { data: departments = [] } = useDepartments();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ModalType>({
    resolver: zodResolver(UpdateUserSchema(tErrors)),
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

  const onSubmit = (values: ModalType) => {
    if (!user) return;
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
                const currentUser = useAuthStore.getState().user;

                if (!currentUser || currentUser.id !== updatedUserFromUserMutation.id) {
                  onClose();
                  return;
                }

                const patchedUser: AuthResult["user"] = {
                  ...currentUser,
                  ...updatedUserFromUserMutation,
                  profile: {
                    ...currentUser.profile,
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
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{t("users:menu.updateUser")}</DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
          <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={5}>
            <TextField
              label={t("common:actions.email")}
              value={user.email}
              sx={{ mt: 2, gridColumn: { xs: "1 / -1", sm: "1 / -1" } }}
              disabled
              fullWidth
            />

            <TextField
              label={t("users:table.firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              {...register("firstName")}
              fullWidth
            />

            <TextField
              label={t("users:table.lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              {...register("lastName")}
              fullWidth
            />

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
                  error={!!errors.departmentId}
                  helperText={errors.departmentId?.message}
                >
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
                  helperText={errors.positionId?.message}
                >
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
                  disabled={!isAdmin}
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
          <Button variant="contained" type="submit" disabled={isPending}>
            {t("common:actions.update")}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
