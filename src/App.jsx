import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import Settings from "./components/Settings";
import Box from "@mui/material/Box";
import Sidebar from "./components/sidebar";
import SignleProduct from "./components/single-product";
import { Provider } from "react-redux";

function App() {
  return (
    // <Router>
    // <Provider store={store}>
    <Box sx={{ display: "flex" }}>
      <Sidebar />
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
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Routes>
      </Box>
    </Box>
    // </Provider>
    // </Router>
  );
}

export default App;
