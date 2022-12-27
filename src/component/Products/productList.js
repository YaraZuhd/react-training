import React from "react";
import { useSelector } from "react-redux";
import "./productList.css";
import { Grid, Divider } from "semantic-ui-react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { products,filterd,filterCategorie,filterProduct, status } = useSelector((state) => state.products);
  console.log(products,filterd,filterCategorie, filterProduct ,status);
  let filterdProducts = products? products : [];
  if(filterd){
    if(filterCategorie !== ''){
      filterdProducts = []
      for(let i = 0; i < products.length; i++){
        for(let j=0; j < products[i].categories.length; j++){
          if(products[i].categories[j].name.toLowerCase() === filterCategorie.toLowerCase()){
            filterdProducts.push(products[i]);
          }
        }
      }
    }else if(filterProduct !== ''){
      filterdProducts = [];
      for(let i = 0; i < products.length; i++){
          if(products[i].name.toLowerCase().includes(filterProduct.toLowerCase())){
            filterdProducts.push(products[i]);
          } 
      }

    }
  }

  return (
    <>
      <Divider horizontal>Shop All Proudcts</Divider>
      <Grid stackable columns="equal" centered>
        {status === "pending" && <h5>Loading ...</h5>}
        {status === "rejected" && <h5>An error occured ..</h5>}
        {status === "success" &&
          filterdProducts.map((product) => (
            <Grid.Column width={5} key={product.id}>
              <ProductCard product={product} />
            </Grid.Column>
          ))}
      </Grid>
    </>
  );
};

export default ProductList;
