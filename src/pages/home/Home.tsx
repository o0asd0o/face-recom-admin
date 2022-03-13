import AppLayout from "components/AppLayout";
import React from "react";
import { Outlet } from "react-router-dom";
import { NavigationProvider } from "context/navigationContext";


const Home: React.FC = () => {
    return (
        <NavigationProvider>
            <AppLayout>
                <Outlet />
            </AppLayout>
        </NavigationProvider>
    )
}

export default Home;