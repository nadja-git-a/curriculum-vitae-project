import { Box } from "@mui/material";

import { AppNavigation } from "features/appNavigationFeatures/ui/AppNavigation";
import { UserSkills } from "features/userSkillsFeatures/ui/UserSkills";

import "../../shared/api/refreshInterceptor";

export default function UserSkillsPage() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flexShrink: 0 }}>
        <AppNavigation />
      </Box>

      <Box sx={{ flex: 1, overflow: "auto", p: 3 }}>
        <UserSkills />
      </Box>
    </Box>
  );
}
