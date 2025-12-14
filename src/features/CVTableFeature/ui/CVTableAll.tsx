import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "app/store/authStore";
import type { Order } from "features/UsersTableFeature/model/types";
import type { Cv } from "shared/model/types";

import { isSortingField, sortCvs } from "./sort/sort";
import { useCvs } from "../api/cvs/cvsQuery";
import { useDeleteCv } from "../api/deleteCV/deleteCVQuery";
import type { AllHeadCells, AllIDs } from "../model/types";

import "../../../shared/api/refreshInterceptor";

export const headCells: AllHeadCells[] = [
  { id: "name", label: "table.name" },
  { id: "education", label: "table.education" },
  { id: "employee", label: "table.employee" },
  { id: "nav" },
];

export function AllCVTable({ search }: { search: string }) {
  const { t } = useTranslation(["usersCVs"]);
  const navigate = useNavigate();

  const user = useAuthStore((store) => store.user);

  const { data: cvs } = useCvs();

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<AllIDs>("name");

  const handleRequestSort = (field: AllIDs) => () => {
    const isAsc = orderBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const filteredRows = useMemo(() => {
    if (!cvs) return [];

    const query = search.trim().toLowerCase();
    if (!query) return cvs;

    return cvs.filter((cv: Cv) => {
      return [cv.name, cv.education, cv.user?.email].some((v) => v?.toLowerCase().includes(query));
    });
  }, [cvs, search]);

  const sortedRows = useMemo(
    () => sortCvs(filteredRows, order, orderBy),
    [filteredRows, order, orderBy]
  );

  const [menu, setMenu] = useState<Cv | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: Cv) => {
    setAnchorEl(event.currentTarget);
    setMenu(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const { mutate: deleteCv } = useDeleteCv();

  const removeCv = (cvId: string) => {
    deleteCv({ cvId });
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          height: "100%",
          maxHeight: "100%",
          bgcolor: "background.default",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {headCells.map((cell) => (
                <TableCell key={cell.id}>
                  {isSortingField(cell.id) ? (
                    <TableSortLabel
                      active={orderBy === cell.id}
                      direction={orderBy === cell.id ? order : "asc"}
                      onClick={handleRequestSort(cell.id)}
                      sx={{
                        "& .MuiTableSortLabel-icon": {
                          color: "primary.light",
                        },
                      }}
                    >
                      {cell.label ? t(cell.label) : " "}
                      <Box component="span" />
                    </TableSortLabel>
                  ) : (
                    <Typography> </Typography>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedRows?.map((row) => (
              <Fragment key={row.id}>
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    "& td, & th": {
                      borderBottom: "none",
                    },
                  }}
                >
                  <TableCell>{row.name ?? ""}</TableCell>
                  <TableCell>{row.education ?? ""}</TableCell>
                  <TableCell>{row.user?.email ?? ""}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, row)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} sx={{ py: 2 }}>
                    {row.description}
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            navigate(``);
            handleMenuClose();
          }}
        >
          {t("usersCVs:actions.details")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            if (menu) {
              removeCv(menu.id);
            }
            handleMenuClose();
          }}
        >
          {t("usersCVs:actions.deleteCv")}
        </MenuItem>
      </Menu>
    </>
  );
}
