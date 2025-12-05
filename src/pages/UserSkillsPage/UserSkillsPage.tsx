import { Box } from "@mui/material";

import { UserSkills } from "features/userSkillsFeatures/ui/UserSkills";

import "../../shared/api/refreshInterceptor";

export default function UserSkillsPage() {
  return (
    <Box sx={{ m: 5 }}>
      <UserSkills />
    </Box>
  );
}
