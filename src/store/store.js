import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import productReducer from '../redux/productSlice';


export default configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});
