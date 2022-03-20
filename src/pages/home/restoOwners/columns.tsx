import React from "react";
import { GridColumns } from "@mui/x-data-grid";
import { IconButton, Stack, Link, Tooltip, Chip } from "@mui/material";
import { CheckCircle, Delete, DoNotDisturb, Edit } from "@mui/icons-material";
import { Status } from "types";

type ColumnProps = {
  onApprove(ownerId: string): void; 
  onDecline(ownerId: string): void; 
}

const statusColorMapping: Record<Status, string> = {
  declined: "#ff784e",
  pending: "#4dabf5",
  approved: "#6fbf73"
};

export const columns = (props: ColumnProps): GridColumns => {

  return [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Owner name',
      valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`,
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 150,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 150,
    },
    {
        field: 'status',
        headerName: 'Status',
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
            <Chip
                label={params.row.status}
                sx={{
                    backgroundColor: statusColorMapping[params.row.status as Status],
                    color: "white"
                }}
            />
        ),
        width: 150,
    },
    {
      field: 'avatarUrl',
      headerName: 'Avatar URL',
      renderCell: (params) => {
        return (
          <Tooltip title="Click to view" placement="top">
            <Link
              href={params.row.avatarUrl}
              target="_blank"
              sx={{
                width: "100%",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {params.row.avatarUrl}
            </Link>
          </Tooltip>
          
        )
      },
      width: 150,
    },
    {
      field: 'action',
      headerName: 'Action',
      align: "center",
      headerAlign: "center",
      disableColumnMenu: true,
      disableReorder: true,
      sortable: false,
      renderCell: (params) => {
          const id = params.row.id;
          const isPending = params.row.status === "pending";
          return (
            <Stack direction="row" spacing={0}>
                <IconButton disabled={!isPending} onClick={() => props.onApprove(id)}>
                    <Tooltip title="Approve" placement="top">
                        <CheckCircle sx={{ color: isPending ? "#4caf50" : "rgba(0, 0, 0, 0.26)" }} />
                    </Tooltip>
                </IconButton>
                <IconButton disabled={!isPending} onClick={() => props.onDecline(id)}>
                    <Tooltip title="Decline" placement="top">
                        <DoNotDisturb sx={{ color: isPending ? "#666" : "rgba(0, 0, 0, 0.26)" }} />
                    </Tooltip>
                </IconButton>
            </Stack>
        )
      },
      width: 200,
    },
  ];
}