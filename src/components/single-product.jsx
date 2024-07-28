import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Rating, Paper, Button, Grid } from "@mui/material";

const SingleProduct = () => {
  const { id } = useParams();

  // Example product data. In a real application, you might fetch this data from an API.
  const product = {
    id,
    name: "Product " + id,
    price: `$${id * 10}.00`,
    rating: parseInt(id) % 5,
    img: "https://via.placeholder.com/300",
    description: `This is a detailed description of Product ${id}. It is a great product with excellent features and benefits.`,
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ maxWidth: 800, margin: "0 auto", padding: 2 }}
    >
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 2, height: "100%" }}>
          <Box
            component="img"
            src={product.img}
            alt={product.name}
            sx={{ width: "100%", height: "auto", marginBottom: 2 }}
          />
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            {product.name}
          </Typography>
          <Typography
            variant="h5"
            color="textSecondary"
            sx={{ marginBottom: 2 }}
          >
            {product.price}
          </Typography>
          <Rating value={product.rating} readOnly sx={{ marginBottom: 2 }} />
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {product.description}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ marginBottom: 2, width: "100%" }}
          >
            Add to Cart
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginBottom: 2, width: "100%" }}
          >
            Buy Now
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginBottom: 2, width: "100%" }}
          >
            Edit Product Details
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SingleProduct;
