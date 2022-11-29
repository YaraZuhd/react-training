import { useEffect, useState, useCallback } from "react";
import "./productList.css";
import { Grid } from 'semantic-ui-react';
import "bootstrap/dist/css/bootstrap.css";
import ProductCard from "./ProductCard";

const ProductList = (props) => {
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
        <div className="separator">Shop All Proudcts</div>
        <Grid stackable columns='equal' centered>
            {productsData.map(product => <Grid.Column width={5} key={product.id}>
                <ProductCard product={product} addToCart={props.addToCart}  />
                </Grid.Column>)}
        </Grid>
      {/* <h2>Avalibale Products</h2>
            <div className="div-container"> 
                <div className="row row-cols-2">
                    {productsData.map((product) =>
                        <div className="col" key={product.id}>
                            <Product
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                desription = {product.desription}
                            />
                        </div>
                    )}
                </div>
                
            </div> */}
    </>
  );
};

export default ProductList;
