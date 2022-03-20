import { Card, Container, Grid } from "@mui/material";
import React from "react";
import { Header } from "../common/styled";
import WebPageConfigForm from "./form/WebPageConfigForm";

export const RestoWebPage: React.FC = () => {
    return (
        <Container maxWidth="xl">
            <Header variant="h5">
                Resto Landing Page
            </Header>
           <Grid container spacing={1} sx={{ marginBottom: "40px" }}>
                <Grid item xs={12}>
                    <Card elevation={2} sx={{ p: 3 }}>
                        <WebPageConfigForm />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default RestoWebPage;