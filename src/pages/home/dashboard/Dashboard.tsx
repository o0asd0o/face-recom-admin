import { Container, Stack, Card, CardActions, Button, CardContent, Typography } from "@mui/material";
import { Group, Restaurant, SupervisorAccount } from "@mui/icons-material";
import React, { useState } from "react";
import { Header } from "../common/styled";
import { useAuth } from "context/authContext";
import { onCustomersSnapshot } from 'providers/customers';
import { onProductsSnapshot } from 'providers/products';
import { useHomeNavigation } from "context/navigationContext";
import { onRestoOwnersSnapshot } from "providers/restoOwners";

export const Customers: React.FC = () => {
    const { userInfo } = useAuth();
    const [customerSize, setCustomerSize] = useState<number>();
    const [productSize, setProductSize] = useState<number>();
    const [restoOnwerSize, setRestoOwnerSize] = useState<number>();

    const { handleNavigation } = useHomeNavigation();

    React.useEffect(() => {
        if (!userInfo?.email && !userInfo?.role) return; 
        const { email, role } = userInfo;
        const unsub1 = onCustomersSnapshot((snapshot) => setCustomerSize(snapshot.size));
        const unsub2 = onProductsSnapshot((snapshot) => setProductSize(snapshot.size), email, role === "owner");
        const unsub3 = onRestoOwnersSnapshot((snapshot) => setRestoOwnerSize(snapshot.size));

        return () => {
            unsub1();
            unsub2();
            unsub3();
        }
    }, [userInfo?.email]);

    console.log({ userInfo })

    return (
        <Container maxWidth="xl">
            <Stack direction="row" alignItems="center" >
                <Header variant="h5">
                    Welcome, {userInfo?.firstName || ""}
                </Header>
            </Stack>
            <Stack sx={{ width: '100%', mt: 2 }} spacing={3} direction="row">
                {userInfo?.role === "admin" && (
                    <Card sx={{ width: 345 }}>
                        <CardContent sx={{ background: "#651fff" }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{ color: "white"}}>
                                Resto Owners
                            </Typography>
                            <Typography variant="body2" color="white" fontSize={20} sx={{ display: "flex"}}>
                                <SupervisorAccount sx={{ mr: 1 }} /> {restoOnwerSize}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ display: "flex", flexDirection: "row-reverse"}}>
                            <Button size="small" onClick={() => handleNavigation("/owners")}>Go to Resto Owners Page</Button>
                        </CardActions>
                    </Card>
                )}
                <Card sx={{ width: 345 }}>
                    <CardContent sx={{ background: "#2196f3" }}>
                        <Typography gutterBottom variant="h5" component="div" sx={{ color: "white"}}>
                            Customers
                        </Typography>
                        <Typography variant="body2" color="white" fontSize={20} sx={{ display: "flex"}}>
                            <Group sx={{ mr: 1 }} /> {customerSize}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ display: "flex", flexDirection: "row-reverse"}}>
                        <Button size="small" onClick={() => handleNavigation("/customers")}>Go to Customers Page</Button>
                    </CardActions>
                </Card>
                <Card sx={{ width: 345 }}>
                    <CardContent sx={{ background: "#b26500" }}>
                        <Typography gutterBottom variant="h5" component="div" sx={{ color: "white"}}>
                            Products
                        </Typography>
                        <Typography variant="body2" color="white" fontSize={20} sx={{ display: "flex"}}>
                            <Restaurant sx={{ mr: 1 }} /> {productSize}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ display: "flex", flexDirection: "row-reverse"}}>
                        <Button size="small" onClick={() => handleNavigation("/products")}>Go to Products Page</Button>
                    </CardActions>
                </Card>
            </Stack>
        </Container>
    )
};

export default Customers;