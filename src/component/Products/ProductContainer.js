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

  console.log(JSON.parse(localStorage.getItem('cart')).items.length);



  const handelCallback = (childData) => {
    setToggle(childData);
  };

  return (
    <div className="product-container">
      <Navbar toggleCallback={handelCallback}/>
      {!toggle && (
        <Grid centered stackable padded relaxed className="grid-container">
          <Grid.Column className="left-column" width={5}>
            <LeftPanel />
          </Grid.Column>
          <Grid.Column width={9}>
            <ProductList/>
          </Grid.Column>
        </Grid>
      )}
    </div>
  );
};

export default ProductContainer;
