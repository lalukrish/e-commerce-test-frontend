import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const EditProductModal = ({
  open,
  handleClose,
  product,
  fetchProducts,
  setAlert,
}) => {
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      review: "",
      color: "",
      price: "",
      description: "",
      variant: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      review: Yup.string().required("Review is required"),
      color: Yup.string().required("Color is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
      description: Yup.string().required("Description is required"),
      variant: Yup.string().required("Variant is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("review", values.review);
      formData.append("color", values.color);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("variant", values.variant);
      if (image) {
        formData.append("file", image);
      }

      try {
        await axios.put(
          `${import.meta.env.VITE_API_POINT}/product/update-product/${
            product._id
          }`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setAlert({
          severity: "success",
          message: "Product updated successfully",
        });
        fetchProducts();
        handleClose();
      } catch (error) {
        console.error("Error updating product:", error);
        setAlert({ severity: "error", message: "Failed to update product" });
      }
    },
  });

  useEffect(() => {
    if (product) {
      formik.setValues({
        name: product.name,
        review: product.review,
        color: product.color,
        price: product.price,
        description: product.description,
        variant: product.variant,
      });
      setFileName("");
      setImage(null);
    }
  }, [product]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setFileName(file ? file.name : "");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            margin="normal"
            fullWidth
            label="Product Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Review"
            name="review"
            value={formik.values.review}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.review && Boolean(formik.errors.review)}
            helperText={formik.touched.review && formik.errors.review}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Color"
            name="color"
            value={formik.values.color}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.color && Boolean(formik.errors.color)}
            helperText={formik.touched.color && formik.errors.color}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Price"
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Variant"
            name="variant"
            value={formik.values.variant}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.variant && Boolean(formik.errors.variant)}
            helperText={formik.touched.variant && formik.errors.variant}
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Upload Image
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {fileName && (
            <TextField
              margin="normal"
              fullWidth
              label="Selected File"
              value={fileName}
              InputProps={{
                readOnly: true,
              }}
              sx={{ mt: 2 }}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={formik.handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;
