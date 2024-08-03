import React, { useEffect, useState } from "react";
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
  Menu,
  MenuItem,
  CircularProgress,
  Paper,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { fetchCart } from "../../redux/reducers/getCartSlice";
import { useNavigate } from "react-router-dom";

const AllProductsNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("USER_ID");
  const token = localStorage.getItem("token");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch, userId]);

  const cartCount = useSelector((state) => state.getCart.items.length);

  const handleSearchChange = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchResults([]);
      setAnchorEl(null);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_POINT}/product/get-all-products`,
        {
          params: {
            search: term,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResults(response.data.products);
      setAnchorEl(event.currentTarget);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (productId) => {
    navigate(`/single-product/${productId}`);
    handleClose();
  };

  const handleCartSection = () => {
    navigate(`/cart`);
  };

  console.log("object", searchResults);
  return (
    <Grid container direction="column">
      <Grid item>
        <AppBar
          position="static"
          sx={{ backgroundColor: "white" }}
          elevation={1}
        >
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 1,
                  backgroundColor: alpha("#000", 0.15),
                  "&:hover": {
                    backgroundColor: alpha("#000", 0.25),
                  },
                  marginRight: 2,
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "0",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 2,
                    pointerEvents: "none",
                    transform: "translateY(-50%)",
                  }}
                >
                  <SearchIcon />
                </Box>
                <InputBase
                  placeholder="Search…"
                  sx={{
                    color: "inherit",
                    paddingLeft: "calc(2rem + 1px)",
                    width: "100%",
                  }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onClick={(event) => setAnchorEl(event.currentTarget)} 
                />
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: anchorEl ? anchorEl.clientWidth : undefined,
                    marginTop: "5px",
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                {loading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 1,
                    }}
                  >
                    <CircularProgress size={24} />
                  </Box>
                ) : searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <MenuItem
                      key={result._id}
                      onClick={() => handleMenuItemClick(result._id)}
                    >
                      {result.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No results found</MenuItem>
                )}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton color="primary" sx={{ marginRight: 1 }}>
                <FavoriteIcon />
              </IconButton>
              <IconButton color="primary">
                <Badge badgeContent={cartCount} color="secondary">
                  <AddShoppingCartIcon onClick={handleCartSection} />
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
