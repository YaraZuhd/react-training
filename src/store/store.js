import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartSlice';
import counterReducer from '../redux/counterSlice';
import productReducer from '../redux/productSlice';


export default configureStore({
  reducer: {
    counter: counterReducer,
    products: productReducer,
    cart: cartReducer,
  },
});
