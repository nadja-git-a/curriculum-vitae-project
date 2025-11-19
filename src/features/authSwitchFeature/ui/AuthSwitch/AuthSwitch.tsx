import { Box, Tab, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export function AuthSwitch() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Tabs value={location.pathname} onChange={handleChange} centered>
        <Tab label={t("actions.login")} value="/auth/login" />
        <Tab label={t("actions.signUp")} value="/auth/signup" />
      </Tabs>
    </Box>
  );
}
