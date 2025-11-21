import { zodResolver } from "@hookform/resolvers/zod";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import type { AuthInput } from "features/authFeatures/model/types";

import { signUpSchema, type SignUpType } from "./schema/schema";
import { useSignup } from "../../api/signupQuery";

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { t } = useTranslation(["signUp", "common", "errors"]);
  const { t: tErrors } = useTranslation("errors");

  const navigate = useNavigate();

  const { mutate: signup, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema(tErrors)),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpType> = ({ email, password }) => {
    const data: AuthInput = { email, password };
    signup(data);
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
        {t("signUpSubtitle")}
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

      <TextField
        {...register("repeatPassword")}
        error={!!errors.repeatPassword}
        helperText={errors.repeatPassword?.message}
        type="password"
        label={t("common:actions.repeatPassword")}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        loading={isPending}
        sx={(theme) => ({
          marginTop: theme.spacing(1),
        })}
      >
        {t("createAccount")}
      </Button>

      <Button
        variant="text"
        fullWidth
        sx={(theme) => ({
          marginTop: theme.spacing(0.5),
        })}
        onClick={() => navigate("/auth/login")}
      >
        {t("haveAccountMessage")}
      </Button>
    </Box>
  );
}
