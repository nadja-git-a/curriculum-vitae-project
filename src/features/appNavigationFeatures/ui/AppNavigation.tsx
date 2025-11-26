import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "app/store/authStore";

import { navigators } from "./navigation";

export function AppNavigation() {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation(["common"]);
  const user = useAuthStore((store) => store.user);
  const navigate = useNavigate();
  let initials;

  if (user?.profile.full_name) {
    initials = user?.profile.full_name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }

  const fullNameOrEmail = user?.profile.full_name || user?.email || "";

  return (
    <Box
      sx={{
        height: "98vh",
        width: expanded ? 200 : 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        bgcolor: "secondary.main",
        color: "primary.contrastText",
        borderRadius: 2,
        gap: 1,
        transition: "width 0.2s ease",
        overflow: "hidden",
      }}
    >
      <List
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {navigators.map((nav) => (
          <ListItemButton
            key={nav.link}
            onClick={() => navigate(nav.link)}
            sx={{
              borderRadius: 999,
              justifyContent: expanded ? "flex-start" : "center",
              px: expanded ? 1.5 : 1,
              color: "primary.contrastText",
              "&:hover": {
                bgcolor: "primary.light",
                color: "primary.dark",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: expanded ? 1.5 : 0,
                justifyContent: "center",
                color: "inherit",
              }}
            >
              {nav.icon}
            </ListItemIcon>

            {expanded && (
              <ListItemText
                primary={t(nav.translation)}
                slotProps={{
                  primary: {
                    variant: "body2",
                    sx: { fontWeight: 600 },
                  },
                }}
              />
            )}
          </ListItemButton>
        ))}
      </List>

      <Box
        sx={{
          pt: 1.5,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1,
            px: expanded ? 1 : 0,
            justifyContent: expanded ? "flex-start" : "center",
          }}
        >
          <Avatar
            src={user?.profile.avatar ?? undefined}
            sx={{
              width: 36,
              height: 36,
              bgcolor: user?.profile.avatar ? "transparent" : "secondary.main",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            {initials}
          </Avatar>
          {expanded && (
            <Typography noWrap variant="body2" sx={{ maxWidth: 150 }}>
              {fullNameOrEmail}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: expanded ? "flex-start" : "center",
            px: expanded ? 1 : 0,
            p: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={() => setExpanded((prev) => !prev)}
            sx={{ color: "secondary.contrastText" }}
          >
            {expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
