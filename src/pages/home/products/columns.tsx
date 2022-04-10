import React from "react";
import { GridColumns } from "@mui/x-data-grid";
import { IconButton, Stack, Link, Tooltip, Chip } from "@mui/material";
import { Delete, Edit, InfoOutlined } from "@mui/icons-material";
import ScrollContainer from "react-indiana-drag-scroll";

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
      width: 150,
    },
    {
      field: 'happyFoodRating',
      headerName: 'Happy Rating',
      width: 130,
    },
    {
      field: 'sadFoodRating',
      headerName: 'Sad Rating',
      width: 130,
    },
    {
      field: 'surpriseFoodRating',
      headerName: 'Surprise Rating',
      width: 130,
    },
    {
      field: 'angryFoodRating',
      headerName: 'Angry Rating',
      width: 130,
    },
    {
      field: 'categories',
      renderHeader: () => {
        return <>
          <span>Categories</span>
          <Tooltip title="Drag cell to see cutoff ones" placement="top">
              <InfoOutlined fontSize="small" sx={{ color: "rgba(0,0,0,0.54)", marginLeft: "4px" }} />
          </Tooltip>
        </>;
      },
      valueGetter: (params) => params.row.categories.join(" ") || "-",
      renderCell: (params) => (
        <ScrollContainer>
          {params.row.categories
              ? params.row.categories.map((item: string) =>  <Chip key={item} label={item} />)
              : null}
        </ScrollContainer>
      ),
      width: 200,
    },

    {
      field: 'ownerEmail',
      headerName: 'Owner Email',
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