import React from 'react';
import PageNotFound from "../src/Pages/PageNotFound";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthPage from './Pages/Auth';
import HomePage from './Pages/HomePage';
import ProductList from './component/Products/productList';
import Cart from './component/Cart/cart';
import HighlightedProduct from './component/Products/HighlightedProduct';


const router = createBrowserRouter([
  {
    path: "/",
    element:  <HomePage/>,

  },
  {
    path : "products",
    element : <ProductList/>
  },
  {
    path : "products/:productId",
    element: <HighlightedProduct/>
  },
  {
    path: "login",
    element : <AuthPage></AuthPage>,
   
  },
  {
    path: "signup",
    element : <AuthPage></AuthPage>,
   
  },
  {
    path: "cart",
    element : <Cart/>
  }, 
  {
    path : "*",
    element : <PageNotFound></PageNotFound>
  },
]);


createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

