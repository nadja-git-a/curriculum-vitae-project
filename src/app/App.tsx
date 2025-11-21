import { ThemeProvider } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import { queryClient } from "./api/index.ts";
import { AppRouter } from "./routes/AppRouter.tsx";
import { theme } from "./theme/theme.ts";

import "./internalization/i18n.ts";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <AppRouter />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
