import { ArrowBack } from "@mui/icons-material";
import { Card, Container, Grid, IconButton } from "@mui/material";
import { useHomeNavigation } from "context/navigationContext";
import { Header } from "pages/home/common/styled";
import React  from "react";
import { useNavigate } from "react-router-dom";
import EditProductForm from "./form/EditProductForm";

const EditProduct: React.FC = () => {
    const navigate = useNavigate();
    const { prevPageIndex, setPageIndexManual } = useHomeNavigation();

    const handleNavigateOnPrevious = () => {
        setPageIndexManual(prevPageIndex);
        navigate(-1);
    };

    return (
        <Container maxWidth="xl">
            <div style={{ display: "flex", alignItems: "center" }}>
                <Header variant="h5">
                    <IconButton aria-label="delete" size="large" sx={{ mr: 1 }} onClick={handleNavigateOnPrevious}>
                        <ArrowBack fontSize="inherit" />
                    </IconButton>
                    Update Product
                </Header>
            </div>
            <Grid container spacing={1} sx={{ marginBottom: "40px" }}>
                <Grid item xs={12}>
                    <Card elevation={2} sx={{ p: 3 }}>
                        <EditProductForm onBack={handleNavigateOnPrevious} />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default EditProduct;