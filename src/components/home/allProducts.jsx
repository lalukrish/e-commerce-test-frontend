import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Paper, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isInteger } from "formik";

const AllProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_POINT}/product/list-all-products`,
        {
          params: {
            status: true,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/single-product/${id}`);
  };

  return (
    <Grid sx={{ mt: 2 }}>
      <Typography
        sx={{
          justifyContent: "flex-start",
          marginLeft: 2,
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        Today Hot Deals
      </Typography>
      <Grid container spacing={2} sx={{ p: 2 }}>
        {products.map((product) => (
          <Grid item xs={6} md={3} key={product._id}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => handleProductClick(product._id)}
            >
              <Box
                component="img"
                src={product.image.url}
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
                ${product.price}
              </Typography>
              <Rating value={Number(product.review)} readOnly />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default AllProducts;
