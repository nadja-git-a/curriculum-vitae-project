import { Box } from "@mui/material";

import { UserLanguages } from "features/userLanguagesFeatures/ui/UserLanguages";

export default function ProfileLanguagesPage() {
  return (
    <Box sx={{ m: 5 }}>
      <UserLanguages />
    </Box>
  );
}
