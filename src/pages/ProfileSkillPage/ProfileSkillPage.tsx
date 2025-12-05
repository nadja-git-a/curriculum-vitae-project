import { Box } from "@mui/material";

import { AppNavigation } from "features/appNavigationFeatures/ui/AppNavigation";
import { ProfileNavigation } from "features/profileNavigationFeatures/ui/ProfileNavigation";
import { UserSkills } from "features/userSkillsFeatures/ui/UserSkills";

export default function ProfileSkillPage() {
  return (
    <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppNavigation />
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Box>
          <ProfileNavigation />
        </Box>

        <Box sx={{ flex: 1, overflow: "auto", p: 3 }}>
          <UserSkills />
        </Box>
      </Box>
    </Box>
  );
}
