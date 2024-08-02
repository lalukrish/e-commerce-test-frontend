import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartSlice";
import getCartSlice from "./reducers/getCartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    getCart: getCartSlice,
  },
});

export default store;
