import { Add, FolderOff } from "@mui/icons-material";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "context/authContext";
import { useHomeNavigation } from "context/navigationContext";
import { deleteProductDoc, onProductsSnapshot } from "providers/products";
import { onRestoOwnersSnapshot } from "providers/restoOwners";
import React, { useCallback } from "react";
import { Product, RestoOwner } from "types";
import { Header } from "../common/styled";
import { columns } from "./columns";
import { updateStatus } from "providers/restoOwners";

const NoRowsOverlay: React.FC = () => (
  <Stack height="100%" alignItems="center" justifyContent="center">
    <FolderOff
      fontSize="large"
      sx={{ fontSize: "60px", color: grey[700], mb: 2 }}
    />
    <Typography>Ooops! there&lsquo;s no data found</Typography>
  </Stack>
);

export const RestoOwners: React.FC = () => {
  const [restoOwners, setRestoOwners] = React.useState<RestoOwner[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [currentProductToDecline, setCurrentProductToDecline] =
    React.useState<string>();
  const [declineOpen, setDeclineOpen] = React.useState<boolean>(false);
  const { userInfo } = useAuth();
  const { handleNavigation } = useHomeNavigation();

  React.useEffect(() => {
    setLoading(true);

    const unsub = onRestoOwnersSnapshot((snapshot) => {
      const restoOwnersResult: Array<RestoOwner> = [];
      snapshot.forEach((doc) => {
        restoOwnersResult.push({
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          email: doc.data().email,
          phoneNumber: doc.data().phoneNumber,
          avatarUrl: doc.data().avatarUrl,
          address: doc.data().address,
          status: doc.data().status,
        });
      });
      setRestoOwners(restoOwnersResult);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleCloseDeclineModal = useCallback(() => {
    setDeclineOpen(false);
    setCurrentProductToDecline(undefined);
  }, []);

  const handleDecline = useCallback(async (id?: string) => {
    if (id) {
      updateStatus(id, "declined");
      handleCloseDeclineModal();
    }
  }, []);

  const handleApprove = useCallback((id: string) => {
    updateStatus(id, "approved");
  }, []);

  return (
    <Container maxWidth="xl">
      <Dialog
        open={declineOpen}
        onClose={handleCloseDeclineModal}
        sx={{ p: 5 }}
      >
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to decline resto owner?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDecline(currentProductToDecline)}>
            Decline
          </Button>
          <Button variant="contained" onClick={handleCloseDeclineModal}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Stack direction="row" alignItems="center">
        <Header variant="h5">Restaurant Owners</Header>
      </Stack>
      <Box sx={{ height: 700, width: "100%", background: "#fff" }}>
        <DataGrid
          rows={restoOwners}
          columns={columns({
            onDecline: (id) => {
              setDeclineOpen(true);
              setCurrentProductToDecline(id);
            },
            onApprove: handleApprove,
          })}
          pageSize={15}
          rowsPerPageOptions={[20, 40, 60]}
          loading={loading}
          components={{ NoRowsOverlay }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
                transaction: false,
                ...(userInfo?.role === "owner"
                  ? {
                      sadFoodRating: false,
                      happyFoodRating: false,
                    }
                  : {}),
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

export default RestoOwners;
