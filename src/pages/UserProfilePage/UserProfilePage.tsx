import { Box } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";

import { UserProfile } from "features/userProfileFeatures/ui/UserProfile";

export default function UserProfilePage() {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/users" />;
  }

  return (
    <Box sx={{ m: 5 }}>
      <UserProfile id={id} />
    </Box>
  );
}
