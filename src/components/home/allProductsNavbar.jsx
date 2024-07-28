import React from "react";
import { AppBar, Toolbar, IconButton, Grid, Box } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";

const AllProductsNavBar = () => {
  return (
    <Grid container direction="column">
      <Grid item>
        <AppBar
          position="static"
          sx={{ backgroundColor: "white" }}
          elevation={1}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />{" "}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton color="primary" sx={{ marginRight: 1 }}>
                <FavoriteIcon />
              </IconButton>
              <IconButton color="primary">
                <AddShoppingCartIcon />
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
