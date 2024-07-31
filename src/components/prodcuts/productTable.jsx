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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import AddProductModal from "./addProduct";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [alert, setAlert] = useState(null);

  const fetchProducts = async (page, limit) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_POINT}/product/get-all-products`,
        {
          params: { page: page + 1, limit }, // API expects 1-based page number
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
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };

  const handleEdit = (id) => {
    // Handle edit logic here
    console.log("Edit product with id:", id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_POINT}/product/delete-product/${id}`
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

  return (
    <Box>
      {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
        >
          Add New Product
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Review</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Options</TableCell>
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
                <TableCell>
                  {product.status ? (
                    <Tooltip title="Deactivate">
                      <IconButton
                        onClick={() =>
                          handleToggleActive(product._id, product.status)
                        }
                      >
                        <ToggleOnIcon color="success" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Activate">
                      <IconButton
                        onClick={() =>
                          handleToggleActive(product._id, product.status)
                        }
                      >
                        <ToggleOffIcon color="warning" />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEdit(product._id)}>
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(product._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={totalPages * rowsPerPage}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <AddProductModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        fetchProducts={fetchProducts}
        setAlert={setAlert}
      />
    </Box>
  );
};

export default ProductTable;
