import { useEffect, useState, useCallback } from "react";
import "./productList.css";
import { Grid,Divider } from 'semantic-ui-react';
import "bootstrap/dist/css/bootstrap.css";
import ProductCard from "./ProductCard";

const ProductList = () => {
  let token = "";
  const [productsData, setProductsData] = useState([]);

  if (localStorage.getItem("token") != null) {
    token = localStorage.getItem("token");
  }

  const fetchProducts = useCallback(async () => {
    try {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `http://localhost:3000/products`,
        requestOptions
      );
      if (response.status === 200 && response.ok) {
        const data = await response.json();
        localStorage.setItem('products', JSON.stringify(data));
        setProductsData(data);
      } else {
        throw new Error("No Product Found");
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <>
        <Divider horizontal>Shop All Proudcts</Divider>
        <Grid stackable columns='equal' centered>
            {productsData.map(product => <Grid.Column width={5} key={product.id}>
                <ProductCard product={product}/>
                </Grid.Column>)}
        </Grid>
    </>
  );
};

export default ProductList;
