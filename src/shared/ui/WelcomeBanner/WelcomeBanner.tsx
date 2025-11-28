import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import picture from "./assets/picture.png";

export function WelcomeBanner() {
  const { t } = useTranslation("auth");
  return (
    <Box
      sx={(theme) => ({
        bgcolor: theme.palette.secondary.main,
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.primary.contrastText,
        p: theme.spacing(6),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: theme.shadows[4],
        width: "100%",
        maxWidth: 500,
      })}
    >
      <Box
        sx={(theme) => ({
          pl: theme.spacing(6),
        })}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h2" sx={{ fontWeight: 700, letterSpacing: -0.5 }}>
            {t("banner.title")}
          </Typography>
        </Stack>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {t("banner.subtitle1")}
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.9, whiteSpace: "pre-line", mb: 3 }}>
            {t("banner.subtitle2")}
          </Typography>
        </Box>

        <Box
          component="img"
          src={picture}
          alt="Welcome illustration"
          sx={() => ({
            width: "100%",
            height: "auto",
            objectFit: "contain",
            display: "block",
            marginInline: "auto",
            maxWidth: {
              xs: 260,
              sm: 320,
              md: 380,
              lg: 440,
            },
          })}
        />
      </Box>
    </Box>
  );
}
