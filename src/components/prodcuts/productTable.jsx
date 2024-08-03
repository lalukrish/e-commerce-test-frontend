import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  TablePagination,
  Button,
  Alert,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import AddProductModal from "./addProduct";
import EditProductModal from "./ediProduct";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const ProductTable = () => {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [alert, setAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchProducts = async (page, limit) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_POINT}/product/get-all-products`,
        {
          params: {
            page: page + 1,
            limit,
            search: searchTerm,
            startDate: startDate ? startDate.toISOString() : undefined,
            endDate: endDate ? endDate.toISOString() : undefined,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(page, rowsPerPage);
  }, [page, rowsPerPage, searchTerm, startDate, endDate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_POINT}/product/delete-product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(products.filter((product) => product._id !== id));
      console.log("Deleted product with id:", id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_POINT}/product/product-status/${id}`,
        {
          status: !isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(
        products.map((product) =>
          product._id === id ? { ...product, status: !isActive } : product
        )
      );
      console.log(
        isActive ? "Deactivated" : "Activated",
        "product with id:",
        id
      );
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <Box>
      {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
      <Box sx={{ p: 2 }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid
            item
            xs={12}
            md={8}
            lg={9}
            container
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TextField
                label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClearFilters}
                fullWidth
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            sx={{ textAlign: { xs: "center", md: "right" } }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setModalOpen(true)}
              fullWidth
            >
              Add New Product
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          width: { xs: 350, sm: "100%", md: "100%", lg: "100%", xl: "100%" },
        }}
      >
        <TableContainer component={Paper}>
          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Review</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Variant</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <img
                        src={product.image.url}
                        alt={product.name}
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.review}</TableCell>
                    <TableCell>{product.color}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.variant}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          handleToggleActive(product._id, product.status)
                        }
                      >
                        {product.status ? <ToggleOnIcon /> : <ToggleOffIcon />}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(product)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(product._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
          <TablePagination
            component="div"
            count={totalPages * rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>

      <AddProductModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        fetchProducts={() => fetchProducts(page, rowsPerPage)}
        setAlert={setAlert}
      />
      {selectedProduct && (
        <EditProductModal
          open={editModalOpen}
          handleClose={() => setEditModalOpen(false)}
          product={selectedProduct}
          fetchProducts={() => fetchProducts(page, rowsPerPage)}
          setAlert={setAlert}
        />
      )}
    </Box>
  );
};

export default ProductTable;
