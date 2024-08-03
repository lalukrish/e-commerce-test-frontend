import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${import.meta.env.VITE_API_POINT}/product/get-cart-items/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
});

const getCartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.status = "succeeded";
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = "failed";
      });
    //   .addCase(addToCart.fulfilled, (state, action) => {
    //     state.items = action.payload.items;
    //   });
  },
});

export default getCartSlice.reducer;
