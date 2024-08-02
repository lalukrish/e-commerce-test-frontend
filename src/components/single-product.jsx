import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import { addToCart } from "../redux/reducers/cartSlice";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("orange");
  const [selectedMemory, setSelectedMemory] = useState("128GB");
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_POINT}/product/get-single-product/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleBuyNow = () => {};

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        maxWidth: 800,
        margin: "0 auto",
        padding: 2,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          sx={{ padding: 2, height: "100%", position: "relative" }}
        >
          <Box
            component="img"
            src={product.image.url}
            alt={product.name}
            sx={{ width: "100%", height: "auto", marginBottom: 2 }}
          />

          <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: "bold" }}>
            {product.name}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            sx={{ marginBottom: 2 }}
          >
            ${product.price}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {product.description}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Color
          </Typography>
          <ToggleButtonGroup
            value={selectedColor}
            exclusive
            onChange={(e, newColor) => setSelectedColor(newColor)}
            sx={{ marginBottom: 2 }}
          >
            <ToggleButton value="orange" sx={{ backgroundColor: "orange" }} />
            <ToggleButton value="purple" sx={{ backgroundColor: "purple" }} />
            <ToggleButton value="blue" sx={{ backgroundColor: "blue" }} />
            <ToggleButton value="green" sx={{ backgroundColor: "green" }} />
          </ToggleButtonGroup>

          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Memory
          </Typography>
          <ToggleButtonGroup
            value={selectedMemory}
            exclusive
            onChange={(e, newMemory) => setSelectedMemory(newMemory)}
            sx={{ marginBottom: 2 }}
          >
            <ToggleButton value="128GB">128GB</ToggleButton>
            <ToggleButton value="256GB">256GB</ToggleButton>
            <ToggleButton value="512GB">512GB</ToggleButton>
            <ToggleButton value="1TB">1TB</ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Button
              onClick={decrementQuantity}
              variant="contained"
              sx={{ minWidth: 40 }}
            >
              -
            </Button>
            <TextField
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              sx={{ margin: "0 10px", width: 60 }}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
                inputMode: "numeric",
              }}
            />
            <Button
              onClick={incrementQuantity}
              variant="contained"
              sx={{ minWidth: 40 }}
            >
              +
            </Button>
          </Box>

          <Box
            sx={{
              padding: 1,
              marginBottom: 2,
              width: "100%",
              textAlign: "center",
              backgroundColor: "#e0e0e0",
              borderRadius: 1,
            }}
          >
            <Typography variant="h6">
              Total: ${product.price * quantity}.00
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            sx={{ marginBottom: 2, width: "100%", backgroundColor: "#212121" }}
            startIcon={<ShoppingCartIcon />}
          >
            Add to Cart
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleBuyNow}
            sx={{ marginBottom: 2, width: "100%", backgroundColor: "#f57c00" }}
            startIcon={<PaymentIcon />}
          >
            Buy Now
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SingleProduct;
