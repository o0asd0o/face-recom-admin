import { ThemeProvider } from "@mui/material";
import React from "react";
import { theme } from "themes/themes";
import HeaderNav from "./HeaderNav";

const AppLayout: React.FC = ({ children }) => {
    return <ThemeProvider theme={theme}>
        <HeaderNav />
        {children}
    </ThemeProvider>
}

export default AppLayout;