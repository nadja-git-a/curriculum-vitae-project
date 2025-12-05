import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Box, Breadcrumbs, Button, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthStore } from "app/store/authStore";

export function ProfileNavigation() {
  const { t } = useTranslation(["common"]);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((store) => store.user);

  const userId = user?.id ?? "";

  const pathname = location.pathname;
  const section: "profile" | "skills" | "languages" = pathname.endsWith("/skills")
    ? "skills"
    : pathname.endsWith("/languages")
      ? "languages"
      : "profile";

  const sectionLabel =
    section === "profile"
      ? t("common:navigation.profile")
      : section === "skills"
        ? t("common:navigation.skills")
        : t("common:navigation.languages");

  const tabs = [
    {
      key: "profile",
      label: t("common:navigation.profile"),
      path: `/user/${userId}/profile`,
    },
    {
      key: "skills",
      label: t("common:navigation.skills"),
      path: `/user/${userId}/skills`,
    },
    {
      key: "languages",
      label: t("common:navigation.languages"),
      path: `/user/${userId}/languages`,
    },
  ] as const;

  return (
    <Box
      sx={{
        mb: 3,
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ px: 3, pt: 2 }}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator="›"
          sx={{ color: "text.secondary", fontSize: 14 }}
        >
          <Button
            variant="text"
            color="inherit"
            onClick={() => navigate("/users")}
            sx={{
              p: 0,
              minWidth: 0,
              fontSize: 14,
              textTransform: "none",
              "&:hover": { textDecoration: "underline", bgcolor: "transparent" },
            }}
          >
            {t("common:navigation.employees")}
          </Button>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <PersonOutlineOutlinedIcon fontSize="small" sx={{ color: "primary.main" }} />
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                color: "primary.main",
              }}
            >
              {user?.profile.full_name}
            </Typography>
          </Stack>

          {section !== "profile" && (
            <Typography sx={{ fontSize: 14, color: "text.secondary" }}>{sectionLabel}</Typography>
          )}
        </Breadcrumbs>
      </Box>

      <Box
        sx={{
          mt: 2,
          px: 3,
          display: "flex",
          gap: 4,
        }}
      >
        {tabs.map((tab) => {
          const isActive = section === tab.key;

          return (
            <Button
              key={tab.key}
              onClick={() => navigate(tab.path)}
              disableRipple
              sx={{
                position: "relative",
                px: 0,
                pb: 1.2,
                borderRadius: 0,
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                color: isActive ? "primary.main" : "text.primary",
                bgcolor: "transparent",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: 2,
                  bgcolor: isActive ? "primary.main" : "transparent",
                  transition: (theme) => theme.transitions.custom,
                },
                "&:hover": {
                  bgcolor: "transparent",
                  color: "primary.main",
                },
              }}
            >
              {tab.label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
