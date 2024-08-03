import React from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddProductSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  review: Yup.string().required("Review is required"),
  color: Yup.string().required("Color is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  description: Yup.string().required("Description is required"),
  variant: Yup.string().required("Variant is required"),
  image: Yup.mixed().required("Image is required"),
});

const AddProductModal = ({ open, handleClose, fetchProducts, setAlert }) => {
  const token = localStorage.getItem("token");

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("review", values.review);
    formData.append("color", values.color);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("variant", values.variant);
    formData.append("image", values.image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_POINT}/product/create-product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlert({ message: response.data.message, severity: "success" });
      fetchProducts(0, 10);
      resetForm();
      handleClose();
    } catch (error) {
      setAlert({ message: "Error creating product", severity: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          // width: 600,
          bgcolor: "background.paper",
          // border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Add New Product
        </Typography>
        <Formik
          initialValues={{
            name: "",
            review: "",
            color: "",
            price: "",
            description: "",
            variant: "",
            image: null,
          }}
          validationSchema={AddProductSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting, touched, errors }) => (
            <Form>
              <Field
                name="name"
                as={TextField}
                label="Name"
                fullWidth
                margin="normal"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <Field
                name="review"
                as={TextField}
                label="Review"
                fullWidth
                margin="normal"
                error={touched.review && Boolean(errors.review)}
                helperText={touched.review && errors.review}
              />
              <Field
                name="color"
                as={TextField}
                label="Color"
                fullWidth
                margin="normal"
                error={touched.color && Boolean(errors.color)}
                helperText={touched.color && errors.color}
              />
              <Field
                name="price"
                as={TextField}
                label="Price"
                fullWidth
                margin="normal"
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
              />
              <Field
                name="description"
                as={TextField}
                label="Description"
                fullWidth
                margin="normal"
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
              <Field
                name="variant"
                as={TextField}
                label="Variant"
                fullWidth
                margin="normal"
                error={touched.variant && Boolean(errors.variant)}
                helperText={touched.variant && errors.variant}
              />
              <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                <Typography variant="body1">Image</Typography>
                <input
                  type="file"
                  name="image"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  style={{ marginTop: 8 }}
                />
                {touched.image && errors.image && (
                  <Typography variant="body2" color="error">
                    {errors.image}
                  </Typography>
                )}
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ marginTop: 2 }}
              >
                Add Product
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
