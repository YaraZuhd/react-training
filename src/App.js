import React, {useEffect} from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import PageNotFound from "../src/Pages/PageNotFound";
import AuthPage from './Pages/Auth';
import HomePage from './Pages/HomePage';
import Cart from './component/Cart/cart';
import ProductContainer from './component/Products/ProductContainer';
import store from "./store/store";
import { cartFetch } from "./redux/cartSlice";
import { productsFetch } from "./redux/productSlice";

const App = ()=> {
  // if (localStorage.getItem("token") !== null) {
  //   useEffect(() => {
  //     store.dispatch(productsFetch());
  //     store.dispatch(cartFetch());
  //   });
  // }
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="products" element={ <ProductContainer/> } />
        <Route path="cart" element={ <Cart/> } />
        <Route path="login" element={  <AuthPage login = "true"/> } />
        <Route path="signup" element={  <AuthPage login = "false"/> } />
        <Route path="*" element={ <PageNotFound/> } />
      </Routes>
    </div>
  );
}

export default App;;
