import React from 'react';
import "./ProductContainer.css";
import { Grid } from "semantic-ui-react";
import Navbar from "../NavResponsive/Navbar";
import LeftPanel from "../LeftPanel/LeftPanel";
import ProductList from "./productList";
import { useState } from "react";

const ProductContainer = () => {

  const [toggle, setToggle] = useState(false);

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
