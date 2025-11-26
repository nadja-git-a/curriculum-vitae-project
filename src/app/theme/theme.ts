import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4D7CFE",
      light: "#E3ECFF",
      dark: "#3756C6",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#3e8cff",
      light: "#EEE5FF",
      dark: "#5B21B6",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5F7FF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1E293B",
      secondary: "#64748B",
      disabled: "rgba(148, 163, 184, 0.7)",
    },
    divider: "rgba(148, 163, 184, 0.3)",
    success: {
      main: "#16A34A",
    },
    warning: {
      main: "#F59E0B",
    },
    error: {
      main: "#EF4444",
    },
    info: {
      main: "#0EA5E9",
    },
  },

  typography: {
    fontFamily: '"Nunito Sans", sans-serif',

    h1: {
      fontWeight: 700,
      fontSize: "2.25rem",
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
    },

    h2: {
      fontWeight: 700,
      fontSize: "1.75rem",
      letterSpacing: "-0.01em",
      lineHeight: 1.25,
    },

    h3: {
      fontWeight: 600,
      fontSize: "1.375rem",
      lineHeight: 1.3,
    },

    subtitle1: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.5,
    },

    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.6,
    },

    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },

    button: {
      fontWeight: 700,
      fontSize: "0.875rem",
      lineHeight: 1.6,
      textTransform: "none",
    },

    caption: {
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.4,
    },
  },
  spacing: 4,
  shape: {
    borderRadius: 8,
  },
});
