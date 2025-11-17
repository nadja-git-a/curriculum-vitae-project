import { ThemeProvider } from "@emotion/react";

import { theme } from "./theme/theme.ts";

import "./internalization/i18n.ts";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <div></div>
    </ThemeProvider>
  );
}
