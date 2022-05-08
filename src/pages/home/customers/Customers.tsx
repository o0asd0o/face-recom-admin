import { Add, FolderOff } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "context/authContext";
import { useHomeNavigation } from "context/navigationContext";
import { onCustomersSnapshot } from "providers/customers";
import React, { useCallback } from "react";
import { Customer } from "types";
import { Header } from "../common/styled";
import { columns } from "./columns";

const NoRowsOverlay: React.FC = () => (
  <Stack height="100%" alignItems="center" justifyContent="center">
    <FolderOff
      fontSize="large"
      sx={{ fontSize: "60px", color: grey[700], mb: 2 }}
    />
    <Typography>Ooops! there&lsquo;s no data found</Typography>
  </Stack>
);

export const Customers: React.FC = () => {
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true);

    const unsub = onCustomersSnapshot((snapshot) => {
      const productsResult: Array<Customer> = [];
      snapshot.forEach((doc) => {
        productsResult.push({
          id: doc.id,
          email: doc.data().email,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          contact: doc.data().phoneNumber || "-",
          address: doc.data().address,
        });
      });

      setCustomers(productsResult);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <Container maxWidth="xl">
      <Stack direction="row" alignItems="center">
        <Header variant="h5">Customers</Header>
      </Stack>
      <Box sx={{ height: 700, width: "100%", background: "#fff" }}>
        <DataGrid
          rows={customers}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[20, 40, 60]}
          loading={loading}
          components={{ NoRowsOverlay }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
              outline: "none",
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default Customers;
