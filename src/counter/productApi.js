import React from "react";

let token = "";
if (localStorage.getItem("token") !== null) {
  token = localStorage.getItem("token");
}

const fetchProducts = async () => {
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
};
