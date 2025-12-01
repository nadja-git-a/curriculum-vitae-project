import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAuthStore } from "app/store/authStore";
import type { AuthResult } from "features/authFeatures/model/types";
import { useDepartments } from "features/UsersTableFeature/api/updateUser/departmentFetch";
import { usePositions } from "features/UsersTableFeature/api/updateUser/positionsFetch";
import { useUpdateProfile } from "features/UsersTableFeature/api/updateUser/profileFetch";
import { useUpdateUser } from "features/UsersTableFeature/api/updateUser/updateUserQuery";

import { profileSchema, type ProfileSchemaType } from "./schema/profileSchema";
import { UploadAvatar } from "./UploadAvatar";
import { useUser } from "../api/userQuery";

import "../../../shared/api/refreshInterceptor";

interface UserProfileType {
  id: string;
}

export function UserProfile({ id }: UserProfileType) {
  const client = useQueryClient();

  const { t } = useTranslation(["userProfile", "users"]);
  const { t: tErrors } = useTranslation(["errors"]);

  const { data: positions = [] } = usePositions();
  const { data: departments = [] } = useDepartments();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { mutate: updateProfile } = useUpdateProfile();

  const { data } = useUser(id);

  const userStore = useAuthStore((store) => store.user);
  const updateStore = useAuthStore((store) => store.updateUser);

  const isAdmin = userStore?.role === "Admin";
  const isMe = userStore?.id === data?.id;
  const canEdit = isAdmin || isMe;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema(tErrors)),
    defaultValues: {
      firstName: "",
      lastName: "",
      departmentId: "",
      positionId: "",
    },
  });

  useEffect(() => {
    if (!data) return;

    reset({
      firstName: data.profile.first_name ?? "",
      lastName: data.profile.last_name ?? "",
      departmentId: data.department?.id ? String(data.department.id) : "",
      positionId: data.position?.id ? String(data.position.id) : "",
    });
  }, [data, reset]);

  if (!data?.profile.created_at) return;
  const date = new Date(Number(data.profile.created_at));

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  const onSubmit = (values: ProfileSchemaType) => {
    updateUser(
      {
        userId: id,
        departmentId: values.departmentId || null,
        positionId: values.positionId || null,
      },
      {
        onSuccess: (updatedUserFromUserMutation) => {
          updateProfile(
            {
              userId: id,
              first_name: values.firstName || undefined,
              last_name: values.lastName || undefined,
            },
            {
              onSuccess: (updatedProfile) => {
                client.invalidateQueries({ queryKey: ["user", id] });
                client.invalidateQueries({ queryKey: ["users"] });
                const currentUser = useAuthStore.getState().user;

                if (!currentUser || currentUser.id !== updatedUserFromUserMutation.id) {
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
                    full_name:
                      [updatedProfile.first_name, updatedProfile.last_name]
                        .filter(Boolean)
                        .join(" ") || currentUser.profile.full_name,
                  },
                };

                updateStore(patchedUser);
              },
            }
          );
        },
      }
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          py: 4,
        }}
      >
        <UploadAvatar user={data} />

        <Typography variant="h5" sx={{ mt: 2, textAlign: "center" }}>
          {data?.profile.full_name}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          {data?.email}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {t("memberSince")} {formattedDate}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            mt: 4,
            width: "100%",
            maxWidth: 700,
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 3,
          }}
        >
          <TextField
            {...register("firstName")}
            label={t("users:table.firstName")}
            fullWidth
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            disabled={!canEdit}
          />

          <TextField
            {...register("lastName")}
            label={t("users:table.lastName")}
            fullWidth
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            disabled={!canEdit}
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
                disabled={!canEdit}
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
                disabled={!canEdit}
              >
                {positions.map((pos) => (
                  <MenuItem key={pos.id} value={pos.id}>
                    {pos.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Box
            sx={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            {canEdit ? (
              <Button
                type="submit"
                variant="contained"
                sx={{ minWidth: 240, borderRadius: 999 }}
                disabled={isPending}
              >
                {t("userProfile:updateButton")}
              </Button>
            ) : (
              <span></span>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
