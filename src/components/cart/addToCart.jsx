import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/reducers/getCartSlice";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
} from "@mui/material";

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.getCart.items);
  console.log("object", items);
  const userId = localStorage.getItem("USER_ID");

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch, userId]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Your Cart</Typography>
      <Box sx={{ padding: 2 }}>
        {items.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid item xs={12} md={6} key={item._id}>
                <Paper elevation={3} sx={{ padding: 2, display: "flex" }}>
                  <Box
                    component="img"
                    src={item.productId.image.url}
                    alt={item.productId.name}
                    sx={{ width: 100, height: 100, marginRight: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{item.productId.name}</Typography>
                    <Typography variant="body1">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body1">
                      Price: ${item.productId.price}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default CartPage;
