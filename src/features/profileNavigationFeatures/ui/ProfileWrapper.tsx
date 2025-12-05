import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { ProfileNavigation } from "./ProfileNavigation";

export default function ProfileWrapper() {
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
      <Box>
        <ProfileNavigation />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
