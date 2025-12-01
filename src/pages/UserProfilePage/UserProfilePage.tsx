import { Box } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";

import { AppNavigation } from "features/appNavigationFeatures/ui/AppNavigation";
import { UserProfile } from "features/userProfileFeatures/ui/UserProfile";

export default function UserProfilePage() {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/users" />;
  }

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box>
        <AppNavigation />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0, p: 3 }}>
        <UserProfile id={id} />
      </Box>
    </Box>
  );
}
