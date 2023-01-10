import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./productList.css";
import { Grid, Divider } from "semantic-ui-react";
import ProductCard from "./ProductCard";
import PaginationProducts from "../Paginaion/Pagination";
import { async } from "q";
const ProductList = () => {
  const {
    products,
    filterd,
    filterCategorie,
    filterProduct,
    status,
  } = useSelector((state) => state.products);
  console.log(filterd,filterCategorie,filterProduct);
  const [limit ,setLimit] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageFilteration,setCurrentPageFilteration] = useState(1);
  const [productPagination, setProductPagination] = useState([]);

  let filterdProducts = products ? products : [];

  const getFiterationProducts = async() =>{
    try{
      let requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await fetch(
        `http://localhost:3000/products/filter-Products?page=${currentPageFilteration}`,
        requestOptions
      );
      const data = await response.json();
      if (data.next) {
        setLimit(data.next.limit);
      } else if (data.previous) {
        setLimit(data.previous.limit);
      }
      for (let i = 0; i < data.length; i++) {
        filterdProducts.push(data[i]);
      }
      return data;
    }catch(error){
      console.log(error);
    }
  }

  const filterProductsFunc = async() => {
    try{
      let requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: 'POST',
        body: JSON.stringify({ categorie: filterCategorie, product: filterProduct })
      };
      const response = await fetch(
        `http://localhost:3000/products/filter-Products`,
        requestOptions
      );
      const data = await response.json();
      filterdProducts = data;
      filterProductsFunc();
    }catch(error){
      console.log(error)
    }
  }

  const fetchData = async() => {
    try {
      let requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const response = await fetch(
        `http://localhost:3000/products?page=${currentPage}`,
        requestOptions
      );
      const data = await response.json();
      if (data.next) {
        setLimit(data.next.limit);
      } else if (data.previous) {
        setLimit(data.previous.limit);
      }
      setProductPagination(data.products);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const paginateFunc = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  if (filterd) {
    filterProductsFunc()
  }else{
    filterdProducts=productPagination
  }

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    getFiterationProducts();
  }, [currentPageFilteration]);

  return (
    <>
      <Divider horizontal>Shop All Proudcts</Divider>
      <Grid stackable columns="equal" centered>
        {status === "pending" && <h5>Loading ...</h5>}
        {status === "rejected" && <h5>An error occured ..</h5>}
        {status === "success" &&
          filterdProducts !== [] &&
          filterdProducts.map((product) => (
            <Grid.Column width={5} key={product.id}>
              <ProductCard product={product} />
            </Grid.Column>
          ))}
        {status === "success" && filterdProducts === [] && (
          <div>Loading...</div>
        )}
      </Grid>
      {(!filterd) && <PaginationProducts productPerPage= {limit} totalProducts = {products.length} paginateFunction={paginateFunc}/>}
      {filterd && <PaginationProducts productPerPage= {limit} totalProducts = {filterdProducts.length} paginateFunction={paginateFunc}/>}
    </>
  );
};

export default ProductList;
