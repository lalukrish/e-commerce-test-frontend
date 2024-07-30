import React from "react";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, IconButton, Grid, Box, Badge } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AllProductsNavBar = () => {
  const cartCount = useSelector((state) => state.cart.items.length);

  return (
    <Grid container direction="column">
      <Grid item>
        <AppBar
          position="static"
          sx={{ backgroundColor: "white" }}
          elevation={1}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton color="primary" sx={{ marginRight: 1 }}>
                <FavoriteIcon />
              </IconButton>
              <IconButton color="primary">
                <Badge badgeContent={cartCount} color="secondary">
                  <AddShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default AllProductsNavBar;
