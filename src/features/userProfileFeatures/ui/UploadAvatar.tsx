import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Box, Button, IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAuthStore } from "app/store/authStore";
import type { User } from "shared/model/types";

import { readFile } from "./manageFile/readFile";
import { useDeleteAvatar } from "../api/deleteAvatarQuery";
import { useUploadAvatar } from "../api/uploadAvatarQuery";

interface UploadAvatar {
  user: User;
}

export function UploadAvatar({ user }: UploadAvatar) {
  const { t } = useTranslation(["userProfile"]);
  const { t: tErrors } = useTranslation(["errors"]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const userStore = useAuthStore((store) => store.user);
  const isAdmin = userStore?.role === "Admin";
  const isMe = userStore?.id === user?.id;

  const hasAvatar = !!user?.profile.avatar;
  const canEdit = isAdmin || isMe;
  const canDelete = hasAvatar && canEdit;

  const { mutate: uploadAvatar, isPending: isUploading } = useUploadAvatar();
  const { mutate: deleteAvatar, isPending: isDeleting } = useDeleteAvatar();

  const [isDragOver, setIsDragOver] = useState(false);

  const handleClickUpload = () => {
    if (!canEdit) return;
    fileInputRef.current?.click();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    if (!canEdit) return;

    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!canEdit) return;
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!canEdit) return;
    setIsDragOver(false);
  };

  const handleRemoveAvatar = () => {
    if (!user.id) return;
    deleteAvatar(user.id);
  };

  const handleFile = async (file: File) => {
    if (!user?.id) return;

    const processedFile = await readFile(file, tErrors);
    if (!processedFile) return;

    uploadAvatar({
      userId: user.id,
      base64: processedFile.base64,
      size: processedFile.size,
      type: processedFile.type,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    event.target.value = "";
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: 120,
          height: 120,
        }}
      >
        <Avatar
          src={user.profile.avatar || ""}
          sx={{
            width: "100%",
            height: "100%",
          }}
        />

        {canDelete ? (
          <IconButton
            onClick={handleRemoveAvatar}
            disabled={isDeleting || isUploading}
            sx={(theme) => ({
              position: "absolute",
              top: -6,
              right: -6,
              width: 28,
              height: 28,
              borderRadius: "50%",
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              boxShadow: 2,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            })}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        ) : (
          <span />
        )}
      </Box>

      <input type="file" accept="image/*" ref={fileInputRef} hidden onChange={handleFileChange} />

      {canEdit ? (
        <Box
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{ mt: 2, display: "inline-block" }}
        >
          <Button
            onClick={handleClickUpload}
            disabled={isUploading || isDeleting}
            sx={{
              borderStyle: isDragOver ? "dashed" : "solid",
              borderColor: isDragOver ? "primary.main" : "transparent",
            }}
          >
            {t("userProfile:upload.title")}
          </Button>
        </Box>
      ) : (
        <span />
      )}
    </>
  );
}
