import React from "react";
import { GridColumns } from "@mui/x-data-grid";
import { IconButton, Stack, Link, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

type ColumnProps = {
  onDelete(productId: string): void; 
  onEdit(productId: string): void; 
}

export const columns : GridColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'email',
      headerName: 'Email',
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: 'name',
      headerName: 'Customer Name',
      valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`,
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: 'contact',
      headerName: 'Contact #',
      width: 150,
    },
    {
      field: 'address',
      headerName: 'Address',
      minWidth: 250,
      flex: 1
    },
  ];