import React from "react";
import { useSelector } from "react-redux";
import "./productList.css";
import { Grid, Divider } from "semantic-ui-react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { products, status } = useSelector((state) => state.products);

  return (
    <>
      <Divider horizontal>Shop All Proudcts</Divider>
      <Grid stackable columns="equal" centered>
        {status === "pending" && <h5>Loading ...</h5>}
        {status === "rejected" && <h5>An error occured ..</h5>}
        {status === "success" &&
          products.map((product) => (
            <Grid.Column width={5} key={product.id}>
              <ProductCard product={product} />
            </Grid.Column>
          ))}
      </Grid>
    </>
  );
};

export default ProductList;
