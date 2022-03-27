import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, { payload }) => {
      state.quantity++;
      state.cart.push(payload);
      state.total += payload.price * payload.quantity;
    },
  },
});

export const { addProduct } = cartSlice.actions;

export default cartSlice.reducer;
