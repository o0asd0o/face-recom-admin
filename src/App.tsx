import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import LoginPage from "pages/login/LoginPage";
// import RegisterPage from "pages/register/RegisterPage";
import { ToastContainer } from "react-toastify";
import PublicRoute from "components/PublicRoute";
import PrivateRoute from "components/PrivateRoute";

import 'react-toastify/dist/ReactToastify.css';
import Home from "pages/home/Home";
import Customers from "pages/home/customers/Customers";
import Settings from "pages/home/settings/Settings";
import Products from "pages/home/products/Products";
import RegisterPage from "pages/register/RegisterPage";
import RestoOwners from "pages/home/restoOwners/RestoOwners";
import RestoWebPage from "pages/home/restoWebPage/RestoWebPage";
import Dashboard from "pages/home/dashboard/Dashboard";
import AddProduct from "pages/home/products/addProduct/AddProduct";
import EditProduct from "pages/home/products/editProduct/EditProduct";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={(
          <PrivateRoute>
            <Home /> 
          </PrivateRoute>
        )}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/" element={<Outlet />}>
              <Route index element={<Navigate to="/products" />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/add-product" element={<AddProduct />} />
              <Route path="/products/edit-product/:productId" element={<EditProduct />} />
            </Route>
            <Route path="/owners" element={<RestoOwners />} />
            <Route path="/my-web-page" element={<RestoWebPage />} />
            <Route path="/my-settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={(
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        )} />

        <Route path="/register" element={(
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        )} />
        
        <Route path="*" element={<div>404: Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
