import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const cartSlice = createSlice({
  name: "foodcart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
  },
  reducers: {
    addItem: (state, action) => {
      const { accordianItemId, name, price, description, imageId } =
        action.payload;
      const existing = state.cart.find(
        (item) => item.accordianItemId === accordianItemId
      );
      if (existing) {
        existing.qty += 1;
      } else {
        state.cart.push({
          accordianItemId,
          name,
          price,
          description,
          imageId,
          qty: 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.accordianItemId !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = []; // Clear entire cart
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    incrementQty: (state, action) => {
      const item = state.cart.find(
        (i) => i.accordianItemId === action.payload
      );
      if (item) item.qty += 1;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decrementQty: (state, action) => {
      const item = state.cart.find(
        (i) => i.accordianItemId === action.payload
      );
      if (item && item.qty > 1) {
        item.qty -= 1;
      } else {
        state.cart = state.cart.filter(
          (i) => i.accordianItemId !== action.payload
        );
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { addItem, removeItem, clearCart, incrementQty, decrementQty } =
  cartSlice.actions;

export default cartSlice.reducer;
