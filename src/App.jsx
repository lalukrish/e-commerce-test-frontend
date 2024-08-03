import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
// import Settings from "./components/Settings";
import Box from "@mui/material/Box";
import Sidebar from "./components/sidebar";
import SignleProduct from "./components/single-product";
import { Provider } from "react-redux";
import SignupPage from "./pages/signup";
import SigninPage from "./pages/signin";
import Products from "./pages/products";
import AddProduct from "./components/prodcuts/addProduct";
import Cart from "./pages/cart";

function App() {
  const location = useLocation();

  const noSidebarRoutes = ["/", "/signup"];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    // <Router>
    // <Provider store={store}>
    <Box sx={{ display: "flex" }}>
      {showSidebar && <Sidebar />}
      <Box
        sx={{
          flexGrow: 1,
          transition: "margin 0.3s",
          padding: "16px",
          minHeight: "100vh",
          mt: 12,
        }}
      >
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/single-product/:id" element={<SignleProduct />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<SigninPage />} />
          <Route path="/all-products" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Box>
    </Box>
    // </Provider>
    // </Router>
  );
}

export default App;
