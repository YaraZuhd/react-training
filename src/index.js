import React from 'react';
import PageNotFound from "../src/Pages/PageNotFound";
import './styles/index.css';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthPage from './Pages/Auth';
import HomePage from './Pages/HomePage';
// import 'semantic-ui-css/semantic.min.css'
import Cart from './component/Cart/cart';
import HighlightedProduct from './component/Products/HighlightedProduct';
import ProductContainer from './component/Products/ProductContainer';


const router = createBrowserRouter([
  {
    path: "/",
    element:  <HomePage/>,

  },
  {
    path : "products",
    element : <ProductContainer/>
  },
  {
    path : "products/:productId",
    element: <HighlightedProduct/>
  },
  {
    path: "login",
    element : <AuthPage login = "true"></AuthPage>,
   
  },
  {
    path: "signup",
    element : <AuthPage login = "false"></AuthPage>,
   
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

