import React from "react";
import { CssBaseline } from "@mui/material";
import GlobalStyles from "./GlobalStyles";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/authContext";

ReactDOM.render(
  <>
    <GlobalStyles />
    <CssBaseline />
    <AuthProvider>
      <App />
    </AuthProvider>
  </>,
  document.getElementById("root")
);
