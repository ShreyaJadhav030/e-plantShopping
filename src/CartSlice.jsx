import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1; // If plant already in cart, increase quantity
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Else, add new plant with quantity 1
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item && amount > 0) {
        item.quantity = amount; // Update with new quantity
      }
    }
  }
});

// Export actions for use in ProductList.jsx and CartItem.jsx
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Export reducer for store.js
export default cartSlice.reducer;
