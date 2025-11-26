import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
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
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "app/store/authStore";
import type { User } from "shared/model/types";

import { isSortingField, sortUsers } from "./sort/sort";
import { UpdateUserModal } from "./UpdateUserModal";
import { useDeleteUser } from "../api/updateUser/deleteUserFetch";
import { useUsers } from "../api/users/usersQuery";
import type { HeadCells, Order, SortingField } from "../model/types";

import "../api/users/usersInterceptor";

export const headCells: HeadCells[] = [
  { id: "avatar" },
  { id: "first_name", label: "table.firstName" },
  { id: "last_name", label: "table.lastName" },
  { id: "email", label: "table.email" },
  { id: "department_name", label: "table.department" },
  { id: "position_name", label: "table.position" },
  { id: "nav" },
];

export function UsersTable({ search }: { search: string }) {
  const { data } = useUsers();

  const clearAuth = useAuthStore((store) => store.clearAuth);
  const user = useAuthStore((store) => store.user);
  const isAdmin = user?.role === "Admin";

  const [menuUser, setMenuUser] = useState<User | null>(null);
  const [updateOpen, setUpdateOpen] = useState(false);

  const { t } = useTranslation(["users"]);
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<SortingField>("first_name");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { mutate: deleteUser } = useDeleteUser();

  const removeUser = (userId: string) => {
    deleteUser(
      { userId },
      {
        onSuccess: () => {
          if (user?.id === userId) {
            clearAuth();
          }
        },
      }
    );
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: User) => {
    setAnchorEl(event.currentTarget);
    setMenuUser(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleRequestSort = (field: SortingField) => () => {
    const isAsc = orderBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const filteredRows = useMemo(() => {
    if (!data) return [];

    const query = search.trim().toLowerCase();
    if (!query) return data;

    return data.filter((user) => {
      return [user.profile.first_name, user.profile.last_name, user.email].some((v) =>
        v?.toLowerCase().includes(query)
      );
    });
  }, [data, search]);

  const sortedRows = useMemo(
    () => sortUsers(filteredRows, order, orderBy),
    [filteredRows, order, orderBy]
  );

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

          <TableBody
            sx={{
              "& .MuiTableRow-root:hover": {
                bgcolor: "primary.light",
                cursor: "pointer",
              },
              "& .MuiTableCell-root": {
                color: "text.primary",
                borderBottomColor: "divider",
              },
            }}
          >
            {sortedRows?.map((row, index) => (
              <TableRow key={index} hover>
                <TableCell>
                  <Avatar src={row.profile.avatar ?? undefined} />
                </TableCell>
                <TableCell>{row.profile.first_name ?? ""}</TableCell>
                <TableCell>{row.profile.last_name ?? ""}</TableCell>
                <TableCell>{row.email ?? ""}</TableCell>
                <TableCell>{row.department_name ?? ""}</TableCell>
                <TableCell>{row.position_name ?? ""}</TableCell>
                <TableCell>
                  {isAdmin || user?.email === row.email ? (
                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, row)}>
                      <MoreVertIcon />
                    </IconButton>
                  ) : (
                    <IconButton size="small" onClick={() => navigate("/user")}>
                      <ChevronRightIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
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
            navigate(`/user/${menuUser?.id}`);
            handleMenuClose();
          }}
        >
          {t("menu.profile")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            setUpdateOpen(true);
            handleMenuClose();
          }}
        >
          {t("menu.updateUser")}
        </MenuItem>

        <MenuItem
          onClick={() => {
            if (menuUser) {
              removeUser(menuUser.id);
            }
            handleMenuClose();
          }}
        >
          {t("menu.deleteUser")}
        </MenuItem>
      </Menu>

      <UpdateUserModal open={updateOpen} onClose={() => setUpdateOpen(false)} user={menuUser} />
    </>
  );
}
