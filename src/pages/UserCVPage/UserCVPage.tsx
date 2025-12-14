import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { CreateCVModal } from "features/CVTableFeature/ui/createCVModal";
import { UserCVTable } from "features/CVTableFeature/ui/CVTableUser";
import { SearchBar } from "shared/ui/SearchBar/SearchBar";

export default function UserCVPage() {
  const { t } = useTranslation(["common", "usersCVs"]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <>
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
            {t("navigation.cvs")}
          </Typography>

          <SearchBar value={search} onChange={setSearch} />

          <Button sx={{ ml: "auto" }} onClick={() => setOpen(true)}>
            {t("usersCVs:actions.createCv")}
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1, minHeight: 0, maxHeight: "90vh", overflow: "auto" }}>
          <UserCVTable search={search} />
        </Box>
      </Box>

      <CreateCVModal open={open} onClose={() => setOpen((prev) => !prev)} />
    </>
  );
}
