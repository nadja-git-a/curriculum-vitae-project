import { Box, Grid } from "@mui/material";

import { AuthSwitch } from "features/authSwitchFeature/ui/AuthSwitch/AuthSwitch";
import { SignUpForm } from "features/signUpFeatures/ui/SignUpForm/SignUpForm";
import { WelcomeBanner } from "shared/ui/WelcomeBanner/WelcomeBanner";

export default function SignUpPage() {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      })}
    >
      <Box sx={{ mb: 6 }}>
        <AuthSwitch />
      </Box>

      <Grid
        container
        spacing={6}
        sx={{
          maxWidth: 1200,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Box sx={{ display: "inline-block" }}>
            <WelcomeBanner />
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            justifyContent: "center",
          }}
        >
          <SignUpForm />
        </Grid>
      </Grid>
    </Box>
  );
}
