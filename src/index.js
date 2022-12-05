import React from 'react';
import './styles/index.css';
import 'semantic-ui-css/semantic.min.css'
import { createRoot } from "react-dom/client";
// import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
// import AuthPage from './Pages/Auth';
// import HomePage from './Pages/HomePage';
// import PageNotFound from "../src/Pages/PageNotFound";
// import Cart from './component/Cart/cart';
// import HighlightedProduct from './component/Products/HighlightedProduct';
// import ProductContainer from './component/Products/ProductContainer';
 import App from './App';


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element:  <HomePage/>,

//   },
//   {
//     path : "products",
//     element : <ProductContainer/>
//   },
//   {
//     path : "products/:productId",
//     element: <HighlightedProduct/>
//   },
//   {
//     path: "login",
//     element : <AuthPage login = "true"></AuthPage>,
   
//   },
//   {
//     path: "signup",
//     element : <AuthPage login = "false"></AuthPage>,
   
//   },
//   {
//     path: "cart",
//     element : <Cart/>
//   }, 
//   {
//     path : "*",
//     element : <PageNotFound></PageNotFound>
//   },
// ]);


createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // <RouterProvider router={router}></RouterProvider> 
);

