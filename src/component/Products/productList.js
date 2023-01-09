import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./productList.css";
import { Grid, Divider } from "semantic-ui-react";
import ProductCard from "./ProductCard";
import ReactPaginate from "react-paginate";

const ProductList = () => {
  const {
    products,
    filterd,
    filterCategorie,
    filterProduct,
    status,
  } = useSelector((state) => state.products);
  const [next, setNext] = useState({});
  const [previous, setPrevious] = useState({});
  const [limit, setLimit] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPagination, setProductPagination] = useState([]);
  let filterdProducts = products ? products : [];
  if (filterd) {
    if (filterCategorie !== "") {
      if (filterCategorie === "Show All") {
        filterdProducts = products;
      } else {
        filterdProducts = [];
        for (let i = 0; i < products.length; i++) {
          for (let j = 0; j < products[i].categories.length; j++) {
            if (
              products[i].categories[j].name.toLowerCase() ===
              filterCategorie.toLowerCase()
            ) {
              filterdProducts.push(products[i]);
            }
          }
        }
      }
    } else if (filterProduct !== "") {
      filterdProducts = [];
      for (let i = 0; i < products.length; i++) {
        if (
          products[i].name.toLowerCase().includes(filterProduct.toLowerCase())
        ) {
          filterdProducts.push(products[i]);
        }
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
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
          setNext(data.next);
          setLimit(data.next.limit);
        } else if (data.previous) {
          setPrevious(data.previous);
          setLimit(data.previous.limit);
        }
        setProductPagination(data.products);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [currentPage]);

  const changePage = ({selected}) =>{
       setCurrentPage(selected);
  }

  const pageCount = Math.ceil(products.length/limit);

  return (
    <>
      <Divider horizontal>Shop All Proudcts</Divider>
      <Grid stackable columns="equal" centered>
        {status === "pending" && <h5>Loading ...</h5>}
        {status === "rejected" && <h5>An error occured ..</h5>}
        {status === "success" &&
          filterdProducts !== [] &&
          productPagination.map((product) => (
            <Grid.Column width={5} key={product.id}>
              <ProductCard product={product} />
            </Grid.Column>
          ))}
        {status === "success" && filterdProducts === [] && (
          <div>Loading...</div>
        )}
      </Grid>
      {/* <ReactPaginate 
      previousLabel={"Previous"} 
      nextLabel={"Next"} 
      pageCount={pageCount}
      onPageChange={changePage}
      /> */}
    </>
  );
};

export default ProductList;
