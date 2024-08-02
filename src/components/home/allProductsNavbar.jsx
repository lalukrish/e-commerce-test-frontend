import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Box,
  Badge,
  InputBase,
  alpha,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { fetchCart } from "../../redux/reducers/getCartSlice";

const AllProductsNavBar = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("USER_ID");

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch, userId]);

  const cartCount = useSelector((state) => state.getCart.items.length);
  console.log("object", cartCount);
  return (
    <Grid container direction="column">
      <Grid item>
        <AppBar
          position="static"
          sx={{ backgroundColor: "white" }}
          elevation={1}
        >
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 1,
                  backgroundColor: alpha("#000", 0.15),
                  "&:hover": {
                    backgroundColor: alpha("#000", 0.25),
                  },
                  marginRight: 2,
                  marginLeft: 0,
                  width: "auto",
                }}
              >
                <Box
                  sx={{
                    padding: 1,
                    height: "100%",
                    position: "absolute",
                    pointerEvents: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SearchIcon />
                </Box>
                <InputBase
                  placeholder="Search…"
                  sx={{
                    color: "inherit",
                    paddingLeft: 4,
                    width: "100%",
                  }}
                />
              </Box>
            </Box>
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
