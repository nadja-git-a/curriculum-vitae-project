import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { UsersTable } from "features/UsersTableFeature/ui/UsersTable";
import { SearchBar } from "shared/ui/SearchBar/SearchBar";

export default function UsersPage() {
  const { t } = useTranslation(["common"]);
  const [search, setSearch] = useState("");

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        p: 2,
        overflow: "hidden",
      }}
    >
      <Box
        mb={2}
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Typography variant="h2" color="primary" sx={{ px: 2 }}>
          {t("navigation.employees")}
        </Typography>

        <SearchBar value={search} onChange={setSearch} />
      </Box>

      <Box sx={{ flexGrow: 1, minHeight: 0, maxHeight: "90vh", overflow: "auto" }}>
        <UsersTable search={search} />
      </Box>
    </Box>
  );
}
