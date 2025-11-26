import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Search {
  value: string;
  onChange: (arg: string) => void;
}

export function SearchBar({ value, onChange }: Search) {
  const { t } = useTranslation(["common"]);
  return (
    <Box>
      <TextField
        size="small"
        variant="outlined"
        type="search"
        placeholder={t("actions.search")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ px: 2 }}
      />
      <SearchIcon color="primary" sx={{ p: 2 }} />
    </Box>
  );
}
