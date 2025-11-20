import { zodResolver } from "@hookform/resolvers/zod";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { logInSchema, type LogInType } from "./schema/schema";
import { useLogin } from "../../api/loginQuery";

export function LogInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending } = useLogin();

  const { t } = useTranslation(["login", "common", "errors"]);
  const { t: tErrors } = useTranslation("errors");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInType>({
    resolver: zodResolver(logInSchema(tErrors)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LogInType> = ({ email, password }) => {
    const data: LogInType = { email, password };
    login(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={(theme) => ({
        width: "80%",
        marginInline: "auto",
        display: "flex",
        flexDirection: "column",
        rowGap: theme.spacing(3),
      })}
    >
      <Typography
        variant="h1"
        color="primary.dark"
        sx={(theme) => ({
          marginBottom: theme.spacing(1),
          textAlign: "center",
        })}
      >
        {t("logInSubtitle")}
      </Typography>

      <TextField
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        type="email"
        label={t("common:actions.email")}
        placeholder="example@email.com"
      />

      <TextField
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        type={showPassword ? "text" : "password"}
        label={t("common:actions.password")}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isPending}
        sx={(theme) => ({
          marginTop: theme.spacing(1),
        })}
      >
        {t("common:actions.login")}
      </Button>

      <Button
        variant="text"
        fullWidth
        sx={(theme) => ({
          marginTop: theme.spacing(0.5),
        })}
      >
        {t("login:forgotPassword")}
      </Button>
    </Box>
  );
}
