import { Box, Tab, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export function AuthSwitch() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = location.pathname.includes("/auth/login");
  const isSignup = location.pathname.includes("/auth/signup");

  const value = isLogin ? 0 : isSignup ? 1 : false;

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) navigate("/auth/login");
    if (newValue === 1) navigate("/auth/signup");
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label={t("actions.login")} />
        <Tab label={t("actions.signUp")} />
      </Tabs>
    </Box>
  );
}
