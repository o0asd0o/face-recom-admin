import React from "react";
import { GridColumns } from "@mui/x-data-grid";
import { IconButton, Stack, Link, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

type ColumnProps = {
  onDelete(productId: string): void; 
  onEdit(productId: string): void; 
}

export const columns = (props: ColumnProps): GridColumns => {
  return [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Product Name',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: 'happyFoodRating',
      headerName: 'Happy Rating',
      width: 150,
    },
    {
      field: 'sadFoodRating',
      headerName: 'Sad Rating',
      width: 150,
    },
    {
      field: 'surpriseFoodRating',
      headerName: 'Surprise Rating',
      width: 150,
    },
    {
      field: 'angryFoodRating',
      headerName: 'Angry Rating',
      width: 150,
    },
    {
      field: 'imageUrl',
      headerName: 'Image URL',
      renderCell: (params) => {
        return (
          <Tooltip title="Click to view" placement="top">
            <Link
              href={params.row.imageUrl}
              target="_blank"
              sx={{
                width: "100%",
                textOverflow: "ellipsis",
                overflow: "hidden"
              }}
            >
              {params.row.imageUrl}
            </Link>
          </Tooltip>
          
        )
      },
      width: 200,
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
          return (
            <Stack direction="row" spacing={0}>
                <IconButton onClick={() => props.onEdit(id)}>
                    <Tooltip title="Edit Product" placement="top">
                        <Edit sx={{ color: "#757575" }} />
                    </Tooltip>
                </IconButton>
                <IconButton onClick={() => props.onDelete(id)}>
                    <Tooltip title="Delete Product" placement="top">
                        <Delete sx={{ color: "#ff5252" }} />
                    </Tooltip>
                </IconButton>
            </Stack>
        )
      },
      width: 200,
    },
  ];
}