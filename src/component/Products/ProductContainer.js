import "./ProductContainer.css";
import { Grid } from "semantic-ui-react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../NavResponsive/Navbar";
import LeftPanel from "../../LeftPanel/LeftPanel";
import ProductList from "./productList";
import { useState } from "react";

// https://github.com/kingmoc/adding-products-cart-cjs-react/blob/master/src/App.js

const ProductContainer = () => {

  const [toggle, setToggle] = useState(false);
  const [cart, setCart] = useState()


  const handelCallback = (childData) => {
    setToggle(childData);
  };

  const addToCart = (productId, variantInfo) => {

    if(variantInfo) {
        // commerce.cart.add(productId, 1, variantInfo)
        //     .then(res => {
        //         console.log(res, 'res from adding to CART!!')
        //         setCart(res.cart)
        //     })
    } else {
        window.alert('Please Select a Quentity')
    }
}

  return (
    <div className="product-container">
      <Navbar toggleCallback={handelCallback} />
      {!toggle && (
        <Grid centered stackable padded relaxed className="grid-container">
          <Grid.Column className="left-column" width={2}>
            <LeftPanel />
          </Grid.Column>
          <Grid.Column width={12}>
            <ProductList addToCart={addToCart} />
          </Grid.Column>
        </Grid>
      )}
    </div>
  );
};

export default ProductContainer;
