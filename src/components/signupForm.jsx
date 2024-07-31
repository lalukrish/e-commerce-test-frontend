import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Signup = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      phone: Yup.string().required("Phone number is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_POINT}/user/create-user`,
          values
        );
        setAlertType("success");
        setAlertMessage(response.data.message);
        resetForm();
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect to login page after 2 seconds
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrors({ email: error.response.data.message });
          setAlertType("error");
          setAlertMessage(error.response.data.message);
        } else {
          setAlertType("error");
          setAlertMessage("Something went wrong. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {alertMessage && (
          <Alert severity={alertType} sx={{ width: "100%", mb: 2 }}>
            {alertMessage}
          </Alert>
        )}
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="username"
                fullWidth
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                fullWidth
                label="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                fullWidth
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="confirmPassword"
                fullWidth
                label="Confirm Password"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <PhoneInput
                country={"in"}
                value={formik.values.phone}
                onChange={(phone) => formik.setFieldValue("phone", phone)}
                onBlur={formik.handleBlur}
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: true,
                  placeholder: "Phone Number",
                }}
                inputStyle={{
                  width: "100%",
                  height: "52px",
                }}
                specialLabel=""
                containerClass={
                  formik.touched.phone && Boolean(formik.errors.phone)
                    ? "phone-input-error"
                    : ""
                }
                sx={{ width: "100" }}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div
                  style={{
                    color: "red",
                    marginTop: "0.5rem",
                    fontSize: "12px",
                  }}
                >
                  {formik.errors.phone}
                </div>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
