import React from 'react';
import './styles/index.css';
import 'semantic-ui-css/semantic.min.css'
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store/store'
import App from './App';
import { cartFetch } from './redux/cartSlice';
import { productsFetch } from './redux/productSlice';

store.dispatch(productsFetch());
store.dispatch(cartFetch());

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

