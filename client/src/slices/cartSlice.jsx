// src/slices/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  cart: [],
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.slug === action.payload.slug
      );
      if (!existingItem) {
        state.cart.push({
          ...action.payload,
          addedTime: moment().format("lll"),
        });
        state.quantity++;
      }
    },
    removeFromCart: (state, action) => {
      const nonRemovableItem = state.cart.filter(
        (item) => item.slug !== action.payload
      );
      state.quantity = nonRemovableItem.length;
      state.cart = nonRemovableItem;
    },
    removeAll: (state) => {
      state.cart = [];
      state.quantity = 0;
    },
  },
});

export const { addToCart, removeAll, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
