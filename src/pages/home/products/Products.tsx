import { Add, FolderOff } from "@mui/icons-material";
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useAuth } from "context/authContext";
import { useHomeNavigation } from "context/navigationContext";
import { deleteProductDoc, onProductsSnapshot } from "providers/products";
import React, { useCallback } from "react";
import { Product } from "types";
import { Header } from "../common/styled";
import { columns } from "./columns";

const NoRowsOverlay: React.FC = () => (
    <Stack height="100%" alignItems="center" justifyContent="center">
        <FolderOff fontSize="large" sx={{ fontSize: "60px", color: grey[700], mb: 2 }}/>
        <Typography>Ooops! there&lsquo;s no data found</Typography>
    </Stack>
);

export const Products: React.FC = () => {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [currentProductToDelete, setCurrentProductToDelete] = React.useState<string>();
    const [deleteOpen, setDeleteOpen] = React.useState<boolean>(false);
    const { userInfo } = useAuth();
    const { handleNavigation } = useHomeNavigation();

    React.useEffect(() => {
        if (!userInfo?.email || !userInfo?.role) return;
        const { email, role } = userInfo;
        setLoading(true);

        const unsub = onProductsSnapshot((snapshot) => {
            const productsResult: Array<Product> = [];
            snapshot.forEach((doc) => {
                productsResult.push({
                    id: doc.id,
                    ownerEmail: doc.data().ownerEmail,
                    sadFoodRating: doc.data().sadFoodRating,
                    happyFoodRating: doc.data().happyFoodRating,
                    surpriseFoodRating: doc.data().surpriseFoodRating,
                    angryFoodRating: doc.data().angryFoodRating,
                    imageUrl: doc.data().imageUrl,
                    name: doc.data().name,
                    price: doc.data().price,
                });
            });

            setProducts(productsResult);
            setLoading(false);
        }, email, role === "owner");

        return () => unsub();
    }, [userInfo?.email]);

    const handleCloseDeleteModal = useCallback(() => {
        setDeleteOpen(false)
        setCurrentProductToDelete(undefined)
    }, [])

    const handleDelete = useCallback(async (id?: string) => {
        if (id) {
            await deleteProductDoc(id);
            handleCloseDeleteModal()
        }
    }, []);

    const handleEdit = useCallback((id: string) => {
        handleNavigation(`/products/edit-product/${id}`)
    }, []);


    return (
        <Container maxWidth="xl">
            <Dialog open={deleteOpen} onClose={handleCloseDeleteModal} sx={{p: 5}}>
                <DialogTitle>Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDelete(currentProductToDelete)}>Delete</Button>
                    <Button variant="contained" onClick={handleCloseDeleteModal}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Stack direction="row" alignItems="center" >
                <Header variant="h5">
                    Products
                </Header>
                <Button
                    onClick={() => handleNavigation('/products/add-product')}

                    color="primary"
                    variant="contained"
                    fullWidth
                    sx={{ maxWidth: "180px", mr: "10px", ml: "auto" }}
                >
                    <Add /> Add Product
                </Button>
            </Stack>
            <Box sx={{ height: 700, width: '100%', background: "#fff" }}>
                <DataGrid
                    rows={products}
                    columns={columns({
                        onDelete: (id) =>  {
                            setDeleteOpen(true)
                            setCurrentProductToDelete(id);
                        },
                        onEdit: handleEdit,
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
                                ...(userInfo?.role === "owner" ? {
                                    sadFoodRating: false,
                                    surpriseFoodRating: false,
                                    happyFoodRating: false,
                                    angryFoodRating: false,
                                } : {})
                            }
                        }
                    }}
                    sx={{
                        '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        }
                    }}
                />
            </Box>
        </Container>
    )
};

export default Products;