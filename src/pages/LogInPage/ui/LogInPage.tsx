import { Box, Grid } from "@mui/material";

import { AuthSwitch } from "features/authFeatures/AuthSwitch/AuthSwitch";
import { LogInForm } from "features/authFeatures/logInFeature/ui/LogInForm/LogInForm";
import { WelcomeBanner } from "shared/ui/WelcomeBanner/WelcomeBanner";

export default function LogInPage() {
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
          <LogInForm />
        </Grid>
      </Grid>
    </Box>
  );
}
