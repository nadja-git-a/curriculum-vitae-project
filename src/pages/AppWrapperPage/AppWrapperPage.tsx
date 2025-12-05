import { Box, CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { AppNavigation } from "features/appNavigationFeatures/ui/AppNavigation";

export default function AppWrapperPage() {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box>
        <AppNavigation />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
}
