import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import PageNotFound from "../src/Pages/PageNotFound";
import AuthPage from './Pages/Auth';
import HomePage from './Pages/HomePage';
import Cart from './component/Cart/cart';
import HighlightedProduct from './component/Products/HighlightedProduct';
import ProductContainer from './component/Products/ProductContainer';

const App = ()=> {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="products" element={ <ProductContainer/> } />
        <Route path="products/:productId" element={ <HighlightedProduct/> } />
        <Route path="cart" element={ <Cart/> } />
        <Route path="login" element={  <AuthPage login = "true"/> } />
        <Route path="signup" element={  <AuthPage login = "false"/> } />
        <Route path="*" element={ <PageNotFound/> } />
      </Routes>
    </div>
  );
}

export default App;;
