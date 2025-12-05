import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { AppNavigation } from "features/appNavigationFeatures/ui/AppNavigation";

export function AppWrapper() {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box>
        <AppNavigation />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
