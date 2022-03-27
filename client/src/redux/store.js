import { configureStore } from '@reduxjs/toolkit';

import productReducer from './products';
import userReducer from './user';
import cartReducer from './cart';

const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
