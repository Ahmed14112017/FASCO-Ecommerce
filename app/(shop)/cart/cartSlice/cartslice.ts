import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../cartTypes";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // 🟢 Add To Cart
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id,
      );

      if (existingItem && existingItem.quantity !== undefined) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    // 🟢 Remove Item
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },

    // 🟢 Increase Quantity
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item._id === action.payload);

      if (item) {
        item.quantity = (item.quantity ?? 0) + 1;
      }
    },

    // 🟢 Decrease Quantity
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item._id === action.payload);

      if (item) {
        const qty = item.quantity ?? 0;
        if (qty > 1) item.quantity = qty - 1;
      }
    },

    // 🟢 Clear Cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
