import React from "react";
import { Grid, Box, Typography, Paper, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "$10.00",
      rating: 4,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      price: "$20.00",
      rating: 5,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Product 3",
      price: "$15.00",
      rating: 3,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Product 4",
      price: "$25.00",
      rating: 4,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Product 5",
      price: "$18.00",
      rating: 5,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "Product 6",
      price: "$22.00",
      rating: 4,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      name: "Product 7",
      price: "$30.00",
      rating: 5,
      img: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      name: "Product 8",
      price: "$12.00",
      rating: 3,
      img: "https://via.placeholder.com/150",
    },
  ];

  const handleProductClick = (id) => {
    navigate(`/single-product/${id}`);
  };

  return (
    <Grid>
      <Typography sx={{ marginLeft: 12, fontSize: 32, fontWeight: 600 }}>
        Today Hot Deals
      </Typography>

      <Grid container spacing={2} sx={{ p: 2 }}>
        {products.map((product) => (
          <Grid item xs={6} md={3} key={product.id}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => handleProductClick(product.id)}
            >
              <Box
                component="img"
                src={product.img}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  marginBottom: 2,
                }}
              />
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body1" color="textSecondary">
                {product.price}
              </Typography>
              <Rating value={product.rating} readOnly />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default AllProducts;
